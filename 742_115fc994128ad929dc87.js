/*! For license information please see 742_115fc994128ad929dc87.js.LICENSE.txt */
"use strict";(self.webpackChunkcode_cook=self.webpackChunkcode_cook||[]).push([[742],{95166:(e,t,r)=>{r.d(t,{a:()=>s,b:()=>i,c:()=>c,g:()=>a});var n=r(50008),o=r.n(n),i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==r.g?r.g:"undefined"!=typeof self?self:{};function a(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function s(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}},r.exports),r.exports}var c=s((function(e){!function(){var t={}.hasOwnProperty;function r(){for(var e=[],n=0;n<arguments.length;n++){var i=arguments[n];if(i){var a=o()(i);if("string"===a||"number"===a)e.push(i);else if(Array.isArray(i)){if(i.length){var s=r.apply(null,i);s&&e.push(s)}}else if("object"===a)if(i.toString===Object.prototype.toString)for(var c in i)t.call(i,c)&&i[c]&&e.push(c);else e.push(i.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):window.classNames=r}()}))},50742:(e,t,r)=>{r.r(t),r.d(t,{taro_navigator_core:()=>s});var n=r(65943),o=r(289),i=r.n(o),a=r(95166),s=function(){function e(e){(0,n.r)(this,e),this.onSuccess=(0,n.c)(this,"cuccess",7),this.onFail=(0,n.c)(this,"fail",7),this.onComplete=(0,n.c)(this,"Complete",7),this.openType="navigate",this.isHover=!1,this.delta=0}return e.prototype.onClick=function(){var e=this,t=e.openType,r=e.onSuccess,n=e.onFail,o=e.onComplete,a=Promise.resolve();switch(t){case"navigate":a=i().navigateTo({url:this.url});break;case"redirect":a=i().redirectTo({url:this.url});break;case"switchTab":a=i().switchTab({url:this.url});break;case"reLaunch":a=i().reLaunch({url:this.url});break;case"navigateBack":a=i().navigateBack({delta:this.delta});break;case"exit":a=Promise.reject(new Error('navigator:fail 暂不支持"openType: exit"'))}a&&a.then((function(e){r.emit(e)})).catch((function(e){n.emit(e)})).finally((function(){o.emit()}))},e.prototype.render=function(){var e,t=this.isHover,r=this.hoverClass;return(0,n.h)(n.H,{class:(0,a.c)((e={},e[r]=t,e))})},e}();s.style=".navigator-hover{background:#efefef}"}}]);