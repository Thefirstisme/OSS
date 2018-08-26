Ext.define('OSS.view.RoleSourcePermitRel', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'fit'
    },

    initComponent: function() {
        var me = this;
        var storeRole =GetKeyValueStore('/OSS/admin/role/role_getRoleSelect');
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/source/source_getSourcePermitRoleList'
            },
            root: {
                text: '资源列表',
                id: '0',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    title: '',
                    id: 'treePanelMain',
                    store: storeTree,
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
                                    id: 'cmbRoleList',
                                    fieldLabel: '请选择角色',
                                    labelWidth:80,
                                    store: storeRole,
                                    displayField: 'name',
                                    valueField: 'id',
                                    listeners: {
                                        select: {
                                            fn: me.onCmbRoleListSelect,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnRoleSourceRelSubnit',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnRoleSourceRelSubnitClick,
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

    onCmbRoleListSelect: function(combo, records, eOpts) {
    	treeDataInit();
    },

    onBtnRoleSourceRelSubnitClick: function(button, e, eOpts) {
    	
    }

});
var InitRoleSourcePermitRel=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleSourcePermitRel();
	var roleStore=Ext.getCmp("cmbRoleList").store;
	roleStore.load();
	roleStore.on("load",function(){	
		var data=roleStore.getAt(0);
		Ext.getCmp("cmbRoleList").setValue(data);
		treeDataInit(data.data.id);
	});
	
};
var treeDataInit=function(id){
	var roleId;
	if(id!=null){
		roleId=id;
	}
	else{
		Ext.getCmp("cmbRoleList").getValue();
	}
	var tree=Ext.getCmp("treePanelMain");
	var tStore=tree.getStore();
	tStore.load(
			{
				params:{id:roleId}	
			}
	);
	tree.getView().refresh();  
};