Ext.define('OSS.view.RoleGroupEdit', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    region: 'center',
                    bodyPadding: 10,
                    title: '',
                    items: [
//                        {
//                            xtype: 'textfield',
//                            anchor: '100%',
//                            id: 'txtWindowRoleGroupNo',
//                            name: 'txtWindowRoleGroupNo',
//                            fieldLabel: '角色组号',
//                            blankText: '您未输入内容！',
//                            emptyText: '角色组号必需输入',
//                            maxLength: 15
//                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowRoleGroupName',
                            name: 'txtWindowRoleGroupName',
                            fieldLabel: '角色组名称',
                            blankText: '您未输入内容',
                            emptyText: '角色组名称必需输入',
                            maxLength: 60
                        },
                        {
                        	xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowRoleGroupDesc',
                            name: 'txtWindowRoleGroupDesc',
                            fieldLabel: '角色组描述',
                            blankText: '您未输入内容',
                            emptyText: '请输入角色组描述',
                            maxLength: 60
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            id: 'chbWindowAddNodeIsSystem',
                            name: 'chbWindowAddNodeIsSystem',
                            fieldLabel: '是否系统角色组',
                            boxLabel: ''
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'txtWindowRoleGroupId',
                            name: 'txtWindowRoleGroupId',
                            fieldLabel: 'Label'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoadRole',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoadRoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOkRole',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOkRoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancelRole',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancelRoleClick,
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

    onButtonLoadRoleClick: function(button, e, eOpts) {
    	PageUIDataInit();
    },

    onButtonOkRoleClick: function(button, e, eOpts) {
    	var formpPanel = this.down("form");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/rolegroup/rolegroup_editRoleGroup',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	            	 if (action.result.msg == 'OK') {  
     	                	Ext.MessageBox.show({title : '事件消息',msg :"数据提交成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
     	                }else if(action.result.msg == 'ERROR') { 
     	                	Ext.MessageBox.show({title : '事件消息',msg :"数据提交失败!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
     	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	            	Ext.MessageBox.show({title : '事件消息',msg :action.result.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
    	            }  
    		});
    	}
    },

    onButtonCancelRoleClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    },
    onViewportAfterRender: function(component, eOpts) {
    	PageUIDataInit();
    }

});
var InitRoleGroupEdit=function(){
	/*Ext.BLANK_IMAGE_URL = 'OSS/resource/ext/resources/s.gif';*/
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleGroupEdit();
};
var PageUIDataInit=function(){
	var id = OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/rolegroup/rolegroup_getRoleGroup",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.getCmp("txtWindowRoleGroupId").setValue(data[0].roleGroupId);
				 //Ext.getCmp("txtWindowRoleGroupNo").setValue(data[0].roleGroupNo);
				 Ext.getCmp("txtWindowRoleGroupName").setValue(data[0].roleGroupName);
				 Ext.getCmp("txtWindowRoleGroupDesc").setValue(data[0].roleGroupDesc);
				 //alert(data[0].isSystem);
				 if(data[0].isSystem=='1'){
					 Ext.getCmp("chbWindowAddNodeIsSystem").setValue(true);
				 }
				 else{
					 Ext.getCmp("chbWindowAddNodeIsSystem").setValue(false);
				 }
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
		 }
	});
};