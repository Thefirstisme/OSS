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
                    id: 'logActionStore',
                    store: storeLogAction,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '请求页面',
                            dataIndex: 'url'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '用户号',
                            dataIndex: 'userId'
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
                            xtype: 'datecolumn',
                            text: '访问时间',
                            dataIndex: 'startDatetime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '所使用数据库连接',
                            dataIndex: 'connectString'
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
                    		store: storeLogAction,
                            displayInfo: true
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '姓名'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '用户号'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '会话编号'
                                },
                                {
                                    xtype: 'button',
                                    text: '查询'
                                },
                                {
                                    xtype: 'button',
                                    text: '刷新'
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
                        },
                        {
                            xtype: 'panel',
                            title: '日志XML',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'logXmlId',
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
	    var record = Ext.getCmp('logActionStore').getSelectionModel().getSelection();
//	    var id=record[0].get("logId");
//	   	alert(" " + id);
	    Ext.getCmp('sqlId').setValue(record[0].get("sqlWord"));
	    Ext.getCmp('paraId').setValue(record[0].get("paramData"));
	    Ext.getCmp('retDataId').setValue(record[0].get("returnData"));
	    Ext.getCmp('logXmlId').setValue(record[0].get("formattedMessage"));
    }

});

var storeLogAction = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'logId',type:'string'},
       {name: 'url' ,type:'string'},
       {name: 'userId',type:'string'},
       {name: 'userName',type:'string'},
       {name: 'clientIp',type:'string'},
       {name: 'startDatetime',type:'date'},
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