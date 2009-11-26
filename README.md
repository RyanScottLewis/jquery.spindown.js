*jquery.spindown.js*
==================
## Usage
You must add the jquery.js, jquery.cookie.js, and jquery.json.js libraries to your document before you add the jquery.spindown.js library.
    $('.selector').spindown({ slideSpeed: 500 });

## Example
    $(document).ready(function(){
        $(".expandable").spindown();
    });

This will turn all of the elements with the class 'expandable' into spindowns, causing all of the elements after them to 'roll up' or 'roll down' when the expandable element is clicked.
## Options
###  Default options:
    cookie: true,
    cookieName: 'spindown',
    cookiePath: '/',
    cookieExpire: 14,
    slideSpeed: 100,
    openedClass: 'opened',
    closedClass: 'closed'
### Cookies:
When 'cookie' is set to true, blah blah blah yadda yadda
## ToDo
- Add closedByDefault option
## Credits
Created by Ryan Lewis, released under the MIT License.