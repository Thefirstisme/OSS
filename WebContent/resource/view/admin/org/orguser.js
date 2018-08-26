Ext.define('OSS.view.OrgUser', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    maxWidth: 250,
                    minWidth: 250,
                    width: 250,
                    animCollapse: false,
                    collapsed: false,
                    collapsible: true,
                    title: '机构列表',
                    id:'orgTree',
                    store: storeTree,
//                    viewConfig: {
//                    	rootVisible: false
//                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnExpand',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnExpandClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnCollapse',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnCollapseClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onTreepanelSelect,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    title: '',
                    store: storeUser,
                    id: 'userList',
                    columns: [
                    	{
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                    	{
                            xtype: 'actioncolumn',
                            width    : 19,
                            items: [
                                {

                                }
                            ]
                        },
                      {
                          text     : '姓名',
                          /*flex     : 1,*/
                          width    : 100,
                          sortable : false,
                          dataIndex: 'userName'
                      },
                      {
                          text     : '用户号',
                          width    : 100,
                          sortable : true,
                          /*renderer : 'usMoney',*/
                          dataIndex: 'userAccount'
                      },
                      {
                          text     : '工号',
                          width    : 100,
                          sortable : true,
                          /*renderer : change,*/
                          dataIndex: 'empId'
                      },
                      {
                          text     : '所在机构',
                          width    : 200,
                          sortable : true,
                          /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                          dataIndex: 'positionName'
                      }
                  ],
                    listeners: {
                        itemclick: {
                            fn: Ext.emptyFn,
                            scope: me
                        }
                    },
                    viewConfig: {
                    	forceFit:true
                    },
                    invalidateScrollerOnRefresh: true,
                  selModel: Ext.create('Ext.selection.CheckboxModel', {
						
                  }),
                  bbar: Ext.create('Ext.PagingToolbar', {
                      store: storeUser,
                      id: 'PagingToolbarMain',
                      pageSize: 20,
                      displayInfo: true,
                      displayMsg: '显示 {0} - {1}条, 共 {2}条',
                      emptyMsg: "没有可显示的记录"
                      ,items:[
								{
								xtype: 'combobox',
								id: 'cmbPageSizeMain',
								width: 120,
	                            fieldLabel: '每页显示',
	                            labelWidth: 60,
								value: '20',
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
						]
                  	,plugins: Ext.create('Ext.ux.ProgressBarPager',{})
                  }),
                  features : [ 
                                 { 
                                	 ftype : 'filters',
                                	 encode: false,
                                	 menuFilterText: '搜索',
                                	 filters: [
                                	    {
                                         type: 'string',
                                         dataIndex: 'userName'
                                     	},
                                     	{
                                            type: 'string',
                                            dataIndex: 'userAccount'
                                         },
                                      	{
                                             type: 'string',
                                             dataIndex: 'empId'
                                          }
                                	 ]
                                 }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonAdd',
                                    iconCls: 'icon-groupgo',
                                    text: '用户归属',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonAddClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonDelete',
                                    iconCls: 'icon-groupgo',
                                    text: '移除归属',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonDeleteClick,
                                            scope: me
                                        }
                                    }
                                },
		                        {
		                            xtype: 'hiddenfield',
		                        	//xtype: 'textfield',
		                            anchor: '100%',
		                            id: 'hidCurrentId',
		                            fieldLabel: 'Label'
		                        },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnDatabaseRefresh',
                                    iconCls: 'icon-databaserefresh',
                                    text: '刷新',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnDatabaseRefreshClick,
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

    onBtnExpandClick: function(button, e, eOpts) {
		Ext.getCmp("orgTree").expandAll();
    },

    onBtnCollapseClick: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").collapseAll();
    },

	// 用户归属
    onButtonAddClick: function(item, e, eOpts) {
    	var record = getSelectId();
    	 if(record.length == 0){
    		 Ext.MessageBox.show({ 
                 title:"提示", 
                 msg:"请先选择您要操作的行!", 
                 icon: Ext.MessageBox.INFO, 
                 buttons: Ext.Msg.OK 
             });
    	 }else {
    	 	winOpen('用户归属',420,450,'icon-groupadd','editOrgUser.jsp');
    	 }
    },
    // 移除归属
    onButtonDeleteClick: function(item, e, eOpts) {
    	toDeleteOrgUser();
    },
    onBtnDatabaseRefreshClick: function(button, e, eOpts) {
		reFresh();
    },
    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
    	Ext.getCmp('hidCurrentId').setValue(record.data.id);
		reFresh();
		
    },
//    onUserListSelect: function(rowmodel, record, index, eOpts) {
//
//    },
    onCmbPageSizeMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	Ext.getCmp('PagingToolbarMain').pageSize=pSize;
    	storeUser.pageSize=pSize;
    	reFresh();
    }
});

// 关闭用户归属页面
function editWinClose() {
	winClose();
}  
// 刷新
function reFresh(){
	storeUser.removeAll();
	storeUser.currentPage=1;
	storeUser.load();
}
function getSelectId(){
	return Ext.getCmp('userList').getSelectionModel().getSelection();
}
// 获得选中行的id
var getSelectRoleIdList=function(){
	var grid=Ext.getCmp('userList');
	var record = grid.getSelectionModel().getSelection();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+record[i].get("userId");
	}
	return idList;
};

// 删除提示框
function toDeleteOrgUser() {
	var record = getSelectRoleIdList();
	if(record.length == 0){
		Ext.MessageBox.show({ 
             title:"提示", 
             msg:"请先选择您要操作的行!", 
             icon: Ext.MessageBox.INFO, 
             buttons: Ext.Msg.OK 
         });
         return;
	}
	Ext.MessageBox.buttonText.yes="oui";  
	Ext.MessageBox.buttonText.no="否";  
	Ext.MessageBox.buttonText.cancel="取消";  
	Ext.MessageBox.buttonText.ok="确定";  
	Ext.MessageBox.show( {
		title: '信息',
		msg: '确认要移除吗？',
		buttons: Ext.MessageBox.YESNOCANCEL,
		// 执行删除操作
		fn: checkToDelete,
		animEl: 'mb4',
		icon: Ext.MessageBox.QUESTION
	});
}
// 判断是否移除
function checkToDelete( btn ){
  switch( btn )
  {
    case 'yes':
    	deleteOrgUser();
      break;
    default :
      break;
  }
};
// 移除关系
function deleteOrgUser(){
	var orgId = Ext.getCmp('hidCurrentId').getValue();
	var record = getSelectRoleIdList();

	Ext.Ajax.request({ 
		url: '/OSS/admin/org/org_deleteOrgUser',
	method : 'post', 
	params : {
		userIds : record,
		orgId : orgId
	},
	//提交成功的回调函数  
	success : function(response, options){ 
		var data = response.responseText;   
		if(data == 'OK'){
			Ext.Msg.show({title : '事件消息',msg :'数据提交成功!',buttons: Ext.Msg.OK,closable : false});
			reFresh();
		}else{
			Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
		}
	 },
	 failure : function(response){ 
	 	Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
	 } 
	});  	
}
var InitOrgUser=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgUser();
};

var storeTree = new Ext.data.TreeStore({
    proxy: {
        type: 'ajax',
        url: '/OSS/admin/org/org_getOrgList'
    },
    root: {
        text: '机构列表',
        id: '',
        expanded: true
    }
});
var storeUser = new Ext.data.JsonStore({
	autoLoad: true,
	idProperty: 'userId',
	remoteSort: true,
	pageSize:20,
	fields: [
		{name:'userId',type:'string'},
		{name:'userAccount',type:'string'},
		{name:'userName',type:'string'},
		{name:'empId',type:'string'},
		//{name:'description',type:'string'},
		{name:'positionName',type:'string'}
	],
	proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/user/user_getUserList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
        simpleSortMode: true
	}),
	sorters: [{
        property: 'createTime',
        direction: 'DESC'
    }]
}); 
storeUser.on('beforeload', function (store, options) {
    var new_params = { 
    		orgId:OSS.getExtValue('hidCurrentId')
		    };
    Ext.apply(store.proxy.extraParams, new_params);
});