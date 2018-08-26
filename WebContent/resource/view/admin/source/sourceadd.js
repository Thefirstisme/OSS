Ext.define('OSS.view.SourceAdd', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeTest = Ext.create('Ext.data.Store', { 
            fields: ['id', 'name'],
            data : [ 
                    {"id":"5","name":"测试数据1"},
            		{"id":"10","name":"测试数据2"}
                ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    margins: '',
                    id: 'frmAdd',
                    region: 'center',
                    border: false,
                    padding: '',
                    bodyPadding: 10,
                    title: '',
                    items: [
						{
						    xtype: 'triggerfield',
						    anchor: '100%',
						    fieldLabel: 'Label',
						    editable: false,
						    triggerCls: 'x-form-search-trigger',
						    fieldLabel: '父级资源',
						    id: 'ddlWindowAddNodeParents',
                            name: 'ddlWindowAddNodeParents',
                            onTriggerClick: function(e) {
                                	parentChooseClick();
                            }
						},
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowAddNodeCode',
                            name: 'txtWindowAddNodeCode',
                            fieldLabel: '资源代码',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: '您未输入内容！',
                            emptyText: '资源代码必需输入',
                            maxLength: 32
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowAddNodeName',
                            name: 'txtWindowAddNodeName',
                            fieldLabel: '资源名称',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: '您未输入内容！',
                            emptyText: '资源名称必需输入',
                            maxLength: 30
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbModuleTypeAdd',
                            name: 'cmbModuleTypeAdd',
                            fieldLabel: '资源类型',
                            emptyText: '资源类型必需选择',
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: storeSourceType,
                            listeners: {
                                select: {
                                    fn: me.onCmbModuleTypeAddSelect,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbActionAdd',
                            name: 'cmbActionAdd',
                            editable: false,
                            fieldLabel: '资源许可',
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'id',
                            store: moduleActionStore
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowAddNodeUrl',
                            name: 'txtWindowAddNodeUrl',
                            fieldLabel: '资源地址',
                            blankText: '您未输入内容！',
                            maxLength: 100
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbWindowAddNodeIcon',
                            name: 'cmbWindowAddNodeIcon',
                            fieldLabel: '资源图标',
                            displayField: 'name',
                            valueField: 'code',
                            store: IconStore,
                            grow: true,
                            frame:true,
                            typeAhead : false,
                            minChars : 1,
                            queryMode: 'local',
                            autoRender: true,
//                            displayTpl: Ext.create('Ext.XTemplate', [ 
//                                                                     '<tpl for=".">',
//                                                                     '<div class="x-combo-list-item icon-combo-item {code}">',
//                                                                     '{name}',
//                                                                     '</tpl>'
//                                                                 ]),
//                            listeners: {
//                                select: function(combo, records, eOpts){
//                                	this.setIconCls(records[0].data.code);
//                                }
//                            },   
//                         setRawValue: function(value) {
//                        	    var cmbIc = this;
//                        	    value = Ext.value(value, '');
//                        	    cmbIc.rawValue = value;
//                        	    if (cmbIc.inputEl) {
//                        	    	cmbIc.inputEl.dom.innerHTML = value;
//                        	    }
//                        	    return value;
//                        	},
                            listConfig: {
                                maxHeight:160,
                            	emptyText : '<div style="line-height:22px;padding:2px 10px">没有找到匹配的图标</div>', 
                                getInnerTpl: function() {
                                    var tpl = '<div>'+
                                              '<img src="../../resource/images/icons/icoSummary/{iso2}.png" align="left">&nbsp;&nbsp;'+
                                              '{name}</div>';
                                    return tpl;
                                    //return "<img class='{code}'/> {name}";
                                }
                                
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbWindowAddNodeIsWork',
                            name: 'cmbWindowAddNodeIsWork',
                            fieldLabel: '是否工作平台',
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            store: storeWhetherStat,
                            typeAhead: true,
                            queryMode: 'local',
                            triggerAction: 'all',
                            selectOnFocus: true,
                            autoRender: true
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbRoleAdd',
                            name: 'cmbRoleAdd',
                            fieldLabel: '角色归属',
                            editable: false,
                            multiSelect: true,
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: storeRole,
                            listConfig: {
                                maxHeight: 160
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'hidparentId',
                            name: 'hidparentId'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoad12',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoad12Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk12',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk12Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel12',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel12Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonLoad12Click: function(button, e, eOpts) {
    	 Ext.getCmp("txtWindowAddNodeCode").setValue('');
		 Ext.getCmp("txtWindowAddNodeName").setValue('');
		 Ext.getCmp("txtWindowAddNodeUrl").setValue('');
    },

    onButtonOk12Click: function(button, e, eOpts) {
    	var formpPanel = Ext.getCmp("frmAdd");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/source/source_addSource',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                	Ext.MessageBox.show({title : '事件信息',msg :'数据提交成功!',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
    	                }else if(action.result.msg == 'ERROR') {  
    	                	Ext.MessageBox.show({title : '事件信息',msg :'数据提交失败!',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
    	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	            	 Ext.Msg.alert('错误提示', action.result.msg);    
    	            }  
    		});
    	}
    },
    onButtonCancel12Click: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    },
    onCmbModuleTypeAddSelect: function(combo, records, eOpts) {
    	//Ext.getCmp("cmbActionAdd").store=GetKeyValueStoreAction();
    	actionSelectRef();
    }
});
var storeWhetherStat =GetKeyValueStore('/OSS/admin/para/para_getWhetherStat',false);
var storeSourceType =GetKeyValueStore('/OSS/admin/source/source_getSourceType',false);
var moduleActionStore=GetKeyValueStore('/OSS/admin/source/source_getSource_Action',false);
var storeRole =GetKeyValueStore('/OSS/admin/role/role_getRoleSelect',false);
function parentChooseClick(){
	 InitWinLoadExec('资源选择',320,345,'icon-noteedit', 'SourceChoose.jsp');
};
var InitSourceAdd=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.SourceAdd();
	getSourceParentId();
	pageInitData();
};
var pageInitData=function(){
	//var isWorkStore=Ext.getCmp("cmbWindowAddNodeIsWork").store;
	var myMask = OSS.getMask(Ext.getBody());
    myMask.show();
    var f1=false;
    var f2=false;
    var f3=false;
	storeWhetherStat.load({callback:function(s,options,success){
		if(success==true){
			Ext.getCmp("cmbWindowAddNodeIsWork").setValue(storeWhetherStat.getAt(0));
		}
		f1=true;
		if(f1==true && f2==true && f3==true){
			myMask.hide();
		}
	 }});
	//var moduleTypeStore=Ext.getCmp("cmbModuleTypeAdd").store;
	storeSourceType.load({callback:function(s,options,success){
		if(success==true){
			Ext.getCmp("cmbModuleTypeAdd").setValue(storeSourceType.getAt(0));
			actionSelectRef();
		}
		f2=true;
		if(f1==true && f2==true  && f3==true){
			myMask.hide();
		}
	 }});	
	storeRole.load({callback:function(s,options,success){
		f3=true;
		if(f1==true && f2==true  && f3==true){
			myMask.hide();
		}
	}});
};
var actionSelectRef=function()
{
	moduleActionStore.load({
		callback:function(s,options,success){
			if(success==true){
				Ext.getCmp("cmbActionAdd").setValue(moduleActionStore.getAt(0));
			}
		}
	});
};

//var moduleActionStore=new Ext.data.JsonStore({
//	autoLoad: false,
//	idProperty: 'id',
//	remoteSort: false,
//	fields: [{name:'id',type:'string'},
//	         {name:'name',type:'string'}
//	        ],
//	proxy:new Ext.data.HttpProxy({
//		url: '/OSS/admin/source/source_getSource_Action',
//    	reader:{
//    		type:'json',
//    		root:'users'
//    	}
//	})
//});
moduleActionStore.on('beforeload', function (store, options) {
    var new_params = { 
    		id:OSS.getExtValue('cmbModuleTypeAdd')
		};
    Ext.apply(store.proxy.extraParams, new_params);
});
//获得父级
function getSourceParentId()
{
    var id = OSS.getUrlParam('t');
	var nodeId=OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_getSource",
		method : 'post', 
		params : {id: nodeId},
		success : function(response, options){ 
			var data = Ext.JSON.decode(response.responseText);  
			if(id=="1")
			{
				Ext.getCmp("hidparentId").setValue(data[0].parentSourceId);
				Ext.getCmp("ddlWindowAddNodeParents").setValue(data[0].parentSourceName);
			}
			else
			{
				Ext.getCmp("hidparentId").setValue(data[0].sourceId);
				Ext.getCmp("ddlWindowAddNodeParents").setValue(data[0].sourceName);
			}
		 },
		 failure : function(response){ 
		 }
	});
}

var winLoadExecChoose;
function InitWinLoadExec(title,width,height,icoCls,url){
	winLoadExecChoose=Ext.create('Ext.window.Window',{
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
    }
   }); 
	winLoadExecChoose.show();
};

window.setChooseSource = function(node_id, node_text) {
    try {
    	Ext.getCmp("hidparentId").setValue(node_id);
    	Ext.getCmp("ddlWindowAddNodeParents").setValue(node_text);
    } catch (e) { }
};