Ext.define('OSS.view.UserInfoRoleGroup', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/rolegroup/rolegroup_getRoleGroupTreeWithCheck?userId='+OSS.getUrlParam('userId')
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
                    border: false,
                    itemId: 'TreePanelMain',
                    id: 'roleGroupTree',
                    autoScroll: true,
                    title: '',
                    store: storeTree,
                    viewConfig: {
                    	rootVisible: true
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoad',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoadClick,
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
                                    id: 'Button1',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onButton1Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'Button2',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onButton2Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk1',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk1Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel1',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel1Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                    })
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonLoadClick: function(button, e, eOpts) {
    	reFresh();
    },

    onButton1Click: function(button, e, eOpts) {
    	Ext.getCmp("roleGroupTree").expandAll();
    },

    onButton2Click: function(button, e, eOpts) {
    	Ext.getCmp("roleGroupTree").collapseAll();
    },

    onButtonOk1Click: function(button, e, eOpts) {
    	uodateUserRoleGroup();
    },

    onButtonCancel1Click: function(button, e, eOpts) {
    	window.parent.winClose();
    }

});
// 刷新
function reFresh(){
	Ext.getCmp("roleGroupTree").store.load({
		params:{  
	        start:0,  
	        limit: 20,
	        userId:OSS.getUrlParam('userId')
	    }  
	});
}
function uodateUserRoleGroup()
{
	var roleGroupIds=getSelectRoleIdList(Ext.getCmp('roleGroupTree').getView().getChecked());
	var userId = OSS.getUrlParam('userId');

	Ext.Ajax.request({ 
		url: "/OSS/admin/rolegroup/rolegroup_uodateUserRoleGroup",
		method : 'post', 
		params : {
				userId: userId,
				roleGroupIds:roleGroupIds
				},
		success : function(response, options){ 
			 Ext.MessageBox.show({title : '事件消息',msg :"更新成功!",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
			 reFresh();  
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);
			 Ext.MessageBox.show({title : '事件消息',msg :c1.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
		 }
	});
}

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
var InitUserInfoRoleGroup=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.UserInfoRoleGroup();
};