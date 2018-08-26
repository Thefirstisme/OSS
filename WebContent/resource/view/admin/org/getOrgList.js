Ext.define('OSS.view.OrgList', {
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
                id: 'src',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
                    id:'orgTree',
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
                    //collapseMode: 'mini',
                    id: 'frmInfo',
                    region: 'east',
                    split: true,
                    maxWidth: 300,
                    minWidth: 300,
                    width: 300,
                    bodyPadding: 10,
                    collapsed: true,
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

        me.callParent(arguments);
    },
	// 添加机构
    onMenuitemClick: function(item, e, eOpts) {
    	//toAddWin();
    	InitWinLoadExec();
    	winLoadExec.title='添加机构';
    	winLoadExec.width=420;
    	winLoadExec.height=445;
    	winLoadExec.iconCls='icon-groupadd';
    	winLoadExec.html='<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=addOrg.jsp></iframe>' ;
    	winLoadExec.show();
    },
	// 修改机构
    onMenuitemClick1: function(item, e, eOpts) {
    	var record = Ext.getCmp('orgTree').getSelectionModel().getSelection();
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
    	 }else {
    	 	toEditWin();
    	 }
    	
    },

    onMenuitemClick2: function(item, e, eOpts) {
		getDeleteMessage();
    },

    
    // 机构人员划归
    onBtnGroupUserSetClick: function(button, e, eOpts) {
    	winExecOpen('机构人员划归',850,500,'icon-groupadd','OrgUser.jsp');
    },

    onBtnHistoryClick: function(button, e, eOpts) {
    	OSS.AlertInfo('机构变更查询事件');
    },
	// 刷新
    onButtonRefresh2Click: function(button, e, eOpts) {
		refresh("orgTree");
    },
	// orgTree展开
    onButtonClick: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").expandAll();
    },
	// orgTree折叠
    onButtonClick1: function(button, e, eOpts) {
    	Ext.getCmp("orgTree").collapseAll();
    },
	// 修改
    onButtonClick2: function(button, e, eOpts) {
    	toEditWin();
    },
	// 删除
    onButtonClick3: function(button, e, eOpts) {
    	getDeleteMessage();
    },
    
    onTreepanelSelect: function(rowmodel, record, index, eOpts) {
		Ext.getCmp("frmInfo").expand();
		// 将选中项的ID赋值给隐藏域，便于取值
		Ext.getCmp("hidCurrentId").setValue(record.data.id);
		var myMask = new Ext.LoadMask(Ext.getCmp("frmInfo").body, { msg: '正在加载数据,请稍等...' });
	    myMask.show();
    	Ext.Ajax.request({ 
			url: '/OSS/admin/org/getOrg',
			method : 'post', 
			params : {
	    		id : record.data.id
	    	},
	    	 success:showOrgInfo,
			
			 failure : function(response){ 
				 var c1 = response.responseText; 
				 var c2 = Ext.util.JSON.decode(c1);  
				 Ext.Msg.alert('信息',c2.success+'-'+c2.msg);  
			 },
			 callback: function(o, r, n){
				 myMask.hide();
			 }
		});
    }

});
// 展示机构详细信息
function showOrgInfo(result){
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
	 //Ext.getCmp("lblGroupType").setValue(c2.customNo);
	 //当前状态
	 
	 Ext.getCmp("lblGroupStatus").setValue("可用");
	 //备注
	 Ext.getCmp("lblGroupRemark").setValue(c2.remark);
	 
}
// 删除提示框
function toDeleteOrg(message) {
	Ext.MessageBox.buttonText.yes="oui";  
	Ext.MessageBox.buttonText.no="否";  
	//Ext.MessageBox.buttonText.cancel="取消";  
	Ext.MessageBox.buttonText.ok="确定";  
	Ext.MessageBox.show( {
		title: '信息',
		msg: message,
		buttons: Ext.MessageBox.OKCANCEL,
		// 执行删除操作
		fn: checkToDelete,
		animEl: 'mb4',
		icon: Ext.MessageBox.QUESTION
	});
}
// 获得删除提示消息
function getDeleteMessage(){
	if(checkSelect('orgTree')){
		var orgId = getSelectId();
		Ext.Ajax.request({ 
			url: '/OSS/admin/org/org_getDeleteMessage',
			method : 'post', 
			params : {
	    		orgId : orgId
	    	},
			success : function(response){ 
				toDeleteOrg(response.responseText);  
			},
			
			failure : function(response){ 
				var c1 = response.responseText; 
				var c2 = Ext.util.JSON.decode(c1);  
			}
		});
	}
}
function checkToDelete( btn ){
  switch( btn )
  {
    case 'ok':
    	deleteOrg();
      break;
    default :
      break;
  }
};
// 删除机构数据
function deleteOrg(){
	var orgId = getSelectId();
	Ext.Ajax.request({ 
		url: '/OSS/admin/org/org_deleteOrg',
		method : 'post', 
		params : {
    		orgId : orgId
    	},
		success : function(response){ 
			OSS.AlertInfo("删除成功!", dataRefresh);
			refresh("orgTree");
		},
		
		failure : function(response){
			OSS.AlertInfo("删除成功!", dataRefresh);
		}
	});
}

function toAddWin(){
	winExecOpen('添加机构',420,445,'icon-groupadd','addOrg.jsp');
}
//// 关闭添加机构页面
//function addWinClose() {
//	winClose();
//	refresh("orgTree");
//}  

// 修改机构事件
function toEditWin(){
	if(checkSelect('orgTree')){
		//winOpen('修改机构',420,445,'icon-groupadd','editOrg.jsp');
		//winExecOpen('修改机构',420,445,'icon-groupadd','editOrg.jsp');
	    //var id=record[0].get("userId");
		InitWinLoadExec();
		winLoadExec.title='修改机构';
    	winLoadExec.width=420;
    	winLoadExec.height=445;
    	winLoadExec.iconCls='icon-groupadd';
    	winLoadExec.html='<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=editOrg.jsp?></iframe>' ;
    	winLoadExec.show();
	}
}
//// 关闭修改机构页面
//function editWinClose() {
//	winClose();
//	refresh("orgTree");
//}    

function getSelectId(){
	return Ext.getCmp("hidCurrentId").getValue();
}

var InitOrgList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.OrgList();
};

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

var dataRefresh=function(){
	winHideFunction();
};

var winExec;
function winExecOpen(title,width,height,icoCls,url){
	winExec=Ext.create('Ext.window.Window',{
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
            fn: winHideFunction
        }
    }
   }); 
	winExec.show();
};
var winHideFunction=function(){
	refresh("orgTree");
};
var winExecClose=function(){
	winExec.hide();
}; 
    
    
    
	   