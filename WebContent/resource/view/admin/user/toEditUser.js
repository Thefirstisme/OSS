Ext.define('OSS.view.ToEditUser', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'fit'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id:'userEditForm',
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
                            disabled: true,
                            fieldLabel: '归属机构'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'userAccount',
                            name:'userAccount',
                            disabled: true,
                            fieldLabel: '用户号'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'userName',
                            name:'userName',
                            disabled: true,
                            fieldLabel: '姓名'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'empId',
                            name:'empId',
                            disabled: true,
                            fieldLabel: '工号'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'assId',
                            name:'assId',
                            disabled: true,
                            fieldLabel: '考核序列'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'positionName',
                            name:'positionName',
                            disabled: true,
                            fieldLabel: '职务'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'isDepaLeader',
                            name:'isDepaLeader',
                            disabled: true,
                            fieldLabel: '是否机构负责人'
                        },
//                        {
//                            xtype: 'textfield',
//                            anchor: '100%',
//                            id:'loginMode',
//                            name:'loginMode',
//                            disabled: true,
//                            fieldLabel: '登录方式'
//                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'entryDt',
                            name:'entryDt',
                            disabled: true,
                            fieldLabel: '入职日期'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'tel',
                            name:'tel',
                            fieldLabel: '联系电话'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'mobile',
                            name:'mobile',
                            fieldLabel: '手机'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id:'email',
                            name:'email',
                            fieldLabel: '电子邮箱'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id:'userId',
                            name:'userId'
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
    // 加载用户信息
    onViewportAfterRender: function(component, eOpts) {
    	loadUserInfo();
    },
    // 重置
    onButtonLoad32Click: function(component, eOpts) {
    	loadUserInfo();
    },
    
    // 提交
    onButtonOk32Click: function(component, eOpts) {
    	
    	var formpPanel = Ext.getCmp("userEditForm");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/user/user_editUserInfo',  
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
    
    // 关闭
    onButtonCancel32Click: function(component, eOpts) {
    	window.parent.editUserClose();
    }

});

function loadUserInfo() {
	Ext.Ajax.request({
		url : '/OSS/admin/user/user_getUserInfo',
		method : 'post',
		success : showUserInfo,

		failure : function(response) {
			Ext.Msg.show({title : '事件消息',msg :'加载失败',buttons: Ext.Msg.OK,closable : false});
		}
	});
}

// 展示机构详细信息
function showUserInfo(result){
	var c1 = result.responseText; 
	var c2 = Ext.JSON.decode(c1);
	// 用户号
	Ext.getCmp("userId").setValue(c2.userId);
	// 用户号
	Ext.getCmp("userAccount").setValue(c2.userAccount);
	// 姓名
	Ext.getCmp("userName").setValue(c2.userName);
	// 工号
	Ext.getCmp("empId").setValue(c2.empId);
	// 考核序列
	Ext.getCmp("assId").setValue(c2.assId);
	// 职务
	Ext.getCmp("positionName").setValue(c2.positionName);
	// 是否机构负责人
	Ext.getCmp("isDepaLeader").setValue(c2.isDepaLeader);
	// 登录方式
	//Ext.getCmp("loginMode").setValue(c2.loginMode);
	// 入职日期
	Ext.getCmp("entryDt").setValue(c2.entryDt);
	// 联系电话
	Ext.getCmp("tel").setValue(c2.tel);
	// 联系电话
	Ext.getCmp("mobile").setValue(c2.mobile);
	// 联系电话
	Ext.getCmp("email").setValue(c2.email);
}

var InitToEditUser = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.ToEditUser();
};