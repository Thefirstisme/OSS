Ext.define('OSS.view.OrgEdit', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeTest = Ext.create('Ext.data.Store', { 
            fields: ['id', 'name'], 
            data : [ 
                {"id":"5","name":"测试数据1"},
        		{"id":"10","name":"测试数据2"}
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    region: 'center',
                    bodyPadding: 10,
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            width: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoad32',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoad32Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOk32',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOk32Click,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancel32',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancel32Click,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbGroupType',
                            fieldLabel: '机构类型',
                            emptyText: '机构类型必须输入',
                            displayField: 'name',
                            valueField: 'id',
                            store: storeTest
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'DropDownField1',
                            fieldLabel: '父级机构',
                            displayField: 'name',
                            valueField: 'id',
                            store: storeTest
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'TextFieldGroupName',
                            fieldLabel: '机构名称',
                            blankText: '您未输入内容！',
                            emptyText: '机构名称必须输入'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'TextFieldCustomNo',
                            fieldLabel: '机构号',
                            blankText: '您未输入内容！',
                            emptyText: '机构号长度不能超过10位'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtRemark',
                            fieldLabel: '备注',
                            blankText: '您未输入内容！',
                            emptyText: '备注不能超过50个汉字'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonLoad32Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'重置事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonOk32Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonCancel32Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'关闭事件',buttons: Ext.Msg.OK,closable : false});
    }

});
var InitOrgEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgEdit();
}