Ext.define('OSS.view.Rolegroup_User_Rel', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/rolegroup/rolegroup_getRoleGroupTree'
            },
            root: {
                text: '角色组列表',
                id: '0',
                expanded: true
            }
        });
        var storePageItem = Ext.create('Ext.data.Store', { 
            fields: ['id', 'name'], 
            data : [ 
                {"id":"5","name":"5"},
        		{"id":"10","name":"10"},
        		{"id":"20","name":"20"},
        		{"id":"50","name":"50"},
        		{"id":"100","name":"100"},
        		{"id":"200","name":"200"},
        		{"id":"1000","name":"100"}
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                	xtype: 'treepanel',
		            border: true,
		            region: 'west',
                    split: true,
		            id: 'TreePanelBranch',
		            padding: 0,
		            autoScroll: true,
		            width: 200,
		            maxWidth: 200,
		            store : storeTree, 
		            title: '',
//		            viewConfig: {
//		            	rootVisible: false
//		            },
		            selModel: Ext.create('Ext.selection.RowModel', {
		
		            }),
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    id: 'Toolbar1',
		                    items: [
		                        {
		                            xtype: 'button',
		                            id: 'ButtonAscx1',
		                            iconCls: 'icon-expand-all',
		                            text: '展开',
		                            listeners: {
		                                click: {
		                                    fn: me.onButtonAscx1Click,
		                                    scope: me
		                                }
		                            }
		                        },
		                        {
		                            xtype: 'tbseparator'
		                        },
		                        {
		                            xtype: 'button',
		                            id: 'ButtonAscx2',
		                            iconCls: 'icon-collapse-all',
		                            text: '折叠',
		                            listeners: {
		                                click: {
		                                    fn: me.onButtonAscx2Click,
		                                    scope: me
		                                }
		                            }
		                        }
		                    ]
		                }
		            ],
                    listeners: {
                        itemclick: {
                            fn: me.onTreeSourceMainItemClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'gridCenter1',
                    title: '用户列表',
                    store: storeUser,
                    columns: [
                         {xtype: 'rownumberer',width: 40, sortable: false, resizable: true},
                         {
                             text     : '姓名',
                             /*flex     : 1,*/
                             width    : 100,
                             sortable : false,
                             dataIndex: 'userName'
                         },
                         {
                             text     : '用户号',
                             width    : 80,
                             sortable : true,
                             /*renderer : 'usMoney',*/
                             dataIndex: 'userAccount'
                         },
                         {
                             text     : '工号',
                             width    : 80,
                             sortable : true,
                             /*renderer : change,*/
                             dataIndex: 'empId'
                         },
                         {
                             text     : '用户类型',
                             width    : 100,
                             sortable : true,
                             /*renderer : pctChange,*/
                             dataIndex: 'assName'
                         },
                         {
                             text     : '用户职务',
                             width    : 100,
                             sortable : true,
                             /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                             dataIndex: 'positionName'
                         }
                    ],
                    viewConfig: {
                        id: 'gridCenter'
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeUser,
                        displayInfo: true,
                        displayMsg: '显示 {0} - {1}条, 共 {2}条',
                        emptyMsg: "没有可显示的记录",
                        items:[
								{
								xtype: 'combobox',
								id: 'ComboBoxMain',
								width: 120,
	                              fieldLabel: '每页显示',
	                              labelWidth: 60,
								emptyText: '20',
								editable: false,
								store: storePageItem,
								displayField:'name',
								valueField:'id',
								listeners: {
                                  select: {
                                      fn: me.onComboBoxMainSelect,
                                      scope: me
                                  }
                              }
                        }
						]
                    }),
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnRolegroup_Go',
                                    iconCls: 'icon-groupgo',
                                    text: '角色组归属',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnRolegroup_GoClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnRolegroup_Delete',
                                    iconCls: 'icon-groupdelete',
                                    text: '移除',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnRolegroup_DeleteClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'hiddenfield',
                                    anchor: '100%',
                                    id: 'txtRoleGroupId',
                                    name: 'txtRoleGroupId',
                                    fieldLabel: 'Label'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onTreeSourceMainItemClick: function(dataview, record, item, index, e, eOpts) {
    	Ext.getCmp('txtRoleGroupId').setValue(record.data.id);
    	userDataRefresh();
    },
    onBtnRolegroup_GoClick: function(button, e, eOpts) {
    	var record = Ext.getCmp("gridCenter1").getSelectionModel().getSelection();
     	 if(record.length == 0){
     		 Ext.MessageBox.show({ 
                  title:"提示", 
                  msg:"请先选择需要归属的用户!", 
                  icon: Ext.MessageBox.INFO, 
                  buttons: Ext.Msg.OK 
              });
     	 }
     	 else
        {
     		 var win =new OSS.view.winRoleRel();
     		 win.show();
        }
    },

    onBtnRolegroup_DeleteClick: function(button, e, eOpts) {
    	var record = Ext.getCmp("gridCenter1").getSelectionModel().getSelection();
    	 if(record.length == 0){
    		 Ext.MessageBox.show({ 
                 title:"提示", 
                 msg:"请先选择需要移除的角色!", 
                 icon: Ext.MessageBox.INFO, 
                 buttons: Ext.Msg.OK 
             });
    	 }
    	 else{
    		 Ext.MessageBox.show(
    		   	        {
    		   	          title: '信息',
    		   	          msg: "您确定移除所选角色与角色组的关系吗？",
    		   	          buttons: Ext.MessageBox.YESNO,
    		   	          fn: handleDelSaveYesNo,
    		   	          animEl: 'mb4',
    		   	          icon: Ext.MessageBox.QUESTION
    		   	        });
    	 }
    },
    onButtonAscx1Click: function(button, e, eOpts) {
    	Ext.getCmp("TreePanelBranch").expandAll();
    },
    onButtonAscx2Click: function(button, e, eOpts) {
    	Ext.getCmp("TreePanelBranch").collapseAll();
    }
});

var InitRolegroupRoleRel=function(){
	Ext.tip.QuickTipManager.init();	
	new OSS.view.Rolegroup_User_Rel();
	 
	userDataRefresh();
};
var storeRoleGroup = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	idProperty: 'roleGroupId',
	remoteSort: true,
	fields: [
       {name: 'roleGroupId',type:'string'},
       {name: 'roleGroupNo' ,type:'string'},
       {name: 'roleGroupName',type:'string'},
       {name: 'isSystem',type:'string'},
       {name: 'operatorId',type:'string'},
       {name: 'status',type:'string'},
       {name: 'createTime',type:'date'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/rolegroup/rolegroup_getRoleGroupList',
		pageSize:20,
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});
var storeUser= Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	idProperty: 'userId',
    pageSize:20,
	remoteSort: true,
	fields: [
	         {name:'userId',type:'string'},
	         {name:'userAccount',type:'string'},
	         {name:'userName',type:'string'},
	         {name:'empId',type:'string'},
	         {name:'positionName',type:'string'},
	         {name:'assName',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/user/user_getUserToRoleGroup',
		pageSize:20,
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

storeUser.on('beforeload', function (store, options) {  
    var new_params = { groupid: Ext.getCmp('txtRoleGroupId').getValue()};  
    Ext.apply(store.proxy.extraParams, new_params);  
});

function handleDelSaveYesNo( btn )
{
  switch( btn )
  {
    case 'yes':
    	delRoleGroupRoleRel();
      break;
    case 'no':
      break;
  }
};
function delRoleGroupRoleRel()
{
	var userIdList=getSelectUserIdList();
	if(userIdList!=undefined && userIdList.length>0){
		var roleGroupId=Ext.getCmp('txtRoleGroupId').getValue();
		if(roleGroupId.length>0)
		{
			Ext.Ajax.request({ 
				url: "/OSS/admin/rolegroup/rolegroup_delRoleGroupUserRel",
				method : 'post', 
				params : {id: roleGroupId,idlist:userIdList},
				success : function(response, options){ 
					 Ext.MessageBox.show({title : '事件消息',msg :"移除成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
					 userDataRefresh();
				},
				 failure : function(response){ 
					 var c1 = Ext.JSON.decode(response.responseText);
					 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
				 }
			});
		}
		else
		{
			Ext.MessageBox.show({title : '事件消息',msg :"请选择角色组!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
		}
	}
	else{
		Ext.MessageBox.show({title : '事件消息',msg :"请选择需要移除的用户!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
	}
};

var winRoleRel;
Ext.define('OSS.view.winRoleRel', {
    extend: 'Ext.window.Window',
	height: 250,
    width: 400,
    layout: {
        type: 'fit'
    },
    title: '角色选择',
    modal: true,
    plain: true,

    initComponent: function() {
        var me = this;
        var storePageItem = Ext.create('Ext.data.Store', { 
            fields: ['id', 'name'], 
            data : [ 
                {"id":"5","name":"5"},
        		{"id":"10","name":"10"},
        		{"id":"20","name":"20"},
        		{"id":"50","name":"50"},
        		{"id":"100","name":"100"},
        		{"id":"200","name":"200"},
        		{"id":"1000","name":"100"}
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    title: '',
                    store: storeRoleGroup,
                    columns: [
                        {
					    xtype: 'rownumberer',
					    width    : 40,
					    sortable: false,
                        resizable: true
						},
					    {
                            text     : '角色组名称',
                            width    : 100,
                            sortable : false,
                            dataIndex: 'roleGroupName'
                        },
					    {
                            text     : '角色组描述',
                            width    : 150,
                            dataIndex: 'roleGroupNo'
                        }
                        ,
                        {
                        	text     : '是否系统角色',
                            width    : 100,
                            dataIndex: 'isSystem'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGridpanelItemDblClick,
                            scope: me
                        }
                    },
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeRoleGroup,
                        displayInfo: true,
                        displayMsg: '显示 {0} - {1}条, 共 {2}条',
                        emptyMsg: "没有可显示的记录",
                        items:[
								{
								xtype: 'combobox',
								id: 'ComboBoxMain',
								width: 120,
	                            fieldLabel: '每页显示',
	                            labelWidth: 60,
								emptyText: '20',
								editable: false,
								store: storePageItem,
								displayField:'name',
								valueField:'id',
								listeners: {
                                  select: {
                                      fn: me.onComboBoxMainSelect,
                                      scope: me
                                  }
                              }
                        }
						]
                    })
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btn_Cancel_Select',
                            iconCls: 'icon-doorout',
                            text: '取消',
                            listeners: {
                                click: {
                                    fn: me.onBtn_Cancel_SelectClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            id: 'btn_Ok_Select',
                            iconCls: 'icon-accept',
                            text: '确定',
                            listeners: {
                                click: {
                                    fn: me.onbBtn_Ok_SelectClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                show: {
                    fn: me.onWindowShow,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	addRoleGroupRoleRel(this);
    },
    onBtn_Cancel_SelectClick: function(button, e, eOpts) {
    	this.hide();
    },
    onbBtn_Ok_SelectClick: function(button, e, eOpts) {
    	addRoleGroupRoleRel(this);
    },
    onWindowShow: function(component, eOpts) {
    	 this.down('gridpanel').store.load({  
    		baseParams:{  
    	        start:0,  
    	        limit: 20  
    	    }  
    	}); 
    }
});
var addRoleGroupRoleRel=function(win){
	var record=win.down('gridpanel').getSelectionModel().getSelection();
	if(record.length > 0){
		var userIdList=getSelectUserIdList();
		var roleGroupId=record[0].get("roleGroupId");
		Ext.Ajax.request({ 
			url: "/OSS/admin/rolegroup/rolegroup_addRoleGroupUserRel",
			method : 'post', 
			params : {id: roleGroupId,idlist:userIdList},
			success : function(response, options){ 
				 Ext.MessageBox.show({title : '事件消息',msg :"归属成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
				 win.hide();
				 userDataRefresh();
			 },
			 failure : function(response){ 
				 var c1 = Ext.JSON.decode(response.responseText);
				 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
			 }
		});
	}
	else
	{
		Ext.MessageBox.show({title : '事件消息',msg :"请选择角色组!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
	}
};
var getSelectUserIdList=function(){
	var grid=Ext.getCmp('gridCenter1');
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
var userDataRefresh=function(){
	var roleGroupId=Ext.getCmp('txtRoleGroupId').getValue();
	Ext.getCmp("gridCenter1").store.load({  
		params:{  
	        start:0,  
	        limit: 20,
	        groupid:roleGroupId
	    }  
	});
};