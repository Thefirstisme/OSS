Ext.define('OSS.view.RoleGroupList', {
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
                    title: '',
                    id: 'GridMain',
                    store: storeRoleGroup,
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
                            text     : '角色组名称',
                            /*flex     : 1,*/
                            width    : 100,
                            sortable : false,
                            dataIndex: 'roleGroupName'
                        },
					    {
                            text     : '角色组描述',
                            /*flex     : 1,*/
                            width    : 150,
                            dataIndex: 'roleGroupDesc'
                        },
                        {
                        	text     : '是否系统角色组',
                            width    : 100,
                            dataIndex: 'isSystemName'
                        },
                        {
                        	text     : '创建时间',
                            width    : 120,
                            dataIndex: 'createTime'
                        },
                        {
                        	text     : '最后修改时间',
                            width    : 120,
                            dataIndex: 'modifyTime'
                        },
                        {
                        	text     : '修改人',
                            width    : 100,
                            dataIndex: 'operatorId'
                        }
                        
                    ],
                    viewConfig: {
                        stripeRows: true
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeRoleGroup,
                        id: 'PagingToolbarMain',
                        displayInfo: true,
                        displayMsg: '显示 {0} - {1}条, 共 {2}条',
                        emptyMsg: "没有可显示的记录",
                        pageSize: 20,
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
                        ,plugins: Ext.create('Ext.ux.ProgressBarPager',{})
                    }),
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonUser2',
                                    iconCls: 'icon-noteadd',
                                    text: '基本信息管理',
                                    tooltip: '基本信息管理',
                                    menu: {
                                        xtype: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                id: 'MenuItemRoleAdd',
                                                iconCls: 'icon-useradd',
                                                text: '添加角色组',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuItemRoleAddClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'MenuItemRoleEdit',
                                                iconCls: 'icon-useredit',
                                                text: '修改角色组',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuItemRoleEditClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'MenuItemRoleDelete',
                                                iconCls: 'icon-usercross',
                                                text: '删除角色组',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuItemRoleDeleteClick,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonRoleSet',
                                    iconCls: 'icon-usercomment',
                                    text: '角色组用户设置',
                                    tooltip: '角色组用户设置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonRoleSetClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'BtnSetRoleGroup',
                                    iconCls: 'icon-groupgear',
                                    text: '角色组角色设置',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnSetRoleGroupClick,
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
                                            fn: me.onButtonClick,
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

    onMenuItemRoleAddClick: function(item, e, eOpts) {
    	InitWinLoadExec('角色组添加',420,225,'icon-useradd','RoleGroupAdd.jsp');
    },

    onMenuItemRoleEditClick: function(item, e, eOpts) {
    	var record = this.down('gridpanel').getSelectionModel().getSelection();
	   	 if(record.length == 0){
	   		 Ext.MessageBox.show({ 
	                title:"提示", 
	                msg:"请先选择您要操作的行!", 
	                icon: Ext.MessageBox.INFO, 
	                buttons: Ext.Msg.OK 
	            });
	   	 }
	   	 else if(record.length > 1){
	   		 Ext.MessageBox.show({ 
	                title:"提示", 
	                msg:"请选择一条记录!", 
	                icon: Ext.MessageBox.INFO, 
	                buttons: Ext.Msg.OK 
	            });
	            return;
	   	 }
	   	 else{
	   		var id=record[0].get("roleGroupId");
	   		InitWinLoadExec('角色组修改',420,225,'icon-useredit','RoleGroupEdit.jsp?id='+id);
	   	 }
    },

    onMenuItemRoleDeleteClick: function(item, e, eOpts) {
    	var record = this.down('gridpanel').getSelectionModel().getSelection();
      	 if(record.length == 0){
      		 Ext.MessageBox.show({ 
                   title:"提示", 
                   msg:"请先选择您要操作的行!", 
                   icon: Ext.MessageBox.INFO, 
                   buttons: Ext.Msg.OK 
               });
      	 }
      	 else
  		 {
       	 	var ifSys = '否';
    		for(var i=0;i<record.length; i++){
    			if(record[i].get("isSystemName") == '是'){
    				ifSys = '是';
    				break;
    			}
    		}
    		if(ifSys == '是'){
    			OSS.AlertError('系统角色组不能删除！');
    		}else{
		      	Ext.MessageBox.show(
		   	        {
		   	          title: '信息',
		   	          msg: "您确定删除所选记录吗？",
		   	          buttons: Ext.MessageBox.YESNO,
		   	          fn: handleSaveYesNo,
		   	          animEl: 'mb4',
		   	          icon: Ext.MessageBox.QUESTION
		   	        });
    		}
  		 }
    },

    onButtonRoleSetClick: function(item, e, eOpts) {
    	InitWinLoadExec('角色组与用户关系设置',1000,500,'icon-useradd','RoleGroupUser.jsp');
    },

    onBtnSetRoleGroupClick: function(button, e, eOpts) {
    	InitWinLoadExec('角色组与角色关系设置',1000,500,'icon-useradd','RoleGroupRole.jsp');	
    },

    onButtonClick: function(button, e, eOpts) {
    	this.down('gridpanel').getStore().load();  
    },
    onComboBoxMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	storeRoleGroup.removeAll();
    	storeRoleGroup.currentPage=1;
    	Ext.getCmp('PagingToolbarMain').pageSize=pSize;
    	storeRoleGroup.pageSize=pSize;
    	storeRoleGroup.load();
    }
});
var InitRoleGroupList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleGroupList();
};
var storeRoleGroup = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'roleGroupId',
	remoteSort: true,
	fields: [
       {name: 'roleGroupId',type:'string'},
       {name: 'roleGroupNo' ,type:'string'},
       {name: 'roleGroupName',type:'string'},
       {name: 'roleGroupDesc',type:'string'},
       {name: 'isSystem',type:'string'},
       {name: 'operatorId',type:'string'},
       {name: 'status',type:'string'},
       {name: 'createTime',type:'string'},
       {name: 'isSystemName',type:'string'},
       {name: 'modifyTime',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/rolegroup/rolegroup_getRoleGroupList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
        simpleSortMode: true
	}),
	sorters: [{
        property: 'roleGroupNo',
        direction: 'ASC'
    }]
});

var winLoadExec;
function InitWinLoadExec(title,width,height,icoCls,url){
winLoadExec=Ext.create('Ext.window.Window',{
	title: title,
	width: width,
	height:height,
	iconCls: icoCls,
	resizable:      false, 
    maximizable:false,
    modal: true,
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center',
    items: {
        xtype: 'component',
        autoEl: {
            tag: 'iframe',
            style: 'height: 100%; width: 100%; border: none;',
            src: url
        },
        listeners: {
            load: {
                element: 'el',
                fn: function () {
                    this.parent().unmask();
                }
            },
            render: function () {
                this.up('panel').body.mask('正在加载，请稍候... ...');
            }
        }
    },
    listeners: {
        hide: {
            fn: onWindowHide
        }
    }
   }); 
winLoadExec.show();
};
var onWindowHide= function(component, eOpts) {
	Ext.getCmp('GridMain').getStore().load();  
};
function handleSaveYesNo( btn )
{
  switch( btn )
  {
    case 'yes':
    	delRole();
      break;
    case 'no':
      break;
  }
};
function delRole()
{
	var grid=Ext.getCmp('GridMain');
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
	Ext.Ajax.request({ 
		url: "/OSS/admin/rolegroup/rolegroup_delRoleGroup",
		method : 'post', 
		params : {id: idList},
		success : function(response, options){ 
			 Ext.MessageBox.show({title : '事件消息',msg :"删除成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 grid.getStore().load();  
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
}