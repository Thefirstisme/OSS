Ext.define('OSS.view.UserInfoList', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/org/org_getOrgList'
            },
            root: {
                text: '机构列表',
                id: '0',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
				{
				    xtype: 'panel',
				    region: 'west',
				    split: true,
				    border: false,
				    id: 'PanelLeft',
				    maxWidth: 200,
				    minWidth: 200,
				    padding: 0,
				    width: 200,
				    layout: {
				        type: 'fit'
				    },
				    title: '机构',
				    items: [
				        {
				            xtype: 'treepanel',
				            border: true,
				            id: 'TreePanelBranch',
				            padding: 0,
				            autoScroll: true,
				            store : storeTree, 
				            title: '',
				            viewConfig: {
				            	rootVisible: true
				            },
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
				        }
				    ]
				},
                {
                    xtype: 'gridpanel',
                    id: 'GridMain',
                    region: 'center',
                    title: '',
                    store: storeUser,
                    columns: [{
		                        xtype: 'rownumberer',
		                        width    : 40,
		                        sortable: false,
	                        	resizable: true
		                    	},
		                    	{
		                            xtype: 'actioncolumn',
		                            width    : 40,
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
                              ,
                              {
                                  text     : '所在机构',
                                  width    : 180,
                                  sortable : true,
                                  /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                                  dataIndex: 'positionname'
                              }
                              ,
                              {
                                  text     : '联系电话',
                                  width    : 100,
                                  sortable : true,
                                  /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                                  dataIndex: 'tel'
                              }
                              ,
                              {
                                  text     : '手机号码',
                                  width    : 100,
                                  sortable : true,
                                  /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                                  dataIndex: 'mobile'
                              }
                              ,
                              {
                                  text     : '电子邮箱',
                                  width    : 160,
                                  sortable : true,
                                  /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
                                  dataIndex: 'email'
                              }
//                              ,
//                              {
//                                  text     : '登录方式',
//                                  width    : 80,
//                                  sortable : true,
//                                  /*renderer : Ext.util.Format.dateRenderer('m/d/Y'),*/
//                                  dataIndex: 'loginModeName'
//                              }
                          ],
                          viewConfig: {
                              stripeRows: true
                          },
                          selModel: Ext.create('Ext.selection.CheckboxModel', {

                          }),
                          features : [ 
                                      { 
                                     	 ftype : 'filters',
                                     	 encode: false,
                                     	 menuFilterText: '搜索',
                                     	 filters: [
                                     	     {type: 'string',dataIndex: 'userName'}
											,{type: 'string',dataIndex: 'userAccount'}
											,{type: 'string',dataIndex: 'empId'}
											,{type: 'string',dataIndex: 'assName'}
											,{type: 'string',dataIndex: 'tel'}
											,{type: 'string',dataIndex: 'mobile'}
											,{type: 'string',dataIndex: 'email'}
                                     	 ]
                                      }
                          ],
                          bbar: Ext.create('Ext.PagingToolbar', {
                              store: storeUser,
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
                                        id: 'ButtonUser',
                                        iconCls: 'icon-user',
                                        text: '基本信息管理',
                                        tooltip: '用户基本信息管理',
                                        menu: {
                                            xtype: 'menu',
                                            id: 'menuUser',
                                            items: [
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'MenuItemUserAdd',
                                                    iconCls: 'icon-useradd',
                                                    text: '添加用户',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onMenuItemUserAddClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'MenuItemUserEdit',
                                                    iconCls: 'icon-useredit',
                                                    text: '修改用户',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onMenuItemUserEditClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'MenuItemUserDelete',
                                                    iconCls: 'icon-userdelete',
                                                    text: '删除用户',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onMenuItemUserDeleteClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'menuseparator'
                                                },
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'MenuItemUserPassUpd',
                                                    iconCls: 'icon-userkey',
                                                    text: '用户密码重置',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onMenuItemUserPassUpdClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'btnUserRoleGroup',
                                        iconCls: 'icon-usercomment',
                                        text: '用户角色组设置',
                                        menu: {
                                            xtype: 'menu',
                                            items: [
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'ButtonGroup',
                                                    iconCls: 'icon-group',
                                                    text: '设置用户角色组',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonGroupClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'menuitem',
                                                    id: 'ButtonGroups',
                                                    iconCls: 'icon-groupgear',
                                                    text: '批量设置角色组',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonGroupsClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'btnUserGroupSet',
                                        iconCls: 'icon-groupgo',
                                        text: '归属机构设置',
                                        listeners: {
                                            click: {
                                                fn: me.onBtnUserGroupSetClick,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'hiddenfield',
                                        anchor: '100%',
                                        id: 'txtGroupId',
                                        name: 'txtGroupId',
                                        fieldLabel: 'Label',
                                        value: ''
                                    }
                                ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onButtonAscx1Click: function(button, e, eOpts) {
    	Ext.getCmp("TreePanelBranch").expandAll();
    },
    onButtonAscx2Click: function(button, e, eOpts) {
    	Ext.getCmp("TreePanelBranch").collapseAll();
    },
    onComboBoxMainSelect: function(combo, records, eOpts) {
    	var pSize=parseInt(records[0].data.id);
    	storeUser.removeAll();
    	storeUser.currentPage=1;
    	Ext.getCmp('PagingToolbarMain').pageSize=pSize;
    	storeUser.pageSize=pSize;
    	storeUser.load();
    },
    onMenuItemUserAddClick: function(item, e, eOpts) {
    	InitWinLoadExec();
    	winLoadExec.title='用户添加';
    	winLoadExec.width=420;
    	winLoadExec.height=445;
    	winLoadExec.iconCls='icon-useradd';
    	winLoadExec.html='<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=UserAdd.jsp></iframe>' ;
    	winLoadExec.show();
    },

    onMenuItemUserEditClick: function(item, e, eOpts) {
    	var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
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
    		var id=record[0].get("userId");
    		InitWinLoadExec();
    		winLoadExec.title='用户修改';
        	winLoadExec.width=420;
        	winLoadExec.height=445;
        	winLoadExec.iconCls='icon-useredit';
        	winLoadExec.html='<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=UserEdit.jsp?id='+id+'></iframe>' ;
        	winLoadExec.show();
    	 }
    },

    onMenuItemUserDeleteClick: function(item, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'用户 删除事件',buttons: Ext.Msg.OK,closable : false});
     var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
   	 if(record.length == 0){
   		 Ext.MessageBox.show({ 
                title:"提示", 
                msg:"请先选择您要操作的行!", 
                icon: Ext.MessageBox.INFO, 
                buttons: Ext.Msg.OK 
            });
   	 }else {
	   	Ext.MessageBox.show( {
	          title: '信息',
	          msg: "您确定删除所选记录吗？",
	          buttons: Ext.MessageBox.YESNO,
	          fn: handleSaveYesNo,
	          animEl: 'mb4',
	          icon: Ext.MessageBox.QUESTION
		});
   	 }
    },

    onMenuItemUserPassUpdClick: function(item, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'用户 密码重置事件',buttons: Ext.Msg.OK,closable : false});
    	 var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
       	 if(record.length == 0){
       		 Ext.MessageBox.show({ 
                    title:"提示", 
                    msg:"请先选择您要操作的行!", 
                    icon: Ext.MessageBox.ERROR, 
                    buttons: Ext.Msg.OK 
                });
       	 }
       	 else if(record.length >1)
       	{
       		Ext.MessageBox.show({ 
                title:"提示", 
                msg:"请选择一个用户！", 
                icon: Ext.MessageBox.ERROR, 
                buttons: Ext.Msg.OK 
            });
       	}
       	 else{
	       	Ext.MessageBox.show(
	    	        {
	    	          title: '信息',
	    	          msg: "您确定重置所选用户密码吗？",
	    	          buttons: Ext.MessageBox.YESNO,
	    	          fn: handleSavePassYesNo,
	    	          animEl: 'mb4',
	    	          icon: Ext.MessageBox.QUESTION
	    	        });
       	 }
    },

    onButtonGroupClick: function(item, e, eOpts) {
    	var selectCount=OSS.GridPanel.getSelectCount(OSS.getExtControl('GridMain'));
    	if(selectCount==0){
    		OSS.AlertInfo('请先选择您要操作的行!');
    	}else if(selectCount>1){
    		OSS.AlertInfo('请选择一条记录!');
    	}else{
    		var userId=OSS.GridPanel.getSelectId(OSS.getExtControl('GridMain'), 'userId');
    		InitWinMainExec('设置用户角色组',420,445,'icon-group','UserRole.jsp?userId=' + userId);
    	}
    },

    onButtonGroupsClick: function(item, e, eOpts) {
    	var selectCount=OSS.GridPanel.getSelectCount(OSS.getExtControl('GridMain'));
    	if(selectCount==0){
    		OSS.AlertInfo('请先选择您要操作的行!');
    	}else{
    		var userIdList=OSS.GridPanel.getSelectIdList(OSS.getExtControl('GridMain'), 'userId');
    		InitWinMainExec('批量设置角色组',400,400,'icon-group','UserRoles.jsp?userId=' + userIdList);
    	}
    	
    	//Ext.Msg.show({title : '事件消息',msg :'批量设置用户角色组事件',buttons: Ext.Msg.OK,closable : false});
//    	var win=Ext.create('Ext.window.Window',{  
//    	    title: '批量设置角色组',  
//    	    resizable:      false, //变大小   
//    	    width: 400, 
//    	    maximizable:false,
//    	    height:400,  
//    	    iconCls: 'icon-group',
//    	    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
//    	    plain:true,  
//    	    bodyStyle:'padding:0px;',  
//    	    buttonAlign:'center',  
//    	    html:'<iframe id=thisIframe width=390 height=365 frameborder=0 scrolling=auto src=UserRoles.jsp></iframe>'  
//    	   }); 
//    	win.show();
    },

    onBtnUserGroupSetClick: function(button, e, eOpts) {
    	toUserOrg();
    },

    onBtnUserSearchClick: function(item, e, eOpts) {
    	OSS.AlertInfo("用户基本信息变更查询事件");
    },

    onBtnUserInfoClick: function(item, e, eOpts) {
    	OSS.AlertInfo("用户职能信息变更查询事件");
    },

    onBtnUserGroupSearchClick: function(item, e, eOpts) {
    	OSS.AlertInfo("用户归属机构关系变更查询事件");
    },
    onTreeSourceMainItemClick: function(dataview, record, item, index, e, eOpts) {
    	Ext.getCmp("txtGroupId").setValue(record.data.id);
    	dataRefresh();
    }
});
var storeUser = new Ext.data.JsonStore({
	autoLoad: true,
    pageSize:20,
	idProperty: 'userId',
	remoteSort: true,
	fields: [{name:'userId',type:'string'},
	         {name:'userAccount',type:'string'},
	         {name:'userName',type:'string'},
	         {name:'empId',type:'string'},
	         {name:'defaultLan',type:'string'},
	         {name:'tel',type:'string'},
	         {name:'mobile',type:'string'},
	         {name:'email',type:'string'},
	         {name:'description',type:'string'},
	         {name:'theme',type:'string'},
	         {name:'isSystem',type:'string'},
	         {name:'isDepaLeader',type:'string'},
	         {name:'status',type:'string'},
	         {name:'positionId',type:'string'},
	         {name:'assId',type:'string'},
	         {name:'positionName',type:'string'},
	         {name:'assName',type:'string'},
	         {name:'loginModeName',type:'string'}
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
    		orgId:OSS.getExtValue('txtGroupId')
		    };
    Ext.apply(store.proxy.extraParams, new_params);
});
var dataRefresh=function(){
	storeUser.removeAll();
	storeUser.currentPage=1;
	storeUser.load();
};
var InitUserInfoList=function(){
	/*Ext.BLANK_IMAGE_URL = 'OSS/resource/ext/resources/s.gif';*/
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoList();	
};
var winObj = Ext.create('Ext.window.Window',{
	width:500,
	height:300,
	maximizable:false,
	modal:true,
	loader : {
	url : "userinfo.html",
	loadMask : true,
	autoLoad : true, // important
	renderer : 'html' // this is also the default option, other options are data | component
	},
	title:"用户添加",
	buttons: [{
	text: 'Close',
	handler: function(){
	winObj.hide(); // hides the window // you can also use close() in case you want to get rid of this El from DOM
	}
	}]
	});
var winLoadExec;
function InitWinLoadExec(){
winLoadExec=Ext.create('Ext.window.Window',{
    resizable:      false, //变大小   
    maximizable:false,
    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center'
   }); 
};
function handleSaveYesNo( btn )
{
  switch( btn )
  {
    case 'yes':
    	delUser();
      break;
    case 'no':
      break;
  }
};
function handleSavePassYesNo( btn )
{
  switch( btn )
  {
    case 'yes':
    	reSetUserPass();
      break;
    case 'no':
      break;
  }
};
function delUser()
{
	var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
	var idList="";
	for(var i=0;i<record.length;i++)
	{
		idList=idList+","+record[i].get("userId");
	}
	Ext.Ajax.request({ 
		url: "/OSS/admin/user/user_delUser",
		method : 'post', 
		params : {id: idList},
		success : function(response, options){ 
			 OSS.AlertInfo("删除成功!", dataRefresh);
		 },
		 failure : function(response){ 
			 //var c1 = Ext.JSON.decode(response.responseText);
			 //Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
};
function reSetUserPass(){
	var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
	var id=record[0].get("userId");
	Ext.Ajax.request({ 
		url: "/OSS/admin/user/user_setUserPass",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			OSS.AlertInfo(c1.msg);
		 },
		 failure : function(response, options){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
};
var winMainExec;
function InitWinMainExec(title,width,height,icoCls,url){
	winMainExec=Ext.create('Ext.window.Window',{
	title: title,
	width: width,
	height: height,
	iconCls: icoCls,
	resizable: false, 
    maximizable: false,
    modal: true,
    plain: true,  
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
    }
   }); 
	winMainExec.show();
};
// 关闭修改用户信息
function winClose(){
	winMainExec.hide();
}
// 检查是否选且只选中一行
function checkSelect(){
	var record = Ext.getCmp('GridMain').getSelectionModel().getSelection();
	 if(record.length == 0){
		 Ext.MessageBox.show({ 
             title:"提示", 
             msg:"请先选择您要操作的行!", 
             icon: Ext.MessageBox.INFO, 
             buttons: Ext.Msg.OK 
         });
         return false;
	 }
	 else if(record.length > 1){
		 Ext.MessageBox.show({ 
             title:"提示", 
             msg:"请选择一条记录!", 
             icon: Ext.MessageBox.INFO, 
             buttons: Ext.Msg.OK 
         });
         return false;
	 }
	 return true;
}
// 进入【机构归属设置页面】
function toUserOrg(){    	
	var selectCount=OSS.GridPanel.getSelectCount(OSS.getExtControl('GridMain'));
	if(selectCount==0){
		OSS.AlertInfo('请先选择您要操作的行!');
	}else{
		winOpen('归属机构设置',420,445,'icon-groupadd','UserOrg.jsp');
	}
}
// 关闭【机构归属设置页面】
function toCloseUserOrg(){
	//winClose();可以调用web.util.js 的公用方法，但此处已经使用该方法名
	// winCommon 是在web.util.js中定义的
	winCommon.hide();
}
// 判断是否选中用户
function getSelectId(){
	return Ext.getCmp('GridMain').getSelectionModel().getSelection();
}
//获得选中行的id
var getSelectUserIdList=function(){
	return OSS.GridPanel.getSelectIdList(Ext.getCmp('GridMain'), 'userId');
//	var grid=Ext.getCmp('userList');
//	var record = grid.getSelectionModel().getSelection();
//	var idList="";
//	for(var i=0;i<record.length;i++)
//	{
//		if(idList.length>0)
//		{
//			idList=idList+',';
//		}
//		idList=idList+record[i].get("userId");
//	}
//	return idList;
};
