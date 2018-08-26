Ext.define('OSS.view.OrgAdd', {
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
                    id : 'orgAddForm',
                    region: 'center',
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
                        /*{
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbGroupType',
                            fieldLabel: '机构类型',
                            emptyText: '机构类型必须输入',
                            displayField: 'name',
                            valueField: 'id',
                            store: storeTest
                        },*/
                        {
                            xtype: 'triggerfield',
                            anchor: '100%',
                            id: 'parentOrgId',
                            name: 'parentOrgId',
                            fieldLabel: '父级机构',
                            displayField: 'name',
                            allowBlank: false,
                            editable:false,
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
                            maxLength: 15,
                            maxLengthText: '请输入最多15个汉字',
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
                            xtype: 'textarea',
                            anchor: '100%',
                            id: 'remark',
                            height: 60,
                            name: 'remark',
                            fieldLabel: '备注',
                            blankText: '您未输入内容！',
                            maxLength: 50,
                            maxLengthText: '请输入最多50个汉字',
                            emptyText: '备注不能超过50个汉字'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'parentId',
                            name: 'parentId'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonLoad32Click: function(button, e, eOpts) {
    	Ext.getCmp('orgAddForm').form.reset();
    },

    // 增加机构
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
    	//Ext.Msg.show({title : '事件消息',msg :'请完善机构信息',buttons: Ext.Msg.OK,closable : false});

    	var formpPanel = Ext.getCmp("orgAddForm");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/org/org_addOrg',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                	OSS.AlertInfo('数据提交成功!');
    	                }else if(action.result.msg == 'ERROR') {  
    	                	OSS.AlertInfo('数据提交失败!');
    	                }else if(action.result.msg == 'CUSTOMNO_ERROR') {  
    	                	Ext.getCmp('customNo').setValue(''); //清空
    	                	OSS.AlertInfo('机构号已经存在,请重新输入!');
    	                }
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	                switch (action.failureType) {    
    	                case Ext.form.Action.CLIENT_INVALID:    
    	                    OSS.AlertInfo('错误提示', '表单数据非法请核实后重新输入！');    
    	                    break;    
    	                case Ext.form.Action.CONNECT_FAILURE:    
    	                    OSS.AlertInfo('错误提示', '网络连接异常！');    
    	                    break;    
    	                case Ext.form.Action.SERVER_INVALID:    
    	                   OSS.AlertInfo('错误提示', "您的输入用户信息有误，请核实后重新输入！");    
    	                   simple.form.reset();      
    	                }  
    	            }  
    		});
    	}
    },

    onButtonCancel32Click: function(button, e, eOpts) {
    	//window.parent.window.addWinClose();
    	//window.parent.winExecClose();
    	setTimeout(function () { this.parent.window.dataRefresh();this.parent.window.winLoadExec.hide();}, 1);
    }

});
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

var InitOrgAdd=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgAdd();
}
