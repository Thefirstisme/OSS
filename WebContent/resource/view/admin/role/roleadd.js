Ext.define('OSS.view.RoleAdd', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        var storeDataLevel = GetKeyValueStore('/OSS/admin/para/para_getRoleDataLevel');
        var storeSystem = GetKeyValueStore('/OSS/admin/para/para_getSystemList');
        var storeTest = Ext.create('Ext.data.Store', { 
            fields: ['id', 'name'], 
            data : [ 
                {"id":"0","name":"0"},
        		{"id":"1","name":"1"}
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    region: 'center',
                    bodyPadding: 10,
                    border: false,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowRoleName',
                            name: 'txtWindowRoleName',
                            fieldLabel: '角色名称',
                            blankText: '您未输入内容！',
                            emptyText: '角色名称必需输入',
                            maxLength: 15,
                            allowBlank: false,
                            msgTarget: 'side',
                            maxLengthText: '角色名称不能超过15位！',
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'txtWindowRoleDesc',
                            name: 'txtWindowRoleDesc',
                            fieldLabel: '角色描述',
                            blankText: '您未输入内容',
                            maxLength: 60
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbRoleDataLevel',
                            name: 'cmbRoleDataLevel',
                            fieldLabel: '角色权限等级',
                            editable: false,
                            store: storeDataLevel,
                            displayField: 'name',
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbUpSeries',
                            name: 'cmbUpSeries',
                            fieldLabel: '机构向上级数',
                            allowBlank: false,
                            editable: false,
                            emptyText: '机构向上级数必须输入',
                            store: storeTest,
                            displayField: 'name',
                            valueField: 'id',
                            value:'0'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'cmbSystem',
                            name: 'cmbSystem',
                            fieldLabel: '归属系统',
                            emptyText: '请选择归属系统',
                            store: storeSystem,
                            displayField: 'name',
                            valueField: 'id',
                            listConfig: {
                                maxHeight: 160
                            }
                        }
                        ,
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            id: 'chbWindowAddNodeIsSystem',
                            name: 'chbWindowAddNodeIsSystem',
                            fieldLabel: '是否系统角色',
                            boxLabel: ''
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'ButtonLoadRole',
                                    iconCls: 'icon-arrowrefreshsmall',
                                    text: '重置',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonLoadRoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOkRole',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOkRoleClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonCancelRole',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonCancelRoleClick,
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

    onButtonLoadRoleClick: function(button, e, eOpts) {
    	this.down("form").getForm().reset();
    },

    onButtonOkRoleClick: function(button, e, eOpts) {
    	var formpPanel = this.down("form");
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/role/role_addRole',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                    //window.location.href="main.jsp"; 
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交成功!',buttons: Ext.Msg.OK,closable : false});
    	                }else if(action.result.msg == 'ERROR') {  
    	                	Ext.Msg.show({title : '事件消息',msg :'数据提交失败!',buttons: Ext.Msg.OK,closable : false});
    	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	            	Ext.Msg.alert('错误提示', action.result.msg);    
    	            }  
    		});
    	}
    },

    onButtonCancelRoleClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    }

});
var InitRoleAdd=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleAdd();
	pageInitData();
};
var pageInitData=function(){
	var dataLevelStore=Ext.getCmp("cmbRoleDataLevel").store;
	dataLevelStore.load({callback:function(s,options,success){
		if(success==true){
			Ext.getCmp("cmbRoleDataLevel").setValue(dataLevelStore.getAt(0));
		}
	 }});
};