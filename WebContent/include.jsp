<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% request.setAttribute("base", request.getContextPath()); %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Expires" content="0">
<base href="${base}"/>
<link rel="stylesheet" type="text/css" href="${base}/resource/ext/resources/css/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="${base}/resource/css/iconSummary.css"/>
<script type="text/javascript" src="${base}/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="${base}/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="${base}/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="${base}/resource/js/lib/web.util.js?t=20131101"></script>
<script type="text/javascript">
function _error(title,obj,fn){return show(_getSimpleMsgJsonObj(obj,title,Ext.Msg.OK,fn,Ext.Msg.ERROR));}
function _warn(title,obj,fn){return show(_getSimpleMsgJsonObj(obj,title,Ext.Msg.OK,fn,Ext.Msg.WARNING));}
function _getSimpleMsgJsonObj(obj,defTitle,defBtn,defFn,defIcon){if(!isJson(obj))obj={msg:obj};if(!obj.title&&defTitle)obj.title=defTitle;if(!obj.buttons&&defBtn)obj.buttons=defBtn;if(!obj.icon&&defIcon)obj.icon=defIcon;if(!obj.fn&&defFn)obj.fn=defFn;return obj;}
function _simpleMsg(title,func,obj,fn,isParmObj){obj=_getSimpleMsgJsonObj(obj,title,Ext.Msg.OK,fn);if(isParmObj)return eval("Ext.Msg."+func+"(obj);");return eval("Ext.Msg."+func+"(obj.title,obj.msg,obj.fn,obj.scope);");}
function _init(){Ext.tip.QuickTipManager.init();Ext.Loader.setConfig({enabled:true});if(!isEmpty(initWin))open(initWin);else if(!isEmpty(initView))Ext.create(initView);if(!isEmpty(_initCallBack))_initCallBack();}
Ext.BLANK_IMAGE_URL = (Ext.isIE6 || Ext.isIE7) ? "${base}/resource/ext/resources/s.gif" : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
var _initCallBack=null;

var initWin,initView,isJsonRtv,base="${base}",baseLogin="${base}/login.jsp";
var demoStore = Ext.create("Ext.data.Store", {fields:["id","name"],data:[{"id":"1","name":"name1"},{"id":"2","name":"name2"}]});
/**
 * 返回 Ext.Msg消息窗口 对应的 button 按下时的回调方法
 * Usage: confirm("Are you sure?",getMsgFn(function(button,text){debug("you chose yes");},function(button,text){debug("you chose no");}));
 *
 * @param	yesFn		按YES/OK按钮的回调方法
 * @param	noFn			按NO按钮的回调方法
 * @param	cancelFn	按CANCEL按钮的回调方法
 * @returns {function}
 */
function getMsgFn(yesFn,noFn,cancelFn){return function(button, text){switch(button){case "yes":if(isFunc(yesFn))yesFn(button, text);break;case "no":if(isFunc(noFn))noFn(button, text);break;case "ok":if(isFunc(yesFn))yesFn(button, text);break;case "cancel":if(isFunc(cancelFn))cancelFn(button, text);break;default: return;}};}
window.debug=window.alert;//function(obj,fn){return _simpleMsg("调试","alert",obj,fn);};
window.alert=function(obj,fn){return _simpleMsg("信息","alert",obj,fn);};
window.confirm=function(obj,fn){return _simpleMsg("确认","confirm",obj,fn);};
window.prompt=function(obj,fn){return _simpleMsg("提示","prompt",obj,fn);};
window.show=function(obj,fn){return _simpleMsg("信息","show",obj,fn,true);};
window.error=function(obj,fn){return _error("错误",obj,fn);};
window.warn=function(obj,fn){return _warn("警告",obj,fn);};
window.open=function(idOrObjName){if(isEmpty(idOrObjName))return;var _window = Ext.getCmp(idOrObjName);if(isEmpty(_window)){if("string"==typeof(idOrObjName))_window = eval("Ext.create("+idOrObjName+");");else _window = Ext.create(idOrObjName);}if(!isEmpty(_window))return _window.show();};
window.hide=function(id){if(id&&(id=Ext.getCmp(id)))id.hide();};
window.close=function(id){if(id&&(id=Ext.getCmp(id)))id.close();};
/**
 * 检查 字符串或对象 是否为JSON
 * 注:如果 字符串或对象 为JSON,则将更新isJsonRtv的值为 该对象 或 Ext.JSON.decode(obj) 的值
 *
 * @param	obj	待检查 字符串或对象
 * @returns {Boolean}
 */
function isJson(obj){isJsonRtv=null;var isJson=typeof(obj)=="object"&&Object.prototype.toString.call(obj).toLowerCase()=="[object object]"&&!obj.length;if(isJson){isJsonRtv=obj;return isJson;}if("string"==typeof(obj))return !isEmpty(isJsonRtv=Ext.JSON.decode(obj, true));return false;}
function isEmpty(obj){return "undefined"==typeof(obj)||null==obj;}
function isFunc(obj){return "function"==typeof(obj);}
function setExtVal(id, value, defVal){if(isEmpty(value))value=defVal;if(!isEmpty(id)&!isEmpty(value))Ext.getCmp(id).setValue(value);}
function getExtVal(id, defVal){if(!isEmpty(id)){var value=Ext.getCmp(id);if(isEmpty(value))return null;else value=value.value;if(isEmpty(value))return defVal;else return value;}}
function doForEachChild(id,fn){if(isEmpty(fn)||isEmpty(id)||isEmpty(id=Ext.getCmp(id)))return;id.items.each(function(item,index,length){fn(item,index,length);});}
function resetChildVal(id){doForEachChild(id,function(item){if(!isEmpty(item.reset))item.reset();});}
function validateChildVal(id){var valid=true;doForEachChild(id,function(item){if(!isEmpty(item.isValid)&&!item.isValid())valid=false;});return valid;}
function proxyExceptionHandler(proxy, response, operation, options){requestExceptionHandler(response);}
function requestExceptionHandler(response){var rtv = response.responseText;if(!isJson(rtv))return error("系统错误! (返回值: <br>"+rtv+")");rtv = isJsonRtv;error("系统错误! (返回值: "+rtv.success+" - "+rtv.msg+")");}
/**
 * 加载extjs,及页面js
 * var initWin = Ext.define('OSS.view.WinDemo', {extend : 'Ext.window.Window',...}
 * var initView = Ext.define('OSS.view.ViewDemo', {extend : 'Ext.container.Viewport',...}
 * 同时定义两者时,initWin优先级高于initView
 *
 * @param	fn	回调函数(将在建完页面后调用)
 * @returns {String}
 */
function init(fn){initCallBack=fn;Ext.onReady(_init);}
/**
 * 加载extjs,及页面js
 * var initWin = Ext.define('OSS.view.WinDemo', {extend : 'Ext.window.Window',...}
 * var initView = Ext.define('OSS.view.ViewDemo', {extend : 'Ext.container.Viewport',...}
 * 同时定义两者时,initWin优先级高于initView
 *
 * @param	url			请求URL
 * @param	successFn	返回success==true的回调函数
 * @param	params		请求参数
 * @param	maskBody	请求时的需锁住的屏幕body
 * @param	failureFn	返回success!=true的回调函数
 */
function simpleRequest(url,successFn,params,maskBody,failureFn){
	if(isEmpty(maskBody))maskBody=Ext.getBody();
	var myMask = new Ext.LoadMask(maskBody, { msg: '正在处理, 请稍后...' });
	myMask.show();
	Ext.Ajax.request({
		url : url,
		method : 'post',
		params : params,
		success : function(response, options) {
			var rtv = response.responseText;
			if(!isJson(rtv))return error("系统错误! (返回值: <br>"+rtv+")");
			rtv = isJsonRtv;
			if(rtv.success){if (isFunc(successFn))successFn(rtv);else alert("处理成功!");}
			else if("timeout"==rtv.msg)warn("连接已超时,请重新登录!",function(){top.location.href=baseLogin;});
			else if(isFunc(failureFn))failureFn(rtv);
			else error("处理失败! (返回值: "+rtv.success+"-"+rtv.msg+")");
		},
		failure : requestExceptionHandler,
		callback : function(o, r, n) {
			myMask.hide();
		}
	});
}
</script>
