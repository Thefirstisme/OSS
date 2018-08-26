Ext.define('OSS.view.InitLogPageErrorList', {
	extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    bodyBorder: false,
                    title: '',
                    id: 'logPageStore',
                    store: storeLogPage,
                    columns: [
                    	{
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                        {
                            xtype: 'gridcolumn',
                            text: '用户姓名',
                            dataIndex: 'userName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户号',
                            dataIndex: 'userAccount'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '请求页面',
                            width: 300,
                            dataIndex: 'url'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '访问IP',
                            dataIndex: 'clientIp'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '请求时间',
                            width: 150,
                            dataIndex: 'startDatetime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '错误信息',
                            width: 200,
                            dataIndex: 'formattedMessage'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户会话编号',
                            dataIndex: 'userStatusId'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '页面会话编号',
                            dataIndex: 'pageStatusId'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 150,
                            id:'pageStore',
                    		store: storeLogPage,
                            displayInfo: true
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txtUserName',
                                    labelWidth:40,
                                    fieldLabel: '姓名'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtUserAccount',
                                    labelWidth:50,
                                    fieldLabel: '用户号'
                                },
                                {
                                    xtype: 'textfield',
                            		id: 'txtUserStatusId',
                                    labelWidth:60,
                                    fieldLabel: '会话编号'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-zoom',
                                    text: '查询',
                                    listeners: {
                                        click: {
                                            fn: me.queryByCondition,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-databaserefresh',
                                    text: '刷新',
                                    listeners: {
                                        click: {
                                            fn: me.reflush,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
					listeners: {
                        select: {
                            fn: me.onDataClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'tabpanel',
                    region: 'south',
                    resizable:true,
                    height: 150,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '错误信息',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'errorId',
                                    fieldLabel: ''
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    
    onDataClick: function(item, e, eOpts) {
	    var record = Ext.getCmp('logPageStore').getSelectionModel().getSelection();
	    Ext.getCmp('errorId').setValue(record[0].get("formattedMessage"));
    },
    
    // 根据条件进行查询
    queryByCondition: function(item, e, eOpts) {
    	var txtUserName = Ext.getCmp("txtUserName").getValue();
	    var txtUserAccount = Ext.getCmp("txtUserAccount").getValue();
		var txtUserStatusId = Ext.getCmp("txtUserStatusId").getValue();
    	Ext.getCmp("logPageStore").store.load({  
			params:{  
				txtUserName: txtUserName,
	        	txtUserAccount: txtUserAccount,
				txtUserStatusId: txtUserStatusId
			}
		} );
    	Ext.getCmp("pageStore").store.load({
			params:{
				txtUserName: txtUserName,
	        	txtUserAccount: txtUserAccount,
				txtUserStatusId: txtUserStatusId
			}
		} );
    },
    
    // 刷新
    reflush: function(item, e, eOpts) {
	    Ext.getCmp("logPageStore").store.load();
    }
    
});

var storeLogPage = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'url' ,type:'string'},
       {name: 'userId',type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'clientIp',type:'string'},
       {name: 'startDatetime',type:'string'},
       {name: 'connectString',type:'string'},
       {name: 'sqlWord',type:'string'},
       {name: 'paramData',type:'string'},
       {name: 'returnData',type:'string'},
       {name: 'formattedMessage',type:'string'},
       {name: 'userStatusId',type:'string'},
       {name: 'pageStatusId',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findPageErrorList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

var InitLogPageErrorList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitLogPageErrorList();
};