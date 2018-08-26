Ext.define('OSS.view.InitActionDetailMore', {
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
		                            width: 200,
		                            dataIndex: 'userStatusId'
		                        }
		                    ],
                    dockedItems: [
		                {
		                    xtype: 'pagingtoolbar',
		                    width: 360,
		                    dock: 'bottom',
		                    store: storeLogMore,
		                    displayInfo: true
		                }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});

// 查询最新
var storeLogMore = Ext.create('Ext.data.JsonStore', {
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
		url:'/OSS/admin/log/log_findLogActionDetailList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});
var InitActionDetailMore=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitActionDetailMore();
};