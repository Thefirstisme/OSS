Ext.define('OSS.view.SourceRole', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'fit'
    },

    initComponent: function() {
        var me = this;
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/role/role_getRolePermitTree?id='+OSS.getUrlParam('id')
            },
            root: {
                text: '角色列表',
                id: '0',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    id: 'TreeMain',
                    title: '',
                    store : storeTree, 
                    autoScroll: true,
                    viewConfig: {

                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbActionList',
                                    fieldLabel: '请选择资源许可',
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: actionStore
                                },
                                {
                                    xtype: 'hiddenfield',
                                    anchor: '100%',
                                    id: 'txtActionId',
                                    name: 'txtActionId',
                                    fieldLabel: 'Label'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button1_Role',
                                    iconCls: '',
                                    text: '全选',
                                    listeners: {
                                        click: {
                                            fn: me.onButton1_RoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button2_Role',
                                    text: '全不选',
                                    listeners: {
                                        click: {
                                            fn: me.onButton2_RoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk_Role',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk_RoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel_Role',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel_RoleClick,
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

    onButton1_RoleClick: function(button, e, eOpts) {
    	checkchild(this.down('treepanel').getRootNode(),true);
    },

    onButton2_RoleClick: function(button, e, eOpts) {
    	checkchild(this.down('treepanel').getRootNode(),false);
    },

    onButtonOk_RoleClick: function(button, e, eOpts) {
    	ButtonOk_Click();
    },

    onButtonCancel_RoleClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    }

});
var InitSourceRole=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.SourceRole();
	var moduleActionStore=Ext.getCmp("cmbActionList").store;
	moduleActionStore.load();
	moduleActionStore.on("load",function(){	
		Ext.getCmp("cmbActionList").setValue(moduleActionStore.getAt(0));
	});
};
var actionStore=Ext.create('Ext.data.JsonStore', {
	autoLoad: false,
	idProperty: 'id',
	remoteSort: false,
	fields: [
	         {name:'id',type:'string'},
	         {name:'name',type:'string'}
    ],
    proxy:new Ext.data.HttpProxy({
		url:'/OSS/admin/source/source_getSourcePermit_Action?id='+OSS.getUrlParam('id'),
    	reader:{
    		type:'json',
    		root:'data'
    	}
	})
});

function checkchild(node, checked) {
    node.eachChild(function(child) {
        if (child.childNodes.length > 0) {
            checkchild(child, checked); //递归
        }
        child.set('checked', checked);  
    });
};
var ButtonOk_Click=function(records){
	var actionId=Ext.getCmp('cmbActionList').getValue();
	if(actionId!=null && actionId.length>0){
		var sourceId=OSS.getUrlParam('id');
		var t="1";
		Ext.Ajax.request({ 
			url: "/OSS/admin/source/source_getSourceRoleRegex",
			method : 'post', 
			params : {id: sourceId,aid:actionId},
			success : function(response, options){ 
				t= Ext.JSON.decode(response.responseText).msg; 
				if(t=="1"){
					permitAdd();
				}
				else{
					Ext.MessageBox.msgButtons[1].setText("追加");
				    Ext.MessageBox.msgButtons[2].setText("重置");
					Ext.MessageBox.show(
				   	        {
				   	          title: '信息',
				   	          msg: "所选许可已有角色,请选择提交方式？",
				   	          buttons: Ext.MessageBox.YESNOCANCEL,
				   	          fn: handleYesNoCancel,
				   	          animEl: 'mb4',
				   	          icon: Ext.MessageBox.QUESTION
				   	        });
				}
			 },
			 failure : function(response){ 
				 Ext.MessageBox.show({title : '事件消息',msg :Ext.JSON.decode(response.responseText).msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 }
		});
	}
	else{
		Ext.MessageBox.show({title : '事件消息',msg :'请选择资源许可',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
	}
};
var handleYesNoCancel=function(btn){
  switch( btn )
  {
    case 'yes':
    	permitAdd();
      break;
    case 'no':
    	permitReset();
      break;
    case 'cancel':
        break;
  }
};
var permitAdd=function(){
	var actionId=Ext.getCmp('cmbActionList').getValue();
	var roleIdList=getSelectRoleIdList(Ext.getCmp('TreeMain').getView().getChecked());
	var sourceId=OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_setSourcePermitRoleAdd",
		method : 'post', 
		params : {id: sourceId,
						aid:actionId,
						roleidlist:roleIdList
						},
		success : function(response, options){ 
			Ext.MessageBox.show({title : '事件消息',msg :Ext.JSON.decode(response.responseText).msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
		 },
		 failure : function(response){ 
			 Ext.MessageBox.show({title : '事件消息',msg :Ext.JSON.decode(response.responseText).msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
};
var permitReset=function(){
	var actionId=Ext.getCmp('cmbActionList').getValue();
	var roleIdList=getSelectRoleIdList(Ext.getCmp('TreeMain').getView().getChecked());
	var sourceId=OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_setSourcePermitRoleReset",
		method : 'post', 
		params : {id: sourceId,
						aid:actionId,
						roleidlist:roleIdList
						},
		success : function(response, options){ 
			Ext.MessageBox.show({title : '事件消息',msg :Ext.JSON.decode(response.responseText).msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
		 },
		 failure : function(response){ 
			 Ext.MessageBox.show({title : '事件消息',msg :Ext.JSON.decode(response.responseText).msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
};

var getSelectRoleIdList=function(records){
	var idList="";
	for(var i=0;i<records.length;i++)
	{
		if(idList.length>0)
		{
			idList=idList+',';
		}
		idList=idList+records[i].get("id");
	}
	return idList;
};