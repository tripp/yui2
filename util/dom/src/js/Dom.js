/*
Copyright (c) 2006, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
*/

/**
 * @class Provides helper methods for DOM elements.
 */
YAHOO.util.Dom = function() {
   var ua = navigator.userAgent.toLowerCase();
   var isOpera = (ua.indexOf('opera') != -1);
   var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
   var id_counter = 0;
   var util = YAHOO.util; // internal shorthand
   
   var property_cache = {}; // to cache case conversion for set/getStyle
   
   // improve performance by only looking up once
   var cacheConvertedProperties = function(property) {
      property_cache[property] = {
         camel: property.replace(/-([a-z])/gi, function(m0, m1) {return m1.toUpperCase()}),
         hyphen: property.replace(/([a-z])([A-Z]+)/g, function(m0, m1, m2) {return (m1 + '-' + m2.toLowerCase())})
      };
   };
   
   return {
      /**
       * Returns an HTMLElement reference
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID for getting a DOM reference, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @return {HTMLElement/Array} A DOM reference to an HTML element or an array of HTMLElements.
       */
      get: function(el) {
         if (typeof el != 'string' && !(el instanceof Array) )
         { // assuming HTMLElement or HTMLCollection, so pass back as is
            return el;
         }
         
         if (typeof el == 'string') 
         { // ID
            return document.getElementById(el);
         }
         else
         { // array of ID's and/or elements
            var collection = [];
            for (var i = 0, len = el.length; i < len; ++i)
            {
               collection[collection.length] = util.Dom.get(el[i]);
            }
            
            return collection;
         }

         return null; // safety, should never happen
      },
   
      /**
       * Normalizes currentStyle and ComputedStyle.
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @param {String} property The style property whose value is returned.
       * @return {String/Array} The current value of the style property for the element(s).
       */
      getStyle: function(el, property) {
         var f = function(el) {
            var value = null;
            var dv = document.defaultView;
            
            if (!property_cache[property]) {
               cacheConvertedProperties(property);
            }
            
            var camel = property_cache[property]['camel'];
            var hyphen = property_cache[property]['hyphen'];

            if (property == 'opacity' && el.filters) {// IE opacity
               value = 1;
               try {
                  value = el.filters.item('DXImageTransform.Microsoft.Alpha').opacity / 100;
               } catch(e) {
                  try {
                     value = el.filters.item('alpha').opacity / 100;
                  } catch(e) {}
               }
            } else if (el.style[camel]) { // camelCase for valid styles
               value = el.style[camel];
            }
            else if (el.currentStyle && el.currentStyle[camel]) { // camelCase for currentStyle
               value = el.currentStyle[camel];
            }
            else if ( dv && dv.getComputedStyle ) { // hyphen-case for computedStyle
               var computed = dv.getComputedStyle(el, '');
               
               if (computed && computed.getPropertyValue(hyphen)) {
                  value = computed.getPropertyValue(hyphen);
               }
            }
      
            return value;
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
   
      /**
       * Wrapper for setting style properties of HTMLElements.  Normalizes "opacity" across modern browsers.
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @param {String} property The style property to be set.
       * @param {String} val The value to apply to the given property.
       */
      setStyle: function(el, property, val) {
         if (!property_cache[property]) {
            cacheConvertedProperties(property);
         }
         
         var camel = property_cache[property]['camel'];
         
         var f = function(el) {
            switch(property) {
               case 'opacity' :
                  if (isIE && typeof el.style.filter == 'string') { // in case not appended
                     el.style.filter = 'alpha(opacity=' + val * 100 + ')';
                     
                     if (!el.currentStyle || !el.currentStyle.hasLayout) {
                        el.style.zoom = 1; // when no layout or cant tell
                     }
                  } else {
                     el.style.opacity = val;
                     el.style['-moz-opacity'] = val;
                     el.style['-khtml-opacity'] = val;
                  }

                  break;
               default :
                  el.style[camel] = val;
            }
            
         };
         
         util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Gets the current position of an element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
       @ return {Array} The XY position of the element(s)
       */
      getXY: function(el) {
         var f = function(el) {
   
         // has to be part of document to have pageXY
            if (el.parentNode === null || this.getStyle(el, 'display') == 'none') {
               return false;
            }
            
            var parentNode = null;
            var pos = [];
            var box;
            
            if (el.getBoundingClientRect) { // IE
               box = el.getBoundingClientRect();
               var doc = document;
               if ( !this.inDocument(el) ) {// might be in a frame, need to get its scroll
                  var doc = parent.document;
                  while ( doc && !this.isAncestor(doc.documentElement, el) ) {
                     doc = parent.document;
                  }
               }

               var scrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
               var scrollLeft = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
               
               return [box.left + scrollLeft, box.top + scrollTop];
            }
            else { // safari, opera, & gecko
               pos = [el.offsetLeft, el.offsetTop];
               parentNode = el.offsetParent;
               if (parentNode != el) {
                  while (parentNode) {
                     pos[0] += parentNode.offsetLeft;
                     pos[1] += parentNode.offsetTop;
                     parentNode = parentNode.offsetParent;
                  }
               }
               if (
                  ua.indexOf('opera') != -1 
                  || ( ua.indexOf('safari') != -1 && this.getStyle(el, 'position') == 'absolute' ) 
               ) {
                  pos[0] -= document.body.offsetLeft;
                  pos[1] -= document.body.offsetTop;
               } 
            }
            
            if (el.parentNode) { parentNode = el.parentNode; }
            else { parentNode = null; }
      
            while (parentNode && parentNode.tagName.toUpperCase() != 'BODY' && parentNode.tagName.toUpperCase() != 'HTML') 
            { // account for any scrolled ancestors
               pos[0] -= parentNode.scrollLeft;
               pos[1] -= parentNode.scrollTop;
      
               if (parentNode.parentNode) { parentNode = parentNode.parentNode; } 
               else { parentNode = null; }
            }
      
            return pos;
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Gets the current X position of an element based on page coordinates.  The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
       * @return {String/Array} The X position of the element(s)
       */
      getX: function(el) {
         return util.Dom.getXY(el)[0];
      },
      
      /**
       * Gets the current Y position of an element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
       * @return {String/Array} The Y position of the element(s)
       */
      getY: function(el) {
         return util.Dom.getXY(el)[1];
      },
      
      /**
       * Set the position of an html element in page coordinates, regardless of how the element is positioned.
       * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
       * @param {Array} pos Contains X & Y values for new position (coordinates are page-based)
       * @param {Boolean} noRetry By default we try and set the position a second time if the first fails
       */
      setXY: function(el, pos, noRetry) {
         var f = function(el) {
   
            var style_pos = this.getStyle(el, 'position');
            if (style_pos == 'static') { // default to relative
               this.setStyle(el, 'position', 'relative');
               style_pos = 'relative';
            }
            
            var pageXY = this.getXY(el);
            if (pageXY === false) { return false; } // has to be part of doc to have pageXY
            
            var delta = [ // assuming pixels; if not we will have to retry
               parseInt( this.getStyle(el, 'left'), 10 ),
               parseInt( this.getStyle(el, 'top'), 10 )
            ];
         
            if ( isNaN(delta[0]) ) {// in case of 'auto'
               delta[0] = (style_pos == 'relative') ? 0 : el.offsetLeft;
            } 
            if ( isNaN(delta[1]) ) { // in case of 'auto'
               delta[1] = (style_pos == 'relative') ? 0 : el.offsetTop;
            } 
      
            if (pos[0] !== null) { el.style.left = pos[0] - pageXY[0] + delta[0] + 'px'; }
            if (pos[1] !== null) { el.style.top = pos[1] - pageXY[1] + delta[1] + 'px'; }
      
            var newXY = this.getXY(el);
      
            // if retry is true, try one more time if we miss 
            if (!noRetry && (newXY[0] != pos[0] || newXY[1] != pos[1]) ) {
               this.setXY(el, pos, true);
            }
         };
         
         util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Set the X position of an html element in page coordinates, regardless of how the element is positioned.
       * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @param {Int} x to use as the X coordinate for the element(s).
       */
      setX: function(el, x) {
         util.Dom.setXY(el, [x, null]);
      },
      
      /**
       * Set the Y position of an html element in page coordinates, regardless of how the element is positioned.
       * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @param {Int} x to use as the Y coordinate for the element(s).
       */
      setY: function(el, y) {
         util.Dom.setXY(el, [null, y]);
      },
      
      /**
       * Returns the region position of the given element.
       * The element must be part of the DOM tree to have a region (display:none or elements not appended return false).
       * @param {String/HTMLElement/Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
       * @return {Region/Array} A Region or array of Region instances containing "top, left, bottom, right" member data.
       */
      getRegion: function(el) {
         var f = function(el) {
            return new YAHOO.util.Region.getRegion(el);
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Returns the width of the client (viewport).
       * Now using getViewportWidth.  This interface left intact for back compat.
       * @return {Int} The width of the viewable area of the page.
       */
      getClientWidth: function() {
         return util.Dom.getViewportWidth();
      },
      
      /**
       * Returns the height of the client (viewport).
       * Now using getViewportHeight.  This interface left intact for back compat.
       * @return {Int} The height of the viewable area of the page.
       */
      getClientHeight: function() {
         return util.Dom.getViewportHeight();
      },

      /**
       * Returns a array of HTMLElements with the given class
       * For optimized performance, include a tag and/or root node if possible
       * @param {String} className The class name to match against
       * @param {String} tag (optional) The tag name of the elements being collected
       * @param {String/HTMLElement} root (optional) The HTMLElement or an ID to use as the starting point 
       * @return {Array} An array of elements that have the given class name
       */
      getElementsByClassName: function(className, tag, root) {
         var method = function(el) { return util.Dom.hasClass(el, className) };
         return util.Dom.getElementsBy(method, tag, root);
      },

      /**
       * Determines whether an HTMLElement has the given className
       * @param {String/HTMLElement/Array} el The element or collection to test
       * @param {String} className the class name to search for
       * @return {Boolean/Array} A boolean value or array of boolean values
       */
      hasClass: function(el, className) {
         var re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
         
         var f = function(el) {
            return re.test(el['className']);
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
   
      /**
       * Adds a class name to a given element or collection of elements
       * @param {String/HTMLElement/Array} el The element or collection to add the class to
       * @param {String} className the class name to add to the class attribute
       */
      addClass: function(el, className) {
         var f = function(el) {
            if (this.hasClass(el, className)) { return; } // already present
            
            el['className'] = [el['className'], className].join(' ');
         };
         
         util.Dom.batch(el, f, util.Dom, true);
      },
   
      /**
       * Removes a class name from a given element or collection of elements
       * @param {String/HTMLElement/Array} el The element or collection to remove the class from
       * @param {String} className the class name to remove from the class attribute
       */
      removeClass: function(el, className) {
         var re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g');

         var f = function(el) {
            if (!this.hasClass(el, className)) { return; } // not present
            var c = el['className'];
            el['className'] = c.replace(re, ' ');
            if ( this.hasClass(el, className) ) { // in case of multiple adjacent
               this.removeClass(el, className);
            }
            
         };
         
         util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Replace a class with another class for a given element or collection of elements.
       * If no oldClassName is present, the newClassName is simply added.
       * @param {String/HTMLElement/Array} el The element or collection to remove the class from
       * @param {String} oldClassName the class name to be replaced
       * @param {String} newClassName the class name that will be replacing the old class name
       */
      replaceClass: function(el, oldClassName, newClassName) {
         var re = new RegExp('(?:^|\\s+)' + oldClassName + '(?:\\s+|$)', 'g');

         var f = function(el) {
            el['className'] = el['className'].replace(re, ' ' + newClassName + ' ');

            if ( this.hasClass(el, oldClassName) ) { // in case of multiple adjacent
               this.replaceClass(el, oldClassName, newClassName);
            }
         };
         
         util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Generates a unique ID
       * @param {String/HTMLElement/Array} el (optional) An optional element array of elements to add an ID to (no ID is added if one is already present)
       * @param {String} prefix (optional) an optional prefix to use (defaults to "yui-gen")
       * @return {String/Array} The generated ID, or array of generated IDs (or original ID if already present on an element)
       */
      generateId: function(el, prefix) {
         prefix = prefix || 'yui-gen';
         
         var f = function(el) {
            el = el || {}; // just generating ID in this case
            
            if (!el.id) { el.id = prefix + id_counter++; } // dont override existing
            
            return el.id;
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Determines whether an HTMLElement is an ancestor of another HTML element in the DOM hierarchy
       * @param {String/HTMLElement} haystack The possible ancestor
       * @param {String/HTMLElement} needle The possible descendent
       * @return {Boolean} Whether or not the haystack is an ancestor of needle
       */
      isAncestor: function(haystack, needle) {
         haystack = util.Dom.get(haystack);
         if (!haystack || !needle) { return false; }
         
         var f = function(needle) {
            if (haystack.contains && ua.indexOf('safari') < 0) 
            { // safari "contains" is broken
               return haystack.contains(needle);
            }
            else if ( haystack.compareDocumentPosition ) 
            {
               return !!(haystack.compareDocumentPosition(needle) & 16);
            }
            else 
            { // loop up and test each parent
               var parent = needle.parentNode;
               
               while (parent) {
                  if (parent == haystack) {
                     return true;
                  }
                  else if (parent.tagName.toUpperCase() == 'HTML') {
                     return false;
                  }
                  
                  parent = parent.parentNode;
               }
               
               return false;
            }    
         };
         
         return util.Dom.batch(needle, f, util.Dom, true);     
      },
      
      /**
       * Determines whether an HTMLElement is present in the current document
       * @param {String/HTMLElement} el The element to search for
       * @return {Boolean} Whether or not the element is present in the current document
       */
      inDocument: function(el) {
         var f = function(el) {
            return this.isAncestor(document.documentElement, el);
         };
         
         return util.Dom.batch(el, f, util.Dom, true);
      },
      
      /**
       * Returns a array of HTMLElements that pass the test applied by supplied boolean method
       * For optimized performance, include a tag and/or root node if possible
       * @param {Function} method A boolean method to test elements with
       * @param {String} tag (optional) The tag name of the elements being collected
       * @param {String/HTMLElement} root (optional) The HTMLElement or an ID to use as the starting point 
       */
      getElementsBy: function(method, tag, root) {
         tag = tag || '*';
         root = util.Dom.get(root) || document;
         
         var nodes = [];
         var elements = root.getElementsByTagName(tag);
         
         if ( !elements.length && (tag == '*' && root.all) ) {
            elements = root.all; // IE < 6
         }
         
         for (var i = 0, len = elements.length; i < len; ++i) 
         {
            if ( method(elements[i]) ) { nodes[nodes.length] = elements[i]; }
         }

         return nodes;
      },
      
      /**
       * Returns an array of elements that have had the supplied method applied.
       * The method is called with the element(s) as the first arg, and the optional param as the second ( method(el, o) )
       * @param {String/HTMLElement/Array} el (optional) An element or array of elements to apply the method to
       * @param {Function} method The method to apply to the element(s)
       * @param {Generic} (optional) o An optional arg that is passed to the supplied method
       * @param {Boolean} (optional) override Whether or not to override the scope of "method" with "o"
       * @return {HTMLElement/Array} The element(s) with the method applied
       */
      batch: function(el, method, o, override) {
         el = util.Dom.get(el);
         var scope = (override) ? o : window;
         
         if (!el || el.tagName || !el.length) 
         { // is null or not a collection (tagName for SELECT and others that can be both an element and a collection)
            return method.call(scope, el, o);
         } 
         
         var collection = [];
         
         for (var i = 0, len = el.length; i < len; ++i)
         {
            collection[collection.length] = method.call(scope, el[i], o);
         }
         
         return collection;
      },
      
      /**
       * Returns the height of the document.
       * @return {Int} The height of the actual document (which includes the body and its margin).
       */
      getDocumentHeight: function() {
         var scrollHeight=-1,windowHeight=-1,bodyHeight=-1;
         var marginTop = parseInt(util.Dom.getStyle(document.body, 'marginTop'), 10);
         var marginBottom = parseInt(util.Dom.getStyle(document.body, 'marginBottom'), 10);
         
         var mode = document.compatMode;
         
         if ( (mode || isIE) && !isOpera ) { // (IE, Gecko)
            switch (mode) {
               case 'CSS1Compat': // Standards mode
                  scrollHeight = ((window.innerHeight && window.scrollMaxY) ?  window.innerHeight+window.scrollMaxY : -1);
                  windowHeight = [document.documentElement.clientHeight,self.innerHeight||-1].sort(function(a, b){return(a-b);})[1];
                  bodyHeight = document.body.offsetHeight + marginTop + marginBottom;
                  break;
               
               default: // Quirks
                  scrollHeight = document.body.scrollHeight;
                  bodyHeight = document.body.clientHeight;
            }
         } else { // Safari & Opera
            scrollHeight = document.documentElement.scrollHeight;
            windowHeight = self.innerHeight;
            bodyHeight = document.documentElement.clientHeight;
         }
      
         var h = [scrollHeight,windowHeight,bodyHeight].sort(function(a, b){return(a-b);});
         return h[2];
      },
      
      /**
       * Returns the width of the document.
       * @return {Int} The width of the actual document (which includes the body and its margin).
       */
      getDocumentWidth: function() {
         var docWidth=-1,bodyWidth=-1,winWidth=-1;
         var marginRight = parseInt(util.Dom.getStyle(document.body, 'marginRight'), 10);
         var marginLeft = parseInt(util.Dom.getStyle(document.body, 'marginLeft'), 10);
         
         var mode = document.compatMode;
         
         if (mode || isIE) { // (IE, Gecko, Opera)
            switch (mode) {
               case 'CSS1Compat': // Standards mode
                  docWidth = document.documentElement.clientWidth;
                  bodyWidth = document.body.offsetWidth + marginLeft + marginRight;
                  winWidth = self.innerWidth || -1;
                  break;
                  
               default: // Quirks
                  bodyWidth = document.body.clientWidth;
                  winWidth = document.body.scrollWidth;
                  break;
            }
         } else { // Safari
            docWidth = document.documentElement.clientWidth;
            bodyWidth = document.body.offsetWidth + marginLeft + marginRight;
            winWidth = self.innerWidth;
         }
      
         var w = [docWidth,bodyWidth,winWidth].sort(function(a, b){return(a-b);});
         return w[2];
      },

      /**
       * Returns the current height of the viewport.
       * @return {Int} The height of the viewable area of the page (excludes scrollbars).
       */
      getViewportHeight: function() {
         var height = -1;
         var mode = document.compatMode;
      
         if ( (mode || isIE) && !isOpera ) {
            switch (mode) { // (IE, Gecko)
               case 'CSS1Compat': // Standards mode
                  height = document.documentElement.clientHeight;
                  break;
      
               default: // Quirks
                  height = document.body.clientHeight;
            }
         } else { // Safari, Opera
            height = self.innerHeight;
         }
      
         return height;
      },
      
      /**
       * Returns the current width of the viewport.
       * @return {Int} The width of the viewable area of the page (excludes scrollbars).
       */
      
      getViewportWidth: function() {
         var width = -1;
         var mode = document.compatMode;
         
         if (mode || isIE) { // (IE, Gecko, Opera)
            switch (mode) {
            case 'CSS1Compat': // Standards mode 
               width = document.documentElement.clientWidth;
               break;
               
            default: // Quirks
               width = document.body.clientWidth;
            }
         } else { // Safari
            width = self.innerWidth;
         }
         
         return width;
      }
   };
}();

