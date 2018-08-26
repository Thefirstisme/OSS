Ext.define('OSS.view.AccountPassEdit', {
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
                    border: false,
                    id: 'panelMainForm',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'TextFieldPasswordOld',
                            name: 'TextFieldPasswordOld',
                            fieldLabel: '旧密码',
                            inputType: 'password',
                            blankText: '您未输入密码！',
                            maxLength: 30,
                            allowBlank: false,
                            maxLengthText: '请输入最多30位旧密码',
                            minLength: 6,
                            minLengthText: '请输入至少6位旧密码'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'TextFieldPasswordNew',
                            name: 'TextFieldPasswordNew',
                            fieldLabel: '新密码',
                            inputType: 'password',
                            blankText: '您未输入新密码！',
                            maxLength: 30,
                            allowBlank: false,
                            maxLengthText: '请输入最多30位新密码',
                            minLength: 6,
                            minLengthText: '请输入至少6位新密码'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'TextFieldPasswordNewAgain',
                            name: 'TextFieldPasswordNewAgain',
                            fieldLabel: '再输一次',
                            inputType: 'password',
                            blankText: '您未输入确认密码！',
                            maxLength: 30,
                            allowBlank: false,
                            maxLengthText: '请输入最多30位确认密码',
                            minLength: 6,
                            minLengthText: '请输入至少6位确认密码',
//                            vtype: "ComparePW",
//                            vtypeText: "两次密码不一致，,请确认两次输入相同！",  
//                            Compareid: "TextFieldPasswordNew", 
                            listeners: {
                                blur: {
                                    fn: me.checkPassWord,
                                    scope: me
                                }
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonWindowPassUpdate',
                                    iconCls: 'icon-databasesave',
                                    text: '确定',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonWindowPassUpdateClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancelP1',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancelP1Click,
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

    onButtonWindowPassUpdateClick: function(button, e, eOpts) {
    	var formpPanel = Ext.getCmp("panelMainForm");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {
    		var passWordNew = Ext.getCmp("TextFieldPasswordNew").getValue();
    		var passWordAgain = Ext.getCmp("TextFieldPasswordNewAgain").getValue();
    		if(passWordNew != passWordAgain){
		    	Ext.Msg.show({title : '提示',msg :'新密码与确认密码不一致',buttons: Ext.Msg.OK,closable : false, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo});
			}
    		else{
	    		formpPanel.form.submit({
	    			    waitMsg : '正在提交数据,请稍后...', 
	    			    waitTitle: '系统提示',
	    			    submitEmptyText: false,
	    	            url : '/OSS/admin/user/user_editPassWord',  
	    	            method : 'post',  
	    	            params : params, 
	    	            //提交成功的回调函数  
	    	            success : function(form, action) {  
	    	                if (action.result.msg == 'OK') {  
	    	                	Ext.Msg.show({title : '事件消息',msg :'密码修改成功!',buttons: Ext.Msg.OK,closable : false, icon: Ext.MessageBox.INFO});
	    	                }else if(action.result.msg == 'PASS_ERR') {  
	    	                	Ext.Msg.show({title : '事件消息',msg :'旧密码输入错误！',buttons: Ext.Msg.OK,closable : false, icon: Ext.MessageBox.WARNING});
	    	                	Ext.getCmp("TextFieldPasswordOld").focus(false, 20);
	    	                }else if(action.result.msg == 'USER_ERR') {  
	    	                	Ext.Msg.show({title : '事件消息',msg :'用户信息有误！',buttons: Ext.Msg.OK,closable : false, icon: Ext.MessageBox.WARNING});
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
    	}
    },

    onButtonCancelP1Click: function(button, e, eOpts) {
    	window.parent.changePdClose();
    },
	checkPassWord: function(button, e, eOpts) {
		var passWordNew = Ext.getCmp("TextFieldPasswordNew").getValue();
		var passWordAgain = Ext.getCmp("TextFieldPasswordNewAgain").getValue();
		if(passWordNew != '' && passWordAgain != ''){
			if(passWordNew != passWordAgain){
		    	Ext.Msg.show({title : '提示',msg :'新密码与确认密码不一致',buttons: Ext.Msg.OK,closable : false});
			}
		}
    }
});
var InitAccountPassEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.AccountPassEdit();
};
var handleSaveYesNo=function(btn){
	switch( btn )
	  {
	    case 'ok':
	    	Ext.getCmp("TextFieldPasswordNewAgain").setValue('');
	    	Ext.getCmp("TextFieldPasswordNew").setValue('');
	    	Ext.getCmp("TextFieldPasswordNew").focus(false, 100);
	      break;
	  }
};