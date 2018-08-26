Ext.define('OSS.view.ThemeSetting', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeTree = Ext.create('Ext.data.TreeStore', {  
        	root: {  
                expanded: true, 
                children: [  
                    {id: "default", text: "蓝色妖姬", leaf: true},
                    {id: "lightRed", text: "粉红之恋", leaf: true},
                    {id: "lightGreen", text: "绿水青山", leaf: true},
                    {id: "lightYellow", text: "金碧辉煌", leaf: true},
                    {id: "gray", text: "钢铁战士", leaf: true},
                    {id: "purple2", text: "紫色忧郁", leaf: true}
                    
                ]  
            }  
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    maxWidth: 150,
                    minWidth: 120,
                    width: 120,
                    collapsible: true,
                    title: '主题列表',
                    store: storeTree,
                    viewConfig: {
                        id: 'TPanelLeft',
                        rootVisible: false
                    },
                    listeners :{
                            itemclick:function(dataview, record, item, index, e, eOpts) {
                                      var imgName=record.data.id;
                                      var imgSrc='../../resource/images/theme/'+imgName+'.jpg';
                                      Ext.getCmp("previewPanel").getEl().dom.src=imgSrc;
                                    }
                                },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnok',
                                    iconCls: 'icon-accept',
                                    text: '保存',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnokClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-doorout',
                                    overflowText: '',
                                    text: '关闭',
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
                },
                {
                    xtype: 'box',
                    region: 'center',
                    id: 'previewPanel',
                    autoEl: {  
                            tag: 'img',    //指定为img标签  
                            src: '../../resource/images/theme/default.jpg'    //指定url路径  
                        }  
                    // title: '主题预览',
                    // html:'<img rec="../../resource/images/theme/default.jpg">'
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtnokClick: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'提交事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonClick: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'关闭事件',buttons: Ext.Msg.OK,closable : false});
    }

});

var InitThemeSetting=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.ThemeSetting();
};