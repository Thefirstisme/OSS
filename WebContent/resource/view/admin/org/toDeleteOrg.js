Ext.define('OSS.view.OrgDelete', {
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
                    id:'orgDeleteForm',
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
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'orgName',
                            name: 'orgName',
                            fieldLabel: '机构名称',
                            allowBlank: false,
                            blankText: '您未输入内容！',
                            emptyText: '机构名称必须输入'
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
    	Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    	
    	var formpPanel = Ext.getCmp("orgDeleteForm");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/org/org_deleteOrg',  
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
    	                switch (action.failureType) {    
    	                case Ext.form.Action.CLIENT_INVALID:    
    	                    Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');    
    	                    break;    
    	                case Ext.form.Action.CONNECT_FAILURE:    
    	                    Ext.Msg.alert('错误提示', '网络连接异常！');    
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
    }
});

var InitOrgDelete=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgDelete();
}