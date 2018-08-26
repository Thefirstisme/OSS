Ext.define('OSS.view.InitLogActionList', {
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
                    id: 'logSqlStore',
	                resizable: true,
                    store: storeLogAction,
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
                            dataIndex: 'message',
                            text: '最近所做操作'
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
                            text: '用户会话编号',
		                    width: 200,
                            dataIndex: 'userStatusId'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '登录次数',
                            dataIndex: 'loginCount'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 150,
                            id:'pageStore',
                    		store: storeLogAction,
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
                    height: 210,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'gridpanel',
                            title: '操作明细',
                            id:'logActionList',
                            store:logActionListStore,
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
		                            text: '所做操作',
		                            dataIndex: 'message'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '最后登录时间',
		                            width: 150,
		                            dataIndex: 'startDatetime'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '上次登录时间',
		                            width: 150,
		                            dataIndex: 'endDatetime'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '最后登录IP',
		                            dataIndex: 'clientIp'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '用户会话编号',
		                            width: 300,
		                            dataIndex: 'userStatusId'
		                        }
		                    ]	
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            layout: {
                                align: 'stretchmax',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-groupadd',
                                    text: '更多',
                                    listeners: {
                                        click: {
                                            fn: me.logInfoListMore,
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
    
    onDataClick: function(item, e, eOpts) {
    	var record = Ext.getCmp('logSqlStore').getSelectionModel().getSelection();
    	var userAccount=record[0].get("userAccount");
    	Ext.getCmp("logActionList").store.load({  
			params:{  
				userAccount:userAccount,
				isHistory: '1'
			}
		} );
    },
    
    // 根据条件进行查询
    queryByCondition: function(item, e, eOpts) {
    	var txtUserName = Ext.getCmp("txtUserName").getValue();
	    var txtUserAccount = Ext.getCmp("txtUserAccount").getValue();
		var txtUserStatusId = Ext.getCmp("txtUserStatusId").getValue();
    	Ext.getCmp("logSqlStore").store.load({  
			params:{  
				txtUserName: txtUserName,
	        	txtUserAccount: txtUserAccount,
				txtUserStatusId: txtUserStatusId
			}
		} );
    },
    logInfoListMore: function(item, e, eOpts) {
	   logActionDetailListMore();
    },
    // 刷新
    reflush: function(item, e, eOpts) {
	    Ext.getCmp("logSqlStore").store.load();
    }
    
});

var storeLogAction = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'message',type:'message'},
       {name: 'url' ,type:'string'},
       {name: 'clientIp',type:'string'},
       {name: 'startDatetime',type:'string'},
       {name: 'endDatetime',type:'string'},
       {name: 'connectString',type:'string'},
       {name: 'sqlWord',type:'string'},
       {name: 'paramData',type:'string'},
       {name: 'returnData',type:'string'},
       {name: 'formattedMessage',type:'string'},
       {name: 'loginCount',type:'int'},
       {name: 'userStatusId',type:'string'},
       {name: 'pageStatusId',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findLogActionList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

var logActionListStore = Ext.create('Ext.data.JsonStore', {
	autoLoad: false,
	pageSize:5,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'message',type:'message'},
       {name: 'url' ,type:'string'},
       {name: 'clientIp',type:'string'},
       {name: 'startDatetime',type:'string'},
       {name: 'endDatetime',type:'string'},
       {name: 'connectString',type:'string'},
       {name: 'sqlWord',type:'string'},
       {name: 'paramData',type:'string'},
       {name: 'returnData',type:'string'},
       {name: 'formattedMessage',type:'string'},
       {name: 'loginCount',type:'int'},
       {name: 'userStatusId',type:'string'},
       {name: 'pageStatusId',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findLogActionDetailList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

function logActionDetailListMore(){
	winOpen('操作明细',840,445,'icon-groupadd','log_actionDetail_more.jsp');
}

var InitLogActionList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitLogActionList();
};