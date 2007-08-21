YAHOO.widget.AutoComplete=function(r,t,O,Q){if(r&&t&&O){if(O instanceof YAHOO.widget.DataSource){this.dataSource=O;}else{return ;}if(YAHOO.util.Dom.inDocument(r)){if(YAHOO.lang.isString(r)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+r;this._oTextbox=document.getElementById(r);}else{this._sName=(r.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+r.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._oTextbox=r;}YAHOO.util.Dom.addClass(this._oTextbox,"yui-ac-input");}else{return ;}if(YAHOO.util.Dom.inDocument(t)){if(YAHOO.lang.isString(t)){this._oContainer=document.getElementById(t);}else{this._oContainer=t;}if(this._oContainer.style.display=="none"){}var y=this._oContainer.parentNode;var i=y.tagName.toLowerCase();while(y&&(y!="document")){if(i=="div"){YAHOO.util.Dom.addClass(y,"yui-ac");break;}else{y=y.parentNode;i=y.tagName.toLowerCase();}}if(i!="div"){}}else{return ;}if(Q&&(Q.constructor==Object)){for(var x in Q){if(x){this[x]=Q[x];}}}this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var H=this;var B=this._oTextbox;var Z=this._oContainer._oContent;YAHOO.util.Event.addListener(B,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(B,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(B,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(B,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(Z,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(Z,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(Z,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(Z,"resize",H._onContainerResize,H);if(B.form){YAHOO.util.Event.addListener(B.form,"submit",H._onFormSubmit,H);}YAHOO.util.Event.addListener(B,"keypress",H._onTextboxKeyPress,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);B.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return "AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(i){if(i._oResultData){return i._oResultData;}else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(i){if(i){if(this._oContainer._oContent._oHeader){this._oContainer._oContent._oHeader.innerHTML=i;this._oContainer._oContent._oHeader.style.display="block";}}else{this._oContainer._oContent._oHeader.innerHTML="";this._oContainer._oContent._oHeader.style.display="none";}};YAHOO.widget.AutoComplete.prototype.setFooter=function(i){if(i){if(this._oContainer._oContent._oFooter){this._oContainer._oContent._oFooter.innerHTML=i;this._oContainer._oContent._oFooter.style.display="block";}}else{this._oContainer._oContent._oFooter.innerHTML="";this._oContainer._oContent._oFooter.style.display="none";}};YAHOO.widget.AutoComplete.prototype.setBody=function(i){if(i){if(this._oContainer._oContent._oBody){this._oContainer._oContent._oBody.innerHTML=i;this._oContainer._oContent._oBody.style.display="block";this._oContainer._oContent.style.display="block";}}else{this._oContainer._oContent._oBody.innerHTML="";this._oContainer._oContent.style.display="none";}this._maxResultsDisplayed=0;};YAHOO.widget.AutoComplete.prototype.formatResult=function(t,Z){var i=t[0];if(i){return i;}else{return "";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(i,t,Q,Z){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(i){this._sendQuery(i);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(i){return i;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var t=this.toString();var i=this._oTextbox;var Q=this._oContainer;this.textboxFocusEvent.unsubscribe();this.textboxKeyEvent.unsubscribe();this.dataRequestEvent.unsubscribe();this.dataReturnEvent.unsubscribe();this.dataErrorEvent.unsubscribe();this.containerExpandEvent.unsubscribe();this.typeAheadEvent.unsubscribe();this.itemMouseOverEvent.unsubscribe();this.itemMouseOutEvent.unsubscribe();this.itemArrowToEvent.unsubscribe();this.itemArrowFromEvent.unsubscribe();this.itemSelectEvent.unsubscribe();this.unmatchedItemSelectEvent.unsubscribe();this.selectionEnforceEvent.unsubscribe();this.containerCollapseEvent.unsubscribe();this.textboxBlurEvent.unsubscribe();YAHOO.util.Event.purgeElement(i,true);YAHOO.util.Event.purgeElement(Q,true);Q.innerHTML="";for(var Z in this){if(YAHOO.lang.hasOwnProperty(this,Z)){this[Z]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._oTextbox=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._oContainer=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var t=this.minQueryLength;if(!YAHOO.lang.isNumber(t)){this.minQueryLength=1;}var Q=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(Q)||(Q<1)){this.maxResultsDisplayed=10;}var y=this.queryDelay;if(!YAHOO.lang.isNumber(y)||(y<0)){this.queryDelay=0.2;}var i=this.delimChar;if(YAHOO.lang.isString(i)){this.delimChar=[i];}else{if(!YAHOO.lang.isArray(i)){this.delimChar=null;}}var Z=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(Z)||(Z<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._oContainer._oContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&i){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._oContainer._oShadow){var t=document.createElement("div");t.className="yui-ac-shadow";this._oContainer._oShadow=this._oContainer.appendChild(t);}if(this.useIFrame&&!this._oContainer._oIFrame){var i=document.createElement("iframe");i.src=this._iFrameSrc;i.frameBorder=0;i.scrolling="no";i.style.position="absolute";i.style.width="100%";i.style.height="100%";i.tabIndex=-1;this._oContainer._oIFrame=this._oContainer.appendChild(i);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._oContainer,"yui-ac-container");if(!this._oContainer._oContent){var Q=document.createElement("div");Q.className="yui-ac-content";Q.style.display="none";this._oContainer._oContent=this._oContainer.appendChild(Q);var t=document.createElement("div");t.className="yui-ac-hd";t.style.display="none";this._oContainer._oContent._oHeader=this._oContainer._oContent.appendChild(t);var Z=document.createElement("div");Z.className="yui-ac-bd";this._oContainer._oContent._oBody=this._oContainer._oContent.appendChild(Z);var i=document.createElement("div");i.className="yui-ac-ft";i.style.display="none";this._oContainer._oContent._oFooter=this._oContainer._oContent.appendChild(i);}else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._oContainer._oContent._oBody.hasChildNodes()){var Z=this.getListItems();if(Z){for(var t=Z.length-1;t>=0;t--){Z[t]=null;}}this._oContainer._oContent._oBody.innerHTML="";}var B=document.createElement("ul");B=this._oContainer._oContent._oBody.appendChild(B);for(var Q=0;Q<this.maxResultsDisplayed;Q++){var y=document.createElement("li");y=B.appendChild(y);this._aListItems[Q]=y;this._initListItem(y,Q);}this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(Z,t){var i=this;Z.style.display="none";Z._nItemIndex=t;Z.mouseover=Z.mouseout=Z.onclick=null;YAHOO.util.Event.addListener(Z,"mouseover",i._onItemMouseover,i);YAHOO.util.Event.addListener(Z,"mouseout",i._onItemMouseout,i);YAHOO.util.Event.addListener(Z,"click",i._onItemMouseclick,i);};YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(i){i._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var i=this._oTextbox.value;var t=this._sLastTextboxValue;if(i!=t){this._sLastTextboxValue=i;this._sendQuery(i);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(i){if(i._queryInterval){clearInterval(i._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(i){if((i==9)||(i==13)||(i==16)||(i==17)||(i>=18&&i<=20)||(i==27)||(i>=33&&i<=35)||(i>=36&&i<=40)||(i>=44&&i<=45)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(H){if(this.minQueryLength==-1){this._toggleContainer(false);return ;}var Q=(this.delimChar)?this.delimChar:null;if(Q){var B=-1;for(var Z=Q.length-1;Z>=0;Z--){var r=H.lastIndexOf(Q[Z]);if(r>B){B=r;}}if(Q[Z]==" "){for(var t=Q.length-1;t>=0;t--){if(H[B-1]==Q[t]){B--;break;}}}if(B>-1){var y=B+1;while(H.charAt(y)==" "){y+=1;}this._sSavedQuery=H.substring(0,y);H=H.substr(y);}else{if(H.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}}if((H&&(H.length<this.minQueryLength))||(!H&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return ;}H=encodeURIComponent(H);this._nDelayID=-1;H=this.doBeforeSendQuery(H);this.dataRequestEvent.fire(this,H);this.dataSource.getResults(this._populateList,H,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(X,F,O){if(F===null){O.dataErrorEvent.fire(O,X);}if(!O._bFocused||!F){return ;}var t=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var L=O._oContainer._oContent.style;L.width=(!t)?null:"";L.height=(!t)?null:"";var x=decodeURIComponent(X);O._sCurQuery=x;O._bItemSelected=false;if(O._maxResultsDisplayed!=O.maxResultsDisplayed){O._initList();}var Q=Math.min(F.length,O.maxResultsDisplayed);O._nDisplayedItems=Q;if(Q>0){O._initContainerHelpers();var y=O._aListItems;for(var H=Q-1;H>=0;H--){var s=y[H];var Z=F[H];s.innerHTML=O.formatResult(Z,x);s.style.display="list-item";s._sResultKey=Z[0];s._oResultData=Z;}for(var r=y.length-1;r>=Q;r--){var D=y[r];D.innerHTML=null;D.style.display="none";D._sResultKey=null;D._oResultData=null;}var z=O.doBeforeExpandContainer(O._oTextbox,O._oContainer,X,F);O._toggleContainer(z);if(O.autoHighlight){var B=y[0];O._toggleHighlight(B,"to");O.itemArrowToEvent.fire(O,B);O._typeAhead(B,X);}else{O._oCurItem=null;}}else{O._toggleContainer(false);}O.dataReturnEvent.fire(O,X,F);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var Z=this._oTextbox.value;var t=(this.delimChar)?this.delimChar[0]:null;var i=(t)?Z.lastIndexOf(t,Z.length-2):-1;if(i>-1){this._oTextbox.value=Z.substring(0,i);}else{this._oTextbox.value="";}this._sSavedQuery=this._oTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var y=null;for(var t=this._nDisplayedItems-1;t>=0;t--){var Q=this._aListItems[t];var Z=Q._sResultKey.toLowerCase();if(Z==this._sCurQuery.toLowerCase()){y=Q;break;}}return (y);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(y,r){if(!this.typeAhead||(this._nKeyCode==8)){return ;}var t=this._oTextbox;var B=this._oTextbox.value;if(!t.setSelectionRange&&!t.createTextRange){return ;}var Z=B.length;this._updateValue(y);var Q=t.value.length;this._selectText(t,Z,Q);var i=t.value.substr(Z,Q);this.typeAheadEvent.fire(this,r,i);};YAHOO.widget.AutoComplete.prototype._selectText=function(i,t,Z){if(i.setSelectionRange){i.setSelectionRange(t,Z);}else{if(i.createTextRange){var Q=i.createTextRange();Q.moveStart("character",t);Q.moveEnd("character",Z-i.value.length);Q.select();}else{i.select();}}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(t){var Q=false;var Z=this._oContainer._oContent.offsetWidth+"px";var i=this._oContainer._oContent.offsetHeight+"px";if(this.useIFrame&&this._oContainer._oIFrame){Q=true;if(t){this._oContainer._oIFrame.style.width=Z;this._oContainer._oIFrame.style.height=i;}else{this._oContainer._oIFrame.style.width=0;this._oContainer._oIFrame.style.height=0;}}if(this.useShadow&&this._oContainer._oShadow){Q=true;if(t){this._oContainer._oShadow.style.width=Z;this._oContainer._oShadow.style.height=i;}else{this._oContainer._oShadow.style.width=0;this._oContainer._oShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(z){var F=this._oContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return ;}if(!z){this._oContainer._oContent.scrollTop=0;var Q=this._aListItems;if(Q&&(Q.length>0)){for(var H=Q.length-1;H>=0;H--){Q[H].style.display="none";}}if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}if(!z&&!this._bContainerOpen){F._oContent.style.display="none";return ;}var Z=this._oAnim;if(Z&&Z.getEl()&&(this.animHoriz||this.animVert)){if(!z){this._toggleContainerHelpers(z);}if(Z.isAnimated()){Z.stop();}var x=F._oContent.cloneNode(true);F.appendChild(x);x.style.top="-9000px";x.style.display="block";var r=x.offsetWidth;var y=x.offsetHeight;var t=(this.animHoriz)?0:r;var B=(this.animVert)?0:y;Z.attributes=(z)?{width:{to:r},height:{to:y}}:{width:{to:t},height:{to:B}};if(z&&!this._bContainerOpen){F._oContent.style.width=t+"px";F._oContent.style.height=B+"px";}else{F._oContent.style.width=r+"px";F._oContent.style.height=y+"px";}F.removeChild(x);x=null;var O=this;var X=function(){Z.onComplete.unsubscribeAll();if(z){O.containerExpandEvent.fire(O);}else{F._oContent.style.display="none";O.containerCollapseEvent.fire(O);}O._toggleContainerHelpers(z);};F._oContent.style.display="block";Z.onComplete.subscribe(X);Z.animate();this._bContainerOpen=z;}else{if(z){F._oContent.style.display="block";this.containerExpandEvent.fire(this);}else{F._oContent.style.display="none";this.containerCollapseEvent.fire(this);}this._toggleContainerHelpers(z);this._bContainerOpen=z;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(i,Z){var t=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,t);}if((Z=="to")&&t){YAHOO.util.Dom.addClass(i,t);this._oCurItem=i;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(i,Z){if(i==this._oCurItem){return ;}var t=this.prehighlightClassName;if((Z=="mouseover")&&t){YAHOO.util.Dom.addClass(i,t);}else{YAHOO.util.Dom.removeClass(i,t);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(B){var Z=this._oTextbox;var y=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var t=this._sSavedQuery;var Q=B._sResultKey;Z.focus();Z.value="";if(y){if(t){Z.value=t;}Z.value+=Q+y;if(y!=" "){Z.value+=" ";}}else{Z.value=Q;}if(Z.type=="textarea"){Z.scrollTop=Z.scrollHeight;}var i=Z.value.length;this._selectText(Z,i,i);this._oCurItem=B;};YAHOO.widget.AutoComplete.prototype._selectItem=function(i){this._bItemSelected=true;this._updateValue(i);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,i,i._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(r){if(this._bContainerOpen){var Q=this._oCurItem;var B=-1;if(Q){B=Q._nItemIndex;}var Z=(r==40)?(B+1):(B-1);if(Z<-2||Z>=this._nDisplayedItems){return ;}if(Q){this._toggleHighlight(Q,"from");this.itemArrowFromEvent.fire(this,Q);}if(Z==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._oTextbox.value=this._sSavedQuery;}else{this._oTextbox.value=this._sSavedQuery+this._sCurQuery;}}else{this._oTextbox.value=this._sCurQuery;}this._oCurItem=null;return ;}if(Z==-2){this._toggleContainer(false);return ;}var t=this._aListItems[Z];var y=this._oContainer._oContent;var i=((YAHOO.util.Dom.getStyle(y,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(y,"overflowY")=="auto"));if(i&&(Z>-1)&&(Z<this._nDisplayedItems)){if(r==40){if((t.offsetTop+t.offsetHeight)>(y.scrollTop+y.offsetHeight)){y.scrollTop=(t.offsetTop+t.offsetHeight)-y.offsetHeight;}else{if((t.offsetTop+t.offsetHeight)<y.scrollTop){y.scrollTop=t.offsetTop;}}}else{if(t.offsetTop<y.scrollTop){this._oContainer._oContent.scrollTop=t.offsetTop;}else{if(t.offsetTop>(y.scrollTop+y.offsetHeight)){this._oContainer._oContent.scrollTop=(t.offsetTop+t.offsetHeight)-y.offsetHeight;}}}}this._toggleHighlight(t,"to");this.itemArrowToEvent.fire(this,t);if(this.typeAhead){this._updateValue(t);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(i,t){if(t.prehighlightClassName){t._togglePrehighlight(this,"mouseover");}else{t._toggleHighlight(this,"to");}t.itemMouseOverEvent.fire(t,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(i,t){if(t.prehighlightClassName){t._togglePrehighlight(this,"mouseout");}else{t._toggleHighlight(this,"from");}t.itemMouseOutEvent.fire(t,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(i,t){t._toggleHighlight(this,"to");t._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(i,t){t._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(i,t){t._bOverContainer=false;if(t._oCurItem){t._toggleHighlight(t._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(i,t){t._oTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(i,t){t._toggleContainerHelpers(t._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(i,t){var Z=i.keyCode;switch(Z){case 9:if(t._oCurItem){if(t.delimChar&&(t._nKeyCode!=Z)){if(t._bContainerOpen){YAHOO.util.Event.stopEvent(i);}}t._selectItem(t._oCurItem);}else{t._toggleContainer(false);}break;case 13:if(t._oCurItem){if(t._nKeyCode!=Z){if(t._bContainerOpen){YAHOO.util.Event.stopEvent(i);}}t._selectItem(t._oCurItem);}else{t._toggleContainer(false);}break;case 27:t._toggleContainer(false);return ;case 39:t._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(i);t._moveSelection(Z);break;case 40:YAHOO.util.Event.stopEvent(i);t._moveSelection(Z);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(i,Z){var Q=i.keyCode;var t=(navigator.userAgent.toLowerCase().indexOf("mac")!=-1);if(t){switch(Q){case 9:if(Z.delimChar&&(Z._nKeyCode!=Q)){YAHOO.util.Event.stopEvent(i);}break;case 13:if(Z._nKeyCode!=Q){YAHOO.util.Event.stopEvent(i);}break;case 38:case 40:YAHOO.util.Event.stopEvent(i);break;default:break;}}else{if(Q==229){Z._queryInterval=setInterval(function(){Z._onIMEDetected(Z);},500);}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(t,Q){Q._initProps();var y=t.keyCode;Q._nKeyCode=y;var Z=this.value;if(Q._isIgnoreKey(y)||(Z.toLowerCase()==Q._sCurQuery)){return ;}else{Q._bItemSelected=false;YAHOO.util.Dom.removeClass(Q._oCurItem,Q.highlightClassName);Q._oCurItem=null;Q.textboxKeyEvent.fire(Q,y);}if(Q.queryDelay>0){var i=setTimeout(function(){Q._sendQuery(Z);},(Q.queryDelay*1000));if(Q._nDelayID!=-1){clearTimeout(Q._nDelayID);}Q._nDelayID=i;}else{Q._sendQuery(Z);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(i,t){t._oTextbox.setAttribute("autocomplete","off");t._bFocused=true;if(!t._bItemSelected){t.textboxFocusEvent.fire(t);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(i,t){if(!t._bOverContainer||(t._nKeyCode==9)){if(!t._bItemSelected){var Z=t._textMatchesOption();if(!t._bContainerOpen||(t._bContainerOpen&&(Z===null))){if(t.forceSelection){t._clearSelection();}else{t.unmatchedItemSelectEvent.fire(t,t._sCurQuery);}}else{t._selectItem(Z);}}if(t._bContainerOpen){t._toggleContainer(false);}t._cancelIntervalDetection(t);t._bFocused=false;t.textboxBlurEvent.fire(t);}};YAHOO.widget.AutoComplete.prototype._onFormSubmit=function(i,t){if(t.allowBrowserAutocomplete){t._oTextbox.setAttribute("autocomplete","on");}else{t._oTextbox.setAttribute("autocomplete","off");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return "DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(i,Q,t){var Z=this._doQueryCache(i,Q,t);if(Z.length===0){this.queryEvent.fire(this,t,Q);this.doQuery(i,Q,t);}};YAHOO.widget.DataSource.prototype.doQuery=function(i,Z,t){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}if(this._aCacheHelper){this._aCacheHelper=[];}this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var i=this.maxCacheEntries;if(!YAHOO.lang.isNumber(i)||(i<0)){i=0;}if(i>0&&!this._aCache){this._aCache=[];}this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(t){var i=this._aCache;if(!i||!t||!t.query||!t.results){return ;}if(i.length>=this.maxCacheEntries){i.shift();}i.push(t);};YAHOO.widget.DataSource.prototype._doQueryCache=function(t,O,s){var x=[];var H=false;var z=this._aCache;var r=(z)?z.length:0;var X=this.queryMatchContains;var y;if((this.maxCacheEntries>0)&&z&&(r>0)){this.cacheQueryEvent.fire(this,s,O);if(!this.queryMatchCase){y=O;O=O.toLowerCase();}for(var J=r-1;J>=0;J--){var B=z[J];var Z=B.results;var Q=(!this.queryMatchCase)?encodeURIComponent(B.query).toLowerCase():encodeURIComponent(B.query);if(Q==O){H=true;x=Z;if(J!=r-1){z.splice(J,1);this._addCacheElem(B);}break;}else{if(this.queryMatchSubset){for(var L=O.length-1;L>=0;L--){var I=O.substr(0,L);if(Q==I){H=true;for(var D=Z.length-1;D>=0;D--){var m=Z[D];var F=(this.queryMatchCase)?encodeURIComponent(m[0]).indexOf(O):encodeURIComponent(m[0]).toLowerCase().indexOf(O);if((!X&&(F===0))||(X&&(F>-1))){x.unshift(m);}}B={};B.query=O;B.results=x;this._addCacheElem(B);break;}}if(H){break;}}}}if(H){this.getCachedResultsEvent.fire(this,s,y,x);t(y,x,s);}}return x;};YAHOO.widget.DS_XHR=function(Z,i,Q){if(Q&&(Q.constructor==Object)){for(var t in Q){this[t]=Q[t];}}if(!YAHOO.lang.isArray(i)||!YAHOO.lang.isString(Z)){return ;}this.schema=i;this.scriptURI=Z;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(y,r,t){var O=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var Q=this.scriptURI+"?"+this.scriptQueryParam+"="+r;if(this.scriptQueryAppend.length>0){Q+="&"+this.scriptQueryAppend;}var Z=null;var B=this;var x=function(z){if(!B._oConn||(z.tId!=B._oConn.tId)){B.dataErrorEvent.fire(B,t,r,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}for(var D in z){}if(!O){z=z.responseText;}else{z=z.responseXML;}if(z===null){B.dataErrorEvent.fire(B,t,r,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var F=B.parseResponse(r,z,t);var X={};X.query=decodeURIComponent(r);X.results=F;if(F===null){B.dataErrorEvent.fire(B,t,r,YAHOO.widget.DataSource.ERROR_DATAPARSE);F=[];}else{B.getResultsEvent.fire(B,t,r,F);B._addCacheElem(X);}y(r,F,t);};var i=function(z){B.dataErrorEvent.fire(B,t,r,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return ;};var H={success:x,failure:i};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){H.timeout=this.connTimeout;}if(this._oConn){this.connMgr.abort(this._oConn);}B._oConn=this.connMgr.asyncRequest("GET",Q,H,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;var isNotMac=(navigator.userAgent.toLowerCase().indexOf("khtml")==-1);if(oResponse.parseJSON&&isNotMac){jsonObjParsed=oResponse.parseJSON();if(!jsonObjParsed){bError=true;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(window.JSON&&isNotMac){jsonObjParsed=JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}if(oResponse.indexOf("{")<0){bError=true;break;}if(oResponse.indexOf("{}")===0){break;}var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}catch(e){bError=true;break;}}}if(!jsonList){bError=true;break;}if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}else{sValue="";}}aFieldSet.unshift(sValue);}aResults.unshift(aFieldSet);}break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){aResults[n]=aRecords[n].split(aSchema[1]);}}break;default:break;}sQuery=null;oResponse=null;oParent=null;if(bError){return null;}else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_JSFunction=function(i,Z){if(Z&&(Z.constructor==Object)){for(var t in Z){this[t]=Z[t];}}if(!YAHOO.lang.isFunction(i)){return ;}else{this.dataFunction=i;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(Z,B,Q){var t=this.dataFunction;var y=[];y=t(B);if(y===null){this.dataErrorEvent.fire(this,Q,B,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var i={};i.query=decodeURIComponent(B);i.results=y;this._addCacheElem(i);this.getResultsEvent.fire(this,Q,B,y);Z(B,y,Q);return ;};YAHOO.widget.DS_JSArray=function(i,Z){if(Z&&(Z.constructor==Object)){for(var t in Z){this[t]=Z[t];}}if(!YAHOO.lang.isArray(i)){return ;}else{this.data=i;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(B,O,t){var r;var Q=this.data;var z=[];var y=false;var Z=this.queryMatchContains;if(O){if(!this.queryMatchCase){O=O.toLowerCase();}for(r=Q.length-1;r>=0;r--){var x=[];if(YAHOO.lang.isString(Q[r])){x[0]=Q[r];}else{if(YAHOO.lang.isArray(Q[r])){x=Q[r];}}if(YAHOO.lang.isString(x[0])){var H=(this.queryMatchCase)?encodeURIComponent(x[0]).indexOf(O):encodeURIComponent(x[0]).toLowerCase().indexOf(O);if((!Z&&(H===0))||(Z&&(H>-1))){z.unshift(x);}}}}else{for(r=Q.length-1;r>=0;r--){if(YAHOO.lang.isString(Q[r])){z.unshift([Q[r]]);}else{if(YAHOO.lang.isArray(Q[r])){z.unshift(Q[r]);}}}}this.getResultsEvent.fire(this,t,O,z);B(O,z,t);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"@VERSION@",build:"@BUILD@"});