/**
 * Spindown plugin
 *
 * Copyright (c) 2009 Ryan Lewis
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

Array.prototype.includes=function(value){for(var i=0;i<this.length;i++){if(this[i]===value){return true}}return false};
Array.prototype.remove=function(value){var i=this.indexOf(value);if(i!=-1)this.splice(i,1)};

(function($){
     $.fn.extend({ 
        spindown: function(options){
            var defaults = {
                cookie: true,
                cookieName: 'spindown',
                cookiePath: '/',
                cookieExpire: 14,
                slideSpeed: 100,
                openedClass: 'opened',
                closedClass: 'closed'
            };
            var options = $.extend(defaults, options);
            var opened;
            
            return this.each(function() { //Iterate over the current set of matched elements  
                var self = $(this);    
                var next = self.next();
                var text = self.text();
                var cookie = $.cookie(options.cookieName);
                
                // If the cookie option is true and it exists, open the next element. Otherwise, hide it
                if( options.cookie ){
                    cookie ? opened = $.evalJSON( $.base64Decode(cookie) ) : opened = [];
                    // Right now it determines which element is visible by the text it contains
                    // Which shows some obvious flaws such as two elements containing the same text
                    // This must change in the future, but for right now... meh, it works
                    // (jQuery.inArray(text, opened) != 1) ? next.show() : next.hide();
                    opened.includes(text) ? next.show() : next.hide();
                } else {
                    opened = [];
                    next.hide();
                }
                // If the next element is visible, add the openedClass, otherwise add the closedClass
                next.is(":visible") ? self.addClass(options.openedClass) : self.addClass(options.closedClass);
                self.click(function(){
                    if( opened.includes(text) ){
                        self.addClass(options.closedClass); self.removeClass(options.openedClass);
                    }else{
                        self.removeClass(options.closedClass); self.addClass(options.openedClass);
                    }
                    self.next().slideToggle(options.slideSpeed, function(){
                        if ( opened.includes(text) ) { /////////////// ToDo: Turn into opened.includes(text) && self.is(":hidden")
                            // If the current child is hidden and found in the 'opened' array, remove it
                            if ( next.is(":hidden") ) { opened.remove(text); }
                        } else { /////////////// ToDo: Turn into !opened.includes(text) && self.is(":visible")
                            // If the current child is visible and not found in the 'opened' array, add it
                            if ( next.is(":visible") ) { opened.push(text); }
                        }
                        if( options.cookie ){
                            // Convert the 'opened' array to JSON, then convert that into base64 and save it to a cookie
                            $.cookie(options.cookieName, $.base64Encode( $.toJSON(opened) ), { path: options.cookiePath, expires: options.cookieExpire });
                        }
                        return false; // Is this needed?
                    });
                    return false; // Is this needed?
                }); // end click event
            }); // end iteration
        } // end spindown
    });
})(jQuery);
