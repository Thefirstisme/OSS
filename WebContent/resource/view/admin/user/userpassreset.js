Ext.define('OSS.view.UserPassReset', {
    extend: 'Ext.window.Window',

    draggable: false,
    height: 180,
    padding: '',
    width: 400,
    resizable: false,
    closable: false,
    closeAction: 'hide',
    iconCls: 'icon-userkey',
    title: '用户密码重置',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            id: 'ButtonOKWindowAdd',
                            iconCls: 'icon-userkey',
                            disabled: true,
                            text: '重置',
                            listeners: {
                                click: {
                                    fn: me.onPassResetClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    height: 120,
                    border: false,
                    bodyPadding: 10,
                    padding: 30,
                    bodyStyle: 'background:transparent;',
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtUserAccountReset',
                            fieldLabel: '分行工号或工号',
                            labelWidth: 120,
                            blankText: '您未输入分行工号或工号！',
                            emptyText: '请输入分行工号或工号！',
                            enableKeyEvents: true,
                            listeners: {
                                keyup: {
                                    fn: me.onTxtUserAccountResetKeyup,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtUserName',
                            disabled: true,
                            fieldLabel: '员工姓名',
                            labelWidth: 120
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onPassResetClick: function(button, e, eOpts) {
			Ext.MessageBox.show(
	        {
	          title: '信息',
	          msg: "您确定重置用户密码吗？",
	          buttons: Ext.MessageBox.YESNO,
	          fn: handleSaveYesNo,
	          animEl: 'mb4',
	          icon: Ext.MessageBox.QUESTION
	        });
    },
    onTxtUserAccountResetKeyup: function(textfield, e, eOpts) {
    	var id=textfield.getValue();
	    	if(id.length>0){
	    	Ext.Ajax.request({ 
	    		url: "/OSS/admin/user/user_getUserName",
	    		method : 'post', 
	    		params : {id: id},
	    		success : function(response, options){ 
	    			 var data = Ext.JSON.decode(response.responseText);   
	    			 if(data.msg != 'USER_ERR')
	    			 {
	    				 Ext.getCmp("txtUserName").setValue(data.msg);
	    				 Ext.getCmp("ButtonOKWindowAdd").enable();
	    			 }else{
		    			 Ext.getCmp("txtUserName").setValue("");
		    			 Ext.getCmp("ButtonOKWindowAdd").disable();
	    			 }
	    		 },
	    		 failure : function(response){ 
	    			 //var c1 = Ext.JSON.decode(response.responseText);  
	    			 //Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
	    			 Ext.getCmp("txtUserName").setValue("");
	    			 Ext.getCmp("ButtonOKWindowAdd").disable();
	    		 }
	    	});
    	}
    	else{
    			Ext.getCmp("txtUserName").setValue("");
    			Ext.getCmp("ButtonOKWindowAdd").disable();
    	}
    }

});

var InitUserPassReset=function(){
	Ext.tip.QuickTipManager.init();
	var win=new OSS.view.UserPassReset();
	win.show();
};

function handleSaveYesNo(btn)
{
  switch( btn )
  {
    case 'yes':
    	resetUserPass();
      break;
    case 'no':
      break;
  }
};
function resetUserPass()
{
	var id= Ext.getCmp("txtUserAccountReset").getValue();
	Ext.Ajax.request({ 
		url: "/OSS/admin/user/user_setPassReset",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.MessageBox.show({title : '事件消息',msg :"重置成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
				 Ext.getCmp("txtUserName").setValue("");
				 Ext.getCmp("txtUserAccountReset").setValue("");
				 Ext.getCmp("ButtonOKWindowAdd").disable();
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 //Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 Ext.getCmp("ButtonOKWindowAdd").enable();
		 }
	});
}