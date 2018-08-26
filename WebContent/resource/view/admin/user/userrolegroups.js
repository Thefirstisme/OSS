Ext.define('OSS.view.UserInfoRoleGroups', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/rolegroup/rolegroup_getRoleGroupTreeWithCheck?userId=0'
            },
            root: {
                text: '角色组列表',
                id: '-1',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
                    id: 'roleGroupTree',
                    title: '',
                    border: false,
                    store: storeTree,
                    viewConfig: {
                    	rootVisible: true
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
                    listeners: {
                        checkchange: {
                            fn: me.onTreePanelMain1CheckChange,
                            scope: me
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button12',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onButton12Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button22',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onButton22Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk2',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk2Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel2',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel2Click,
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

    onTreePanelMain1CheckChange: function(node, checked, eOpts) {
    	
    },

    onButton12Click: function(button, e, eOpts) {
    	Ext.getCmp("roleGroupTree").expandAll();
    },

    onButton22Click: function(button, e, eOpts) {
    	Ext.getCmp("roleGroupTree").collapseAll();
    },

    onButtonOk2Click: function(button, e, eOpts) {
    	updateUserRoleGroup();
    },

    onButtonCancel2Click: function(button, e, eOpts) {
    	window.parent.winClose();
    }

});
var InitUserInfoRoleGroups=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoRoleGroups();
};
var updateUserRoleGroup=function(){
	var selectCount=OSS.TreePanel.getSelectCount(OSS.getExtControl('roleGroupTree'));
	if(selectCount==0){
		OSS.AlertInfo("请选择角色组!");
	}else{
		var userId = OSS.getUrlParam('userId');
		var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在验证是否已有数据,请稍等...' });
	    myMask.show();
	    Ext.Ajax.request({ 
			url: "/OSS/admin/rolegroup/rolegroup_updateRegexs",
			method : 'post', 
			params : {
					userId: userId
					},
			success : function(response, options){
				myMask.hide();
				var c1 = Ext.JSON.decode(response.responseText);
				if(c1.msg=='0'){
					Ext.MessageBox.msgButtons[1].setText("追加");
				    Ext.MessageBox.msgButtons[2].setText("重置");
					Ext.MessageBox.show(
				   	        {
				   	          title: '信息',
				   	          msg: "已有数据，请选择添加方式？",
				   	          buttons: Ext.MessageBox.YESNOCANCEL,
				   	          fn: handleYesNoCancel,
				   	          animEl: 'mb4',
				   	          icon: Ext.MessageBox.QUESTION
				   	        });
				}else{
					dataUpdate('reset');
				}
			 },
			 failure : function(response){ 
				 var c1 = Ext.JSON.decode(response.responseText);
				 OSS.AlertError(c1.msg);
			 },
			 callback: function(o, r, n){
				 myMask.hide();
			 }
		});
	}	
};
var handleYesNoCancel=function(btn){
	  switch( btn )
	  {
	    case 'yes':
	    	dataUpdate('add');
	      break;
	    case 'no':
	    	dataUpdate('reset');
	      break;
	    case 'cancel':
	        break;
	  }
};
var dataUpdate=function(type){
	var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在提交数据,请稍等...' });
    myMask.show();
    var userId = OSS.getUrlParam('userId');
    var roleGroupIds=OSS.TreePanel.getSelectIdList(OSS.getExtControl('roleGroupTree'));
    Ext.Ajax.request({ 
		url: "/OSS/admin/rolegroup/rolegroup_updateUserRoleGroups",
		method : 'post', 
		params : {
				userId: userId,
				roleGroupIds:roleGroupIds,
				type: type
				},
		success : function(response, options){
			var c1 = Ext.JSON.decode(response.responseText);
			if(c1.success==true){
				OSS.AlertInfo(c1.msg);
			}else{
				OSS.AlertWarning(c1.msg);
			}
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 OSS.AlertError(c1.msg);
		 },
		 callback: function(o, r, n){
			 myMask.hide();
		 }
	});
};
