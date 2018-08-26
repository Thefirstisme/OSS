String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
var  GetKeyValueStore=function(url,isLoad, fields)
{
	if(isLoad==null){
		isLoad=true;
	}
	if(fields==null){
		fields = [{name:'id',type:'string'},
				{name:'name',type:'string'}];
	}
	return new Ext.data.JsonStore({
    	autoLoad: isLoad,
    	idProperty: 'id',
    	remoteSort: false,
    	fields: fields,
    	proxy:new Ext.data.HttpProxy({
    		url: url,
        	reader:{
        		type:'json',
        		root:'data'
        	}
    	})
	});
};
var kValFields=[{name:'id',type:'string'},{name:'name',type:'string'}];
var pageSizeData=[ {"id":"5","name":"5"},
          		{"id":"10","name":"10"},
          		{"id":"20","name":"20"},
          		{"id":"50","name":"50"},
          		{"id":"100","name":"100"},
          		{"id":"200","name":"200"}
          		//,{"id":"1000","name":"1000"}
              ];
var storePageSize = Ext.create('Ext.data.Store', { 
	autoLoad: false,
	idProperty: 'id',
	fields: kValFields, 
    data : pageSizeData
});
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}
/**
 * 获得Url参数值
 * @param param
 * @returns
 */
var getUrlParam=function(param) {
	var params = Ext.urlDecode(location.search.substring(1));
	return param ? params[param] : params;
};

var OSS = {};
OSS.getAppName = '/OSS';
Ext.Ajax.timeout = 60000*3;
Ext.BLANK_IMAGE_URL = (Ext.isIE6 || Ext.isIE7) ? OSS.getAppName+'/resource/ext/resources/s.gif' : 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

OSS.getExtControl=function(id){
	return Ext.getCmp(id);
};
OSS.getUrlParam=function(param) {
	var params = Ext.urlDecode(location.search.substring(1));
	return param ? params[param] : params;
};
//用来接收传递的userId属性
OSS.paraName='userId';
OSS.userId = getUrlParam(OSS.paraName);

//已上报的报文状态
OSS.MsgStatusSuccessful='1';
//上报中的报文状态
OSS.MsgStatusReporting='3';
//未上报的报文状态
OSS.MsgStatusUnreport='0';
//上报失败的报文状态
OSS.MsgStatusFailure='2';

OSS.getExtValue=function(id){
	var ct=Ext.getCmp(id);
	if(ct!=null && ct.getValue()!=null && ct.getValue()!='undefined') return ct.getValue();
	else return "";
};
OSS.getExtRawValue=function(id){
	var ct=Ext.getCmp(id);
	if(ct!=null && ct.getRawValue()!=null)return ct.getRawValue();
	else return "";
};
OSS.setExtValue=function(id,val){
	var control=Ext.getCmp(id);
	if(control!=null) control.setValue(val);
};
OSS.dateFormat=function(value){ 
    if(null != value){ 
        return Ext.Date.format(new Date(value),'Y-m-d'); 
    }else{ 
        return null; 
    }
};
OSS.dateFormatYearMonth=function(value){ 
    if(null != value){ 
        return Ext.Date.format(new Date(value),'Y-m'); 
    }else{ 
        return null; 
    }
};
OSS.AlertInfo=function(msg,fn){
	Ext.MessageBox.show({title: '信息提示',msg :msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO,closable:Ext.isFunction(fn),
		fn:function(btn){if(btn=='ok'){if(Ext.isFunction(fn)){fn();}}}
		});
};
OSS.AlertWarning=function(msg,fn){
	Ext.MessageBox.show({title: '警告提示',msg :msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,closable:Ext.isFunction(fn),
		fn:function(btn){if(btn=='ok'){if(Ext.isFunction(fn)){fn();}}}
		});
};
OSS.AlertError=function(msg,fn){
	Ext.MessageBox.show({title: '错误提示',msg :msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR,closable:Ext.isFunction(fn),
		fn:function(btn){if(btn=='ok'){if(Ext.isFunction(fn)){fn();}}}
		});
};
OSS.OpenLink = function(cfg){
	cfg = typeof cfg == 'object' ? cfg : {};
	var mask=null;
	if(maskObj!=null){
		mask=new Ext.LoadMask(maskObj.body, { msg: maskObj.msg||'正在加载数据,请稍等...' });
	}
	Ext.Ajax.request({
	    url: cfg.url||'',
	    params :cfg.params||{e:''},
	    method : cfg.method||'post',
	    success : function(response, opts){
	      	var rs = response.responseText?Ext.decode(response.responseText):{};		
			if(rs.success){
				if(Ext.isFunction(cfg.onSuccess)){
					Ext.Function.bind(cfg.onSuccess,cfg.scope||window,[rs, opts])();
				}
			}else{
				Ext.Msg.show({
				     title:'警告提示',
				     msg: rs.msg||'Error!!',
				     //width : 280,
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.WARNING,
				     scope : cfg.scope,
				     closable : false,
				     fn : function(btn){
				     	if(Ext.isFunction(cfg.onFailure)){
				     		Ext.Function.bind(cfg.onFailure,cfg.scope||window,[rs, opts,btn])();
						}
				     }
				});
			}				
      },
      failure : function(response, opts){
			var rs = response.responseText?Ext.decode(response.responseText):{};
			Ext.Msg.show({
			     title:'Message',
			     msg: rs.msg||'Error!!',
			     width : 280,
			     buttons: Ext.Msg.OK,
			     icon: Ext.Msg.WARNING,
			     closable : false,
			     scope : cfg.scope,
			     fn : function(btn){
			     	if(Ext.isFunction(cfg.onFailure)){
			     		Ext.Function.bind(cfg.onFailure,cfg.scope||window,[rs, opts,btn])();
					}
			     }
			});
      },
      callback: function(o, r, n){
		 if(mask!=null){
			 myMask.hide();
		 }
	  }
	});
};
OSS.GridPanel={};
OSS.GridPanel.getSelectCount=function(grid){
	var record = grid.getSelectionModel().getSelection();
	return record.length;
};
OSS.GridPanel.getSelectId=function(grid,id){
	var record = grid.getSelectionModel().getSelection();
	var result="";
	if(record.length>0){
		result=record[0].get(id);
	}
	return result;
};
OSS.GridPanel.getSelectIdList=function(grid,id){
	var record = grid.getSelectionModel().getSelection();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+record[i].get(id);
	}
	return idList;
};
OSS.GridPanel.getColumnsList=function(grid){
	var gridColumns = grid.headerCt.getGridColumns();
	var list="";
	for (var i = 0; i < gridColumns.length; i++) {
		 var colType=gridColumns[i].xtype;
		 if(colType!='rownumberer' && colType!='actioncolumn' && colType!='actiontextcolumn'){
			 if(list.length>0){
				 list+=";";
			 }
			 list+=gridColumns[i].dataIndex+":"+gridColumns[i].text;
		 }
    }
	return list;
};
OSS.GridPanel.clearSelect=function(grid){
	grid.getSelectionModel().clearSelections();
};
OSS.TreePanel={};
OSS.TreePanel.getSelectCount=function(treepanel){
	var record=treepanel.getView().getChecked();
	return record.length;
};
OSS.TreePanel.getSelectId=function(treepanel){
	var record=treepanel.getView().getChecked();
	var result="";
	if(record.length>0){
		result=record[0].get('id');
	}
	return result;
};
OSS.TreePanel.getSelectIdList=function(treepanel){
	var record=treepanel.getView().getChecked();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+record[i].get('id');
	}
	return idList;
};
OSS.getMask=function(target,msg,isMsgFotmat){
	if(msg==null || msg==''){
		msg=OSS.Mask.getLoadingText();
	}else{
		if(isMsgFotmat!=null && isMsgFotmat==true){
			msg="正在"+msg+"数据,请稍等...";//OSS.Mask.MsgTemplate().replace(/{0}/g, msg);//String.format(OSS.Mask.MsgTemplate(),msg);
		}
	}
	if(target==null){
		target=Ext.getBody();
	}
	return new Ext.LoadMask(target, { msg: msg });
};
OSS.Mask={};
OSS.Mask.MsgTemplate=function(){
	return '正在{0}数据,请稍等...';
}; 
OSS.Mask.getLoadingText=function(){
	return "正在加载数据,请稍等...";//OSS.Mask.MsgTemplate().replace(/{0}/g, '加载');//String.format(OSS.Mask.MsgTemplate(),'加载');
};
OSS.Mask.getSubmitText=function(){
	return "正在提交数据,请稍等...";//OSS.Mask.MsgTemplate().replace(/{0}/g, '提交');//String.format(OSS.Mask.MsgTemplate(),'提交');
};
OSS.Mask.getInitText=function(){
	return "正在初始化数据,请稍等...";//OSS.Mask.MsgTemplate().replace(/{0}/g, '初始化');//String.format(OSS.Mask.MsgTemplate(),'初始化');
};
Ext.override(Ext.toolbar.Paging, {
	getPageData : function(){
		var store = this.store,
		totalCount = store.getTotalCount();
		if(totalCount === 0){
			totalCount = 1 ;
		}
		return {
			total : totalCount,
			currentPage : store.currentPage,
			pageCount: Math.ceil(totalCount / store.pageSize),
			fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
			toRecord: Math.min(store.currentPage * store.pageSize, totalCount)
		};
	}
});
/**
 * 打开窗口
 * @type 
 */
var winCommon;
function winOpen(title,width,height,icoCls,url,hideFunction){
	if(hideFunction==null){
		hideFunction=defaultHideFun;
	}
	winCommon=Ext.create('Ext.window.Window',{
	title: title,
	width: width,
	height:height,
	iconCls: icoCls,
	resizable:      false, 
    maximizable:false,
    modal: true,
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center',
    items: {
        xtype: 'component',
        autoEl: {
            tag: 'iframe',
            style: 'height: 100%; width: 100%; border: none;',
            src: url
        },
        listeners: {
            load: {
                element: 'el',
                fn: function () {
                    this.parent().unmask();
                }
            },
            render: function () {
                this.up('panel').body.mask('正在加载，请稍候... ...');
            }
        }
    },
    listeners: {
        hide: {
            fn: hideFunction
        }
    }
   }); 
	winCommon.show();
};
// 隐藏窗口
var winClose=function(){
	winCommon.hide();
}; 

var defaultHideFun=function(){};
// 刷新组件
function refresh(components){
	Ext.getCmp(components).store.load();
}

// 检查某组件中是否有选中
function checkSelect(components){
	var record = Ext.getCmp(components).getSelectionModel().getSelection();

	if(record.length == 0){
		Ext.MessageBox.show({ 
			title:"提示", 
			msg:"请先选择您要操作的行!", 
			icon: Ext.MessageBox.INFO, 
			buttons: Ext.Msg.OK 
		});
		return false;
	}
	else if(record.length > 1){
		Ext.MessageBox.show({ 
			title:"提示", 
			msg:"请选择一条记录!", 
			icon: Ext.MessageBox.INFO, 
			buttons: Ext.Msg.OK 
		});
		return false;
	}
	// 清除选择
	//Ext.getCmp(components).getSelectionModel().clearSelections();
	return true;
}

function clickIE4(){
	if (event.button==2){
		return false;
	}
}
function clickNS4(e){
	if (document.layers||document.getElementById&&!document.all){
		if (e.which==2||e.which==3){
			return false;
		}
	}
}
function OnDeny(){
	if(event.ctrlKey || event.keyCode==78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode==115){
		return false;
	}
}
if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS4;
	document.onkeydown=OnDeny();
}else if (document.all&&!document.getElementById){
	document.onmousedown=clickIE4;
	document.onkeydown=OnDeny();
}
document.oncontextmenu=new Function("return false");

Ext.override(Ext.form.RadioGroup, {
    getValue : function() {
        var v;
        this.items.each(function(item) {
            if(item.checked===true){
                v = item.inputValue;
                return false;
            }
        });
        return v;
    },
    setValue : function(v) {
        if (this.rendered) {
            this.items.each(function(item) {
                item.setValue(item.inputValue == v);
            });
        } else {
            for (k in this.items) {
                this.items[k].checked = this.items[k].inputValue == v;
            }
        }
    }
});
 
