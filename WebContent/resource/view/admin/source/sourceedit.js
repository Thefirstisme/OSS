Ext.define('OSS.view.SourceEdit', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeWhetherStat =GetKeyValueStore('/OSS/admin/para/para_getWhetherStat');
        var storeSourceType =GetKeyValueStore('/OSS/admin/source/source_getSourceType');
        var storeSourceAction =GetKeyValueStoreAction('/OSS/admin/source/source_getSource_Action');
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    margins: '',
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
                            blankText: '您未输入内容！',
                            emptyText: '资源名称必需输入'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbModuleTypeAdd',
                            name: 'cmbModuleTypeAdd',
                            fieldLabel: '资源类型',
                            emptyText: '资源类型必需选择',
                            displayField: 'name',
                            valueField: 'id',
                            forceSelection: true,
                            queryMode: 'local',
                            typeAhead: true,
                            selectOnFocus: true,
                            editable: false,
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
                            fieldLabel: '资源许可',
                            displayField: 'name',
                            valueField: 'id',
                            emptyText: '请选择资源许可',
                            store: storeSourceAction
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowAddNodeUrl',
                            name: 'txtWindowAddNodeUrl',
                            fieldLabel: '资源地址',
                            blankText: '您未输入内容！',
                            emptyText: '请填写资源地址',
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
                            emptyText: '请选择资源图标',
                            store: IconStore,
                            grow: true,
                            typeAhead : false,
                            minChars : 1,
                            queryMode    : 'local',
                            listConfig: {
                                maxHeight: 160,
                            	emptyText : '<div style="line-height:22px;padding:2px 10px">没有找到匹配的图标</div>', 
                                getInnerTpl: function() {
                                    var tpl = '<div>'+
                                              '<img src="../../resource/images/icons/icoSummary/{iso2}.png" align="left">&nbsp;&nbsp;'+
                                              '{name}</div>';
                                    return tpl;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbWindowAddNodeIsWork',
                            name: 'cmbWindowAddNodeIsWork',
                            fieldLabel: '是否工作平台',
                            displayField: 'name',
                            valueField: 'id',
                            store: storeWhetherStat
                        }
//                        ,
//                        {
//                            xtype: 'combobox',
//                            anchor: '100%',
//                            id: 'cmbRoleGroupAdd',
//                            name: 'cmbRoleGroupAdd',
//                            fieldLabel: '角色组归属',
//                            displayField: 'name',
//                            valueField: 'id',
//                            store: storeTest
//                        }
                        ,
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'hidparentId',
                            name: 'hidparentId'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'hidsourceId',
                            name: 'hidsourceId'
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
        	,listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonLoad12Click: function(button, e, eOpts) {
    	Ext.getCmp('cmbModuleTypeAdd').store.load();
    	Ext.getCmp('cmbWindowAddNodeIsWork').store.load();
    	PageUIDataInit();
    },

    onButtonOk12Click: function(button, e, eOpts) {
    	var formpPanel = this.down('form');//Ext.getCmp("frmAdd");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/source/source_editSource',  
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
    onViewportAfterRender: function(component, eOpts) {
    	setTimeout(function () { PageUIDataInit();}, 500);
    },
    onCmbModuleTypeAddSelect: function(combo, records, eOpts) {
    	Ext.getCmp("cmbActionAdd").store=GetKeyValueStoreAction();
    	actionSelectRef();
    }
});
function parentChooseClick(){
	InitWinLoadExec('资源选择',320,345,'icon-noteedit', 'SourceChoose.jsp');
};
var InitSourceEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.SourceEdit();
	//Ext.getCmp('cmbModuleTypeAdd').store.load();
	//Ext.getCmp('cmbWindowAddNodeIsWork').store.load();
	//Ext.getCmp("cmbActionAdd").store=GetKeyValueStoreAction();
	//alert(Ext.getCmp("cmbModuleTypeAdd").getValue());
	//actionSelectRef();
};
var PageUIDataInit=function(){
	var id = OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_getSource",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.getCmp("txtWindowAddNodeCode").setValue(data[0].sourceCode);
				 Ext.getCmp("txtWindowAddNodeName").setValue(data[0].sourceName);
				 Ext.getCmp("cmbModuleTypeAdd").setValue(data[0].sourceTypeId);
				 Ext.getCmp("txtWindowAddNodeUrl").setValue(data[0].sourceUrl);
				 Ext.getCmp("cmbWindowAddNodeIcon").setValue(data[0].iconCss);
				 Ext.getCmp("cmbWindowAddNodeIsWork").setValue(data[0].isWorkPlan);
				 Ext.getCmp("hidparentId").setValue(data[0].parentSourceId);
				 Ext.getCmp("ddlWindowAddNodeParents").setValue(data[0].parentSourceName);
				 Ext.getCmp("hidsourceId").setValue(data[0].sourceId);		
				 //alert(Ext.getCmp("cmbModuleTypeAdd").getValue()+",11");
				 Ext.getCmp("cmbActionAdd").store=GetKeyValueStoreAction();
				 actionSelectRef();
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
		 }
	});
};
var actionSelectRef=function()
{
	var moduleActionStore=Ext.getCmp("cmbActionAdd").store;
	moduleActionStore.load();
	moduleActionStore.on("load",function(){	
		Ext.getCmp("cmbActionAdd").setValue(moduleActionStore.getAt(0));
	});
};
var  GetKeyValueStoreAction=function()
{
	var url='/OSS/admin/source/source_getSource_Action';
	var id='0';
	var cmbType=Ext.getCmp("cmbModuleTypeAdd");
	if(cmbType)
		{
			 id=cmbType.getValue();
		}
		url=url+"?id="+id;
		var store = new Ext.data.JsonStore({
	    	autoLoad: false,
	    	idProperty: 'id',
	    	remoteSort: false,
	    	fields: [{name:'id',type:'string'},
	    	         {name:'name',type:'string'}
	    	        ],
	    	proxy:new Ext.data.HttpProxy({
	    		url: url,
	        	reader:{
	        		type:'json',
	        		root:'users'
	        	}
	    	})
		});
		return store;
};
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