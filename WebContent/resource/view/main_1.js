Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    split: true,
                    height: 60,
                    minHeight: 60,
                    collapsible: true,
                    preventHeader: true,
                    overlapHeader: true,
                    collapseMode: 'mini',
                    id: 'PanelTop',
                    layout: {
                        type: 'border'
                    },
                    bodyStyle: 'background-color: #DFE8F6;',
                    title: '',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'west',
                            border: false,
                            html: '<div class=\'TopLeftCls\'></div>',
                            id: 'panelTopLeft',
                            width: 330,
                            bodyStyle: 'background-color: #DFE8F6;',
                            title: ''
                        },
                        {
                            xtype: 'panel',
                            region: 'center',
                            border: false,
                            html: '<div class=\'TopCenterCls\'>商业银行一站式服务平台</div>',
                            id: 'panelTopCenter',
                            bodyStyle: 'background-color: #DFE8F6;',
                            title: ''
                        },
                        {
                        	xtype: 'panel',
                            region: 'east',
                            id: 'panelTopRight',
                            width: 300,
                            border: false,
                            layout: {
                                type: 'border'
                            },
                            bodyStyle: 'background-color: #DFE8F6;',
                            title: '',
                            items: [
                                {
                                    xtype: 'panel',
                                    region: 'north',
                                    border: false,
                                    height: 20,
                                    html: '上午好，***! 今天是：2013-06-26 星期三  09:53:22',
                                    id: 'panelTopRightNorth',
                                    bodyStyle: 'background-color: #DFE8F6;font-family: 宋体; font-size: 12px; color: #4798D7',
                                    title: ''
                                },
                                {
                                    xtype: 'panel',
                                    region: 'center',
                                    border: false,
                                    id: 'panelTopRightCenter',
                                    bodyStyle: 'background-color: #DFE8F6;text-align:right;',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'btnTheme',
                                            width: 60,
                                            enableToggle: true,
                                            iconCls: 'icon-themeIcon',
                                            pressed: true,
                                            scale: 'medium',
                                            bodyStyle: 'margin-left:5px;',
                                            text: '主题',
                                            tooltip: '设置主题',
                                            listeners: {
                                                click: {
                                                    fn: me.onbtnThemeClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            width: 10,
                                            text: ' '
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btnSetting',
                                            width: 90,
                                            enableToggle: true,
                                            iconCls: 'icon-config2Icon',
                                            pressed: true,
                                            scale: 'medium',
                                            text: '首选项',
                                            bodyStyle: 'margin-left:5px;',
                                            tooltip: '首选项设置',
                                            menu: {
                                                xtype: 'menu',
                                                width: 120,
                                                items: [
                                                        {
                                                            xtype: 'menuitem',
                                                            id: 'CheckMenuPassWord',
                                                            iconCls: 'icon-key',
                                                            text: '修改密码',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onCheckMenuPassWordClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'menuitem',
                                                            id: 'CheckMenuEditUserInfo',
                                                            iconCls: 'icon-useredit',
                                                            text: '修改信息',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onCheckMenuEditUserInfoClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'menuitem',
                                                            id: 'CheckMenuAbout',
                                                            iconCls: 'icon-information',
                                                            text: '关于软件',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onCheckMenuAboutClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'menuseparator'
                                                        },
                                                        {
                                                            xtype: 'menuitem',
                                                            id: 'CheckMenuItemForum',
                                                            iconCls: 'icon-boxpicture',
                                                            text: '管理我的工作台',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onCheckMenuItemForumClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            width: 10,
                                            text: ' '
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btnClose',
                                            width: 30,
                                            enableToggle: true,
                                            iconCls: 'icon-cancel_48Icon',
                                            pressed: true,
                                            scale: 'medium',
                                            tooltip: '切换用户，安全退出系统',
                                            listeners: {
                                                click: {
                                                    fn: me.onbtnCloseClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'west',
                    id: 'menuPanel',
                    split: true,
                    width: 220,
                    minWidth:100,
                    maxWidth:400,
                    title: '系统菜单',
                    collapsible: true,
                    preventHeader: true,
                    overlapHeader: true,
                    collapseMode: 'mini',
                    layout:'accordion',
                    dockedItems: [
                                  {
                                      xtype: 'toolbar',
                                      dock: 'top',
                                      items: [
                                          {
                                              xtype: 'textfield',
                                              fieldLabel: '',
                                              emptyText: '请输入关键字搜索菜单'
                                          }
                                      ]
                                  }
                              ]
                },
                {
                    xtype: 'tabpanel',
                    border: false,
                    region: 'center',
                    id:'tabpanelMain',
                    activeTab: 0,
                    enableTabScroll: true,
                    items: [
                        {
                            xtype: 'panel',
                            title: '我的工作平台',
                            iconCls: 'icon-house'
                            
                        }
                    ],
                    //plugins:new Ext.ux.TabCloseMenu()
                	plugins : Ext.create('Ext.ux.TabCloseMenu', {  
                            closeTabText : '关闭当前页',  
                            closeOthersTabsText : '关闭其他页',  
                            closeAllTabsText : '关闭所有页',
                            closeAllTabsIconCls:'icon-applicationcascade',
                            closeOtherTabsIconCls:'icon-applicationdouble',
                            closeTabIconCls:'icon-application'
                           })
                }
            ] ,
            listeners: {
	            afterrender: {
	                fn: me.onViewportAfterRender,
	                scope: me
	            }
            }
        });

        me.callParent(arguments);
    },
    onbtnThemeClick: function(button, e, eOpts) {
    	winOpen('主题设置',420,445,'icon-themeIcon','admin/syspara/ThemeSetting.jsp');
    },
    //修改密码
    onCheckMenuPassWordClick:function(button, e, eOpts) {
    	toChangePd();
    },
    // 修改用户信息
    onCheckMenuEditUserInfoClick:function(button, e, eOpts) {
    	toEditUser();
    },	
    onCheckMenuAboutClick:function(button, e, eOpts) {
    	winOpen('关于软件',400,360,'icon-information','admin/user/SystemAbout.jsp');
    },
    onCheckMenuItemForumClick:function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'管理我的工作事件',buttons: Ext.Msg.OK,closable : false});
    },
    onbtnCloseClick:function(button, e, eOpts) {
    	Ext.Msg.show({
        	title : '系统消息',
        	msg : '是否退出系统?',
        	icon : Ext.Msg.QUESTION,
        	buttons : Ext.Msg.YESNO,
        	fn : function(btn){
        		if(btn=='yes'){
        			var loginOutMask = new Ext.LoadMask(Ext.getBody(), {msg:"正在退出系统,请稍候...",cls:'openLinkLoading'});
                	loginOutMask.show();
                	window.location.href="login.jsp";
        		}            		
        	}
        });
    }
    ,onViewportAfterRender: function(component, eOpts) {
    	var tree=Ext.getCmp('menuPanel');
    	Ext.getBody().mask('正在加载系统页面框架....');  
    	Ext.Ajax.request({ 
    		url: "/OSS/admin/user/user_getUserMenuRoot",
    		method : 'post', 
    		//params : {id: id},
    		success : function(response, options){ 
    			Ext.getBody().unmask();  
    			 var data = Ext.JSON.decode(response.responseText);   
    			 if(data)
    			 {
    				 for (var i = 0; i < data.length; i++) {  
    					 var itemStore=treepanelStore(data[i].sourceId);
    					 tree.add(Ext.create("Ext.tree.Panel", {
    				    		id: 'treeMenuPanel_'+data[i].sourceId,  
    						    title : data[i].sourceName,  
    				            iconCls : data[i].iconCss,  
    				            //useArrows: true,  
    				            store: itemStore,
    				            autoScroll : true,  
    				            rootVisible : false,  
    				            viewConfig : {  
    				            	loadMask: true,
    				                loadingText : "正在加载..."  
    				            },
                                listeners :{
                                	itemclick : function(view,rec,item,index,eventObj) {
                                		loadPage(rec);
                                	},
                                	afterrender: function(comp) {
                                		new Ext.LoadMask(comp.body, { store: itemStore,msg:'正在加载菜单,请稍等...' });
                                	}
                                }
    				    	}));
    				 }
    			 }
    		 },
    		 failure : function(response){ 
    			 Ext.getBody().unmask();  
    			 var c1 = Ext.JSON.decode(response.responseText);  
    			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
    		 }
    	});
    	tree.doLayout();  
    }
});

// 打开修改密码页面
function toChangePd(){
	winOpen('修改密码',360,210,'icon-key','admin/user/AccountPassEdit.jsp');
}
// 关闭修改密码页面
function changePdClose(){
	winClose();
}
// 打开修改用户信息
function toEditUser(){
	winOpen('修改个人信息',440,440,'icon-key','admin/user/toEditUser.jsp');
}
// 关闭修改用户信息
function editUserClose(){
	winClose();
}
var loadPage = function(rec) {
	var tabPanel=Ext.getCmp('tabpanelMain');
	var panel_Id='tabPanel_'+rec.data.id;
	var tab = tabPanel.getComponent(panel_Id);
    if (!tab) {
		if(rec.data.webPath!=''){
			        tabPanel.add({
			        	id: panel_Id,
			            title: rec.data.text,
			            autoscroll: true,
			            closable: true,
			            iconCls: rec.data.iconCls,
			            border: false,
			            items: {
			                 xtype: 'component',
			                 autoEl: {
			                     tag: 'iframe',
			                     style: 'height: 100%; width: 100%; border: none;',
			                     src: rec.data.webPath
			                 },
			                 listeners: {
			                     load: {
			                         element: 'el',
			                         fn: function () {
			                             this.parent().unmask();
			                         }
			                     },
			                     render: function () {
			                         this.up('panel').body.mask('正在装入：【' + rec.data.text + '】 模块，请稍候... ...');
			                     }
			                 }
			             }
			        }).show();
				}
    }
    else{
    	tabPanel.setActiveTab(tab);
    }
    tabPanel.doLayout();
};
window.ContentTablePanelSet = function(id, pagetitle, url) {
	var tabPanel=Ext.getCmp('tabpanelMain');
	var panel_Id=id;
	var tab = tabPanel.getComponent(panel_Id);
    if (!tab) {
		if(url!=''){
			        tabPanel.add({
			        	id: panel_Id,
			            title: pagetitle,
			            autoscroll: true,
			            closable: true,
			            iconCls: 'icon-page',
			            border: false,
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
			                         this.up('panel').body.mask('正在装入：【' + pagetitle + '】 模块，请稍候... ...');
			                     }
			                 }
			             }
			        }).show();
				}
    }
    else{
    	tabPanel.setActiveTab(tab);
    }
    tabPanel.doLayout();
};
var model = Ext.define("TreeModel", { // 定义树节点数据模型  
    extend : "Ext.data.Model",  
    fields : [{name : "id",type : "string"},  
            {name : "text",type : "string"},  
            {name : "iconCls",type : "string"},  
            {name : "leaf",type : "boolean"},
            {name : "webPath",type : "string"}
            ]  
});  
var treepanelStore = function(id) { // 创建树面板数据源  
    //var me = this;  
    return Ext.create("Ext.data.TreeStore", {  
                defaultRootId : id, // 默认的根节点id  
                model : model,  
                proxy : {  
                    type : "ajax", // 获取方式  
                    url : "/OSS/admin/user/user_getUserMenuItem" // 获取树节点的地址  
                },  
                clearOnLoad : true,  
                nodeParam : "id"// 设置传递给后台的参数名,值是树节点的id属性  
            });  
};  

var InitMain=function(){
	Ext.tip.QuickTipManager.init();
	Ext.Loader.setConfig({ enabled:true});
	new MyApp.view.MyViewport();
	setUserTimeInfo();
};
var setUserTimeInfo=function(){
	Ext.Ajax.request({ 
		url: '/OSS/admin/user/user_getCurrentUserName',
		method : 'get', 
		success : function(response, options){ 
			setTimeInfo(Ext.JSON.decode(response.responseText).msg);
		 },
		 failure : function(response){ 
		 }
	});
};
var setTimeInfo=function(username){
	var task = {
            run: function () {
            	var time=new Date();
            	var spm=Ext.util.Format.date(time,"A");
            	var dt=Ext.util.Format.date(time,"Y-m-d");
            	var ti=Ext.util.Format.date(time,"G:i:s");
            	var wk=getTimeWeek(time.getDay());
            	Ext.getCmp('panelTopRightNorth').body.update(spm+"好，"+username+"! 今天是："+dt+" "+wk+" "+ti+" ");
            },
            interval: 1000
        };
        Ext.TaskManager.start(task);
};
var getTimeWeek=function(day){
	var dateweek='星期一' ;
	switch(day)
	{
	case 0:dateweek = "星期日";break;
	case 1:dateweek = "星期一";break;
	case 2:dateweek = "星期二";break;
	case 3:dateweek = "星期三";break;
	case 4:dateweek = "星期四";break;
	case 5:dateweek = "星期五";break;
	case 6:dateweek = "星期六";break;
	}
	return dateweek;
};
window.setWinCommonMax=function(title,width,height,icoCls,url){
	var winCommonMax=Ext.create('Ext.window.Window',{
	title: title,
	width: width,
	height:height,
	iconCls: icoCls,
	resizable:      false, 
    maximizable:true,
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
    }
   }); 
	winCommonMax.show();
};