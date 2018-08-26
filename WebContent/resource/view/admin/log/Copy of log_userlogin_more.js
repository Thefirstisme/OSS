Ext.define('OSS.view.InitUserLoginMore', {
	extend: 'Ext.container.Viewport',

    initComponent: function() {
        var me = this;
		// 查询最新
		var storeLogMore = Ext.create('Ext.data.JsonStore', {
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
		    	}
//		    	,
//		    	actionMethods: {  
//		            read: 'POST'  
//		        }
			})
		});
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    bodyBorder: false,
                    title: '',
                    id: 'logActionStore',
                    store: storeLogMore,
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
                            dataIndex: 'loginTime'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '上次登录时间',
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
                    ]
//                    ,
//		            dockedItems: [
//                        {
//                            xtype: 'pagingtoolbar',
//                            dock: 'bottom',
//                            width: 150,
//                    		store: storeLogAction,
//                            displayInfo: true
//                        }
//		             ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

var InitUserLoginMore=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitUserLoginMore();
};