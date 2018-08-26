Ext.define('OSS.view.InitUserLoginList', {
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
                    resizable:true,
                    id: 'logActionStore',
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
                            text: '姓名',
                            dataIndex: 'userName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户号',
                            dataIndex: 'userAccount'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '最后登录时间',
                            width: 150,
                            dataIndex: 'loginTime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '上次登录时间',
                            width: 150,
                            dataIndex: 'perLoginTime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '登录次数',
                            dataIndex: 'loginCount'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '最后登录IP',
                            dataIndex: 'loginIp'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户会话编号',
                            width: 280,
                            dataIndex: 'userStatusId'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 150,
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
                                    fieldLabel: '姓名',
                                    labelWidth:40
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtUserAccount',
                                    fieldLabel: '用户号',
                                     labelWidth:50
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
                    height: 200,
                    layout: {
                        type: 'border'
                    },
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'gridpanel',
                            title: '登录明细',
                            id:'logInfoList',
                            store:logInfoListStore,
                            columns: [
		                    	{
			                        xtype: 'rownumberer',
			                        width    : 40,
			                        sortable: false,
	                        		resizable: true
		                    	},
		                        {
		                            xtype: 'gridcolumn',
		                            text: '姓名',
		                            dataIndex: 'userName'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '用户号',
		                            dataIndex: 'userAccount'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '最后登录时间',
		                            width: 150,
		                            dataIndex: 'loginTime'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '上次登录时间',
		                            width: 150,
		                            dataIndex: 'perLoginTime'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '登录次数',
		                            dataIndex: 'loginCount'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '最后登录IP',
		                            dataIndex: 'loginIp'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            text: '用户会话编号',
                            		width: 280,
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
    	var record = Ext.getCmp('logActionStore').getSelectionModel().getSelection();
    	var logId=record[0].get("logId");
    	Ext.getCmp("logInfoList").store.load({  
			params:{  
				logId:logId
//				,
//				isHistory: '1'
			}
		} );
    },
    
    queryByCondition: function(item, e, eOpts) {
    	Ext.getCmp("logActionStore").store.load({  
			params:{  
				txtUserName:Ext.getCmp("txtUserName").getValue(),
	        	txtUserAccount:Ext.getCmp("txtUserAccount").getValue()
			}
		} );
    	Ext.getCmp("logInfoList").store.load({  
			params:{  
				txtUserName:'不要查询',
	        	txtUserAccount:'不要查询'
			}
		} );
    },
    
    reflush: function(item, e, eOpts) {
	    Ext.getCmp("logActionStore").store.load();
    },
    logInfoListMore: function(item, e, eOpts) {
		toLogInfoListMore();
    }
});


function toLogInfoListMore(){
	winOpen('登录明细',840,445,'icon-groupadd','log_userlogin_more.jsp');
}
// 查询最新
var storeLogAction = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'userId',type:'string'},
       {name: 'isSuccess' ,type:'int'},
       {name: 'loginTime',type:'string'},
       {name: 'perLoginTime',type:'string'},
       {name: 'loginCount',type:'int'},
       {name: 'loginIp',type:'string'},
       {name: 'userStatusId',type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'isHistory',type:'int'},
       {name: 'loginType',type:'int'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findUserLoginList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
    	actionMethods: {  
            read: 'POST'  
        }
	})
});

// 某一个用户的详细登录信息
var logInfoListStore = Ext.create('Ext.data.JsonStore', {
	autoLoad: false,
	pageSize:5,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'userId',type:'string'},
       {name: 'isSuccess' ,type:'int'},
       {name: 'loginTime',type:'string'},
       {name: 'perLoginTime',type:'string'},
       {name: 'loginCount',type:'int'},
       {name: 'loginIp',type:'string'},
       {name: 'userStatusId',type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'isHistory',type:'int'},
       {name: 'loginType',type:'int'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findUserLoginListMore',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
    	actionMethods: {  
            read: 'POST'  
        }
	})
});

var InitUserLoginList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitUserLoginList();
};