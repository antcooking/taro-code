"use strict";(self.webpackChunkcode_cook=self.webpackChunkcode_cook||[]).push([[730],{730:(e,t,o)=>{o.r(t),o.d(t,{taro_checkbox_core:()=>i,taro_checkbox_group_core:()=>r});var n=o(65943),i=function(){function e(e){var t=this;(0,n.r)(this,e),this.onChange=(0,n.c)(this,"checkboxchange",7),this.value="",this.checked=!1,this.disabled=!1,this.nativeProps={},this.isWillLoadCalled=!1,this.handleChange=function(e){e.stopPropagation(),t.onChange.emit({value:t.value})}}return e.prototype.watchId=function(e){this.isWillLoadCalled&&e&&this.inputEl.setAttribute("id",e)},e.prototype.componentWillLoad=function(){this.isWillLoadCalled=!0},e.prototype.componentDidRender=function(){this.id&&this.el.removeAttribute("id")},e.prototype.render=function(){var e=this,t=this,o=t.checked,i=t.name,r=t.color,a=t.value,c=t.disabled,l=t.nativeProps;return(0,n.h)(n.H,{className:"weui-cells_checkbox"},(0,n.h)("input",Object.assign({ref:function(t){t&&(e.inputEl=t,e.id&&t.setAttribute("id",e.id))},type:"checkbox",value:a,name:i,class:"taro-checkbox_checked",style:{color:r},checked:o,disabled:c,onChange:this.handleChange},l)),(0,n.h)("slot",null))},Object.defineProperty(e.prototype,"el",{get:function(){return(0,n.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{id:["watchId"]}},enumerable:!1,configurable:!0}),e}();i.style='@charset "UTF-8";.taro-checkbox{display:inline-block;position:relative}.taro-checkbox_checked{display:inline-block;position:relative;top:5px;border:1px solid #d1d1d1;border-radius:3px;width:23px;height:23px;min-height:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;background-color:#fff;vertical-align:0;font-size:23px;color:#1aad19}.taro-checkbox_checked:checked::before{display:inline-block;position:absolute;left:50%;top:50%;vertical-align:middle;text-decoration:inherit;text-align:center;text-transform:none;font-family:weui;font-style:normal;font-weight:normal;font-variant:normal;font-size:inherit;color:inherit;content:"";-webkit-transform:translate(-50%, -48%) scale(0.73);transform:translate(-50%, -48%) scale(0.73);speak:none}';var r=function(){function e(e){(0,n.r)(this,e),this.onChange=(0,n.c)(this,"change",7),this.uniqueName=Date.now().toString(36)}return e.prototype.function=function(e){if(e.stopPropagation(),"TARO-CHECKBOX-CORE"===e.target.tagName){var t=this.el.querySelectorAll("taro-checkbox-core");this.value=this.getValues(t),this.onChange.emit({value:this.value})}},e.prototype.componentDidLoad=function(){var e=this;this.el.querySelectorAll("taro-checkbox-core").forEach((function(t){t.setAttribute("name",e.name||e.uniqueName)})),Object.defineProperty(this.el,"value",{get:function(){if(!e.value){var t=e.el.querySelectorAll("taro-checkbox-core");e.value=e.getValues(t)}return e.value},configurable:!0})},e.prototype.getValues=function(e){return Array.from(e).filter((function(e){var t=e.querySelector("input");return null==t?void 0:t.checked})).map((function(e){return e.value}))},e.prototype.render=function(){return(0,n.h)(n.H,null)},Object.defineProperty(e.prototype,"el",{get:function(){return(0,n.g)(this)},enumerable:!1,configurable:!0}),e}()}}]);