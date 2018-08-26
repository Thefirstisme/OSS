Ext.define('OSS.view.RoleList', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

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
                    region: 'center',
                    title: '',
                    id:'GridMain',
                    store: storeRole,
                    columns: [
                       {xtype: 'rownumberer',width: 40, sortable: false, resizable: true},
					   {text: '角色名称',width: 120, sortable : false,dataIndex: 'roleName'},
					    {
                            text     : '角色描述',
                            width    : 120,
                            dataIndex: 'description'
                        },
                        {
                        	text     : '角色数据权限',
                            width    : 150,
                            dataIndex: 'dataLevelName'
                        },
                        {
                        	text     : '机构向上级数(角色数据权限)',
                            width    : 200,
                            dataIndex: 'dataUpSeries'
                        }
                        ,
                        {
                        	text     : '是否系统角色',
                            width    : 100,
                            dataIndex: 'isSystemName'
                        }
                        ,
                        {
                        	text     : '归属系统',
                            width    : 140,
                            dataIndex: 'systemIdName'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
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
                                                text: '添加角色',
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
                                                text: '修改角色',
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
                                                text: '删除角色',
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
                                    text: '角色权限设置',
                                    tooltip: '角色权限设置',
                                    menu: {
                                        xtype: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                id: 'ButtonGroupPermit',
                                                iconCls: 'icon-group',
                                                text: '设置角色权限',
                                                listeners: {
                                                    click: {
                                                        fn: me.onButtonGroupPermitClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'ButtonGroupPermits',
                                                iconCls: 'icon-groupgear',
                                                text: '批量设置权限',
                                                listeners: {
                                                    click: {
                                                        fn: me.onButtonGroupPermitsClick,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'BtnSetRoleGroup',
                                    iconCls: 'icon-groupgear',
                                    text: '角色归属角色组设置',
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
    	InitWinLoadExec('角色添加',420,345,'icon-useradd','RoleAdd.jsp');
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
	   		var id=record[0].get("roleId");
	       	InitWinLoadExec('角色修改',420,345,'icon-useredit','RoleEdit.jsp?id='+id);
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
       	 }else {
       	 	var ifSys = '否';
    		for(var i=0;i<record.length; i++){
    			if(record[i].get("isSystemName") == '是'){
    				ifSys = '是';
    				break;
    			}
    		}
    		if(ifSys == '是'){
    			OSS.AlertError('系统角色不能删除！');
    		}else{
		       	Ext.MessageBox.show({
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

    onButtonGroupPermitClick: function(item, e, eOpts) {
    	var record = this.down('gridpanel').getSelectionModel().getSelection();
    	if(record.length == 0){
    		Ext.MessageBox.show({ 
                title:"提示", 
                msg:"请选择一条需要权限分配的角色！", 
                icon: Ext.MessageBox.INFO, 
                buttons: Ext.Msg.OK 
            });
    	}
    	else{
    		var id='';
    		if(record.length==1){
    			id=record[0].get("roleId");
    		}
    		InitWinLoadExec('角色权限设置(单角色)',1000,500,'icon-group','RoleOperator.jsp?id='+id);
    	}
    },

    onButtonGroupPermitsClick: function(item, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'批量角色权限设置事件',buttons: Ext.Msg.OK,closable : false});
    	var record = this.down('gridpanel').getSelectionModel().getSelection();
    	var idList="";
        if(record.length == 0){
            Ext.MessageBox.show({ 
                title:"提示", 
                msg:"至少选择一条需要权限分配的角色！", 
                icon: Ext.MessageBox.INFO, 
                buttons: Ext.Msg.OK 
            });
        }else
        {
            if(record!=null && record.length>0){
                for(var i=0;i<record.length;i++)
                {
                    if(idList.length>0)
                    {
                        idList=idList+',';
                    }
                    idList=idList+record[i].get("roleId");
                }
            }
            InitWinLoadExec('角色权限设置(批量)',1000,500,'icon-groupgear','RoleOperators.jsp?id='+idList);

        }
    	
    },

    onBtnSetRoleGroupClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'角色角色组事件',buttons: Ext.Msg.OK,closable : false});
    	InitWinLoadExec('角色与角色组关系设置',1000,500,'icon-useradd','RoleGroups.jsp');	
    },

    onButtonClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'刷新事件',buttons: Ext.Msg.OK,closable : false});
    	this.down('gridpanel').getStore().load();  
    }

});
var InitRoleList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleList();
    //Ext.getCmp("GridMain").store.load(); 
};
var storeRole = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:20,
	idProperty: 'roleId',
	remoteSort: true,
	fields: [
       {name: 'roleId',type:'string'},
       {name: 'roleName' ,type:'string'},
       {name: 'description',type:'string'},
       {name: 'operatorId',type:'string'},
       {name: 'dataLevelName',type:'string'},
       {name: 'dataUpSeries',type:'int'},
       {name: 'isSystemName',type:'string'},
       {name: 'systemIdName',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/role/role_getRoleList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
	})
});
var LeftCellTip = function(value, meta, rec, rowIndex, coIndex, ds) {
	 var tips = "<div ext:qtitle='' ext:qtip='" + rec.data.LeftValue + "'>" + value + "</div>";
     return tips;
};
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
		idList=idList+record[i].get("roleId");
	}
	Ext.Ajax.request({ 
		url: "/OSS/admin/role/role_delRole",
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
};