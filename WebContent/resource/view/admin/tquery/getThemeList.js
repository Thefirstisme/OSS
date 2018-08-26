Ext.define('OSS.view.InitThemeList', {
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
                    id: 'themeStoreId',
                    store: themeStore,
                    columnLines: false,
                    columns: [
                    	{
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                        {
                            xtype: 'actiontextcolumn',
                            header: '',
                            width: 105,
                            sortable: false,
                            align: 'center',
                            draggable: false,
                            menuDisabled: true,
                            items: [
                                {
                                	icon:'../../resource/images/icons/icoSummary/tab_edit.png',
                                	text:'修改',
                                	tooltip:'修改',
                                	handler: function (grid, rowIndex, colIndex) { 
                                		//editDiscnt(grid.getStore().getAt(rowIndex)); 
                                	},
                                	stopSelection:false
                                },
                                {
                                	icon:'../../resource/images/icons/icoSummary/tab_delete.png',
                                	text:'删除',
                                	tooltip:'删除',
                                	handler: function (grid, rowIndex, colIndex) { 
                                		//delDiscnt(grid.getStore().getAt(rowIndex)); 
                                	}
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '数据映射名称',
                            dataIndex: 'databaseName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '数据映射代码',
                            dataIndex: 'oName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '归属系统',
                            dataIndex: 'oName'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '类型',
                            dataIndex: 'oName'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'oName',
                            text: '最后修改时间'
                        }
                    ],
                    dockedItems: [],
	                listeners: {
	                    itemdblclick: {
	                        fn: me.onGridPanelItemDblClick,
	                        scope: me
	                    }
	                }
                }
            ]
        });

        me.callParent(arguments);
    },
    onCmbPageSizeMainSelect: function(combo, records, eOpts) {
//    	var pSize=parseInt(records[0].data.id);
//    	themeStore.removeAll();
//    	themeStore.currentPage=1;
//    	Ext.getCmp('PagingToolbarMain').pageSize=pSize;
//    	themeStore.pageSize=pSize;
//    	themeStore.load();
    },
    toAddDiscntInfo: function(item, e, eOpts) {
    	//addDiscnt();
    },
    // 根据条件进行查询
    queryByCondition: function(item, e, eOpts) {
    	//dataRefresh();
    },
    onGridPanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	//winOpen('修改贴现信息',405,505,'icon-tabedit','j03_discnt_info_mng_toEdit.jsp?keyid='+record.data.keyid);
    }
});

var themeStore = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'themeId',
	remoteSort: true,
	fields: [
		{name: 'themeId',type:'string'},
		{name: 'databaseName',type:'string'},
		{name: 'oName',type:'string'},
		{name: 'oAlias',type:'float'},
		{name: 'lastModify',type:'string'},
		{name: 'oAlias',type:'float'},
		{name: 'lastModify',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/tquery/tquery_getThemeList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
    	simpleSortMode: true
	}),
	sorters: [{
        property: 'lastModify',
        direction: 'DESC'
    }]
});

var dataRefresh=function(){
	themeStore.removeAll();
	themeStore.currentPage=1;
	themeStore.load();
};

var InitThemeList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitThemeList();
};
function editDiscnt(obj){
	//winOpen('修改贴现信息',405,505,'icon-tabedit','j03_discnt_info_mng_toEdit.jsp?keyid='+obj.get("keyid"));
}

function delDiscnt(obj){
	 Ext.MessageBox.show(
			    {
			      title: '信息',
			      msg: "确定要删除该信息吗？",
			      buttons: Ext.MessageBox.YESNO,
			      fn: function(btn){
			    	  if(btn=='yes'){
				      	deleteOrg3(obj.get("keyid"));
			    	  }
			      },
			      animEl: 'mb4',
			      icon: Ext.MessageBox.QUESTION
			    });
}

