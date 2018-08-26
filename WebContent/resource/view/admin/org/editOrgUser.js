Ext.define('OSS.view.OrgUserEdit', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;

        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/org/org_getOrgList'
            },
            root: {
                text: '机构列表',
                id: 'src',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'osstreepanel',
                    region: 'center',
                    id:'orgTree',
                    border: false,
                    title: '',
                    store : storeTree, 
                    viewConfig: {
                    	rootVisible: true
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                	xtype: 'triggerfield',
                                    id: 'trigFilterText',
                                    triggerCls: 'x-form-clear-trigger',
                                    fieldLabel: '',
                                    emptyText: '查询请输入资源名称',
                                    enableKeyEvents: true
                                    ,
                                    onTriggerClick: function () {  
                                        this.setValue('');  
                                        Ext.getCmp("orgTree").clearFilter();  
                                    },
                                    listeners: {  
                                        keyup: {  
                                            fn: function (field, e) {  
                                                if (Ext.EventObject.ESC == e.getKey()) {  
                                                    field.onTriggerClick();  
                                                } else {  
                                                    Ext.getCmp("orgTree").filterByText(this.getRawValue());  
                                                }  
                                            }  
                                        }  
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '生效日期',
                                    labelAlign: 'right'
                                },
		                        {
		                            xtype: 'hiddenfield',
		                            id: 'hidCurrentId'
		                        }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    icon: '',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
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
                    listeners: {
                        select: {
                            fn: me.onTreepanelSelect,
                            scope: me
                        }
                    }
                },
                {}
            ]
        });

        me.callParent(arguments);
    },

	// orgTree展开
    onButtonClick: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").expandAll();
    },
	// orgTree折叠
    onButtonClick1: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").collapseAll();
    },

    onButtonOk32Click: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    	var userIds = window.parent.getSelectRoleIdList();
    	
    	var orgId = Ext.getCmp('hidCurrentId').getValue();
    	//editOrgUser(userIds, orgId);
		new Ext.LoadMask(Ext.getBody(), { msg: '正在提交,请稍等...' }).show();
		Ext.Ajax.request({

			url: '/OSS/admin/org/org_editOrgUser',
			method : 'post', 
			params : {
	    		userIds : userIds,
	    		orgId : orgId
	    	},
            //提交成功的回调函数  
			success : function(response, options){ 
				var data = response.responseText;   
				if(data == 'OK'){
					Ext.Msg.show({title : '事件消息',msg :'数据提交成功!',buttons: Ext.Msg.OK,closable : false});
				}
				else{
					Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
				}
			 },
			 failure : function(response){ 
			 	
			 },
			 callback: function(o, r, n){
				 Ext.getBody().unmask();
			 }
			});  	
    },
    
    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
		Ext.getCmp('hidCurrentId').setValue(record.data.id);
    },
    onButtonCancel32Click: function(rowmodel, record, index, eOpts) {
		window.parent.window.editWinClose();
    }

});

// 修改机构及用户关系
function editOrgUser(userIds, orgId){

}
  

var InitOrgUserEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgUserEdit();
}
    
    
    
	   