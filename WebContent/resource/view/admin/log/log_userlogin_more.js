Ext.define('OSS.view.InitUserLoginMore', {
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
                    id:'GridMain',
                    store: storeLogMore,
                    title: '',
                    columns: [
                    	{
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                        {
                            xtype: 'actiontextcolumn',
                            width    : 105,
                            items: [
                                {
                                	iconCls:'icon-tabedit',
                                	text:'修改',
                                	tooltip:'修改',
                                	handler: function (grid, rowIndex, colIndex) { 
                                		//editRowData(grid.getStore().getAt(rowIndex).get('id'),'edit');
                                	},
                                	stopSelection:false
                                },
                                {
                                	iconCls:'icon-tabdelete',
                                	text:'删除',
                                	tooltip:'删除',
                                	handler: function (grid, rowIndex, colIndex) { 
                                		//delRowData(grid.getStore().getAt(rowIndex)); 
                                	},
                                	stopSelection:false
                                }
                            ]
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
                            dataIndex: 'userStatusId'
                        }
                    ],
                    dockedItems: [
		                {
                            xtype: 'pagingtoolbar',
                            id: 'PagingToolbarMain',
                            dock: 'bottom',
                            width: 150,
                            pageSize: 50,
                    		store: storeLogMore,
                            displayInfo: true,
                            displayMsg: '显示 {0} - {1}条, 共 {2}条',
                            emptyMsg: "没有可显示的记录",
                            items:[
    								{
    								xtype: 'combobox',
    								id: 'cmbPageSizeMain',
    								width: 120,
    	                            fieldLabel: '每页显示',
    	                            labelWidth: 60,
    								value: '50',
    								editable: false,
    								store: storePageSize,
    								displayField:'name',
    								valueField:'id',
    								typeAhead: true,
    	                            triggerAction: 'all',
    	                            queryMode: 'local',
    								listeners: {
                                     select: {
                                         fn: me.onCmbPageSizeMainSelect,
                                         scope: me
                                     	}
    								}
    							}
    						],
                            plugins: Ext.create('Ext.ux.ProgressBarPager',{})
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
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
	onShbRHClick : function(item, e, eOpts) {
		toSubmitTol();
	},
    onCmbPageSizeMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	storeLogMore.removeAll();
    	storeLogMore.currentPage=1;
    	Ext.getCmp('PagingToolbarMain').pageSize=pSize;
    	storeLogMore.pageSize=pSize;
    	storeLogMore.load();
    }

});

// 查询最新
var storeLogMore = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:50,
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
    	}
//		    	,
//		    	actionMethods: {  
//		            read: 'POST'  
//		        }
	})
});
var InitUserLoginMore=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitUserLoginMore();
};