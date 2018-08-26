Ext.define('OSS.view.InitLogManage', {
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
                            text: '日志表',
                            dataIndex: 'tableName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '表空间',
                            dataIndex: 'tableSchema'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '数据行数',
                            dataIndex: 'tableRows'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '占用空间大小(M)',
                            dataIndex: 'tempStr'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '备注',
                            dataIndex: 'tableComment'
                        }
                    ],
					selModel: Ext.create('Ext.selection.CheckboxModel', {
					
					}),
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
                                    xtype: 'button',
                                    iconCls: 'icon-databaserefresh',
                                    text: '刷新',
                                    listeners: {
                                        click: {
                                            fn: me.toRefulsh,
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
                                    id:'b_qc_sd',
                                    text: '手动清除',
                                    handler: function(button, e) {
										toLogClear(0);
                                    }
//                                    listeners: {
//                                        click: {
//                                            fn: me.toClear,
//                                            scope: me
//                                        }
//                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-databaserefresh',
                                    id:'b_qc_sz',
                                    text: '设置清除',
                                    handler: function(button, e) {
										toLogClear(1);
                                    }
//                                    listeners: {
//                                        click: {
//                                            fn: me.toClear,
//                                            scope: me
//                                        }
//                                    }
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
                }
            ]
        });

        me.callParent(arguments);
    },
    
    onDataClick: function(item, e, eOpts) {},
    
    // 刷新
    toRefulsh: function(item, e, eOpts) {
    	toRefulsh_f();
    },
    
    // 设置
    toClear: function(item, e, eOpts) {
    	toLogClear(item);
    }
    
});

var storeLogSql = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'logId',
	remoteSort: true,
	fields: [
       {name: 'tableName',type:'string'},
       {name: 'tableSchema' ,type:'string'},
       {name: 'tableRows' ,type:'string'},
       {name: 'tempStr',type:'string'},
       {name: 'tableComment',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/log/log_findSysLogTablesList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});
// 清除日志事件
function toLogClear(tab){
	winOpen('清除日志',330,254,'icon-groupadd','log_manage_clear.jsp?tabId='+tab);
}
// 刷新事件
function toRefulsh_f(){
    Ext.getCmp("logSqlStore").store.load();
}
// 关闭清除日志事件页面
function editWinClose() {
	winClose();
	toRefulsh_f();
}   
var InitLogManage=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitLogManage();
};