Ext.define('OSS.view.OrgEdit', {
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
                    region: 'center',
                    id:'orgEditForm',
                    bodyPadding: 10,
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            width: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoad32',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoad32Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk32',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk32Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel32',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel32Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'triggerfield',
                            anchor: '100%',
                            id: 'parentOrgId',
                            name: 'parentOrgId',
                            fieldLabel: '父级机构',
                            allowBlank: false,
                            displayField: 'name',
                            triggerCls: 'x-form-search-trigger',
                            onTriggerClick: function(e) {
                            	parentChooseClick();
                            }
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'orgName',
                            name: 'orgName',
                            fieldLabel: '机构名称',
                            allowBlank: false,
                            blankText: '您未输入内容！',
                            emptyText: '机构名称必须输入'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'customNo',
                            name: 'customNo',
                            fieldLabel: '机构号',
                            allowBlank: false,
                            blankText: '您未输入内容！',
                            maxLength: 10,
                            maxLengthText: '请输入最多10位数字',
                            minLength: 4,
                            minLengthText: '请输入至少4位数字'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'remark',
                            name: 'remark',
                            fieldLabel: '备注',
                            blankText: '您未输入内容！',
                            emptyText: '备注不能超过50个汉字'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'parentId',
                            name: 'parentId'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'orgId',
                            name: 'orgId'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonLoad32Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'重置事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonOk32Click: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    	
    	var formpPanel = Ext.getCmp("orgEditForm");
    	var params=formpPanel.getForm().getValues();
    	if (1==1) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/org/org_updateOrg',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交成功!',buttons: Ext.Msg.OK,closable : false});
    	                }else if(action.result.msg == 'ERROR') {  
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
    	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {
    	            	alert(action.failureType);
    	                switch (action.failureType) {    
    	                case Ext.form.Action.CLIENT_INVALID:    
    	                    Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');    
    	                    break;    
    	                case Ext.form.Action.CONNECT_FAILURE:    
    	                    Ext.Msg.alert('错误提示', '网络连接异常！');    
			                var redirect = 'http://localhost:8080/OSS/login.jsp';
			                window.location = redirect;
    	                    break;    
    	                case Ext.form.Action.SERVER_INVALID:    
    	                   Ext.Msg.alert('错误提示', "您的输入用户信息有误，请核实后重新输入！");    
    	                   simple.form.reset();      
    	                }  
    	            }  
    		});
    	}
    },

    onButtonCancel32Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'关闭事件',buttons: Ext.Msg.OK,closable : false});
    },
    onViewportAfterRender: function(component, eOpts) {
    	editOrg();
    }
});
function editOrg() {
	Ext.Ajax.request({ 
		url: '/OSS/admin/org/org_editOrg',
		method : 'post', 
		params : {
    		//id : this.parent.getSelectId()
    	},
    	 success:editOrgInfo,
		
		 failure : function(response){}
	});
}
// 展示机构详细信息
function editOrgInfo(result){

	alert('执行成功');
}

function parentChooseClick(){
	 InitWinLoadExec();
	 winLoadExecChoose.title='资源选择';
	 winLoadExecChoose.width=320;
	 winLoadExecChoose.height=345;
	 winLoadExecChoose.iconCls='icon-noteedit';
	 winLoadExecChoose.html='<iframe id=thisIframe width=310 height=311 frameborder=0 scrolling=auto src=orgChoose.jsp></iframe>' ;
	 winLoadExecChoose.show();
}

var winLoadExecChoose;
function InitWinLoadExec(){
	winLoadExecChoose=Ext.create('Ext.window.Window',{
    resizable:      false, //变大小   
    maximizable:false,
    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center'
   }); 
}

window.setChooseSource = function(node_id, node_text) {
    try {
    	Ext.getCmp("parentId").setValue(node_id);
    	Ext.getCmp("parentOrgId").setValue(node_text);
    } catch (e) { }
};

var InitHaha=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgEdit();
}