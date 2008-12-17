(function(){var J;YAHOO.widget.Carousel=function(l,k){this._navBtns={prev:[],next:[]};this._pages={el:null,num:0,cur:0};YAHOO.widget.Carousel.superclass.constructor.call(this,l,k);};var N=YAHOO.widget.Carousel,Z=YAHOO.util.Dom,X=YAHOO.util.Event,i=YAHOO.lang;J="Carousel";var L={},D="afterScroll",V="beforeHide",G="beforePageChange",c="beforeScroll",R="beforeShow",B="blur",Q="focus",U="hide",K="itemAdded",h="itemRemoved",C="itemSelected",H="loadItems",F="navigationStateChange",M="noItems",a="pageChange",E="render",O="show",S="startAutoPlay",j="stopAutoPlay";function T(){var l=this._firstItem,k;if(l>=this.get("numItems")-1){if(this.get("isCircular")){k=0;}else{this.stopAutoPlay();}}else{k=l+this.get("numVisible");}this.scrollTo.call(this,k);}function P(l,k){var m=document.createElement(l);k=k||{};if(k.className){Z.addClass(m,k.className);}if(k.parent){k.parent.appendChild(m);}if(k.id){m.setAttribute("id",k.id);}if(k.content){if(k.content.nodeName){m.appendChild(k.content);}else{m.innerHTML=k.content;}}return m;}function Y(m,l,k){var o;if(!m){return 0;}function n(r,q){var s;s=parseInt(Z.getStyle(r,q),10);return i.isNumber(s)?s:0;}function p(r,q){var s;s=parseFloat(Z.getStyle(r,q));return i.isNumber(s)?s:0;}if(typeof k=="undefined"){k="int";}switch(l){case"height":o=m.offsetHeight;if(o>0){o+=n(m,"marginTop")+n(m,"marginBottom");}else{o=p(m,"height")+n(m,"marginTop")+n(m,"marginBottom")+n(m,"borderTopWidth")+n(m,"borderBottomWidth")+n(m,"paddingTop")+n(m,"paddingBottom");}break;case"width":o=m.offsetWidth;if(o>0){o+=n(m,"marginLeft")+n(m,"marginRight");}else{o=p(m,"width")+n(m,"marginLeft")+n(m,"marginRight")+n(m,"borderLeftWidth")+n(m,"borderRightWidth")+n(m,"paddingLeft")+n(m,"paddingRight");}break;default:if(k=="int"){o=n(m,l);if(l=="marginRight"&&YAHOO.env.ua.webkit){o=n(m,"marginLeft");}}else{if(k=="float"){o=p(m,l);}else{o=Z.getStyle(m,l);}}break;}return o;}function I(m){var n,l=0,k=false;if(this._itemsTable.numItems===0){return 0;}if(typeof m=="undefined"){if(this._itemsTable.size>0){return this._itemsTable.size;}}if(i.isUndefined(this._itemsTable.items[0])){return 0;}n=Z.get(this._itemsTable.items[0].id);if(typeof m=="undefined"){k=this.get("isVertical");}else{k=m=="height";}if(k){l=Y(n,"height");}else{l=Y(n,"width");}if(typeof m=="undefined"){this._itemsTable.size=l;}return l;}function d(m){var l=0,k=0;l=I.call(this);k=l*m;if(this.get("isVertical")){k-=m;}return k;}function W(){var o=this.get("firstVisible"),l=0,k=this.get("numItems"),m=this.get("numVisible"),n=this.get("revealAmount");l=o+m-1+(n?1:0);l=l>k-1?k-1:l;if(!this.getItem(o)||!this.getItem(l)){this.fireEvent(H,{ev:H,first:o,last:l,num:l-o});}}function b(k,l){l.scrollPageBackward();X.preventDefault(k);}function e(k,l){l.scrollPageForward();X.preventDefault(k);}function g(p,k){var s,u=this.CLASSES,l,r=this._firstItem,m=this.get("isCircular"),q=this.get("numItems"),t=this.get("numVisible"),o=k,n=r+t-1;s=t>1&&!m&&o>p;if(o>=0&&o<q){if(!i.isUndefined(this._itemsTable.items[o])){l=Z.get(this._itemsTable.items[o].id);if(l){Z.removeClass(l,u.SELECTED_ITEM);}}}if(i.isNumber(p)){p=parseInt(p,10);p=i.isNumber(p)?p:0;}else{p=r;}if(i.isUndefined(this._itemsTable.items[p])){this.scrollTo(p);}if(!i.isUndefined(this._itemsTable.items[p])){l=Z.get(this._itemsTable.items[p].id);if(l){Z.addClass(l,u.SELECTED_ITEM);}}if(p<r||p>n){if(s){this.scrollTo(r-t,true);}else{this.scrollTo(p);}}}function f(){var m=false,l=this.CLASSES,o,k,n;k=this.get("navigation");n=this._firstItem+this.get("numVisible");if(k.prev){if(this.get("numItems")===0||this._firstItem===0){if(this.get("numItems")===0||!this.get("isCircular")){X.removeListener(k.prev,"click",b);Z.addClass(k.prev,l.FIRST_NAV_DISABLED);for(o=0;o<this._navBtns.prev.length;o++){this._navBtns.prev[o].setAttribute("disabled","true");}this._prevEnabled=false;}else{m=!this._prevEnabled;}}else{m=!this._prevEnabled;}if(m){X.on(k.prev,"click",b,this);Z.removeClass(k.prev,l.FIRST_NAV_DISABLED);for(o=0;o<this._navBtns.prev.length;o++){this._navBtns.prev[o].removeAttribute("disabled");}this._prevEnabled=true;}}m=false;if(k.next){if(n>=this.get("numItems")){if(!this.get("isCircular")){X.removeListener(k.next,"click",e);Z.addClass(k.next,l.DISABLED);for(o=0;o<this._navBtns.next.length;o++){this._navBtns.next[o].setAttribute("disabled","true");}this._nextEnabled=false;}else{m=!this._nextEnabled;}}else{m=!this._nextEnabled;}if(m){X.on(k.next,"click",e,this);Z.removeClass(k.next,l.DISABLED);for(o=0;o<this._navBtns.next.length;o++){this._navBtns.next[o].removeAttribute("disabled");}this._nextEnabled=true;}}this.fireEvent(F,{next:this._nextEnabled,prev:this._prevEnabled});}function A(k){if(!i.isObject(k)){return;}switch(k.ev){case K:this._syncUiForItemAdd(k);break;case h:this._syncUiForItemRemove(k);break;case H:this._syncUiForLazyLoading(k);break;}}N.getById=function(k){return L[k]?L[k]:false;};YAHOO.extend(N,YAHOO.util.Element,{_carouselEl:null,_clipEl:null,_firstItem:0,_isAnimationInProgress:false,_itemsTable:null,_navBtns:null,_navEl:null,_nextEnabled:true,_pages:null,_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CAROUSEL_EL:"yui-carousel-element",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-carousel-button-disabled",FIRST_NAV:" yui-carousel-first-button",FIRST_NAV_DISABLED:"yui-carousel-first-button-disabled",FIRST_PAGE:"yui-carousel-nav-first-page",FOCUSSED_BUTTON:"yui-carousel-button-focus",HORIZONTAL:"yui-carousel-horizontal",NAVIGATION:"yui-carousel-nav",NEXT_PAGE:"yui-carousel-next",NAV_CONTAINER:"yui-carousel-buttons",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-item-selected",SELECTED_NAV:"yui-carousel-nav-page-selected",VERTICAL:"yui-carousel-vertical",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,ITEM_LOADING:"<img "+'src="../../build/carousel/assets/ajax-loader.gif" '+'alt="Loading" '+'style="margin-top:-32px;position:relative;top:50%;">',MAX_PAGER_BUTTONS:5,MIN_WIDTH:99,NUM_VISIBLE:3},STRINGS:{NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(q,l){var o,p,n,k,m=this.get("numItems");
if(!q){return false;}if(i.isString(q)||q.nodeName){p=q.nodeName?q.innerHTML:q;}else{if(i.isObject(q)){p=q.content;}else{return false;}}o=q.className||"";k=q.id?q.id:Z.generateId();if(i.isUndefined(l)){this._itemsTable.items.push({item:p,className:o,id:k});}else{if(l<0||l>=m){return false;}this._itemsTable.items.splice(l,0,{item:p,className:o,id:k});}this._itemsTable.numItems++;if(m<this._itemsTable.items.length){this.set("numItems",this._itemsTable.items.length);}this.fireEvent(K,{pos:l,ev:K});return true;},addItems:function(k){var l,o,m=true;if(!i.isArray(k)){return false;}for(l=0,o=k.length;l<o;l++){if(this.addItem(k[l][0],k[l][1])===false){m=false;}}return m;},blur:function(){this._carouselEl.blur();this.fireEvent(B);},clearItems:function(){var k=this.get("numItems");while(k>0){if(!this.removeItem(0)){}if(this._itemsTable.numItems===0){this.set("numItems",0);break;}k--;}this.fireEvent(M);},focus:function(){var k,t,l,n,o,s,q,p,m;if(this._isAnimationInProgress){return;}k=this.get("selectedItem");t=this.get("numVisible");l=this.get("selectOnScroll");n=(k>=0)?this.getItem(k):null;o=this.get("firstVisible");s=o+t-1;q=(k<o||k>s);p=(n&&n.id)?Z.get(n.id):null;m=this._itemsTable;if(!l&&q){p=(m&&m.items&&m.items[o])?Z.get(m.items[o].id):null;}if(p){try{p.focus();}catch(r){}}this.fireEvent(Q);},hide:function(){if(this.fireEvent(V)!==false){this.removeClass(this.CLASSES.VISIBLE);this.fireEvent(U);}},init:function(m,l){var k=m,n=false;if(!m){return;}this._itemsTable={loading:{},numItems:0,items:[],size:0};if(i.isString(m)){m=Z.get(m);}else{if(!m.nodeName){return;}}N.superclass.init.call(this,m,l);if(m){if(!m.id){m.setAttribute("id",Z.generateId());}n=this._parseCarousel(m);if(!n){this._createCarousel(k);}}else{m=this._createCarousel(k);}k=m.id;this.initEvents();if(n){this._parseCarouselItems();}if(!l||typeof l.isVertical=="undefined"){this.set("isVertical",false);}this._parseCarouselNavigation(m);this._navEl=this._setupCarouselNavigation();L[k]=this;W.call(this);},initAttributes:function(k){k=k||{};N.superclass.initAttributes.call(this,k);this.setAttributeConfig("carouselEl",{validator:i.isString,value:k.carouselEl||"OL"});this.setAttributeConfig("carouselItemEl",{validator:i.isString,value:k.carouselItemEl||"LI"});this.setAttributeConfig("currentPage",{readOnly:true,value:0});this.setAttributeConfig("firstVisible",{method:this._setFirstVisible,validator:this._validateFirstVisible,value:k.firstVisible||this.CONFIG.FIRST_VISIBLE});this.setAttributeConfig("selectOnScroll",{validator:i.isBoolean,value:k.selectOnScroll||true});this.setAttributeConfig("numVisible",{method:this._setNumVisible,validator:this._validateNumVisible,value:k.numVisible||this.CONFIG.NUM_VISIBLE});this.setAttributeConfig("numItems",{method:this._setNumItems,validator:this._validateNumItems,value:this._itemsTable.numItems});this.setAttributeConfig("scrollIncrement",{validator:this._validateScrollIncrement,value:k.scrollIncrement||1});this.setAttributeConfig("selectedItem",{method:this._setSelectedItem,validator:i.isNumber,value:-1});this.setAttributeConfig("revealAmount",{method:this._setRevealAmount,validator:this._validateRevealAmount,value:k.revealAmount||0});this.setAttributeConfig("isCircular",{validator:i.isBoolean,value:k.isCircular||false});this.setAttributeConfig("isVertical",{method:this._setOrientation,validator:i.isBoolean,value:k.isVertical||false});this.setAttributeConfig("navigation",{method:this._setNavigation,validator:this._validateNavigation,value:k.navigation||{prev:null,next:null,page:null}});this.setAttributeConfig("animation",{validator:this._validateAnimation,value:k.animation||{speed:0,effect:null}});this.setAttributeConfig("autoPlay",{validator:i.isNumber,value:k.autoPlay||0});},initEvents:function(){var l=this,k=this.CLASSES;l.on("keydown",l._keyboardEventHandler);l.on(D,f);l.on(D,l.focus);l.on(K,A);l.on(K,f);l.on(K,l._syncPagerUi);l.on(h,A);l.on(h,f);l.on(h,l._syncPagerUi);l.on(C,l.focus);l.on(H,A);l.on(a,l._syncPagerUi);l.on(E,f);l.on(E,l._syncPagerUi);l.on(M,function(m){l.scrollTo(0);f.call(l);l._syncPagerUi();});l.on("selectedItemChange",function(m){g.call(l,m.newValue,m.prevValue);if(m.newValue>=0){l._updateTabIndex(l.getElementForItem(m.newValue));}l.fireEvent(C,m.newValue);});l.on("firstVisibleChange",function(m){if(!l.get("selectOnScroll")){if(m.newValue>=0){l._updateTabIndex(l.getElementForItem(m.newValue));}}});l.on("click",l._itemClickHandler);l.on("click",l._pagerClickHandler);X.onFocus(l.get("element"),function(m,n){n._updateNavButtons(X.getTarget(m),true);},l);X.onBlur(l.get("element"),function(m,n){n._updateNavButtons(X.getTarget(m),false);},l);},getElementForItem:function(k){if(k<0||k>=this.get("numItems")){return null;}if(this._itemsTable.numItems>k){if(!i.isUndefined(this._itemsTable.items[k])){return Z.get(this._itemsTable.items[k].id);}}return null;},getElementForItems:function(){var l=[],k;for(k=0;k<this._itemsTable.numItems;k++){l.push(this.getElementForItem(k));}return l;},getItem:function(k){if(k<0||k>=this.get("numItems")){return null;}if(this._itemsTable.numItems>k){if(!i.isUndefined(this._itemsTable.items[k])){return this._itemsTable.items[k];}}return null;},getItems:function(k){return this._itemsTable.items;},getItemPositionById:function(m){var k=0,l=this._itemsTable.numItems;while(k<l){if(!i.isUndefined(this._itemsTable.items[k])){if(this._itemsTable.items[k].id==m){return k;}}k++;}return -1;},removeItem:function(l){var m,k=this.get("numItems");if(l<0||l>=k){return false;}m=this._itemsTable.items.splice(l,1);if(m&&m.length==1){this._itemsTable.numItems--;this.set("numItems",k-1);this.fireEvent(h,{item:m[0],pos:l,ev:h});return true;}return false;},render:function(m){var l=this.CONFIG,k=this.CLASSES,n;this.addClass(k.CAROUSEL);if(!this._clipEl){this._clipEl=this._createCarouselClip();this._clipEl.appendChild(this._carouselEl);}if(m){this.appendChild(this._clipEl);this.appendTo(m);this._setClipContainerSize();}else{if(!Z.inDocument(this.get("element"))){return false;}this.appendChild(this._clipEl);
}if(this.get("isVertical")){n=I.call(this);n=n<l.MIN_WIDTH?l.MIN_WIDTH:n;this.setStyle("width",n+"px");this.addClass(k.VERTICAL);}else{this.addClass(k.HORIZONTAL);}this.fireEvent(E);if(this.get("numItems")<1){this._setContainerSize();}else{this.set("selectedItem",this.get("firstVisible"));}return true;},scrollBackward:function(){this.scrollTo(this._firstItem-this.get("scrollIncrement"));},scrollForward:function(){this.scrollTo(this._firstItem+this.get("scrollIncrement"));},scrollPageBackward:function(){this.scrollTo(this._firstItem-this.get("numVisible"));},scrollPageForward:function(){this.scrollTo(this._firstItem+this.get("numVisible"));},scrollTo:function(AA,l){var p,k,o,s=this.get("animation"),q=this.get("isCircular"),z,y,x=this._firstItem,n,v=this.get("numItems"),w=this.get("numVisible"),r,u=this.get("currentPage"),m,t;if(AA==x){return;}if(this._isAnimationInProgress){return;}if(AA<0){if(q){AA=v+AA;}else{return;}}else{if(v>0&&AA>v-1){if(this.get("isCircular")){AA=v-AA;}else{return;}}}y=(this._firstItem>AA)?"backward":"forward";t=x+w;t=(t>v-1)?v-1:t;m=this.fireEvent(c,{dir:y,first:x,last:t});if(m===false){return;}this.fireEvent(G,{page:u});z=x-AA;this._firstItem=AA;this.set("firstVisible",AA);W.call(this);t=AA+w;t=(t>v-1)?v-1:t;r=d.call(this,z);k=s.speed>0;if(k){this._isAnimationInProgress=true;if(this.get("isVertical")){o={points:{by:[0,r]}};}else{o={points:{by:[r,0]}};}p=new YAHOO.util.Motion(this._carouselEl,o,s.speed,s.effect);p.onComplete.subscribe(function(AB){var AC=this.get("firstVisible");this._isAnimationInProgress=false;this.fireEvent(D,{first:AC,last:t});},null,this);p.animate();p=null;}else{this._setCarouselOffset(r);}n=parseInt(this._firstItem/w,10);if(n!=u){this.setAttributeConfig("currentPage",{value:n});this.fireEvent(a,n);}if(!l){if(this.get("selectOnScroll")){if(AA!=this._selectedItem){this.set("selectedItem",this._getSelectedItem(AA));}}}delete this._autoPlayTimer;if(this.get("autoPlay")>0){this.startAutoPlay();}if(!k){this.fireEvent(D,{first:AA,last:t});}},show:function(){var k=this.CLASSES;if(this.fireEvent(R)!==false){this.addClass(k.VISIBLE);this.fireEvent(O);}},startAutoPlay:function(){var k=this,l=this.get("autoPlay");if(l>0){if(!i.isUndefined(this._autoPlayTimer)){return;}this.fireEvent(S);this._autoPlayTimer=setTimeout(function(){T.call(k);},l);}},stopAutoPlay:function(){if(!i.isUndefined(this._autoPlayTimer)){clearTimeout(this._autoPlayTimer);delete this._autoPlayTimer;this.set("autoPlay",0);this.fireEvent(j);}},toString:function(){return J+(this.get?" (#"+this.get("id")+")":"");},_createCarousel:function(l){var k=this.CLASSES,m=Z.get(l);if(!m){m=P("DIV",{className:k.CAROUSEL,id:l});}if(!this._carouselEl){this._carouselEl=P(this.get("carouselEl"),{className:k.CAROUSEL_EL});}return m;},_createCarouselClip:function(){var k=P("DIV",{className:this.CLASSES.CONTENT});this._setClipContainerSize(k);return k;},_createCarouselItem:function(k){return P(this.get("carouselItemEl"),{className:k.className,content:k.content,id:k.id});},_getSelectedItem:function(n){var k=this.get("isCircular"),m=this.get("numItems"),l=m-1;if(n<0){if(k){n=m+n;}else{n=this.get("selectedItem");}}else{if(n>l){if(k){n=n-m;}else{n=this.get("selectedItem");}}}return n;},_itemClickHandler:function(n){var k=this.get("element"),l,m,o=YAHOO.util.Event.getTarget(n);while(o&&o!=k&&o.id!=this._carouselEl){l=o.nodeName;if(l.toUpperCase()==this.get("carouselItemEl")){break;}o=o.parentNode;}if((m=this.getItemPositionById(o.id))>=0){this.set("selectedItem",this._getSelectedItem(m));}},_keyboardEventHandler:function(n){var m=X.getCharCode(n),l=false,k=0,o;if(this._isAnimationInProgress){return;}switch(m){case 37:case 38:o=this.get("selectedItem");if(o==this._firstItem){k=o-this.get("numVisible");this.scrollTo(k);this.set("selectedItem",this._getSelectedItem(o-1));}else{k=this.get("selectedItem")-this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(k));}l=true;break;case 39:case 40:k=this.get("selectedItem")+this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(k));l=true;break;case 33:this.scrollPageBackward();l=true;break;case 34:this.scrollPageForward();l=true;break;}if(l){X.preventDefault(n);}},_pagerClickHandler:function(k){var n,l,m;l=X.getTarget(k);m=l.href||l.value;if(i.isString(m)&&m){n=m.lastIndexOf("#");if(n!=-1){m=this.getItemPositionById(m.substring(n+1));this.scrollTo(m);X.preventDefault(k);}}},_parseCarousel:function(m){var p,k,l,o,n;k=this.CLASSES;l=this.get("carouselEl");o=false;for(p=m.firstChild;p;p=p.nextSibling){if(p.nodeType==1){n=p.nodeName;if(n.toUpperCase()==l){this._carouselEl=p;Z.addClass(this._carouselEl,this.CLASSES.CAROUSEL_EL);o=true;}}}return o;},_parseCarouselItems:function(){var o,k,l,n,m=this._carouselEl;k=this.get("carouselItemEl");for(o=m.firstChild;o;o=o.nextSibling){if(o.nodeType==1){n=o.nodeName;if(n.toUpperCase()==k){if(o.id){l=o.id;}else{l=Z.generateId();o.setAttribute("id",l);}this.addItem(o);}}}},_parseCarouselNavigation:function(p){var l,k=this.CLASSES,o,n,m,q,r=false;q=Z.getElementsByClassName(k.PREV_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){this._navBtns.prev.push(o);}else{m=o.getElementsByTagName("INPUT");if(i.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(i.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}}}}}l={prev:q};}q=Z.getElementsByClassName(k.NEXT_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){this._navBtns.next.push(o);}else{m=o.getElementsByTagName("INPUT");if(i.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(i.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}}}}}if(l){l.next=q;}else{l={next:q};}}if(l){this.set("navigation",l);r=true;}return r;},_setCarouselOffset:function(l){var k;k=this.get("isVertical")?"top":"left";l+=l!==0?Y(this._carouselEl,k):0;Z.setStyle(this._carouselEl,k,l+"px");
},_setupCarouselNavigation:function(){var n,l,k,r,o,q,p,m;k=this.CLASSES;o=Z.getElementsByClassName(k.NAVIGATION,"DIV",this.get("element"));if(o.length===0){o=P("DIV",{className:k.NAVIGATION});this.insertBefore(o,Z.getFirstChild(this.get("element")));}else{o=o[0];}this._pages.el=P("UL");o.appendChild(this._pages.el);r=this.get("navigation");if(i.isString(r.prev)||i.isArray(r.prev)){if(i.isString(r.prev)){r.prev=[r.prev];}for(n in r.prev){if(r.prev.hasOwnProperty(n)){this._navBtns.prev.push(Z.get(r.prev[n]));}}}else{m=P("SPAN",{className:k.BUTTON+k.FIRST_NAV});Z.setStyle(m,"visibility","visible");n=Z.generateId();m.innerHTML='<input type="button" '+'id="'+n+'" '+'value="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'" '+'name="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'">';o.appendChild(m);n=Z.get(n);this._navBtns.prev=[n];l={prev:[m]};}if(i.isString(r.next)||i.isArray(r.next)){if(i.isString(r.next)){r.next=[r.next];}for(n in r.next){if(r.next.hasOwnProperty(n)){this._navBtns.next.push(Z.get(r.next[n]));}}}else{q=P("SPAN",{className:k.BUTTON});Z.setStyle(q,"visibility","visible");n=Z.generateId();q.innerHTML='<input type="button" '+'id="'+n+'" '+'value="'+this.STRINGS.NEXT_BUTTON_TEXT+'" '+'name="'+this.STRINGS.NEXT_BUTTON_TEXT+'">';o.appendChild(q);n=Z.get(n);this._navBtns.next=[n];if(l){l.next=[q];}else{l={next:[q]};}}if(l){this.set("navigation",l);}return o;},_setClipContainerSize:function(l,n){var o,k,p,q,r,s,m;p=this.get("isVertical");r=this.get("revealAmount");m=p?"height":"width";o=p?"top":"left";l=l||this._clipEl;if(!l){return;}n=n||this.get("numVisible");q=I.call(this,m);s=q*n;this._recomputeSize=(s===0);if(this._recomputeSize){return;}if(r>0){r=q*(r/100)*2;s+=r;k=parseFloat(Z.getStyle(this._carouselEl,o));k=i.isNumber(k)?k:0;Z.setStyle(this._carouselEl,o,k+(r/2)+"px");}if(p){s+=Y(this._carouselEl,"marginTop")+Y(this._carouselEl,"marginBottom")+Y(this._carouselEl,"paddingTop")+Y(this._carouselEl,"paddingBottom")+Y(this._carouselEl,"borderTopWidth")+Y(this._carouselEl,"borderBottomWidth");Z.setStyle(l,m,(s-(n-1))+"px");}else{s+=Y(this._carouselEl,"marginLeft")+Y(this._carouselEl,"marginRight")+Y(this._carouselEl,"paddingLeft")+Y(this._carouselEl,"paddingRight")+Y(this._carouselEl,"borderLeftWidth")+Y(this._carouselEl,"borderRightWidth");Z.setStyle(l,m,s+"px");}this._setContainerSize(l);},_setContainerSize:function(m,k){var n,l;n=this.get("isVertical");m=m||this._clipEl;k=k||(n?"height":"width");l=parseFloat(Z.getStyle(m,k),10);l=i.isNumber(l)?l:0;l+=Y(m,"marginLeft")+Y(m,"marginRight")+Y(m,"paddingLeft")+Y(m,"paddingRight")+Y(m,"borderLeftWidth")+Y(m,"borderRightWidth");if(n){l+=Y(this._navEl,"height");}this.setStyle(k,l+"px");},_setFirstVisible:function(k){if(k>=0&&k<this.get("numItems")){this.scrollTo(k);}else{k=this.get("firstVisible");}return k;},_setNavigation:function(k){if(k.prev){X.on(k.prev,"click",b,this);}if(k.next){X.on(k.next,"click",e,this);}},_setNumVisible:function(k){this._setClipContainerSize(this._clipEl,k);},_setNumItems:function(l){var k=this._itemsTable.numItems;if(i.isArray(this._itemsTable.items)){if(this._itemsTable.items.length!=k){k=this._itemsTable.items.length;this._itemsTable.numItems=k;}}if(l<k){while(k>l){this.removeItem(k-1);k--;}}return l;},_setOrientation:function(l){var k=this.CLASSES;if(l){this.replaceClass(k.HORIZONTAL,k.VERTICAL);}else{this.replaceClass(k.VERTICAL,k.HORIZONTAL);}this._itemsTable.size=0;return l;},_setRevealAmount:function(k){if(k>=0&&k<=100){k=parseInt(k,10);k=i.isNumber(k)?k:0;this._setClipContainerSize();}else{k=this.get("revealAmount");}return k;},_setSelectedItem:function(k){this._selectedItem=k;},_syncUiForItemAdd:function(q){var m=this._carouselEl,o,p,k=this._itemsTable,l,r,n;r=i.isUndefined(q.pos)?k.numItems-1:q.pos;if(!i.isUndefined(k.items[r])){p=k.items[r];if(p&&!i.isUndefined(p.id)){l=Z.get(p.id);}}if(!l){o=this._createCarouselItem({className:p.className,content:p.item,id:p.id});if(i.isUndefined(q.pos)){if(!i.isUndefined(k.loading[r])){l=k.loading[r];}if(l){m.replaceChild(o,l);delete k.loading[r];}else{m.appendChild(o);}}else{if(!i.isUndefined(k.items[q.pos+1])){n=Z.get(k.items[q.pos+1].id);}if(n){m.insertBefore(o,n);}else{}}}else{if(i.isUndefined(q.pos)){if(!Z.isAncestor(this._carouselEl,l)){m.appendChild(l);}}else{if(!Z.isAncestor(m,l)){if(!i.isUndefined(k.items[q.pos+1])){m.insertBefore(l,Z.get(k.items[q.pos+1].id));}}}}if(this._recomputeSize){this._setClipContainerSize();}if(this.get("selectedItem")<0){this.set("selectedItem",this.get("firstVisible"));}},_syncUiForItemRemove:function(o){var k=this._carouselEl,m,n,l,p;l=this.get("numItems");n=o.item;p=o.pos;if(n&&(m=Z.get(n.id))){if(m&&Z.isAncestor(k,m)){X.purgeElement(m,true);k.removeChild(m);}if(this.get("selectedItem")==p){p=p>=l?l-1:p;this.set("selectedItem",p);}}else{}},_syncUiForLazyLoading:function(p){var l=this._carouselEl,o,m,k=this._itemsTable,n;for(m=p.first;m<=p.last;m++){o=this._createCarouselItem({content:this.CONFIG.ITEM_LOADING,id:Z.generateId()});if(o){if(!i.isUndefined(k.items[p.last+1])){n=Z.get(k.items[p.last+1].id);if(n){l.insertBefore(o,n);}else{}}else{l.appendChild(o);}}k.loading[m]=o;}},_syncPagerUi:function(q){var l,k=this.CLASSES,o,n="",m,p=this.get("numVisible");if(!i.isNumber(q)){q=Math.ceil(this.get("selectedItem")/p);}m=Math.ceil(this.get("numItems")/p);this._pages.num=m;this._pages.cur=q;if(m>this.CONFIG.MAX_PAGER_BUTTONS){n="<form><select>";}else{n="";}for(o=0;o<m;o++){if(i.isUndefined(this._itemsTable.items[o*p])){break;}l=this._itemsTable.items[o*p].id;if(m>this.CONFIG.MAX_PAGER_BUTTONS){n+='<option value="#'+l+'" '+(o==q?" selected":"")+">"+this.STRINGS.PAGER_PREFIX_TEXT+" "+(o+1)+"</option>";}else{n+='<li class="'+(o===0?k.FIRST_PAGE:"")+(o==q?" "+k.SELECTED_NAV:"")+'"><a href="#'+l+'" tabindex="0"><em>'+this.STRINGS.PAGER_PREFIX_TEXT+" "+(o+1)+"</em></a></li>";}}if(m>this.CONFIG.MAX_PAGER_BUTTONS){n+="</select></form>";}if(this._pages.el){this._pages.el.innerHTML=n;}n=null;},_updateNavButtons:function(o,l){var m,k=this.CLASSES,p,n=o.parentNode;
if(!n){return;}p=n.parentNode;if(o.nodeName.toUpperCase()=="INPUT"&&Z.hasClass(n,k.BUTTON)){if(l){if(p){m=Z.getChildren(p);if(m){Z.removeClass(m,k.FOCUSSED_BUTTON);}}Z.addClass(n,k.FOCUSSED_BUTTON);}else{Z.removeClass(n,k.FOCUSSED_BUTTON);}}},_updateTabIndex:function(k){if(k){if(this._focusableItemEl){this._focusableItemEl.tabIndex=-1;}this._focusableItemEl=k;k.tabIndex=0;}},_validateAnimation:function(k){var l=true;if(i.isObject(k)){if(k.speed){l=l&&i.isNumber(k.speed);}if(k.effect){l=l&&i.isFunction(k.effect);}else{if(!i.isUndefined(YAHOO.util.Easing)){k.effect=YAHOO.util.Easing.easeOut;}}}else{l=false;}return l;},_validateFirstVisible:function(l){var k=this.get("numItems"),m=false;if(i.isNumber(l)){if(k===0&&l==k){return true;}else{return(l>=0&&l<this.get("numItems"));}}return false;},_validateNavigation:function(k){var l;if(!i.isObject(k)){return false;}if(k.prev){if(!i.isArray(k.prev)){return false;}for(l in k.prev){if(k.prev.hasOwnProperty(l)){if(!i.isString(k.prev[l].nodeName)){return false;}}}}if(k.next){if(!i.isArray(k.next)){return false;}for(l in k.next){if(k.next.hasOwnProperty(l)){if(!i.isString(k.next[l].nodeName)){return false;}}}}return true;},_validateNumItems:function(k){return i.isNumber(k)&&(k>=0);},_validateNumVisible:function(k){var l=false;if(i.isNumber(k)){l=k>0&&k<=this.get("numItems");}return l;},_validateRevealAmount:function(k){var l=false;if(i.isNumber(k)){l=k>=0&&k<100;}return l;},_validateScrollIncrement:function(k){var l=false;if(i.isNumber(k)){l=(k>0&&k<this.get("numItems"));}return l;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});