YAHOO.util.Get=function(){var F={},I={},H=0,B=0,N=false,A=YAHOO.env.ua,C=YAHOO.lang;var O=function(S,P,T){var Q=T||window,U=Q.document,V=U.createElement(S);for(var R in P){if(P[R]&&YAHOO.lang.hasOwnProperty(P,R)){V.setAttribute(R,P[R]);}}return V;};var M=function(P,Q){return O("link",{"id":"yui__dyn_"+(B++),"type":"text/css","rel":"stylesheet","href":P},Q);};var L=function(P,Q){return O("script",{"id":"yui__dyn_"+(B++),"type":"text/javascript","src":P},Q);};var E=function(S){var P=I[S],R;I[S].finished=true;if(P.aborted){return ;}if(P.onsuccess){R={tId:P.tId,win:P.win,data:P.data,nodes:P.nodes,purge:J};var Q=P.scope||P.win;P.onsuccess.call(Q,R);}};var D=function(R,U){var Q=I[R];if(Q.aborted){return ;}if(U){Q.url.shift();}else{Q.url=(C.isString(Q.url))?[Q.url]:Q.url;}if(Q.url.length===0){if(Q.type==="script"&&A.webkit&&!Q.finalpass){Q.finalpass=true;var T=L(null,Q.win);G(Q.type,T,R,"safari_extra",Q.win,1);}else{E(R);}return ;}var X=Q.win,W=X.document,V=W.getElementsByTagName("head")[0],S;var P=Q.url[0];if(Q.type==="script"){S=L(P,X);}else{S=M(P,X);}G(Q.type,S,R,P,X,Q.url.length);Q.nodes.push(S);V.appendChild(S);if(A.gecko&&Q.type==="css"){D(R,P);}};var J=function(){if(N){return ;}N=true;for(var R in I){var T=I[R];if(T.autopurge&&T.finished){var V=T.nodes,P=V.length,U=T.win.document,S=U.getElementsByTagName("head")[0];for(var Q=0;Q<P;Q=Q+1){S.removeChild(V[Q]);}delete I[R];}}N=false;};var K=function(Q,P,R){var T="q"+(H++);R=R||{};if(H%YAHOO.util.Get.PURGE_THRESH===0){J();}var S=R.win||window;I[T]={tId:T,type:Q,url:P,onsuccess:R.onsuccess,onfail:R.onfail,data:R.data,opts:R,win:S,scope:R.scope||S,finished:false,nodes:[]};C.later(0,I[T],D,T);return{tId:T};};var G=function(R,W,V,Q,U,T,P){var S=P||D;if(A.ie){W.onreadystatechange=function(){var X=this.readyState;if("loaded"===X||"complete"===X){S(V,Q);}};}else{if(A.webkit){F[V]=setInterval(function(){var X=U.document.readyState;if("loaded"===X||"complete"===X){clearInterval(F[V]);F[V]=null;S(V,Q);}},YAHOO.util.Get.POLL_FREQ);}else{W.onload=function(){S(V,Q);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,abort:function(Q){var R=(C.isString(Q))?Q:Q.tId;var P=I[R];if(P){P.aborted=true;}},script:function(P,Q){return K("script",P,Q);},css:function(P,Q){return K("css",P,Q);},createNode:function(Q,P,R){return O(Q,P,R);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"@VERSION@",build:"@BUILD@"});