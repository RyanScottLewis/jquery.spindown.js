*jquery.spindown.js*
==================
------------------
## Usage
    $('.selector').spindown({ animationDuration: 500 });

You must add the jquery.js, jquery.ui.js, jquery.cookie.js, jquery.json.js, and jquery.base64.js libraries to your document before you add the jquery.spindown.js library.

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
    animationDuration: 100,
    openedClass: 'opened',
    closedClass: 'closed'
### Cookies:
When 'cookie' is set to true
## ToDo
- Figure out a better way to save in the cookies
    - Right now it saves it by the elements text. There are obvious downfalls to this, such as using elements without text or two elements with the same text
- Remove dependence on jquery.ui.js
- Add closedByDefault option
## Credits
Created by Ryan Lewis, released under the MIT License.