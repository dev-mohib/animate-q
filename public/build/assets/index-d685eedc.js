import{j as d,r as k,p as $e,g as Ve,q as Be,s as Ee,d as Ke,a as ze,W as Ye,y as Ze}from"./app-00c4ff73.js";import{p as xe}from"./index-387d7a00.js";const Qe=t=>d.jsxs("svg",{...t,stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",height:"1.4em",width:"1.4em",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{fill:"none",d:"M0 0h24v24H0z"}),d.jsx("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})]}),Xe=t=>d.jsx("svg",{...t,stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",height:"1.2em",width:"1.2em",xmlns:"http://www.w3.org/2000/svg",children:d.jsx("path",{d:"M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"})});var ie={exports:{}},U={},ue={exports:{}},R={},ce={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=y;/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */var o="none",r="contents",l=/input|select|textarea|button|object|iframe/;function f(p,m){return m.getPropertyValue("overflow")!=="visible"||p.scrollWidth<=0&&p.scrollHeight<=0}function h(p){var m=p.offsetWidth<=0&&p.offsetHeight<=0;if(m&&!p.innerHTML)return!0;try{var b=window.getComputedStyle(p),E=b.getPropertyValue("display");return m?E!==r&&f(p,b):E===o}catch{return console.warn("Failed to inspect element style"),!1}}function a(p){for(var m=p,b=p.getRootNode&&p.getRootNode();m&&m!==document.body;){if(b&&m===b&&(m=b.host.parentNode),h(m))return!1;m=m.parentNode}return!0}function O(p,m){var b=p.nodeName.toLowerCase(),E=l.test(b)&&!p.disabled||b==="a"&&p.href||m;return E&&a(p)}function v(p){var m=p.getAttribute("tabindex");m===null&&(m=void 0);var b=isNaN(m);return(b||m>=0)&&O(p,!b)}function y(p){var m=[].slice.call(p.querySelectorAll("*"),0).reduce(function(b,E){return b.concat(E.shadowRoot?y(E.shadowRoot):[E])},[]);return m.filter(v)}t.exports=e.default})(ce,ce.exports);var Se=ce.exports;Object.defineProperty(R,"__esModule",{value:!0});R.resetState=tt;R.log=nt;R.handleBlur=z;R.handleFocus=Y;R.markForFocusLater=ot;R.returnFocus=rt;R.popWithoutFocus=at;R.setupScopedFocus=lt;R.teardownScopedFocus=st;var Ge=Se,Je=et(Ge);function et(t){return t&&t.__esModule?t:{default:t}}var I=[],W=null,fe=!1;function tt(){I=[]}function nt(){}function z(){fe=!0}function Y(){if(fe){if(fe=!1,!W)return;setTimeout(function(){if(!W.contains(document.activeElement)){var t=(0,Je.default)(W)[0]||W;t.focus()}},0)}}function ot(){I.push(document.activeElement)}function rt(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=null;try{I.length!==0&&(e=I.pop(),e.focus({preventScroll:t}));return}catch{console.warn(["You tried to return focus to",e,"but it is not in the DOM anymore"].join(" "))}}function at(){I.length>0&&I.pop()}function lt(t){W=t,window.addEventListener?(window.addEventListener("blur",z,!1),document.addEventListener("focus",Y,!0)):(window.attachEvent("onBlur",z),document.attachEvent("onFocus",Y))}function st(){W=null,window.addEventListener?(window.removeEventListener("blur",z),document.removeEventListener("focus",Y)):(window.detachEvent("onBlur",z),document.detachEvent("onFocus",Y))}var de={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=h;var o=Se,r=l(o);function l(a){return a&&a.__esModule?a:{default:a}}function f(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:document;return a.activeElement.shadowRoot?f(a.activeElement.shadowRoot):a.activeElement}function h(a,O){var v=(0,r.default)(a);if(!v.length){O.preventDefault();return}var y=void 0,p=O.shiftKey,m=v[0],b=v[v.length-1],E=f();if(a===E){if(!p)return;y=b}if(b===E&&!p&&(y=m),m===E&&p&&(y=b),y){O.preventDefault(),y.focus();return}var D=/(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent),V=D!=null&&D[1]!="Chrome"&&/\biPod\b|\biPad\b/g.exec(navigator.userAgent)==null;if(V){var j=v.indexOf(E);if(j>-1&&(j+=p?-1:1),y=v[j],typeof y>"u"){O.preventDefault(),y=p?b:m,y.focus();return}O.preventDefault(),y.focus()}}t.exports=e.default})(de,de.exports);var it=de.exports,T={},ut=function(){},ct=ut,N={},Me={exports:{}};/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/(function(t){(function(){var e=!!(typeof window<"u"&&window.document&&window.document.createElement),o={canUseDOM:e,canUseWorkers:typeof Worker<"u",canUseEventListeners:e&&!!(window.addEventListener||window.attachEvent),canUseViewport:e&&!!window.screen};t.exports?t.exports=o:window.ExecutionEnvironment=o})()})(Me);var ft=Me.exports;Object.defineProperty(N,"__esModule",{value:!0});N.canUseDOM=N.SafeNodeList=N.SafeHTMLCollection=void 0;var dt=ft,pt=mt(dt);function mt(t){return t&&t.__esModule?t:{default:t}}var re=pt.default,vt=re.canUseDOM?window.HTMLElement:{};N.SafeHTMLCollection=re.canUseDOM?window.HTMLCollection:{};N.SafeNodeList=re.canUseDOM?window.NodeList:{};N.canUseDOM=re.canUseDOM;N.default=vt;Object.defineProperty(T,"__esModule",{value:!0});T.resetState=Ot;T.log=_t;T.assertNodeList=Ne;T.setElement=Ct;T.validateElement=pe;T.hide=wt;T.show=Et;T.documentNotReadyOrSSRTesting=xt;var ht=ct,yt=gt(ht),bt=N;function gt(t){return t&&t.__esModule?t:{default:t}}var S=null;function Ot(){S&&(S.removeAttribute?S.removeAttribute("aria-hidden"):S.length!=null?S.forEach(function(t){return t.removeAttribute("aria-hidden")}):document.querySelectorAll(S).forEach(function(t){return t.removeAttribute("aria-hidden")})),S=null}function _t(){}function Ne(t,e){if(!t||!t.length)throw new Error("react-modal: No elements were found for selector "+e+".")}function Ct(t){var e=t;if(typeof e=="string"&&bt.canUseDOM){var o=document.querySelectorAll(e);Ne(o,e),e=o}return S=e||S,S}function pe(t){var e=t||S;return e?Array.isArray(e)||e instanceof HTMLCollection||e instanceof NodeList?e:[e]:((0,yt.default)(!1,["react-modal: App element is not defined.","Please use `Modal.setAppElement(el)` or set `appElement={el}`.","This is needed so screen readers don't see main content","when modal is opened. It is not recommended, but you can opt-out","by setting `ariaHideApp={false}`."].join(" ")),[])}function wt(t){var e=!0,o=!1,r=void 0;try{for(var l=pe(t)[Symbol.iterator](),f;!(e=(f=l.next()).done);e=!0){var h=f.value;h.setAttribute("aria-hidden","true")}}catch(a){o=!0,r=a}finally{try{!e&&l.return&&l.return()}finally{if(o)throw r}}}function Et(t){var e=!0,o=!1,r=void 0;try{for(var l=pe(t)[Symbol.iterator](),f;!(e=(f=l.next()).done);e=!0){var h=f.value;h.removeAttribute("aria-hidden")}}catch(a){o=!0,r=a}finally{try{!e&&l.return&&l.return()}finally{if(o)throw r}}}function xt(){S=null}var q={};Object.defineProperty(q,"__esModule",{value:!0});q.resetState=St;q.log=Mt;var B={},K={};function he(t,e){t.classList.remove(e)}function St(){var t=document.getElementsByTagName("html")[0];for(var e in B)he(t,B[e]);var o=document.body;for(var r in K)he(o,K[r]);B={},K={}}function Mt(){}var Nt=function(e,o){return e[o]||(e[o]=0),e[o]+=1,o},Rt=function(e,o){return e[o]&&(e[o]-=1),o},Tt=function(e,o,r){r.forEach(function(l){Nt(o,l),e.add(l)})},Dt=function(e,o,r){r.forEach(function(l){Rt(o,l),o[l]===0&&e.remove(l)})};q.add=function(e,o){return Tt(e.classList,e.nodeName.toLowerCase()=="html"?B:K,o.split(" "))};q.remove=function(e,o){return Dt(e.classList,e.nodeName.toLowerCase()=="html"?B:K,o.split(" "))};var $={};Object.defineProperty($,"__esModule",{value:!0});$.log=Pt;$.resetState=Ft;function At(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Re=function t(){var e=this;At(this,t),this.register=function(o){e.openInstances.indexOf(o)===-1&&(e.openInstances.push(o),e.emit("register"))},this.deregister=function(o){var r=e.openInstances.indexOf(o);r!==-1&&(e.openInstances.splice(r,1),e.emit("deregister"))},this.subscribe=function(o){e.subscribers.push(o)},this.emit=function(o){e.subscribers.forEach(function(r){return r(o,e.openInstances.slice())})},this.openInstances=[],this.subscribers=[]},te=new Re;function Pt(){console.log("portalOpenInstances ----------"),console.log(te.openInstances.length),te.openInstances.forEach(function(t){return console.log(t)}),console.log("end portalOpenInstances ----------")}function Ft(){te=new Re}$.default=te;var me={};Object.defineProperty(me,"__esModule",{value:!0});me.resetState=jt;me.log=Wt;var Lt=$,Ht=Ut(Lt);function Ut(t){return t&&t.__esModule?t:{default:t}}var w=void 0,M=void 0,H=[];function jt(){for(var t=[w,M],e=0;e<t.length;e++){var o=t[e];o&&o.parentNode&&o.parentNode.removeChild(o)}w=M=null,H=[]}function Wt(){console.log("bodyTrap ----------"),console.log(H.length);for(var t=[w,M],e=0;e<t.length;e++){var o=t[e],r=o||{};console.log(r.nodeName,r.className,r.id)}console.log("edn bodyTrap ----------")}function ye(){H.length!==0&&H[H.length-1].focusContent()}function kt(t,e){!w&&!M&&(w=document.createElement("div"),w.setAttribute("data-react-modal-body-trap",""),w.style.position="absolute",w.style.opacity="0",w.setAttribute("tabindex","0"),w.addEventListener("focus",ye),M=w.cloneNode(),M.addEventListener("focus",ye)),H=e,H.length>0?(document.body.firstChild!==w&&document.body.insertBefore(w,document.body.firstChild),document.body.lastChild!==M&&document.body.appendChild(M)):(w.parentElement&&w.parentElement.removeChild(w),M.parentElement&&M.parentElement.removeChild(M))}Ht.default.subscribe(kt);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(c){for(var u=1;u<arguments.length;u++){var g=arguments[u];for(var n in g)Object.prototype.hasOwnProperty.call(g,n)&&(c[n]=g[n])}return c},r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},l=function(){function c(u,g){for(var n=0;n<g.length;n++){var s=g[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(u,s.key,s)}}return function(u,g,n){return g&&c(u.prototype,g),n&&c(u,n),u}}(),f=k,h=xe,a=X(h),O=R,v=ae(O),y=it,p=X(y),m=T,b=ae(m),E=q,D=ae(E),V=N,j=X(V),Fe=$,ve=X(Fe);function ae(c){if(c&&c.__esModule)return c;var u={};if(c!=null)for(var g in c)Object.prototype.hasOwnProperty.call(c,g)&&(u[g]=c[g]);return u.default=c,u}function X(c){return c&&c.__esModule?c:{default:c}}function Le(c,u){if(!(c instanceof u))throw new TypeError("Cannot call a class as a function")}function He(c,u){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return u&&(typeof u=="object"||typeof u=="function")?u:c}function Ue(c,u){if(typeof u!="function"&&u!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof u);c.prototype=Object.create(u&&u.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),u&&(Object.setPrototypeOf?Object.setPrototypeOf(c,u):c.__proto__=u)}var le={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},je=function(u){return u.code==="Tab"||u.keyCode===9},We=function(u){return u.code==="Escape"||u.keyCode===27},G=0,se=function(c){Ue(u,c);function u(g){Le(this,u);var n=He(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,g));return n.setOverlayRef=function(s){n.overlay=s,n.props.overlayRef&&n.props.overlayRef(s)},n.setContentRef=function(s){n.content=s,n.props.contentRef&&n.props.contentRef(s)},n.afterClose=function(){var s=n.props,C=s.appElement,x=s.ariaHideApp,_=s.htmlOpenClassName,P=s.bodyOpenClassName,F=s.parentSelector,J=F&&F().ownerDocument||document;P&&D.remove(J.body,P),_&&D.remove(J.getElementsByTagName("html")[0],_),x&&G>0&&(G-=1,G===0&&b.show(C)),n.props.shouldFocusAfterRender&&(n.props.shouldReturnFocusAfterClose?(v.returnFocus(n.props.preventScroll),v.teardownScopedFocus()):v.popWithoutFocus()),n.props.onAfterClose&&n.props.onAfterClose(),ve.default.deregister(n)},n.open=function(){n.beforeOpen(),n.state.afterOpen&&n.state.beforeClose?(clearTimeout(n.closeTimer),n.setState({beforeClose:!1})):(n.props.shouldFocusAfterRender&&(v.setupScopedFocus(n.node),v.markForFocusLater()),n.setState({isOpen:!0},function(){n.openAnimationFrame=requestAnimationFrame(function(){n.setState({afterOpen:!0}),n.props.isOpen&&n.props.onAfterOpen&&n.props.onAfterOpen({overlayEl:n.overlay,contentEl:n.content})})}))},n.close=function(){n.props.closeTimeoutMS>0?n.closeWithTimeout():n.closeWithoutTimeout()},n.focusContent=function(){return n.content&&!n.contentHasFocus()&&n.content.focus({preventScroll:!0})},n.closeWithTimeout=function(){var s=Date.now()+n.props.closeTimeoutMS;n.setState({beforeClose:!0,closesAt:s},function(){n.closeTimer=setTimeout(n.closeWithoutTimeout,n.state.closesAt-Date.now())})},n.closeWithoutTimeout=function(){n.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},n.afterClose)},n.handleKeyDown=function(s){je(s)&&(0,p.default)(n.content,s),n.props.shouldCloseOnEsc&&We(s)&&(s.stopPropagation(),n.requestClose(s))},n.handleOverlayOnClick=function(s){n.shouldClose===null&&(n.shouldClose=!0),n.shouldClose&&n.props.shouldCloseOnOverlayClick&&(n.ownerHandlesClose()?n.requestClose(s):n.focusContent()),n.shouldClose=null},n.handleContentOnMouseUp=function(){n.shouldClose=!1},n.handleOverlayOnMouseDown=function(s){!n.props.shouldCloseOnOverlayClick&&s.target==n.overlay&&s.preventDefault()},n.handleContentOnClick=function(){n.shouldClose=!1},n.handleContentOnMouseDown=function(){n.shouldClose=!1},n.requestClose=function(s){return n.ownerHandlesClose()&&n.props.onRequestClose(s)},n.ownerHandlesClose=function(){return n.props.onRequestClose},n.shouldBeClosed=function(){return!n.state.isOpen&&!n.state.beforeClose},n.contentHasFocus=function(){return document.activeElement===n.content||n.content.contains(document.activeElement)},n.buildClassName=function(s,C){var x=(typeof C>"u"?"undefined":r(C))==="object"?C:{base:le[s],afterOpen:le[s]+"--after-open",beforeClose:le[s]+"--before-close"},_=x.base;return n.state.afterOpen&&(_=_+" "+x.afterOpen),n.state.beforeClose&&(_=_+" "+x.beforeClose),typeof C=="string"&&C?_+" "+C:_},n.attributesFromObject=function(s,C){return Object.keys(C).reduce(function(x,_){return x[s+"-"+_]=C[_],x},{})},n.state={afterOpen:!1,beforeClose:!1},n.shouldClose=null,n.moveFromContentToOverlay=null,n}return l(u,[{key:"componentDidMount",value:function(){this.props.isOpen&&this.open()}},{key:"componentDidUpdate",value:function(n,s){this.props.isOpen&&!n.isOpen?this.open():!this.props.isOpen&&n.isOpen&&this.close(),this.props.shouldFocusAfterRender&&this.state.isOpen&&!s.isOpen&&this.focusContent()}},{key:"componentWillUnmount",value:function(){this.state.isOpen&&this.afterClose(),clearTimeout(this.closeTimer),cancelAnimationFrame(this.openAnimationFrame)}},{key:"beforeOpen",value:function(){var n=this.props,s=n.appElement,C=n.ariaHideApp,x=n.htmlOpenClassName,_=n.bodyOpenClassName,P=n.parentSelector,F=P&&P().ownerDocument||document;_&&D.add(F.body,_),x&&D.add(F.getElementsByTagName("html")[0],x),C&&(G+=1,b.hide(s)),ve.default.register(this)}},{key:"render",value:function(){var n=this.props,s=n.id,C=n.className,x=n.overlayClassName,_=n.defaultStyles,P=n.children,F=C?{}:_.content,J=x?{}:_.overlay;if(this.shouldBeClosed())return null;var ke={ref:this.setOverlayRef,className:this.buildClassName("overlay",x),style:o({},J,this.props.style.overlay),onClick:this.handleOverlayOnClick,onMouseDown:this.handleOverlayOnMouseDown},Ie=o({id:s,ref:this.setContentRef,style:o({},F,this.props.style.content),className:this.buildClassName("content",C),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentOnMouseDown,onMouseUp:this.handleContentOnMouseUp,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.attributesFromObject("aria",o({modal:!0},this.props.aria)),this.attributesFromObject("data",this.props.data||{}),{"data-testid":this.props.testId}),qe=this.props.contentElement(Ie,P);return this.props.overlayElement(ke,qe)}}]),u}(f.Component);se.defaultProps={style:{overlay:{},content:{}},defaultStyles:{}},se.propTypes={isOpen:a.default.bool.isRequired,defaultStyles:a.default.shape({content:a.default.object,overlay:a.default.object}),style:a.default.shape({content:a.default.object,overlay:a.default.object}),className:a.default.oneOfType([a.default.string,a.default.object]),overlayClassName:a.default.oneOfType([a.default.string,a.default.object]),parentSelector:a.default.func,bodyOpenClassName:a.default.string,htmlOpenClassName:a.default.string,ariaHideApp:a.default.bool,appElement:a.default.oneOfType([a.default.instanceOf(j.default),a.default.instanceOf(V.SafeHTMLCollection),a.default.instanceOf(V.SafeNodeList),a.default.arrayOf(a.default.instanceOf(j.default))]),onAfterOpen:a.default.func,onAfterClose:a.default.func,onRequestClose:a.default.func,closeTimeoutMS:a.default.number,shouldFocusAfterRender:a.default.bool,shouldCloseOnOverlayClick:a.default.bool,shouldReturnFocusAfterClose:a.default.bool,preventScroll:a.default.bool,role:a.default.string,contentLabel:a.default.string,aria:a.default.object,data:a.default.object,children:a.default.node,shouldCloseOnEsc:a.default.bool,overlayRef:a.default.func,contentRef:a.default.func,id:a.default.string,overlayElement:a.default.func,contentElement:a.default.func,testId:a.default.string},e.default=se,t.exports=e.default})(ue,ue.exports);var It=ue.exports;function Te(){var t=this.constructor.getDerivedStateFromProps(this.props,this.state);t!=null&&this.setState(t)}function De(t){function e(o){var r=this.constructor.getDerivedStateFromProps(t,o);return r??null}this.setState(e.bind(this))}function Ae(t,e){try{var o=this.props,r=this.state;this.props=t,this.state=e,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(o,r)}finally{this.props=o,this.state=r}}Te.__suppressDeprecationWarning=!0;De.__suppressDeprecationWarning=!0;Ae.__suppressDeprecationWarning=!0;function qt(t){var e=t.prototype;if(!e||!e.isReactComponent)throw new Error("Can only polyfill class components");if(typeof t.getDerivedStateFromProps!="function"&&typeof e.getSnapshotBeforeUpdate!="function")return t;var o=null,r=null,l=null;if(typeof e.componentWillMount=="function"?o="componentWillMount":typeof e.UNSAFE_componentWillMount=="function"&&(o="UNSAFE_componentWillMount"),typeof e.componentWillReceiveProps=="function"?r="componentWillReceiveProps":typeof e.UNSAFE_componentWillReceiveProps=="function"&&(r="UNSAFE_componentWillReceiveProps"),typeof e.componentWillUpdate=="function"?l="componentWillUpdate":typeof e.UNSAFE_componentWillUpdate=="function"&&(l="UNSAFE_componentWillUpdate"),o!==null||r!==null||l!==null){var f=t.displayName||t.name,h=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

`+f+" uses "+h+" but also contains the following legacy lifecycles:"+(o!==null?`
  `+o:"")+(r!==null?`
  `+r:"")+(l!==null?`
  `+l:"")+`

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`)}if(typeof t.getDerivedStateFromProps=="function"&&(e.componentWillMount=Te,e.componentWillReceiveProps=De),typeof e.getSnapshotBeforeUpdate=="function"){if(typeof e.componentDidUpdate!="function")throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");e.componentWillUpdate=Ae;var a=e.componentDidUpdate;e.componentDidUpdate=function(v,y,p){var m=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:p;a.call(this,v,y,m)}}return t}const $t=Object.freeze(Object.defineProperty({__proto__:null,polyfill:qt},Symbol.toStringTag,{value:"Module"})),Vt=$e($t);Object.defineProperty(U,"__esModule",{value:!0});U.bodyOpenClassName=U.portalClassName=void 0;var be=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},Bt=function(){function t(e,o){for(var r=0;r<o.length;r++){var l=o[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,o,r){return o&&t(e.prototype,o),r&&t(e,r),e}}(),Pe=k,ne=Z(Pe),Kt=Ve,oe=Z(Kt),zt=xe,i=Z(zt),Yt=It,ge=Z(Yt),Zt=T,Qt=Gt(Zt),A=N,Oe=Z(A),Xt=Vt;function Gt(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e}function Z(t){return t&&t.__esModule?t:{default:t}}function Jt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _e(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function en(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var tn=U.portalClassName="ReactModalPortal",nn=U.bodyOpenClassName="ReactModal__Body--open",L=A.canUseDOM&&oe.default.createPortal!==void 0,Ce=function(e){return document.createElement(e)},we=function(){return L?oe.default.createPortal:oe.default.unstable_renderSubtreeIntoContainer};function ee(t){return t()}var Q=function(t){en(e,t);function e(){var o,r,l,f;Jt(this,e);for(var h=arguments.length,a=Array(h),O=0;O<h;O++)a[O]=arguments[O];return f=(r=(l=_e(this,(o=e.__proto__||Object.getPrototypeOf(e)).call.apply(o,[this].concat(a))),l),l.removePortal=function(){!L&&oe.default.unmountComponentAtNode(l.node);var v=ee(l.props.parentSelector);v&&v.contains(l.node)?v.removeChild(l.node):console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')},l.portalRef=function(v){l.portal=v},l.renderPortal=function(v){var y=we(),p=y(l,ne.default.createElement(ge.default,be({defaultStyles:e.defaultStyles},v)),l.node);l.portalRef(p)},r),_e(l,f)}return Bt(e,[{key:"componentDidMount",value:function(){if(A.canUseDOM){L||(this.node=Ce("div")),this.node.className=this.props.portalClassName;var r=ee(this.props.parentSelector);r.appendChild(this.node),!L&&this.renderPortal(this.props)}}},{key:"getSnapshotBeforeUpdate",value:function(r){var l=ee(r.parentSelector),f=ee(this.props.parentSelector);return{prevParent:l,nextParent:f}}},{key:"componentDidUpdate",value:function(r,l,f){if(A.canUseDOM){var h=this.props,a=h.isOpen,O=h.portalClassName;r.portalClassName!==O&&(this.node.className=O);var v=f.prevParent,y=f.nextParent;y!==v&&(v.removeChild(this.node),y.appendChild(this.node)),!(!r.isOpen&&!a)&&!L&&this.renderPortal(this.props)}}},{key:"componentWillUnmount",value:function(){if(!(!A.canUseDOM||!this.node||!this.portal)){var r=this.portal.state,l=Date.now(),f=r.isOpen&&this.props.closeTimeoutMS&&(r.closesAt||l+this.props.closeTimeoutMS);f?(r.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,f-l)):this.removePortal()}}},{key:"render",value:function(){if(!A.canUseDOM||!L)return null;!this.node&&L&&(this.node=Ce("div"));var r=we();return r(ne.default.createElement(ge.default,be({ref:this.portalRef,defaultStyles:e.defaultStyles},this.props)),this.node)}}],[{key:"setAppElement",value:function(r){Qt.setElement(r)}}]),e}(Pe.Component);Q.propTypes={isOpen:i.default.bool.isRequired,style:i.default.shape({content:i.default.object,overlay:i.default.object}),portalClassName:i.default.string,bodyOpenClassName:i.default.string,htmlOpenClassName:i.default.string,className:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),overlayClassName:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),appElement:i.default.oneOfType([i.default.instanceOf(Oe.default),i.default.instanceOf(A.SafeHTMLCollection),i.default.instanceOf(A.SafeNodeList),i.default.arrayOf(i.default.instanceOf(Oe.default))]),onAfterOpen:i.default.func,onRequestClose:i.default.func,closeTimeoutMS:i.default.number,ariaHideApp:i.default.bool,shouldFocusAfterRender:i.default.bool,shouldCloseOnOverlayClick:i.default.bool,shouldReturnFocusAfterClose:i.default.bool,preventScroll:i.default.bool,parentSelector:i.default.func,aria:i.default.object,data:i.default.object,role:i.default.string,contentLabel:i.default.string,shouldCloseOnEsc:i.default.bool,overlayRef:i.default.func,contentRef:i.default.func,id:i.default.string,overlayElement:i.default.func,contentElement:i.default.func};Q.defaultProps={isOpen:!1,portalClassName:tn,bodyOpenClassName:nn,role:"dialog",ariaHideApp:!0,closeTimeoutMS:0,shouldFocusAfterRender:!0,shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,shouldReturnFocusAfterClose:!0,preventScroll:!1,parentSelector:function(){return document.body},overlayElement:function(e,o){return ne.default.createElement("div",e,o)},contentElement:function(e,o){return ne.default.createElement("div",e,o)}};Q.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}};(0,Xt.polyfill)(Q);U.default=Q;(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var o=U,r=l(o);function l(f){return f&&f.__esModule?f:{default:f}}e.default=r.default,t.exports=e.default})(ie,ie.exports);var on=ie.exports;const rn=Be(on),an=()=>{const t=["bg-red-400","bg-red-500","bg-orange-600","bg-red-600","bg-green-500","bg-blue-500","bg-purple-500","bg-green-600"];return t[Math.floor(Math.random()*t.length)]},cn=()=>{const{videos:t}=Ee().props,[e,o]=k.useState(null);k.useState(!0),k.useRef(null);const r=f=>{o(f)},l=()=>{o(null)};return d.jsxs("div",{className:"flex-c-c w-full bg-gray-600 min-h-screen",children:[d.jsxs("div",{className:"h-20 bg-gray-700 flex justify-between items-center px-4",children:[d.jsx("div",{className:"text-white font-extrabold text-2xl",children:"AnimateQ"}),d.jsx(Ke,{href:route("animateq.editor"),children:d.jsx("div",{className:"btn btn-primary",children:"Create New"})})]}),d.jsx(ze,{title:"Home"}),d.jsxs("div",{className:"md:px-10 sm:px-4 lg:px-36 xl:px-64 mt-10",children:[d.jsx("h1",{className:"text-white font-extrabold px-4 my-3 text-2xl",children:"Latest Videos"}),d.jsx("div",{className:"mt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ",children:t.data.map((f,h)=>d.jsx("div",{children:d.jsx(ln,{onClick:()=>r(f),video:f})},f.id))})]}),d.jsxs(rn,{isOpen:!!e,onRequestClose:l,contentLabel:"Example Modal",children:[d.jsxs("div",{className:"flex justify-between",children:[d.jsx("h1",{className:"font-semibold text-base p-4",children:"Animation Video"}),d.jsx("button",{onClick:l,className:"cursor-pointer p-4",children:"X"})]}),e&&d.jsxs("div",{className:"h-56",children:[d.jsxs("video",{className:"",autoPlay:!0,loop:!0,style:{width:"90vw",height:"80vh"},poster:"/loading.gif",preload:"auto",children:[d.jsx("source",{src:"/storage/"+e.source,type:"video/mp4"}),"Your browser does not support the video tag."]}),d.jsx("h1",{className:"my-3 font-bold text-2xl",children:e.title})]})]})]})},ln=({video:t,onClick:e})=>{const{auth:o}=Ee().props,r=k.useRef(null);Ye();const l=()=>{window.confirm("Do you really want to delete this video?")&&Ze.delete("/video/"+t.id)},f=()=>{var h;(h=r.current)==null||h.click()};return d.jsxs("div",{className:" shadow-lg rounded border-4 border-gray-700",children:[d.jsx("a",{ref:r,href:"/storage/"+t.source,hidden:!0,download:t.source}),d.jsxs("div",{className:"w-full rounded hover:bg-gray-600 cursor-pointer hover:shadow-lg",children:[d.jsx("div",{onClick:e,className:`w-full ${an()}`,children:d.jsx("img",{className:"object-cover w-full",src:"/storage/"+t.thumbnail})}),d.jsxs("div",{className:"flex justify-between",children:[d.jsx("div",{className:" mt-3",children:d.jsx("h1",{className:"text-white font-bold",children:t.title})}),d.jsxs("div",{className:"flex p-4",children:[d.jsx(Qe,{className:"text-green-500 mx-1 hover:text-green-400",onClick:f}),o.user&&d.jsx("div",{className:"mx-1",onClick:l,children:d.jsx(Xe,{className:"text-red-500 hover:text-red-400"})})]})]})]})]})};export{cn as default};
