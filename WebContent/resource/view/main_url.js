var loadPage = function(rec) {
	var tabPanel=Ext.getCmp('tabpanelMain');
	var tab = tabPanel.getComponent(rec.data.id);
    if (!tab) {
		if(rec.data.webpath!=''){
			var mask = new Ext.LoadMask(tabPanel.body, {msg:"Please wait..."});
			mask.show();
		        tabPanel.add({
		        	id: rec.data.id,
		            title: rec.data.text,
		            autoscroll: true,
		            closable: true,
		            iconCls: rec.data.iconCls,
		            border: false,
		            html:'<iframe id="' + rec.data.id + '_Iframe" frameborder="0" scrolling="auto" src="' + rec.data.webpath + '" height="100%"  width="100%"></iframe>'
		        }).show();
		        mask.hide();
				}
    }
    else{
    	tabPanel.setActiveTab(tab);
    }
    tabPanel.doLayout();
};
var loadPage2 = function(rec) {
	var tabPanel=Ext.getCmp('tabpanelMain');
	var tab = tabPanel.getComponent(rec.data.id);
    if(!tab)
    {
    	tab = tabPanel.add( 
                new Ext.Panel({ 
                     id:rec.data.id, 
                     title:rec.data.text, 
                      //autoLoad:{url:tablink, scripts:true,nocache:true}, 
                     autoScroll:true, 
                     iconCls:rec.data.iconCls, 
                     layout: 'fit', 
                     border:false, 
                     closable:true 
                 }) 
             ); 
    	tab.loader({ 
            url: rec.data.webpath, 
            method:'post', 
            params: {subMainId: ''}, 
            scope: this, // optional scope for the callback 
            discardUrl: true, 
            nocache: true, 
            text: "页面加载中,请稍候……", 
            timeout: 9000, 
            scripts: true 
        }); 
    }
    else
    {
    	tabPanel.setActiveTab(tab);  
    }
};
Ext.regModel('menuInfo', {

        fields: [
                    { name: 'id', type: 'string', defaultValue: null },
                    { name: 'text', type: 'string', defaultValue: null },
                    { name: 'parentId', type: 'string', defaultValue: null },
                    { name: 'index', type: 'int', defaultValue: null },
                    { name: 'depth', type: 'int', defaultValue: 0 },
                    { name: 'expanded', type: 'bool', defaultValue: false },
                    { name: 'expandable', type: 'bool', defaultValue: true },
                    { name: 'checked', type: 'auto', defaultValue: null },
                    { name: 'leaf', type: 'bool', defaultValue: false },
                    { name: 'cls', type: 'string', defaultValue: null },
                    { name: 'iconCls', type: 'string', defaultValue: null },
                    { name: 'icon', type: 'string', defaultValue: null },
                    { name: 'root', type: 'boolean', defaultValue: false },
                    { name: 'isLast', type: 'boolean', defaultValue: false },
                    { name: 'isFirst', type: 'boolean', defaultValue: false },
                    { name: 'allowDrop', type: 'boolean', defaultValue: true },
                    { name: 'allowDrag', type: 'boolean', defaultValue: true },
                    { name: 'loaded', type: 'boolean', defaultValue: false },
                    { name: 'loading', type: 'boolean', defaultValue: false },
                    { name: 'href', type: 'string', defaultValue: null },
                    { name: 'hrefTarget', type: 'string', defaultValue: null },
                    { name: 'qtip', type: 'string', defaultValue: null },
                    { name: 'qtitle', type: 'string', defaultValue: null },
                    { name: 'formid', type: 'string', defaultValue: null },                  //自定义
                    { name: 'formcode', type: 'string', defaultValue: null },            //自定义
                    { name: 'formname', type: 'string', defaultValue: null },          //自定义
                    { name: 'webpath', type: 'string', defaultValue: null },             //自定义
                    { name: 'exefile', type: 'string', defaultValue: null },                 //自定义
                    { name: 'tcode', type: 'string', defaultValue: null }                   //自定义
            ]
    });

var store1 = Ext.create('Ext.data.TreeStore', {  
	model:'menuInfo',
	root: {  
        expanded: true, 
        children: [  
            {id: "node1", text: "报表设计", leaf: true , webpath:'',iconCls:'icon-application' },  
            {  id:"node2",text: "系统管理", expanded: true, webpath:'', children: [  
                { id:"node4", text: "权限管理", expanded: true, webpath:'', children:[
                      {id:"node5",text: "机构管理", leaf: true, iconCls:'icon-chartorganisation',  webpath:'admin/org/org_getOrgList.jsp'},
                      {id:"node6",text: "用户管理", leaf: true, iconCls:'icon-grouplink', webpath:'admin/user/UserList.jsp'},
                      {id:"node7",text: "资源管理", leaf: true, iconCls:'icon-arrowswitch', webpath:'admin/source/SourceTree.jsp'},
                      {id:"node8",text: "角色组管理", leaf: true, iconCls:'icon-awardstarsilver3', webpath:'admin/rolegroup/RoleGroupList.jsp'},
                      {id:"node9",text: "角色管理", leaf: true, iconCls:'icon-awardstarsilver3', webpath:'admin/role/RoleList.jsp'},
                      {id:"node10",text: "用户密码重置", leaf: true, iconCls:'icon-userkey', webpath:'admin/user/UserPassReset.jsp'}
                                                          ] },  
                { id:"node11",text: "系统日志", expanded: true, webpath:'',children:[
                          {id:"node111",text: "日志管理", leaf: true, webpath:'loging/LogClear.jsp'},  
                          {id:"node112",text: "日志查询", expanded: true, webpath:'',children:[
                                                                                       {id:"node1121",text: "SQL日志查询", leaf: true, iconCls:'icon-scriptgear', webpath:'loging/UserSQLSearch.jsp'},
                                                                                       {id:"node1122",text: "操作日志查询", leaf: true, iconCls:'icon-scriptcode', webpath:'loging/UserActionSearch.jsp'},
                                                                                       {id:"node1123",text: "登录日志查询", leaf: true, iconCls:'icon-scriptkey', webpath:'admin/log/log_userlogin_list.jsp'},
                                                                                       {id:"node1124",text: "过程日志查询", leaf: true, iconCls:'icon-scriptlightning', webpath:'loging/ProcedureSearch.jsp'}
                                                                                       ]}
                   ]}  
            ] },  
            { id:"node12",text: "调度管理", expanded: true, webpath:'userinfo.jsp',children:[
                                                                                         {id:"node121",text: "作业维护", leaf: true, iconCls:'icon-buildingedit', webpath:'dispatchingsystem/JobInfoList.jsp'}, 
                                                                                         {id:"node122",text: "作业依赖", leaf: true, iconCls:'icon-buildinglink', webpath:'dispatchingsystem/JobDependence.jsp'}, 
                                                                                         {id:"node123",text: "调度功能", leaf: true, iconCls:'icon-buildinggo', webpath:'dispatchingsystem/JobDispatching.jsp'}, 
                                                                                         {id:"node124",text: "作业监控", leaf: true, iconCls:'icon-building', webpath:'dispatchingsystem/JobMonitoring.jsp'}, 
                                                                                         {id:"node125",text: "依赖查询", leaf: true, iconCls:'icon-cdmagnify', webpath:''} 
                                                                                         ] }  
        ]  
    }  
});  
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
                                    html: '上午好，管理员! 今天是：2013-06-26 星期三  09:53:22',
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
                                            width: 70,
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
                    items: [
                        {
                            xtype: 'treepanel',
                            autoScroll: true,
                            collapsed: false,
                            title: '一站式服务平台',
                            border: false,
                            store : store1, 
                            useArrows: true,
                            cls:'empty',
                            viewConfig: {
                            	rootVisible: false
                            },
                            listeners :{
                            	itemclick : function(view,rec,item,index,eventObj) {
                            		//alert(rec.data.href);
                            		//alert(eventObj.attributes.shref);
                            		//e.stopEvent();
                            		loadPage(rec);
                            	}
                            }
                        },
                        {
                            xtype: 'treepanel',
                            title: '监管报送',
                            border: false, 
                            cls:'empty',
                            viewConfig: {
                            	rootVisible: false
                            }
                        }
                    ],
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
                    items: [
                        {
                            xtype: 'panel',
                            title: '我的工作平台',
                            iconCls: 'icon-house',
                            	tabConfig: {
                                    xtype: 'tab'
                                }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onbtnThemeClick: function(button, e, eOpts) {
    	var win=Ext.create('Ext.window.Window',{  
    	    title: '主题设置',  
    	    resizable:      false, //变大小   
    	    width: 420, 
    	    maximizable:false,
    	    height:445,  
    	    iconCls: 'icon-themeIcon',
    	    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    	    plain:true,  
    	    bodyStyle:'padding:0px;',  
    	    buttonAlign:'center',  
    	    html:'<iframe id=thisIframe width=410 height=411 frameborder=0 scrolling=auto src=admin/syspara/ThemeSetting.jsp></iframe>'  
    	   }); 
    	win.show();
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
    	Ext.Msg.show({title : '事件消息',msg :'关于软件事件',buttons: Ext.Msg.OK,closable : false});
    },
    onCheckMenuItemForumClick:function(button, e, eOpts) {
    	Ext.Msg.show({title : '事件消息',msg :'管理我的工作事件',buttons: Ext.Msg.OK,closable : false});
    },
    onbtnCloseClick:function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'系统退出事件',buttons: Ext.Msg.OK,closable : false});
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
});
var winChangePswd=Ext.create('Ext.window.Window',{  
    title: '修改密码',  
    resizable:      false, //变大小   
    width: 360, 
    maximizable:false,
    height:210,  
    iconCls: 'icon-key',
    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center',  
    html:'<iframe id=thisIframe width=350 height=175 frameborder=0 scrolling=auto src=admin/user/AccountPassEdit.jsp></iframe>'  
}); 

// 打开修改密码页面
function toChangePd(){
	winChangePswd.show();
}
// 关闭修改密码页面
function changePdClose(){
	winChangePswd.close();
}

// 修改用户信息
var winEditUser=Ext.create('Ext.window.Window',{  
    title: '修改个人信息',  
    resizable:false, //变大小   
    width: 440, 
    maximizable:false,
    height:440,  
    iconCls: 'icon-key',
    modal: true,//为模式窗口，后面的内容都不能操作(屏蔽)   
    plain:true,  
    bodyStyle:'padding:0px;',  
    buttonAlign:'center',  
    html:'<iframe id=thisIframe width=100% height=100% frameborder=0 scrolling=auto src=admin/user/toEditUser.jsp></iframe>'  
}); 
// 打开修改用户信息
function toEditUser(){
	winEditUser.show();
}
// 关闭修改用户信息
function editUserClose(){
	winEditUser.close();
}

var InitMain=function(){
	Ext.tip.QuickTipManager.init();
	new MyApp.view.MyViewport();
	setTimeInfo('管理员');
};
var setTimeInfo=function(username){
	var task = {
            run: function () {
            	var time=new Date();
            	var spm=Ext.util.Format.date(time,"A");
            	var dt=Ext.util.Format.date(time,"Y-m-d");
            	var ti=Ext.util.Format.date(time,"g:i:s");
            	var wk=getTimeWeek(time.getDay());
            	//var t=String.format("{0}好，{1}! 今天是：{2} {3} {4}" ,spm,username,dt,wk,ti);
            	//Ext.getCmp('panelTopRightNorth').body.update(spm+"好，"+username+"! 今天是：" + Ext.util.Format.date(new Date(), "Y-m-d g:i:s A"));
                //Ext.getCmp('panel1').body.update('下午好，管理员! 今天是：2013-06-26 星期三  09:53:22');
            	Ext.getCmp('panelTopRightNorth').body.update(spm+"好，"+username+"! 今天是："+dt+" "+wk+" "+ti+" ");
            	
            },
            interval: 1000
        };
        Ext.TaskManager.start(task);
};
var getTimeWeek=function(day){
	var dateweek ;
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