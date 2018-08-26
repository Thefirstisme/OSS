Ext.define('OSS.view.RoleGroups__Rel', {
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
                    region: 'west',
                    split: true,
                    id: 'gridLeft',
                    width: 270,
                    store: storeRole,
                    title: '角色列表',
                    columns: [
						{
						    xtype: 'rownumberer',
						    width    : 40,
						    sortable: false,
	                        resizable: true
						 },
                         {
                            text     : '角色名称',
                            width    : 220,
                            sortable : false,
                            dataIndex: 'roleName'
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onGridLeftItemClick,
                            scope: me
                        } 
                    },                    
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeRole,
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
								store: storePageSize,
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
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'gridCenter1',
                    title: '角色组列表',
                    store: storeRoleGroupListByGroupid,
                    columns: [
                         {xtype: 'rownumberer',width: 40, sortable: false, resizable: true},
					   {text: '角色组名称',width: 100, sortable : false,dataIndex: 'roleGroupName'},
					    {
                            text     : '角色组描述',
                            width    : 100,
                            dataIndex: 'roleGroupDesc'
                        }
                        ,
                        {
                        	text     : '是否系统角色组',
                            width    : 100,
                            dataIndex: 'isSystemName'
                        }
                    ],
                    viewConfig: {
                        id: 'gridCenter'
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeRoleGroupListByGroupid,
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
								store: storePageSize,
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
                                    text: '角色归属',
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
    onComboBoxMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	storeRoleGroupListByGroupid.removeAll();
    	storeRoleGroupListByGroupid.currentPage=1;
    	Ext.getCmp('gridCenter1').pageSize=pSize;
    	storeRoleGroupListByGroupid.pageSize=pSize;
    	storeRoleGroupListByGroupid.load();
    },

    onGridLeftItemClick: function(dataview, record, item, index, e, eOpts) {
    	Ext.getCmp('txtRoleGroupId').setValue(record.data.roleId);
    	Ext.getCmp("gridCenter1").store.load({  
    		params:{  
    	        start:0,  
    	        limit: 20,
    	        groupid:Ext.getCmp('txtRoleGroupId').getValue()
    	    }  
    	});
    },

    onBtnRolegroup_GoClick: function(button, e, eOpts) {
    	var record = Ext.getCmp("gridLeft").getSelectionModel().getSelection();
     	 if(record.length == 0){
     		 Ext.MessageBox.show({ 
                  title:"提示", 
                  msg:"请先选择需要归属的角色!", 
                  icon: Ext.MessageBox.INFO, 
                  buttons: Ext.Msg.OK 
              });
     	 }
     	 else
        {
     		 var win =new OSS.view.winRoleRel();
     		 Ext.getCmp('gridCenter2').getSelectionModel().clearSelections();
     		 win.show();
        }
    },

    onBtnRolegroup_DeleteClick: function(button, e, eOpts) {
    	//Ext.getCmp("gridCenter1").store.load();
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
    }
});
// 刷新某一角色的角色组列表
function getRolegroupRoleList(roleId){
	Ext.getCmp('txtRoleGroupId').setValue(roleId);
	Ext.getCmp("gridCenter1").store.load({  
		params:{  
	        start:0,  
	        limit: 20,
	        groupid:Ext.getCmp('txtRoleGroupId').getValue()
	    }  
	});
}
var InitRoleGroupsRel=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleGroups__Rel();
	Ext.getCmp("gridLeft").store.load({  
		baseParams:{  
	        start:0,  
	        limit: 20  
	    }  
	}); 
	
	Ext.getCmp("gridCenter1").store.load({  
		baseParams:{  
	        start:0,  
	        limit: 20,
	        groupid:Ext.getCmp('txtRoleGroupId').getValue()
	    }  
	});
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
       {name: 'roleGroupDesc' ,type:'string'},
       {name: 'isSystemName',type:'string'},
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

// 带有复选框的角色组
var storeRoleGroupListByGroupid = Ext.create('Ext.data.JsonStore', {
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
       {name: 'roleGroupDesc' ,type:'string'},
       {name: 'isSystemName',type:'string'},
       {name: 'createTime',type:'date'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/rolegroup/rolegroup_getRoleGroupListByGroupid',
		pageSize:20,
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});

var storeRole = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	idProperty: 'roleId',
	remoteSort: true,
	fields: [
       {name: 'roleId',type:'string'},
       {name: 'roleName' ,type:'string'},
       {name: 'description',type:'string'},
       {name: 'operatorId',type:'string'},
       {name: 'dataLevelName',type:'string'},
       {name: 'isSystemName',type:'string'},
       {name: 'systemIdName',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/role/role_getRoleRelList',
		pageSize:20,
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	}),
	listeners:{
		load: function () {  
			var record = Ext.getCmp('gridLeft');
			var cmpLength = record.store.data.length;
	        if (cmpLength > 0) {  
	        	// 默认选择一个  
	            record.getSelectionModel().select(0); 
	            var roleId = record.getSelectionModel().getSelection()[0].get("roleId");
	            // 将选中的roleId复制给隐藏域
	            Ext.getCmp('txtRoleGroupId').setValue(roleId);
		    	Ext.getCmp("gridCenter1").store.load({  
		    		params:{  
		    	        start:0,  
		    	        limit: 20,
		    	        groupid:Ext.getCmp('txtRoleGroupId').getValue()
		    	    }  
		    	});
	        }  
		} 
	}
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
	var roleIdList=getSelectRoleIdList();
	if(roleIdList!=undefined && roleIdList.length>0){
		var roleGroupId=Ext.getCmp('txtRoleGroupId').getValue();
		if(roleGroupId.length>0)
		{
			Ext.Ajax.request({ 
				url: "/OSS/admin/rolegroup/rolegroup_delRoleGroupRoleRel",
				method : 'post', 
				params : {id: roleGroupId,idlist:roleIdList},
				success : function(response, options){ 
					 Ext.MessageBox.show({title : '事件消息',msg :"移除成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
					 // 刷新某一角色的角色组列表
					 getRolegroupRoleList(roleGroupId);
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
		Ext.MessageBox.show({title : '事件消息',msg :"请选择需要移除的角色!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
	}
};

var winRoleRel;
Ext.define('OSS.view.winRoleRel', {
    extend: 'Ext.window.Window',
	height: 250,
    width: 450,
    layout: {
        type: 'fit'
    },
    title: '角色选择',
    modal: true,
    plain: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    title: '',
                    id:'gridCenter2',
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
                            dataIndex: 'roleGroupDesc'
                        }
                        ,
                        {
                        	text     : '是否系统角色',
                            width    : 100,
                            dataIndex: 'isSystemName'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGridpanelItemDblClick,
                            scope: me
                        }
                    },
					selModel: Ext.create('Ext.selection.CheckboxModel', {
						
					}),
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
								store: storePageSize,
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
    },
    onComboBoxMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	storeRoleGroup.removeAll();
    	storeRoleGroup.currentPage=1;
    	Ext.getCmp('gridCenter2').pageSize=pSize;
    	storeRoleGroup.pageSize=pSize;
    	storeRoleGroup.load();
    }
});
var addRoleGroupRoleRel=function(win){
	//var record=win.down('gridpanel').getSelectionModel().getSelection();
	var record = Ext.getCmp('gridCenter2').getSelectionModel().getSelection();
	
	if(record.length > 0){
		// 获得选中的角色组ID
		var roleGroupIdList = getIdList('gridCenter2','roleGroupId');
		// 获得当前选中的角色ID
		var roleId = Ext.getCmp('txtRoleGroupId').getValue();
		
		Ext.Ajax.request({ 
			url: "/OSS/admin/rolegroup/rolegroup_addRoleGroupRoleRel",
			method : 'post', 
			params : {id: roleId,idlist:roleGroupIdList},
			
			success : function(response, options){ 
				 Ext.MessageBox.show({title : '事件消息',msg :"归属成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
				 // 刷新某一角色的角色组列表
				 
				 getRolegroupRoleList(roleId);
				 win.hide();
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
var getSelectRoleIdList=function(){
	var grid=Ext.getCmp('gridCenter1');
	var record = grid.getSelectionModel().getSelection();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+record[i].get("roleGroupId");
	}
	return idList;
};



var getIdList=function(gridCenterName, elementName){
	var grid=Ext.getCmp(gridCenterName);
	var record = grid.getSelectionModel().getSelection();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+record[i].get(elementName);
	}
	// 清除选中
	Ext.getCmp(gridCenterName).getSelectionModel().clearSelections();
	return idList;
};


