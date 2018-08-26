Ext.define('OSS.view.OrgList', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;
//        var storeTree = Ext.create('Ext.data.TreeStore', {  
//        	root: {  
//                expanded: true, 
//                children: [  
//                    {id: "node1", text: "机构列表", expanded: true, children:[
//                                                                                   {id:"node2",text: "商业银行", expanded: true, children: [  
//                                                                       {id:"node5",text: "营业部", leaf: true},
//                                                                       {id:"node6",text: "管湖支行", leaf: true},
//                                                                       {id:"node7",text: "加口支行", leaf: true},
//                                                                       {id:"node8",text: "楼家支行", leaf: true},
//                                                                       {id:"node9",text: "红旗支行", leaf: true},
//                                                                       {id:"node10",text: "铁富支行", leaf: true} 
//                                                             ] }                                     
//                                                                                   ]}
//                    
//                ]  
//            }  
//        }); 
        var storeTree = new Ext.data.TreeStore({
            proxy: {
                type: 'ajax',
                url: '/OSS/admin/org/OrgList'
            },
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
                    border: false,
                    title: '',
                    store : storeTree, 
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
                                    id: 'btnInfoManange',
                                    icon: '',
                                    iconCls: 'icon-group',
                                    text: '基本信息管理',
                                    menu: {
                                        xtype: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                icon: '',
                                                iconCls: 'icon-groupadd',
                                                text: '添加机构',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuitemClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                icon: '',
                                                iconCls: 'icon-groupedit',
                                                text: '修改机构',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuitemClick1,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                icon: '',
                                                iconCls: 'icon-groupdelete',
                                                text: '删除机构',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMenuitemClick2,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnGroupUserSet',
                                    icon: '',
                                    iconCls: 'icon-groupgear',
                                    text: '机构人员划归',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnGroupUserSetClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonRefresh2',
                                    icon: '',
                                    iconCls: 'icon-databaserefresh',
                                    text: '刷新',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonRefresh2Click,
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
                                    icon: '',
                                    iconCls: 'icon-expand-all',
                                    text: '展开全部节点',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-collapse-all',
                                    text: '折叠全部节点',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        select: {
                            fn: me.onTreepanelSelect,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'form',
                    collapseMode: 'mini',
                    id: 'frmInfo',
                    region: 'east',
                    split: true,
                    maxWidth: 300,
                    minWidth: 300,
                    width: 300,
                    bodyPadding: 10,
                    collapsible: true,
                    overlapHeader: false,
                    title: '机构信息',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    icon: '',
                                    iconCls: 'icon-tableedit',
                                    text: '编 辑',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: '',
                                    iconCls: 'icon-tabledelete',
                                    text: '删 除',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick3,
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
                            id: 'lblParentGroup',
                            readOnly: true,
                            fieldLabel: '父级机构名称'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblGroupName',
                            readOnly: true,
                            fieldLabel: '机构名称'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblGroupNo',
                            readOnly: true,
                            fieldLabel: '机构号'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblGroupType',
                            readOnly: true,
                            fieldLabel: '机构类型'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblGroupStatus',
                            readOnly: true,
                            fieldLabel: '当前状态'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'lblGroupRemark',
                            readOnly: true,
                            fieldLabel: '备注'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
	// 添加机构
    onMenuitemClick: function(item, e, eOpts) {
    	win.show();
    },

    onMenuitemClick1: function(item, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'修改机构事件',buttons: Ext.Msg.OK,closable : false});
    },

    onMenuitemClick2: function(item, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'删除机构事件',buttons: Ext.Msg.OK,closable : false});
    },

    
    
    onBtnGroupUserSetClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'机构人员划归事件',buttons: Ext.Msg.OK,closable : false});
    	var win=Ext.create('Ext.window.Window',{  
    	    title: '用户添加',  
    	    resizable:      false, //变大小   
    	    width: 1000, 
    	    maximizable:false,
    	    height:500,  
    	    iconCls: 'icon-groupadd',
    	    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    	    plain:true,  
    	    bodyStyle:'padding:0px;',  
    	    buttonAlign:'center',  
    	    html:'<iframe id="thisIframe" width="100%" height="100%" frameborder="0" scrolling="auto" src="OrgUser.jsp"></iframe>'  
    	   }); 
    	win.show();
    },

    onBtnHistoryClick: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'机构变更查询事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonRefresh2Click: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'刷新事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonClick: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'展开事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonClick1: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'折叠事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonClick2: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'修改事件',buttons: Ext.Msg.OK,closable : false});
    },

    onButtonClick3: function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'删除事件',buttons: Ext.Msg.OK,closable : false});
    },
    
    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
		Ext.getCmp("frmInfo").expand();
    	Ext.Ajax.request({ 
		url: '/OSS/admin/org/getOrg',
		method : 'post', 
		params : {
    		id : record.data.id
    	},
    	success:update_page,
		
		/*success : function(response, options){ 
			alert(1);
			 //var c1 = response.responseText; 
			 //var c2 = Ext.util.JSON.decode(c1);   
			 //window.location="main.jsp";
    		var json= eval(result);
    		alert(json);
    		//Ext.getCmp("lblGroupNo").setValue(json);
    		//Ext.getCmp("lblGroupNo").setValue(json.GroupNo);
    		Ext.getCmp("frmInfo").expand();
		 },
		 */
		 failure : function(response){ 
			 var c1 = response.responseText; 
			 var c2 = Ext.util.JSON.decode(c1);  
			 Ext.Msg.alert('信息',c2.success+'-'+c2.msg);  
		 }
	});
    }

});
function update_page(result){
	 var c1 = result.responseText; 
	 var c2 = Ext.JSON.decode(c1);
	 //Ext.Msg.alert('信息',c2.orgId+'-'+c2.orgName);  
	 //父级机构名称
	 Ext.getCmp("lblParentGroup").setValue(c2.parentOrgName);
	 //机构名称
	 Ext.getCmp("lblGroupName").setValue(c2.orgName);
	 //机构号
	 Ext.getCmp("lblGroupNo").setValue(c2.customNo);
	 //机构类型
	 Ext.getCmp("lblGroupType").setValue(c2.customNo);
	 //当前状态
	 Ext.getCmp("lblGroupStatus").setValue(c2.status);
	 //备注
	 Ext.getCmp("lblGroupRemark").setValue(c2.remark);
	 
}
var InitOrgList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgList();
}

	//Ext.Msg.show({title : '事件消息',msg :'添加机构事件',buttons: Ext.Msg.OK,closable : false});
	var win=Ext.create('Ext.window.Window',{  
	    title: '用户添加',  
	    resizable:      false, //变大小   
	    width: 420, 
	    maximizable:false,
	    height:445,  
	    iconCls: 'icon-groupadd',
	    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
	    plain:true,  
	    bodyStyle:'padding:0px;',  
	    buttonAlign:'center',  
	    html:'<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=OrgAdd.jsp></iframe>'  
	   }); 
	// 关闭添加机构页面
    function menuitemClose() {
    	win.close();
    }  
	   
	   
	   