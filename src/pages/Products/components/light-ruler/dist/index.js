var t={979:(t,e,n)=>{n.d(e,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([t.id,"/* CanvasRuler最外层容器 */\r\n.canvas-ruler-wrapper .canvas-ruler-wrapper {\r\n    position: absolute;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-h-box,\r\n.canvas-ruler-wrapper .canvas-ruler-v-box {\r\n    position: absolute;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-h-box {\r\n    top: 0;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-v-box {\r\n    left: 0;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-y,\r\n.canvas-ruler-wrapper .canvas-ruler-x {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-content-wrapper {\r\n    position: absolute;\r\n    overflow: auto;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-unit {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.canvas-ruler-wrapper .canvas-ruler-box {\r\n    will-change: transform;\r\n}\r\n",""]);const s=a},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,i,o){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);r&&a[u[0]]||(void 0!==o&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=o),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),e.push(u))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var o={},a=[],s=0;s<t.length;s++){var c=t[s],l=r.base?c[0]+r.base:c[0],u=o[l]||0,h="".concat(l," ").concat(u);o[l]=u+1;var f=n(h),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)e[f].references++,e[f].updater(p);else{var d=i(p,r);r.byIndex=s,e.splice(s,0,{identifier:h,updater:d,references:1})}a.push(h)}return a}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var o=r(t=t||[],i=i||{});return function(t){t=t||[];for(var a=0;a<o.length;a++){var s=n(o[a]);e[s].references--}for(var c=r(t,i),l=0;l<o.length;l++){var u=n(o[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}o=c}}},569:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={id:r,exports:{}};return t[r](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r={};(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(r,{Y:()=>_,Z:()=>H});var a=2e4,s=800,c={size:20,backgroundColor:"#171819",fontColor:"#fff",fontSize:12,fontWeight:"",tickColor:"#4b4d4f",unit:{backgroundColor:"#171819",fontColor:"#fff",fontSize:12,text:"px"},gap:10,maxSize:50,maxWidth:a,maxHeight:a,scale:1,show:!0,mode:"center"};function l(t,e){if("string"==typeof t&&window.getComputedStyle){var n=document.querySelector(t);return window.getComputedStyle(n,null)[e]}if(t&&window.getComputedStyle)return window.getComputedStyle(t,null)[e];throw new Error("Can not get target style")}var u=function(t,e){var n=t.size,r=t.maxSize,i=t.maxWidth,o=t.maxHeight,a=t.width,s=t.height,c=t.unit,l=t.rulerId,u=t.mountRef,h=n>r?r:n,f=a>i?i:a,p=s>o?o:s,d='<div id="canvas-ruler-wrapper-'.concat(t.rulerId,'" \n                                                class="canvas-ruler-wrapper"\n                                                style="display: ').concat(t.show?"block":"none",'"\n                                            >'),v='\n        <div id="canvas-ruler-unit-'.concat(l,'" class="canvas-ruler-unit"\n                    style="\n                        width: ').concat(n,"px;\n                        height: ").concat(n,"px;\n                        background-color: ").concat(c.backgroundColor,";\n                        color: ").concat(c.fontColor,";\n                        font-size: ").concat(c.fontSize,"px;\n                        border-right: 1px solid ").concat(t.tickColor,";\n                        border-bottom: 1px solid ").concat(t.tickColor,';\n                        z-index: 99;\n                    ">').concat(c.text,'</div>\n                <div id="canvas-ruler-h-box-').concat(l,'"\n                    class="canvas-ruler-box canvas-ruler-h-box"\n                    style="\n                        width: ').concat(f,"px;\n                        height: ").concat(h,"px;\n                        left: ").concat(h,"px;\n                        border-bottom: 1px solid ").concat(t.backgroundColor,'\n                    ">\n                    <canvas id="canvas-ruler-x-').concat(l,'" width=').concat(f," height=").concat(h,' \n                     class="canvas-ruler-x">\n                </div>\n                <div id="canvas-ruler-v-box-').concat(l,'"\n                    class="canvas-ruler-box canvas-ruler-v-box" \n                    style="\n                        width: ').concat(h,"px;\n                        height: ").concat(p,"px;\n                        top: ").concat(h,"px;\n                        border-right: 1px solid ").concat(t.backgroundColor,'\n                    ">\n                    <canvas id="canvas-ruler-y-').concat(l,'" width=').concat(h," height=").concat(p,' \n                    class="canvas-ruler-y">\n                </div>\n    ');return"range"===e?"".concat(u?"":d).concat(v).concat("</div>"):v},h=function(t,e){if(null===t)throw new Error("dom is null");Object.keys(e).forEach((function(n){t[n]=e[n]}))},f=function(t){return!(!t||"function"!=typeof t)},p=function(t,e){return new Promise((function(n,r){t&&e&&(t.appendChild(e),n(t)),r(new Error("dom is null"))}))},d=function(t){var e,n,r,i=t.wrapperElement,o=t.mountRef,a=document.createDocumentFragment();o?(h(o,{id:"canvas-ruler-wrapper-".concat(t.rulerId),className:"canvas-ruler-wrapper",style:"display: ".concat(t.show?"block":"none")}),e=o):("div",n={id:"canvas-ruler-wrapper-".concat(t.rulerId),className:"canvas-ruler-wrapper",style:"display: ".concat(t.show?"block":"none")},r=document.createElement("div"),h(r,n),e=r);var s=u(t,"html");e.innerHTML=s,a.appendChild(e);var c=o?o.parentElement:"string"==typeof i?document.getElementById(i):i;p(c,a).then((function(t){}))};function v(t,e){return v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},v(t,e)}function y(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}function b(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var w=function(){function t(n){e(this,t),Object.defineProperty(this,"canvasX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvasY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"rulerId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"sizeX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"sizeY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"devicePixelRatio",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"ctxX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ctxY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"style",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"scrollLeft",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"scrollTop",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"isInfinite",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:void 0});var r=n.options;this.options=r,this.style=r.style,this.rulerId=r.rulerId,this.isInfinite=n.isInfinite,this.devicePixelRatio=window.devicePixelRatio}return o(t,[{key:"getCanvas",value:function(){this.canvasX=document.getElementById("canvas-ruler-x-".concat(this.rulerId)),this.canvasY=document.getElementById("canvas-ruler-y-".concat(this.rulerId)),this.sizeX={width:this.canvasX.width,height:this.canvasX.height},this.sizeY={width:this.canvasY.width,height:this.canvasY.height}}},{key:"draw",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="horizontal"===e,i=r?this.sizeX.width+n:this.sizeY.width,o=r?this.sizeX.height:this.sizeY.height+n,a=this.style,s=a.gap,c=a.backgroundColor,l=a.tickColor,u=a.fontColor,h=a.fontWeight,f=a.fontSize,p=a.scale,d=a.mode,v=r?i/s:o/s,y=0,b=0;t.rect(0,0,i*this.devicePixelRatio,o*this.devicePixelRatio),t.fillStyle=c,t.fill(),t.save(),this.isInfinite?r?t.translate(.5-n,0):t.translate(0,.5-n):r?t.translate(.5,.5):t.translate(0,.5),t.scale(this.devicePixelRatio,this.devicePixelRatio),t.textBaseline="alphabetic",t.strokeStyle=l,t.fillStyle=u;var m=f||(r?Math.round(.53*o):Math.round(.53*i));t.font="".concat(h," ").concat(m,"px sans-serif"),t.lineWidth=1;var w="center"===d;t.beginPath();for(var g=-Math.round(y)/s;g<v;g++){if(g%s==0){var x=Math.round(g/p*s);if("vertical"===e){var S=[],E=x,R=E.toString();S=R.split("");for(var k=0,z=0;z<S.length;z++){var I=0===x&&w?"":S[z];t.fillText(I,.1*i,w?y+k-.5*i:y+k+.7*i),k+=m}}else{var C=0===x&&w?"":"".concat(x),O=t.measureText(String(x)).width;t.fillText(C,w?y-.5*O:y+.2*o,.5*o)}}r?(t.moveTo(y,o),g%s==0?t.lineTo(y,w?Math.round(b+o/1.5):Math.round(b)):g%(s/2)==0?t.lineTo(y,w?Math.round(b+o/1.5):Math.round(b+o/2)):t.lineTo(y,w?Math.round(b+o/1.2):Math.round(b+o/1.5))):(t.moveTo(i,y),g%s==0?t.lineTo(w?Math.round(i/1.5):Math.round(-i),y):g%(s/2)==0?t.lineTo(w?Math.round(i/1.5):Math.round(i/2),y):t.lineTo(w?Math.round(i/1.2):Math.round(i/1.5),y)),y+=s}t.stroke(),t.restore()}},{key:"clearCanvas",value:function(){this.ctxX.clearRect(0,0,this.canvasX.width*this.devicePixelRatio,this.canvasX.height*this.devicePixelRatio),this.ctxY.clearRect(0,0,this.canvasY.width*this.devicePixelRatio,this.canvasY.height*this.devicePixelRatio)}},{key:"rescaleCanvas",value:function(t){t.width=t.clientWidth*this.devicePixelRatio,t.height=t.clientHeight*this.devicePixelRatio}},{key:"translateRuler",value:function(t,e){this.draw(this.ctxX,"horizontal",t),this.draw(this.ctxY,"vertical",e)}}]),t}();var g=function(t){y(a,t);var n,r,i=(n=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(n);if(r){var i=m(this).constructor;t=Reflect.construct(e,arguments,i)}else t=e.apply(this,arguments);return b(this,t)});function a(t){var n;return e(this,a),(n=i.call(this,t)).getCanvas(),n.drawCanvas(),n}return o(a,[{key:"drawCanvas",value:function(){this.ctxX=this.canvasX.getContext("2d"),this.ctxY=this.canvasY.getContext("2d"),this.rescaleCanvas(this.canvasX),this.rescaleCanvas(this.canvasY),this.draw(this.ctxX,"horizontal"),this.draw(this.ctxY,"vertical")}},{key:"scale",value:function(t){this.style=t,this.draw(this.ctxX,"horizontal",this.scrollLeft),this.draw(this.ctxY,"vertical",this.scrollTop)}},{key:"resize",value:function(t){this.style=t;var e=t.size,n=t.width,r=t.height;this.canvasX.width=n,this.canvasX.height=e,this.canvasY.height=r,this.canvasY.width=e,this.sizeX.width=n,this.sizeX.height=e,this.sizeY.width=e,this.sizeY.height=r,this.rescaleCanvas(this.canvasX),this.rescaleCanvas(this.canvasY),this.isInfinite=t.isInfinite,this.draw(this.ctxX,"horizontal",this.scrollLeft),this.draw(this.ctxY,"vertical",this.scrollTop)}},{key:"update",value:function(t){this.style=t,this.draw(this.ctxX,"horizontal",this.scrollLeft),this.draw(this.ctxY,"vertical",this.scrollTop)}},{key:"destroy",value:function(){this.clearCanvas()}}]),a}(w);function x(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function S(t,e,n){return S=x()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&v(i,n.prototype),i},S.apply(null,arguments)}function E(t){var e="function"==typeof Map?new Map:void 0;return E=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return S(t,arguments,m(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),v(r,t)},E(t)}var R=function(t){y(o,t);var n,r,i=(n=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(n);if(r){var i=m(this).constructor;t=Reflect.construct(e,arguments,i)}else t=e.apply(this,arguments);return b(this,t)});function o(t){var n;return e(this,o),(n=i.call(this,t)).name="CustomError",n.message=t,n}return o}(E(Error));function k(t){throw new R(t)}var z={on:function(t,e,n){t?t.addEventListener(e,n,!1):k("target: ".concat(t," can not find the dom to addEventListener"))},off:function(t,e,n){t||k("target: ".concat(t," can not find the dom to removeEventListener")),t.removeEventListener(e,n,!1)},locked:!1,throttle:function(t){z.locked||(z.locked=!0,window.requestAnimationFrame(t))}},I=n(379),C=n.n(I),O=n(795),j=n.n(O),P=n(569),M=n.n(P),Y=n(565),T=n.n(Y),X=n(216),W=n.n(X),L=n(589),B=n.n(L),D=n(979),N={};N.styleTagTransform=B(),N.setAttributes=T(),N.insert=M().bind(null,"head"),N.domAPI=j(),N.insertStyleElement=W(),C()(D.Z,N),D.Z&&D.Z.locals&&D.Z.locals;var F=function(){function n(t){e(this,n),Object.defineProperty(this,"wrapperSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"scrollObject",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvasXbox",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvasYbox",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"unitDom",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvasWrapper",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ratio",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"isInfinite",{enumerable:!0,configurable:!0,writable:!0,value:!1}),t.wrapperElement||t.mountRef||k("wrapper element or options.mountRef is null!"),this.init(t),this.render(),this.createCanvasInnerRuler(),this.bindScrollEvent()}return o(n,[{key:"init",value:function(t){this.setWrapperSize(t);var e=t.style;this.options={mountRef:t.mountRef,wrapperElement:t.wrapperElement,mode:t.mode||"auto",type:t.type||"wrapped",direction:t.direction||"horizontal",width:t.width||1920,height:t.height||1080,scrollElement:t.scrollElement||"",rulerId:t.rulerId||"easy-canvas-ruler",style:e?{size:e.size?e.size>50?50:e.size:20,backgroundColor:e.backgroundColor||"#171819",fontColor:e.fontColor||"#fff",fontSize:e.fontSize,fontWeight:e.fontWeight||"",tickColor:e.tickColor||"#4b4d4f",unit:Object.assign({backgroundColor:"#171819",fontColor:"#fff",fontSize:12,text:"px"},e.unit?e.unit:{}),gap:e.gap||10,maxSize:e.maxSize||50,maxWidth:e.maxWidth||a,maxHeight:e.maxHeight||a,scale:e.scale||1,show:e.show||!0,mode:e.mode||"center"}:c,onScroll:t.onScroll||null},this.ratio=[this.options.width,this.options.height],((this.ratio[0]>a||this.ratio[1]>a)&&"auto"===this.options.mode||"infinite"===this.options.mode)&&(this.isInfinite=!0)}},{key:"render",value:function(){"wrapped"===this.options.type?this.createWrappedRuler():"single"===this.options.type?this.createSingleRuler():k("render type is illegal")}},{key:"setWrapperSize",value:function(t){var e=t.mountRef?t.mountRef.parentElement:t.wrapperElement;this.wrapperSize={width:parseFloat(l(e,"width")),height:parseFloat(l(e,"height"))}}},{key:"createWrappedRuler",value:function(){!function(t){f(document.createRange)?function(t){var e=document.createRange(),n=t.wrapperElement,r=t.mountRef;if(f(e.createContextualFragment)){var i=u(t,"range");r&&h(r,{id:"canvas-ruler-wrapper-".concat(t.rulerId),className:"canvas-ruler-wrapper",style:"display: ".concat(t.show?"block":"none")});var o=r?r.parentElement:"string"==typeof n?document.querySelector(n):n;e.selectNode(o);var a=e.createContextualFragment(i);r?p(r,a).then((function(t){p(o,t)})):p(o,a)}else e.detach(),d(t)}(t):d(t)}(Object.assign(Object.assign({},this.options.style),{mountRef:this.options.mountRef,wrapperElement:this.options.wrapperElement,width:this.isInfinite?this.wrapperSize.width+s:this.options.width+s,height:this.isInfinite?this.wrapperSize.height+s:this.options.width+s,rulerId:this.options.rulerId}))}},{key:"createCanvasInnerRuler",value:function(){var t={options:this.options,isInfinite:this.isInfinite};this.canvas=new g(t)}},{key:"createSingleRuler",value:function(){}},{key:"scale",value:function(t){("number"!=typeof t||Number.isNaN(t))&&k("scale number is illegal"),t!==this.options.style.scale&&(this.options.style.scale=t,this.canvas.scale(this.options.style))}},{key:"resize",value:function(e){"object"===t(e)&&(e.width||e.height)||k("resize number is illegal");var n=e.width,r=e.height,i=e.size?e.size:this.options.style.size,o=this.wrapperSize.width,c=this.wrapperSize.height;if(n>a||r>a)this.isInfinite=!0,this.setWrapperSize(this.options),this.ratio=[n,r],this.canvasXbox.style.transform="translateX(0px)",this.canvasYbox.style.transform="translateY(0px)";else{if(this.isInfinite=!1,this.ratio[0]>n&&this.ratio[1]>r&&i===this.options.style.size&&this.ratio[0]<a&&this.ratio[1]<a||this.ratio[0]===n&&this.ratio[1]===r)return n=0,r=0,i=0,this;this.ratio=[n,r]}var l=Object.assign({rulerId:this.options.rulerId,width:this.isInfinite?o+s:n+s,height:this.isInfinite?c+s:r+s,isInfinite:this.isInfinite},this.options.style);return this.canvasXbox.style.width="".concat(l.width,"px"),this.canvasYbox.style.height="".concat(l.height,"px"),this.canvasXbox.style.height="".concat(i,"px"),this.canvasYbox.style.width="".concat(i,"px"),this.canvasXbox.style.left="".concat(i,"px"),this.canvasYbox.style.top="".concat(i,"px"),this.unitDom.style.width="".concat(i,"px"),this.unitDom.style.height="".concat(i,"px"),this.options.style.size=i,this.canvas.resize(l),this.updateUnitStyle(),this}},{key:"update",value:function(t){var e=t.size,n=this.options.style.size;if(this.options.style=Object.assign(this.options.style,t),e&&e!==n){var r=Object.assign(Object.assign({},this.wrapperSize),{size:e});this.resize(r)}return this.canvas.update(this.options.style),this.updateUnitStyle(),this}},{key:"updateUnitStyle",value:function(){var t=this.options.style.unit;this.unitDom.style.backgroundColor="".concat(t.backgroundColor),this.unitDom.style.color="".concat(t.fontColor),this.unitDom.style.fontSize="".concat(t.fontSize),this.unitDom.style.width="".concat(this.options.style.size),this.unitDom.style.height="".concat(this.options.style.size),this.unitDom.innerText=t.text}},{key:"destroy",value:function(){this.canvas.destroy(),this.isInfinite?z.off(this.scrollObject,"scroll",this.infiniteScrollEvent):z.off(this.scrollObject,"scroll",this.limitedScrollEvent);var t=document.getElementById("canvas-ruler-wrapper-".concat(this.options.rulerId));t.innerHTML="",t.remove(),z.locked=!1}},{key:"bindScrollEvent",value:function(){this.getEventNeedsDom(),this.isInfinite?(this.infiniteScrollEvent=this.infiniteScrollEvent.bind(this),z.on(this.scrollObject,"scroll",this.infiniteScrollEvent)):(this.limitedScrollEvent=this.limitedScrollEvent.bind(this),z.on(this.scrollObject,"scroll",this.limitedScrollEvent))}},{key:"limitedScrollEvent",value:function(t){var e=this;z.throttle((function(){var n=t.target,r=n.scrollLeft,i=n.scrollTop;"function"==typeof e.options.onScroll&&e.options.onScroll(r,i),e.canvas.scrollLeft=r,e.canvas.scrollTop=i,e.canvasXbox.style.transform="translateX(".concat(-r,"px)"),e.canvasYbox.style.transform="translateY(".concat(-i,"px)"),z.locked=!1}))}},{key:"infiniteScrollEvent",value:function(t){var e=this;z.throttle((function(){var n=t.target,r=n.scrollLeft,i=n.scrollTop;"function"==typeof e.options.onScroll&&e.options.onScroll(r,i),e.canvas.scrollLeft=r,e.canvas.scrollTop=i,e.canvas.translateRuler(r,i),z.locked=!1}))}},{key:"getEventNeedsDom",value:function(){this.canvasWrapper=document.getElementById("canvas-ruler-wrapper-".concat(this.options.rulerId)),this.scrollObject="string"==typeof this.options.scrollElement?document.querySelector(this.options.scrollElement):this.options.scrollElement,this.canvasXbox=document.getElementById("canvas-ruler-h-box-".concat(this.options.rulerId)),this.canvasYbox=document.getElementById("canvas-ruler-v-box-".concat(this.options.rulerId)),this.unitDom=document.getElementById("canvas-ruler-unit-".concat(this.options.rulerId))}},{key:"changeScrollElement",value:function(t){var e="string"==typeof t?document.querySelector(t):t;return e?(this.isInfinite?z.off(this.scrollObject,"scroll",this.limitedScrollEvent):z.off(this.scrollObject,"scroll",this.infiniteScrollEvent),this.options.scrollElement=t,this.scrollObject=e,this.bindScrollEvent()):k("can not find the scroll element ".concat(t)),this}},{key:"show",value:function(){return this.options.style.show=!0,this.canvasWrapper.style.display="block",this}},{key:"hide",value:function(){return this.options.style.show=!1,this.canvasWrapper.style.display="none",this}}]),n}(),_={currentRulerId:"",rulerMap:{},checkRulerIsExist:function(t){return!!this.rulerMap[t]},getRuler:function(){return this.rulerMap[_.currentRulerId]},initCanvasRuler:function(t,e){var n=e.rulerId.toString();if(this.checkRulerIsExist(n))this.selectRuler(n);else{var r=new F(e);this.rulerMap[n]=r,this.currentRulerId=n,this.selectRuler(n)}return this},selectRuler:function(t){var e=this,n=this.rulerMap[t];return n&&(this.currentRulerId=t.toString(),n.show(),Object.keys(this.rulerMap).forEach((function(n){n!==t&&e.rulerMap[n].hide()}))),this},deleteRuler:function(t){if(this.rulerMap[t])return this.rulerMap[t].destroy(),delete this.rulerMap[t],0===Object.keys(this.rulerMap).length&&(this.currentRulerId=""),this;throw new Error("can not find ruler by id ".concat(t))},destroyAllRulers:function(){var t=this;Object.keys(this.rulerMap).forEach((function(e){t.rulerMap[e].destroy()}))}};const H=F})();var i=r.Y,o=r.Z;export{i as CanvasRulerController,o as default};