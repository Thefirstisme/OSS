Ext.define('OSS.view.UserInfoEdit', {
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
         var storeUserType = GetKeyValueStore('/OSS/admin/para/para_getUserType');
         var storeUserPosition = GetKeyValueStore('/OSS/admin/para/para_getUserPosition');
         var storeWhetherStat =GetKeyValueStore('/OSS/admin/para/para_getWhetherStat');
         var storeLoignMode = GetKeyValueStore('/OSS/admin/para/para_getLoignMode');
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'frmEdit',
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
                            blankText: '您未输入用户名',
                            emptyText: '请输入用户名',
                            disabled: true,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txtUserName',
                            name: 'txtUserName',
                            width: 300,
                            fieldLabel: '姓名',
                            blankText: '您未输入姓名',
                            emptyText: '请输入姓名'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '90%',
                            id: 'txEmpId',
                            name: 'txEmpId',
                            width: 300,
                            fieldLabel: '工号',
                            blankText: '您未输入工号',
                            emptyText: '请输入工号'
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
                                maxHeight:160
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '90%',
                            id: 'cmbIsDeparmentLeader',
                            name: 'cmbIsDeparmentLeader',
                            width: 300,
                            fieldLabel: '是否机构负责人',
                            queryMode: 'local',
                            typeAhead: true,
                            editable: false,
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
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'txtUserId',
                            name: 'txtUserId',
                            fieldLabel: 'Label'
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

    onBtnLoadClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'重置事件',buttons: Ext.Msg.OK,closable : false});
    	PageUIDataInit();
    },

    onBtnOKClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    	var formpPanel = Ext.getCmp("frmEdit");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/user/user_editUser',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                    //window.location.href="main.jsp"; 
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交成功!',buttons: Ext.Msg.OK,closable : false});
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
    	                   //simple.form.reset();      
    	                }  
    	            }  
    		});
    	}
    },
    onBtnCancelClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.dataRefresh();this.parent.window.winLoadExec.hide();}, 1);
    },
    onViewportAfterRender: function(component, eOpts) {
    	
    	setTimeout(function () { PageUIDataInit();}, 500);
    }
});
var InitUserInfoEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoEdit();
};
var PageUIDataInit=function(){
	var id = OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/user/user_getUser",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.getCmp("txtUserAccount").setValue(data[0].UserAccount);
				 Ext.getCmp("txtUserName").setValue(data[0].UserName);
				 Ext.getCmp("txEmpId").setValue(data[0].EmpId);
				 Ext.getCmp("cmdUserType").setValue(data[0].AssId);
				 Ext.getCmp("cmbPosition").setValue(data[0].PositionId);
				 Ext.getCmp("cmbIsDeparmentLeader").setValue(data[0].IsDepaLeader);
				 Ext.getCmp("txtUserPhone").setValue(data[0].Tel);
				 Ext.getCmp("txtMobile").setValue(data[0].Mobile);
				 Ext.getCmp("txtEmail").setValue(data[0].Email);
				 Ext.getCmp("txtUserId").setValue(data[0].UserId);
				 // 入职日期
				 Ext.getCmp("dateEntryDate").setValue(data[0].EntryDt);
				 // 登录方式
				 //Ext.getCmp("cmbLoginMode").setValue(data[0].LoginMode);
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
		 }
	});
};
