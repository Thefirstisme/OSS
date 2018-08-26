Ext.define('OSS.view.InitLogSqlList', {
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
                    store: storeLogSql,
                    columns: [
                    	{
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '请求页面',
                            dataIndex: 'title'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户号',
                            dataIndex: 'userAccount'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户姓名',
                            dataIndex: 'userName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '访问IP',
                            dataIndex: 'clientIp'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '访问时间',
                            width: 150,
                            dataIndex: 'startDateTime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '所使用数据库连接',
                            width: 200,
                            dataIndex: 'connectString'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户会话编号',
                            width: 160,
                            dataIndex: 'userStatusId'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '页面会话编号',
                            width: 160,
                            dataIndex: 'pageStatusId'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 150,
                            id:'pageStore',
                    		store: storeLogSql,
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
                            title: 'SQL语句',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'sqlId',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '参数值',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'paraId',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '返回值',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'retDataId',
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
	    var record = Ext.getCmp('logSqlStore').getSelectionModel().getSelection();

	    Ext.getCmp('sqlId').setValue(record[0].get("sqlWord"));
	    Ext.getCmp('paraId').setValue(record[0].get("paramData"));
	    Ext.getCmp('retDataId').setValue(record[0].get("returnData"));
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
    
    // 刷新
    reflush: function(item, e, eOpts) {
	    Ext.getCmp("logSqlStore").store.load();
    }
    
});

var storeLogSql = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'url' ,type:'string'},
       {name: 'title' ,type:'string'},
       {name: 'userAccount',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'clientIp',type:'string'},
       {name: 'startDateTime',type:'string'},
       {name: 'connectString',type:'string'},
       {name: 'sqlWord',type:'string'},
       {name: 'paramData',type:'string'},
       {name: 'returnData',type:'string'},
       {name: 'formattedMessage',type:'string'},
       {name: 'userStatusId',type:'string'},
       {name: 'pageStatusId',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findLogSqlList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

var InitLogSqlList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitLogSqlList();
};