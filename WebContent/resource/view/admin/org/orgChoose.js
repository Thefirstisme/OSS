Ext.define('OSS.view.OrgChoose', {
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
            }
            ,
            root: {
                text: '机构列表',
                id: 'src',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
                    title: '',
                    border: false,
                    id: 'TreeSourceMain',
                    padding: '',
                    autoScroll: true,
                    store: storeTree,
//                    viewConfig: {
//                    	rootVisible: false
//                    },
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
                    listeners: {
                        itemdblclick: {
                            fn: me.onTreepanelItemDblClick,
                            scope: me
                        },
                        itemclick: {
                            fn: me.onTreepanelItemClick,
                            scope: me
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'triggerfield',
                                    id: 'tigSearch',
                                    fieldLabel: '',
                                    emptyText: '请输入关键字',
                                    hideTrigger: true,
                                    triggerCls: 'x-form-clear-trigger',
                                    listeners: {
                                        keyup: {
                                            fn: me.onTigSearchKeyup,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                        ,{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'Button1_1',
                                    iconCls: 'icon-expand-all',
                                    text: '展开',
                                    listeners: {
                                        click: {
                                            fn: me.onButton1_1Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk_1',
                                    iconCls: 'icon-databasesave',
                                    text: '确认',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk_1Click,
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

    onTigSearchKeyup: function(textfield, e, eOpts) {

    },

    onButton1_1Click: function(button, e, eOpts) {
    	Ext.getCmp("TreeSourceMain").expandAll();
    },

    onButtonClick: function(button, e, eOpts) {
    	Ext.getCmp("TreeSourceMain").collapseAll();
    },

    onButtonOk_1Click: function(button, e, eOpts) {
    	acceptChoose();
    },

    onTreepanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	if(record){
    		window.parent.setChooseSource(record.data.id, record.data.text);
            window.parent.winLoadExecChoose.hide();
    	}
    	else{
    		 Ext.Msg.alert("提示", "请选择资源！");
    	}
    } ,

    onTreepanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	selectRecord=record;
    }
});

var InitOrgChoose=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgChoose();
};
var selectRecord;
function acceptChoose() {
    if (selectRecord) {
        window.parent.setChooseSource(selectRecord.data.id, selectRecord.data.text);
        window.parent.winLoadExecChoose.hide();
    } else {
        Ext.Msg.alert("提示", "请选择资源！");
    }
}