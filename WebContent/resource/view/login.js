Ext.define('OSS.view.Login', {
    extend: 'Ext.window.Window',

    draggable: false,
    height: 300,
    width: 460,
    closable: false,
    closeAction: 'hide',
    collapsible: true,
    iconCls: 'icon-lock',
    title: '登录窗口',
    modal: true,
    plain: true,
    top:100,
    renderTo: Ext.getBody(),
    buttonAlign:'center', 
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	buttons: [{ 
            	xtype: 'button',
                id: 'BtnLogin',
                iconCls: 'icon-accept',
                text: '登录',
                type: 'submit',
                handler: function () {
                	//onLogin();
                },
	        	 listeners: {
	                 click: function() {
	                	 onLogin();
	                 },
	                 specialkey : function(field, e) {  
	                     if (e.getKey() == Ext.EventObject.ENTER) {  
	                    	 onLogin();
	                     }  
	                 }  
	             }
            },{ 
            	 xtype: 'button',
                 id: 'BtnCancel',
                 iconCls: 'icon-cross',
                 text: '关闭',
	        	 listeners: {
	                 click: function() {
	                	 CloseWin();
	                 } 
	             }
            }] ,
        	items: [
                {
                    xtype: 'panel',
                    border: false,
                    height: 80,
                    html: '<div class=\'loginTopCls\'><div class=\'lableTitle \'>上海银行上海自贸区人行信息报送系统</div></div>',
                    id: 'panelTop',
                    layout: {
                        type: 'fit'
                    },
                    title: ''
                },
                {
                    xtype: 'panel',
                    id: 'panelMain',
                    title: '',
                    border: false,
                    items: [
                        {
                            xtype: 'tabpanel',
                            height: 155,
                            id: 'tabMain',
                            activeTab: 0,
                            border: false,
                            items: [
                                {
                                	xtype: 'panel',
                                    title: '身份验证',
                                    border: false,
                                    items: [
                                        {
                                        	xtype: 'form',
                                            border: false,
                                            id: 'panelLogin',
                                            width: 380,
                                            bodyPadding: 30,
                                            bodyStyle: 'padding:35px',
                                            title: '',
                                            items: [
                                            	{
                                            		xtype: 'textfield',
	                                                id: 'txtUserName',
	                                                name: 'txtUserName',
	                                                width: 350,
	                                                fieldLabel: '账号',
	                                                labelWidth: 60,
	                                                allowBlank: false,
	                                                blankText: '请输入账号',
	                                                msgTarget: 'side',
	                                                fieldCls: 'textField-loginUser',
	                                                maxLength: 30,
	                                                listeners: {
		                               	                 specialkey : function(field, e) {  
		                               	                     if (e.getKey() == Ext.EventObject.ENTER) {  
		                               	                    	 onLogin();
		                               	                     }  
		                               	                 }  
		                               	             }
                                            	},
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txtPwd',
                                                    name: 'txtPwd',
                                                    width: 350,
                                                    fieldLabel: '密码',
                                                    labelWidth: 60,
                                                    allowBlank: false,
	                                                blankText: '请输入密码',
	                                                msgTarget: 'side',
                                                    fieldCls: 'textField-loginKey',
                                                    inputType: 'password',
                                                    maxLength: 30,
                                                    listeners: {
		                               	                 specialkey : function(field, e) {  
		                               	                     if (e.getKey() == Ext.EventObject.ENTER) {  
		                               	                    	 onLogin();
		                               	                     }  
		                               	                 }  
		                               	             }
                                                }
                                            ],
                                            listeners: {
                                                specialkey: function (field, e) {
                                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                                    	onLogin();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    html: ' <table width="100%" border="0" style="padding: 10;">  <tr align="center"><td style="height: 24px; width: 440px" colspan="3"> <h6>  系统登录规则 </h6></td>  </tr>  <tr><td style="height: 24px; width: 440px" colspan="3"> 账号：工号作为该系统登录的账号</td>  </tr>  <tr><td style="height: 24px; width: 440px" colspan="3"> 密码：初始密码为123456,建议更改密码</td>  </tr>  <tr align="center"><td style="height: 24px; width: 33%; color:blue"><a href="javascript:void(0);" onclick="FileDown(\'downfile/sys/Firefox-setup.exe\')"> 【安装火狐浏览器】</a></td><td style="height: 24px; width: 33%; color:blue"><a href="javascript:void(0);" onclick="FileDown(\'downfile/sys/CHSB_Chrome_non_defaultV4.exe\')">【安装谷歌浏览器】</a></td><td style="height: 24px; width: 33%; color:blue"><a href="javascript:void(0);" onclick="FileDown(\'downfile/sys/商业银行一站式服务平台操作手册 V2.0.doc\')">【系统操作手册】</a></td>  </tr> </table>',
                                    title: '信息公告',
                                    border: false
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onViewportAfterRender: function(component, eOpts) {
	    	Ext.getCmp('txtUserName').setValue('bos');
	    	Ext.getCmp('txtPwd').setValue('123456');
		setTimeout(function () {Ext.getCmp('txtUserName').focus(false, 100);},200);
    }
});
var onLogin= function(){
	var formpPanel = Ext.getCmp("panelLogin");
	var userName = Ext.getCmp("txtUserName").getValue();  
	var userPass = Ext.getCmp("txtPwd").getValue(); 
	if (formpPanel.form.isValid()) {
		var box=Ext.MessageBox.wait('正在进行登录验证,请稍后...', '系统提示');
		//window.location.href="main.jsp";  //直接跳转
		Ext.Ajax.request({ 
			url: "/OSS/admin/login/login_userLogin",
			method : 'post',
			params : {userName : userName,userPass : userPass},
			success : function(response, options){ 
				 box.hide();
				 var data = Ext.JSON.decode(response.responseText);   
				 if(data)
				 {
					//box.hide();
 	                if (data.msg == 'OK') { 
	                    window.location.href="main.jsp";  
	                }
	                else if(data.msg == 'PWD_ERR') {
	                	//OSS.AlertWarning("密码错误！", handleSaveYesNo0);
	                	//alert(data.msg);
	                	Ext.MessageBox.show({title : '错误提示',msg :"密码错误！",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO,fn: handleSaveYesNo0});
	                } 
	                else if(data.msg == 'ROLE_ERR') { 
	                	//OSS.AlertWarning("你无进入本系统的权限！", handleSaveYesNo1);
	                	Ext.MessageBox.show({title : '错误提示',msg :"你无进入本系统的权限！",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo1});
	                }
	                else if(data.msg == 'USER_ERR') {  
	                	//OSS.AlertWarning("用户名不存在！", handleSaveYesNo2);
	                	Ext.MessageBox.show({title : '错误提示',msg :"用户名不存在！",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo2});
	                } 
	                else if(data.msg == 'ERROR') {
	                	//OSS.AlertWarning("登录异常！", handleSaveYesNo1);
	                	Ext.MessageBox.show({title : '错误提示',msg :"登录异常！",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo1});
	                }
	                else{
	                	//OSS.AlertWarning(action.result.msg, handleSaveYesNo1);
	                	Ext.MessageBox.show({title : '错误提示',msg :action.result.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo1});
	                }
				 }else{
					// box.hide();
				 }
			 },
			 failure : function(response){ 
				 var c1 = Ext.JSON.decode(response.responseText);  
				 Ext.Msg.alert('信息',c1.success+'-'+c1.msg); 
				 box.hide();
			 }
		});
	}
	else{
		//OSS.AlertWarning("登录信息验证失败！", handleSaveYesNo3);
		Ext.MessageBox.show({title : '错误提示',msg :"登录信息验证失败！",buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING,fn: handleSaveYesNo3});
	}
};
function FileDown(URL) {
	window.open(encodeURI(encodeURI('jgb/TemplateFileDown.jsp?id='+URL+'')),'_self');
};
var CloseWin =function(){
	var browserName = navigator.appName; 
	if (browserName=="Netscape") { 
		window.opener=null; 
		window.open('','_self',''); 
		window.close(); 
	} 
	else if (browserName == "Microsoft Internet Explorer"){ 
		window.opener = null; 
		window.open('', '_top'); 
		window.close(); 
	}  
};
var handleSaveYesNo0=function(btn){
	switch( btn )
	  {
	    case 'ok':
	    	Ext.getCmp('txtPwd').setValue('');
	    	Ext.getCmp('txtPwd').focus(false, 100);
	      break;
	  }
};
var handleSaveYesNo1=function(btn){
	switch( btn )
	  {
	    case 'ok':
	    	Ext.getCmp('txtUserName').setValue('');
	    	Ext.getCmp('txtPwd').setValue('');
			Ext.getCmp('txtUserName').focus(false, 100);
	      break;
	  }
};
var handleSaveYesNo2=function(btn){
	switch( btn )
	  {
	    case 'ok':
	    	Ext.getCmp('txtPwd').setValue('');
	    	Ext.getCmp('txtUserName').focus(false, 100);
	      break;
	  }
};
var handleSaveYesNo3=function(btn){
	switch( btn )
	  {
	    case 'ok':
	    	if(Ext.getCmp('txtUserName').getValue().length==0){
	    		Ext.getCmp('txtUserName').focus(false, 100);
			}
			else{
				Ext.getCmp('txtPwd').focus(false, 100);
			}
	      break;
	  }
};
var initLogin=function()
{
	var win=new OSS.view.Login();
	win.show();
};