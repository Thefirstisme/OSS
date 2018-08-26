Ext.define('OSS.view.UserInfoOrg', {
    extend: 'Ext.container.Viewport',

    id: 'UserOrg',
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
                    id: 'orgTree',
                    title: '',
                    border: false,
                    store: storeTree,
                    viewConfig: {
                    	rootVisible: false
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
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
                                    id: 'EffectDate',
                                    width: 160,
                                    fieldLabel: '生效日期',
                                    labelWidth: 60,
                                    format: 'Y-m-d',
                                    value: ServerDate
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
                                    id: 'Button4',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onButton4Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button5',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onButton5Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOkClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancelClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onTreepanelSelect,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
	// 展开事件
    onButton4Click: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").expandAll();
    },
	// 折叠事件
    onButton5Click: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").collapseAll();
    },

    // 提交事件
    onButtonOkClick: function(button, e, eOpts) {
		var userIds = window.parent.getSelectUserIdList();
		var orgId = Ext.getCmp('hidCurrentId').getValue();
		if(orgId != null && orgId !=""){
			var myMask =OSS.getMask(Ext.getBody(), "提交", true);
			myMask.show();
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
						OSS.AlertInfo('数据提交成功!');
					}
					else{
						OSS.AlertWarning('数据提交失败!');
					}
				 },
				 failure : function(response){ 
				 	
				 },
				 callback: function(o, r, n){
					 myMask.hide();
				 }
			});  
		}
    	//editOrgUser(userIds, orgId);
    },
	// 关闭事件
    onButtonCancelClick: function(button, e, eOpts) {
    	window.parent.window.toCloseUserOrg();
    },
    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
		Ext.getCmp('hidCurrentId').setValue(record.data.id);
    }

});

var InitUserInfoOrg=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoOrg();
};