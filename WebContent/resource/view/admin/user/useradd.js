Ext.define('OSS.view.UserInfoAdd', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'fit'
    },
    
    initComponent: function() {
        var me = this;
        Ext.define('State', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'string', name: 'abbr'},
                {type: 'string', name: 'name'},
                {type: 'string', name: 'slogan'}
            ]
        });
         var storeUserType = GetKetValueStore('/OSS/admin/para/para_getUserType');
         var storeUserPosition = GetKetValueStore('/OSS/admin/para/para_getUserPosition');
         var storeWhetherStat =GetKetValueStore('/OSS/admin/para/para_getWhetherStat');
         var storeLoignMode = GetKetValueStore('/OSS/admin/para/para_getLoignMode');
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'frmAdd',
                    width: 400,
                    bodyPadding: 10,
                    border: false,
                    title: '',
                    fieldDefaults: 'labelWidth: 90,msgTarget: \'side\',autoFitErrors: false',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtUserAccount',
                            name: 'txtUserAccount',
                            width: 300,
                            fieldLabel: '用户号',
                            blankText: '系统将自动生成用户号',
                            emptyText: '系统将自动生成用户号',
                            disabled: true,
                            allowBlank: false,
                            msgTarget: 'side',
                            maxLength: 8,
                            maxLengthText: '用户号不能超过8位！'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtUserName',
                            name: 'txtUserName',
                            width: 300,
                            fieldLabel: '姓名',
                            blankText: '您未输入姓名',
                            allowBlank: false,
                            msgTarget: 'side',
                            emptyText: '请输入姓名',
                            maxLength: 30,
                            maxLengthText: '姓名不能超过30位！'	
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txEmpId',
                            name: 'txEmpId',
                            width: 300,
                            fieldLabel: '工号',
                            blankText: '您未输入工号',
                            allowBlank: false,
                            msgTarget: 'side',
                            emptyText: '请输入工号',
                            maxLength: 8,
                            maxLengthText: '工号不能超过8位'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '90%',
                            id: 'cmdUserType',
                            name: 'cmdUserType',
                            width: 300,
                            fieldLabel: '用户类型',
                            selectOnFocus: true,
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                        	displayField: 'name',
                            store: storeUserType,
		                    allowBlank: false,
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '90%',
                            id: 'cmbPosition',
                            name: 'cmbPosition',
                            width: 300,
                            fieldLabel: '用户职务',
                            selectOnFocus: true,
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            displayField: 'name',
                            store: storeUserPosition,
                            valueField: 'id',
                            listConfig: {
                                maxHeight:160}
                        },
                        {
                            xtype: 'combobox',
                            anchor: '90%',
                            id: 'cmbIsDeparmentLeader',
                            name: 'cmbIsDeparmentLeader',
                            width: 300,
                            fieldLabel: '是否机构负责人',
                            queryMode: 'local',
                            editable: false,
                            typeAhead: true,
                            displayField: 'name',
                            store: storeWhetherStat,
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtUserPhone',
                            name: 'txtUserPhone',
                            width: 300,
                            fieldLabel: '联系电话',
                            emptyText: '请输入联系电话'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtMobile',
                            name: 'txtMobile',
                            width: 300,
                            fieldLabel: '手机号码',
                            emptyText: '请输入手机号码'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtEmail',
                            name: 'txtEmail',
                            width: 300,
                            fieldLabel: '电子邮箱',
                            emptyText: '请输入电子邮件地址'
                        },
//                        {
//                            xtype: 'combobox',
//                            anchor: '90%',
//                            id: 'cmbLoginMode',
//                            name: 'cmbLoginMode',
//                            width: 300,
//                            fieldLabel: '登录方式',
//                            selectOnFocus: true,
//                            editable: false,
//                            queryMode: 'local',
//                            typeAhead: true,
//                            displayField: 'name',
//                            store: storeLoignMode,
//                            valueField: 'id'
//                        },
                        {
                            xtype: 'datefield',
                            anchor: '90%',
                            id: 'dateEntryDate',
                            name: 'dateEntryDate',
                            width: 300,
                            fieldLabel: '入职日期',
                            editable: false,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            disabled: true,
                            width: 300,
                            fieldLabel: '初始密码',
                            value: 123456
                        }
                        ],
                        dockedItems: [
                                      {
                                          xtype: 'toolbar',
                                          dock: 'bottom',
                                          id: 'toolsMain',
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  id: 'btnLoad',
                                                  iconCls: 'icon-arrowrefreshsmall',
                                                  text: '重置',
                                                  listeners: {
                                                      click: {
                                                          fn: me.onBtnLoadClick,
                                                          scope: me
                                                      }
                                                  }
                                              },
                                              {
                                                  xtype: 'tbfill'
                                              },
                                              {
                                                  xtype: 'button',
                                                  id: 'btnOK',
                                                  iconCls: 'icon-databasesave',
                                                  text: '提交',
                                                  listeners: {
                                                      click: {
                                                          fn: me.onBtnOKClick,
                                                          scope: me
                                                      }
                                                  }
                                              },
                                              {
                                                  xtype: 'button',
                                                  id: 'btnCancel',
                                                  iconCls: 'icon-doorout',
                                                  text: '关闭',
                                                  listeners: {
                                                      click: {
                                                          fn: me.onBtnCancelClick,
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

    onBtnLoadClick: function(button, e, eOpts) {
    	Ext.getCmp("frmAdd").getForm().reset();
    },

    onBtnOKClick: function(button, e, eOpts) {
    	var formpPanel = Ext.getCmp("frmAdd");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/user/user_addUser',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {
    	                	var userAccount = action.result.userAccount;
    	                    //window.location.href="main.jsp"; 
    	                	Ext.getCmp("txtUserAccount").setValue(userAccount);
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交成功！用户名为【' + userAccount + '】',buttons: Ext.Msg.OK,closable : false});
    	                }else if(action.result.msg == 'ERROR') {  
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
    	                }else if(action.result.msg == 'EMPID_USED') {  
    	                	Ext.Msg.show({title : '事件消息',msg :'工号已存在，请重新输入!',buttons: Ext.Msg.OK,closable : false});
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
    onBtnCancelClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.dataRefresh();this.parent.window.winLoadExec.hide();}, 1);
    }

});
var InitUserInfoAdd=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoAdd();
};
var  GetKetValueStore=function(url)
{
	var store = new Ext.data.JsonStore({
    	root: 'users',
    	autoLoad: true,
    	totalProperty: 'totalCount',
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