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
            var selector = this.selector;
            var opened;
            
            return this.each(function(index){
                var self = $(this);
                var cookie = $.cookie(options.cookieName + selector);
                if( options.cookie ){
                    cookie ? opened = $.evalJSON( cookie ) : opened = [];
                    opened.includes(index) ? self.next().show() : self.next().hide();
                } else {
                    opened = [];
                    self.next().hide();
                }
                self.next().is(":visible") ? self.addClass(options.openedClass) : self.addClass(options.closedClass);
                self.click(function(){
                    if( opened.includes(index) ){
                        self.addClass(options.closedClass); self.removeClass(options.openedClass);
                    }else{
                        self.removeClass(options.closedClass); self.addClass(options.openedClass);
                    }
                    self.next().slideToggle(options.slideSpeed, function(){
                        if( opened.includes(index) && self.next().is(":hidden") ) { 
                            opened.remove(index);
                        } else if( !opened.includes(index) && self.next().is(":visible") ) {
                            opened.push(index);
                        }
                        if( options.cookie ){
                            $.cookie(options.cookieName + selector, $.toJSON(opened), { path: options.cookiePath, expires: options.cookieExpire });
                        }
                    });
                }); // end click event
            }); // end iteration
        } // end spindown
    });
})(jQuery);
