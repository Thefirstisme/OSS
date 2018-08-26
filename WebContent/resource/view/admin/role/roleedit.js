Ext.define('OSS.view.RoleEdit', {
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
                            maxLength: 15
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
                            valueField: 'id',
                            typeAhead: true,
                            selectOnFocus: true
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
                            value: '0'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id:'cmbSystem',
                            name:'cmbSystem',
                            fieldLabel: '归属系统',
                            emptyText: '请选择归属系统',
                            store: storeSystem,
                            displayField: 'name',
                            valueField: 'id',
                            listConfig: {
                                maxHeight: 160
                            },
                            typeAhead: true,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            id: 'chbWindowAddNodeIsSystem',
                            name: 'chbWindowAddNodeIsSystem',
                            fieldLabel: '是否系统角色',
                            boxLabel: ''
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'txtRoleId',
                            name: 'txtRoleId',
                            fieldLabel: 'Label'
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

    onButtonLoadRoleClick: function(button, e, eOpts) {
    	PageUIDataInit();
    },

    onButtonOkRoleClick: function(button, e, eOpts) {
    	var formpPanel = this.down('form');
    	var params=formpPanel.getForm().getValues();
    	if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
    			    waitMsg : '正在提交数据,请稍后...', 
    			    waitTitle: '系统提示',
    			    submitEmptyText: false,
    	            url : '/OSS/admin/role/role_editRole',  
    	            method : 'post',  
    	            params : params, 
    	            //提交成功的回调函数  
    	            success : function(form, action) {  
    	                if (action.result.msg == 'OK') {  
    	                	Ext.MessageBox.show({title : '事件信息',msg :'数据提交成功!',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
    	                }else if(action.result.msg == 'ERROR') {  
    	                	Ext.MessageBox.show({title : '事件信息',msg :'数据提交失败!',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
    	                }  
    	            },  
    	            //提交失败的回调函数  
    	            failure : function(form, action) {  
    	            	Ext.MessageBox.show({title : '事件信息',msg :action.result.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING}); 
    	            }  
    		});
    	}
    },

    onButtonCancelRoleClick: function(button, e, eOpts) {
    	//Ext.Msg.show({title : '事件消息',msg :'关闭事件',buttons: Ext.Msg.OK,closable : false});
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    },
    onViewportAfterRender: function(component, eOpts) {
    	setTimeout(function () { PageUIDataInit();}, 500);
    }

});
var InitRoleEdit=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleEdit();
	//PageUIDataInit();
	 //Ext.getCmp("cmbSystem").store.load();
	 //Ext.getCmp("cmbRoleDataLevel").store.load();
};

var PageUIDataInit=function(){
	var id = OSS.getUrlParam('id');
	Ext.Ajax.request({ 
		url: "/OSS/admin/role/role_getRole",
		method : 'post', 
		params : {id: id},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data)
			 {
				 Ext.getCmp("txtWindowRoleName").setValue(data[0].roleName);
				 Ext.getCmp("txtWindowRoleDesc").setValue(data[0].description);
				 Ext.getCmp("cmbRoleDataLevel").setValue(data[0].dataLevel.toString());
				 Ext.getCmp("cmbUpSeries").setValue(data[0].dataLevel);
				 Ext.getCmp("cmbSystem").setValue(data[0].systemId);
				 Ext.getCmp("txtRoleId").setValue(data[0].roleId);
				 if(data[0].isSystem=='1'){
					 Ext.getCmp("chbWindowAddNodeIsSystem").setValue(true);
				 }
				 else{
					 Ext.getCmp("chbWindowAddNodeIsSystem").setValue(false);
				 }
//				 var dataLevelStore=Ext.getCmp("cmbRoleDataLevel").store;
//				 dataLevelStore.load({callback:function(s,options,success){
//						if(success==true){
//							//Ext.getCmp("cmbRoleDataLevel").setValue(dataLevelStore.getById(data[0].dataLevel.toString()));
//							Ext.getCmp("cmbRoleDataLevel").setValue(data[0].dataLevel.toString());
//						}
//					 }});
//				 Ext.getCmp("cmbSystem").store.load({callback:function(s,options,success){
//						if(success==true){
//							Ext.getCmp("cmbSystem").setValue(data[0].systemId);
//						}
//					 }});
			 }
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
		 }
	});
};