Ext.define('OSS.view.OrgEdit', {
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
                            editable:false,
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
                            id: 'customNo1',
                            name: 'customNo1',
                            fieldLabel: '机构号',
                            disabled: true
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'customNo',
                            name: 'customNo',
                            fieldLabel: '机构号'
                        },
                        {
                            xtype: 'textarea',
                            anchor: '100%',
                            height: 60,
                            maxLength: 50,
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
    	reFresh();
    },

    onButtonOk32Click: function(button, e, eOpts) {
         if (Ext.getCmp('parentOrgId').getValue()==null||Ext.getCmp('parentOrgId').getValue()=='') {
             OSS.AlertInfo('请选择父级机构');
        }else if (Ext.getCmp('orgName').getValue()==null || Ext.getCmp('orgName').getValue()==''|| Ext.util.Format.trim(Ext.getCmp('orgName').getValue()).length == 0) {
            Ext.getCmp('orgName').setValue(''); //清空
            OSS.AlertInfo('请输入机构名称');
        }else if (Ext.getCmp('customNo').getValue()==null ||Ext.getCmp('customNo').getValue()==''|| Ext.util.Format.trim(Ext.getCmp('orgName').getValue()).length == 0) {
            Ext.getCmp('customNo').setValue(''); //清空
            OSS.AlertInfo('请输入机构号');
        };
    	//Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    	
    	var formpPanel = Ext.getCmp("orgEditForm");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
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
    	                	OSS.AlertInfo("数据提交成功!");
    	                }else if(action.result.msg == 'ERROR') {  
    	                	OSS.AlertError("数据提交失败!");
    	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	                switch (action.failureType) {    
    	                case Ext.form.Action.CLIENT_INVALID:    
    	                    OSS.AlertError('错误提示', '表单数据非法请核实后重新输入！');    
    	                    break;    
    	                case Ext.form.Action.CONNECT_FAILURE:    
    	                    OSS.AlertError('错误提示', '网络连接异常！');    
    	                    break;    
    	                case Ext.form.Action.SERVER_INVALID:    
    	                   OSS.AlertError('错误提示', "您的输入用户信息有误，请核实后重新输入！");    
    	                   simple.form.reset();      
    	                }  
    	            }  
    		});
    	}
    },

    onButtonCancel32Click: function(button, e, eOpts) {
    	//window.parent.window.editWinClose();
    	//window.parent.winExecClose();
    	setTimeout(function () { this.parent.window.dataRefresh();this.parent.window.winLoadExec.hide();}, 1);
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
    		id : this.parent.getSelectId()
    	},
    	 success:editOrgInfo,
		
		 failure : function(response){ 
			 var c1 = response.responseText; 
			 var c2 = Ext.util.JSON.decode(c1);  
		 }
	});
}
// 展示机构详细信息
function editOrgInfo(result){
	 var c1 = result.responseText; 
	 var c2 = Ext.JSON.decode(c1);
	 //Ext.Msg.alert('信息',c2.orgId+'-'+c2.orgName);  
	 //父级机构名称
	 Ext.getCmp("parentOrgId").setValue(c2.parentOrgName);
	 //机构名称
	 Ext.getCmp("orgName").setValue(c2.orgName);
	 //机构号
	 Ext.getCmp("customNo").setValue(c2.customNo);
	 Ext.getCmp("customNo1").setValue(c2.customNo);
	 //备注
	 Ext.getCmp("remark").setValue(c2.remark);
	 //orgId
	 Ext.getCmp("orgId").setValue(c2.orgId);
	 // parentId
	 Ext.getCmp("parentId").setValue(c2.parentId);
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
// 刷新
function reFresh(){
	editOrg();
}
var InitOrgEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgEdit();
};