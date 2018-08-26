
Ext.define('OSS.view.SourceTree', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'osstreepanel',
                    region: 'center',
                    //border: false,
                    id: 'TreeSourceMain',
                    padding: '',
                    autoScroll: true,
                    title: '',
                    store: storeTree,
                    loadMsg: true,
                    animate: true,
                    viewConfig: {
                    	rootVisible: true
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button11',
                                    iconCls: 'icon-group',
                                    text: '基本信息管理',
                                    tooltip: '资源基本信息管理',
                                    menu: {
                                        xtype: 'menu',
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                id: 'btnSourceAdd',
                                                iconCls: 'icon-add',
                                                text: '添加资源',
                                                listeners: {
                                                    click: {
                                                        fn: me.onBtnSourceAddClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'btnSourceEdit',
                                                iconCls: 'icon-noteedit',
                                                text: '修改资源',
                                                listeners: {
                                                    click: {
                                                        fn: me.onBtnSourceEditClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'btnSourceDelete',
                                                iconCls: 'icon-cross',
                                                text: '删除资源',
                                                listeners: {
                                                    click: {
                                                        fn: me.onBtnSourceDeleteClick,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button212',
                                    iconCls: 'icon-usercomment',
                                    text: '资源权限设置',
                                    menu: {
                                        xtype: 'menu',
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                id: 'btnSourceRole',
                                                iconCls: 'icon-group',
                                                text: '设置资源角色',
                                                listeners: {
                                                    click: {
                                                        fn: me.onBtnSourceRoleClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                id: 'btnSourceRoles',
                                                iconCls: 'icon-groupgear',
                                                text: '批量设置资源角色',
                                                listeners: {
                                                    click: {
                                                        fn: me.onBtnSourceRolesClick,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                	xtype: 'triggerfield',
                                    id: 'trigFilterText',
                                    triggerCls: 'x-form-clear-trigger',
                                    fieldLabel: '',
                                    emptyText: '查询请输入资源名称',
                                    enableKeyEvents: true
                                    ,
                                    onTriggerClick: function () {  
                                        this.setValue('');  
                                        Ext.getCmp("TreeSourceMain").clearFilter();  
                                    },
                                    listeners: {  
                                        keyup: {  
                                        	fn: me.onTrigFilterTextClick,
                                            scope: me
//                                        	fn: function (field, e) {  
//                                                if (Ext.EventObject.ESC == e.getKey()) {  
//                                                    field.onTriggerClick();  
//                                                } else {  
//                                                    Ext.getCmp("TreeSourceMain").filterByText(this.getRawValue());  
//                                                }  
//                                            }  
                                        }  
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonRefresh',
                                    iconCls: 'icon-databaserefresh',
                                    text: '刷新',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonRefreshClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button41',
                                    iconCls: 'icon-expand-all',
                                    text: '展开全部节点',
                                    listeners: {
                                        click: {
                                            fn: me.onButton41Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button51',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠全部节点',
                                    listeners: {
                                        click: {
                                            fn: me.onButton51Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
//                    selModel: Ext.create('Ext.selection.RowModel', {
//                    }),
                    listeners: {
                        itemclick: {
                            fn: me.onTreeSourceMainItemClick,
                            scope: me
                        },
                        itemcontextmenu: {
                            fn: me.onTreeSourceMainItemContextMenu,
                            scope: me
                        },
                        afterrender:{
                        	fn: me.onHandleAfterListTreeRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'form',
                    region: 'east',
                    split: true,
                    id: 'panelDeptInfo',
                    maxWidth: 300,
                    minWidth: 300,
                    width: 300,
                    bodyPadding: 10,
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-table',
                    title: '资源信息',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button6',
                                    iconCls: 'icon-tableedit',
                                    text: '编辑',
                                    listeners: {
                                        click: {
                                            fn: me.onButton6Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button7',
                                    iconCls: 'icon-tabledelete',
                                    text: '删除',
                                    listeners: {
                                        click: {
                                            fn: me.onButton7Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleParent',
                            fieldLabel: '父级资源名称',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleCode',
                            fieldLabel: '资源代码',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleName',
                            fieldLabel: '资源名称',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleTypeName',
                            fieldLabel: '资源类型',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblSourceFrom',
                            fieldLabel: '资源来源',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleActionList',
                            fieldLabel: '资源许可',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModuleUrl',
                            fieldLabel: '资源地址',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblIsWork',
                            fieldLabel: '是否工作台',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblIconCls',
                            fieldLabel: '图标样式',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblOperator',
                            fieldLabel: '最后修改人',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblCreateTime',
                            fieldLabel: '创建时间',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblModifyTime',
                            fieldLabel: '最后修改时间',
                            readOnly: true
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'hidCurrentId',
                            fieldLabel: 'Label'
                        }
                    ]
                }
            ]
        });
        me.contextMenu = Ext.create("OSS.view.SourceTree.ContextMenu");  
        me.callParent(arguments);
    },
    onTrigFilterTextClick:function(item, e, eOpts) {
      if (Ext.EventObject.ESC == e.getKey()) {  
    	  item.onTriggerClick();  
      } else {  
          Ext.getCmp("TreeSourceMain").filterByText(Ext.getCmp("trigFilterText").getRawValue());  
      }  
    },
    onBtnSourceAddClick: function(item, e, eOpts) {
    	addSourceClick();
    },

    onBtnSourceEditClick: function(item, e, eOpts) {
    	editSourceClick();
    },

    onBtnSourceDeleteClick: function(item, e, eOpts) {
    	delSourceClick();
    },

    onBtnSourceRoleClick: function(item, e, eOpts) {
    	var id=Ext.getCmp("hidCurrentId").getValue();
    	if(id!=null && id.length>0){
	    	InitWinLoadExec('划归角色',600,400,'icon-add','SourceRole.jsp?id='+id);
    	}
    	else{
    		Ext.Msg.show({title : '事件消息',msg :'请选中需要编辑的资源',buttons: Ext.Msg.OK,closable : false,icon: Ext.MessageBox.ERROR});
    	}
    },

    onBtnSourceRolesClick: function(item, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'批量设置资源角色事件',buttons: Ext.Msg.OK,closable : false});
    	InitWinLoadExec('批量设置资源角色',1000,500,'icon-groupgear','../role/RoleOperators.jsp?id=');
    },

    onButtonRefreshClick: function(button, e, eOpts) {
    	treeRefresh(this.down('treepanel'));
    },

    onTreeSourceMainSelectionChange: function(model, selected, eOpts) {
    	Ext.getCmp("hidCurrentId").setValue(record.data.id);
    },
    
    onTreeSourceMainItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    	//e.preventDefault();
        //e.stopEvent();// 这两个很重要，否则点击鼠标右键还是会出现浏览器的选项
        Ext.getCmp("hidCurrentId").setValue(record.data.id);
        this.contextMenu.contextNode =item;
        this.contextMenu.showAt(e.getXY());  
        e.preventDefault();  
        setNodeInfo();
    },
    onTreeSourceMainItemClick: function(dataview, record, item, index, e, eOpts) {
    	Ext.getCmp("hidCurrentId").setValue(record.data.id);
    	setNodeInfo();
    	Ext.getCmp("panelDeptInfo").expand();
    },
    onButton41Click: function(button, e, eOpts) {
    	//this.down('treepanel').expandAll();
    	expandChildNode(this.down('treepanel'));
    },

    onButton51Click: function(button, e, eOpts) {
    	this.down('treepanel').collapseAll();
    },

    onButton6Click: function(button, e, eOpts) {
    	editSourceClick();
    },
    onButton7Click: function(button, e, eOpts) {
    	delSourceClick();
    },
    onHandleAfterListTreeRender: function(tree){
    	tree.getSelectionModel().select(0); 
    }
});
var storeTree = new Ext.data.TreeStore({
    proxy: {
        type: 'ajax',
        url: '/OSS/admin/source/source_getSourceList'
    },
    root: {
        text: '资源列表',
        id: '0',
        expanded: true
    }
});
//定义菜单  
Ext.define('OSS.view.SourceTree.ContextMenu', {  
    extend: 'Ext.menu.Menu',  
    xtype: 'listsContextMenu',  
    items: [  
        {  
        	xtype: 'menuitem',
            id: 'addSameLevel',
            iconCls: 'icon-folderadd',
            text: '增加同级资源',
            listeners: {
                click: {
                	 fn: addSourceClicks
                }
            }
        },  
        {  
        	xtype: 'menuitem',
            id: 'addChildLevel',
            iconCls: 'icon-pageadd',
            text: '增加下属资源',
            listeners: {
                click: {
                	 fn: addSourceClick
                }
            }
        },  
        {  
        	xtype: 'menuitem',
            id: 'editDept',
            iconCls: 'icon-folderedit',
            text: '编辑此资源',
            listeners: {
                click: {
                	 fn: editSourceClick
                }
            }
        },  
        {  
        	xtype: 'menuitem',
            id: 'delDept',
            iconCls: 'icon-folderdelete',
            text: '删除此资源',
            listeners: {
                click: {
                	 fn: delSourceClick
                }
            }
        },
        {
            xtype: 'menuseparator'
        },  
        {  
        	xtype: 'menuitem',
            id: 'moveUp',
            iconCls: 'icon-arrowup',
            text: '将此资源上移',
            listeners: {
                click: {
                	 fn: moveUpDepartment
                }
            }
        },  
        {  
        	xtype: 'menuitem',
            id: 'moveDown',
            iconCls: 'icon-arrowdown',
            text: '将此资源下移',
 
           listeners: {
                click: {
                	 fn: moveDownDepartment
                }
            }
        }   
    ]  
}); 
function handleSaveYesNoCancel( btn )
{
  switch( btn )
  {
    case 'yes':
    	delSource();
      break;

    case 'no':
      break;
  }
};
var treeRefresh=function(tree){
	if(tree==null){
		tree=Ext.getCmp('TreeSourceMain');
	}
	storeTree.load({callback:function(s,options,success){
		if(selectNode!=null){
			setDefaultSelectNode(tree);
		}
	 }});
	  
};
var setDefaultSelectNode=function(tree){
	if(selectNode!=null){
		tree.getRootNode().cascade(function() {
            if (this.data.id == selectNode) {
                expandParentNode(this.parentNode, tree.getRootNode());
                var record = tree.getStore().getNodeById(selectNode);
                tree.getSelectionModel().select(record);
                return false;
            }
            return true;
        }, null, null);
	}
};
//展开父节点，递归
var expandParentNode=function(node, rootNode) {
    if (!node || node == rootNode) {
        return;
    }
    if (node.isExpandable()) {
        if (!node.isExpanded()) {
            if (node.parentNode) {
                expandParentNode(node.parentNode, rootNode);
            }
            node.expand();
        }
    }
};
var expandChildNode=function(tree){
	tree.getRootNode().cascade(function() {
		if (this.isExpandable()) {
	        if (!this.isExpanded()) {
	        	this.expand();
	        	}
	        }
	}, null, null);
};
function setNodeInfo()
{
	var id = Ext.getCmp("hidCurrentId").getValue();
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_getSource",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.getCmp("lblModuleCode").setValue(data[0].sourceCode);
				 Ext.getCmp("lblModuleName").setValue(data[0].sourceName);
				 Ext.getCmp("lblModuleTypeName").setValue(data[0].sourceTypeName);
				 Ext.getCmp("lblModuleUrl").setValue(data[0].sourceUrl);
				 Ext.getCmp("lblModuleParent").setValue(data[0].parentSourceName);
				 Ext.getCmp("lblIconCls").setValue(data[0].iconCss);
				 Ext.getCmp("lblCreateTime").setValue(data[0].createTime);
				 Ext.getCmp("lblModifyTime").setValue(data[0].modifyTime);//lblOperator
				 setParaName('/OSS/admin/user/user_getUserName',data[0].operatorId,Ext.getCmp("lblOperator"));
				 setParaName('/OSS/admin/para/para_getSoruceFromName',data[0].soruceFrom,Ext.getCmp("lblSourceFrom"));
				 setParaName('/OSS/admin/para/para_getWhetherStatName',data[0].isWorkPlan,Ext.getCmp("lblIsWork"));
				 setParaName('/OSS/admin/source/source_getSourcePermit_ActionName',id,Ext.getCmp("lblModuleActionList"));
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
		 }
	});
};
var setParaName=function(url,val,objctn){
	Ext.Ajax.request({ 
		url: url,
		method : 'get', 
		params : {id: val},
		success : function(response, options){ 
			objctn.setValue(Ext.JSON.decode(response.responseText).msg);
		 },
		 failure : function(response){ 
		 }
	});
};
function addSourceClick()
{
	var nodeId=Ext.getCmp("hidCurrentId").getValue();
	InitWinLoadExec('资源添加',420,445,'icon-add','SourceAdd.jsp?id='+nodeId+'&t=0');
}
function addSourceClicks()
{
	var nodeId=Ext.getCmp("hidCurrentId").getValue();
	InitWinLoadExec('资源添加',420,445,'icon-add','SourceAdd.jsp?id='+nodeId+'&t=1');
}
function editSourceClick(item)
{
	var nodeId=Ext.getCmp("hidCurrentId").getValue();
	if(nodeId!=null && nodeId.length>0){
		if(nodeId!="0"){
			InitWinLoadExec('资源修改',420,445,'icon-noteedit','SourceEdit.jsp?id='+nodeId);
		}
		else{
			Ext.MessageBox.show({title : '事件消息',msg :'根节点不允许编辑',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		}
	}
	else{
		Ext.MessageBox.show({title : '事件消息',msg :'请选中需要编辑的资源',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
	}
};
function delSourceClick()
{
	var msg="您确定删除所选节点吗";
	var nodeId=Ext.getCmp("hidCurrentId").getValue();
	if(nodeId!=null && nodeId.length>0){
		if(nodeId!="0"){
			Ext.Ajax.request({ 
				url: "/OSS/admin/source/source_getDelRegex",
				method : 'post', 
				params : {id: nodeId},
				success : function(response, options){ 
					msg= Ext.JSON.decode(response.responseText).msg;   
				 },
				 failure : function(response){ 
				 }
			});
			Ext.MessageBox.show(
			        {
			          title: '信息',
			          msg: msg,
			          buttons: Ext.MessageBox.YESNO,
			          fn: handleSaveYesNoCancel,
			          animEl: 'mb4',
			          icon: Ext.MessageBox.QUESTION
			        });
		}
		else{
			Ext.MessageBox.show({title : '事件消息',msg :'根节点不允许删除',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		}
	}
	else{
		Ext.MessageBox.show({title : '事件消息',msg :'请选中需要删除的资源',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
	}
};
function delSource()
{
	var nodeId=Ext.getCmp("hidCurrentId").getValue();
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_delSource",
		method : 'post', 
		params : {id: nodeId},
		success : function(response, options){ 
			 Ext.MessageBox.show({title : '事件消息',msg :"删除成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 treeRefresh();  
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
};
var selectNode;
function moveUpDepartment(item){
	//alert(item.parentMenu.contextNode.viewRecordId);
	var node=item.parentMenu.contextNode;
	selectNode=node.viewRecordId;
	item.parentMenu.hide();
	if (node.previousSibling == null) {
        //Ext.Msg.alert("提示", "该资源已到达该级别的顶端！");
    } else {
    	SetMoveSource(node.previousSibling.viewRecordId, node.viewRecordId,node);
    }
};
function moveDownDepartment(item){
	var node=item.parentMenu.contextNode;
	selectNode=node.viewRecordId;
	item.parentMenu.hide();
    if (node.nextSibling == null) {
        //Ext.Msg.alert("提示", "该资源已到达该级别的底端！");
    } else {
    	SetMoveSource(node.viewRecordId, node.nextSibling.viewRecordId,node);
    }
};
var SetMoveSource=function(downId,upId){
	var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在提交数据,请稍等...' });
    myMask.show();
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_moveSource",
		method : 'post', 
		params : {downId: downId,upId:upId},
		success : function(response, options){ 
			 OSS.AlertInfo("移动成功!", treeRefresh);
			 //Ext.MessageBox.show({title : '事件消息',msg :"移动成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 //treeRefresh(null);
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 },
		 callback: function(o, r, n){
			 myMask.hide();
		 }
	});
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
	treeRefresh();
};
var InitSourceTree=function(){
	Ext.tip.QuickTipManager.init();
	Ext.Loader.setConfig({ enabled:true});
	Ext.BLANK_IMAGE_URL = (Ext.isIE6 || Ext.isIE7) ? '/OSS/resource/ext/resources/s.gif' : 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	new OSS.view.SourceTree();
};