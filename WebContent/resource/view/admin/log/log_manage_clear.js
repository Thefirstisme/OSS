	
	Ext.override(Ext.form.RadioGroup, {  
	    getValue: function(){  
	        var v;  
	        if (this.rendered) {  
	            this.items.each(function(item){  
	                if (!item.getValue())   
	                    return true;  
	                v = item.getRawValue();  
	                return false;  
	            });  
	        }  
	        else {  
	            for (var k in this.items) {  
	            	if(this.items[k]!=null){
	            		if (this.items[k].checked){  
		                    v = this.items[k].inputValue;  
		                    break;  
	                	}  
	            	}

	            }  
	        }  
	        return v;  
	    },  
	    setValue: function(v){  
	        if (this.rendered)   
	            this.items.each(function(item){  
	                item.setValue(item.getRawValue() == v);  
	            });  
	        else {  
	            for (var k in this.items) {  
	                this.items[k].checked = this.items[k].inputValue == v;  
	            }  
	        }  
	    }  
	}); 
	
Ext.define('OSS.view.InitLogManageClear', {
	extend : 'Ext.container.Viewport',

	initComponent : function() {
		var me = this;
		var storeLogTable = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "z020_log_action",
								"name" : "用户系统操作日志"
							}, {
								"id" : "z020_log_userlogin",
								"name" : "用户登录日志"
							}, {
								"id" : "z020_log_error",
								"name" : "系统错误日志"
							}, {
								"id" : "z020_log_page",
								"name" : "用户访问页面日志"
							}, {
								"id" : "z020_log_sql",
								"name" : "系统SQL日志"
							}, {
								"id" : "t6",
								"name" : "DB2日志"
							}]
				});
		var storeClearFw = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "1",
								"name" : "一天前"
							}, {
								"id" : "7",
								"name" : "一周前"
							}, {
								"id" : "14",
								"name" : "两周前"
							}, {
								"id" : "30",
								"name" : "一个月前"
							}, {
								"id" : "90",
								"name" : "一个季度前"
							}, {
								"id" : "365",
								"name" : "一年前"
							}, {
								"id" : "all",
								"name" : "所有"
							}, {
								"id" : "beforeD",
								"name" : "制定日期前"
							}, {
								"id" : "betweenD",
								"name" : "制定日期区间"
							}]
				});

		var storeClearFwSz = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "1",
								"name" : "一天前"
							}, {
								"id" : "7",
								"name" : "一周前"
							}, {
								"id" : "14",
								"name" : "两周前"
							}, {
								"id" : "30",
								"name" : "一个月前"
							}, {
								"id" : "90",
								"name" : "一个季度前"
							}, {
								"id" : "365",
								"name" : "一年前"
							}]
				});
				var radiogroup= new Ext.form.RadioGroup({
				                fieldLabel : "是否启用",
				                items : [{
				                            boxLabel : '是',
				                            inputValue : "1",
				                            name : "ifUse"
				                        }, {
				                            boxLabel : '否',
				                            name : "ifUse",
				                            inputValue : "0",
				                            checked : true
				                        }]
				            });
		Ext.applyIf(me, {
			items : [{
				xtype : 'tabpanel',
				height : 220,
				id : 'tabpanelSzId',
				activeTab : 0,
				items : [{
							xtype : 'form',
							title : '手动清除',
							id : 'qc_sd',
							height : 165,
							items : [{
										xtype : 'combobox',
										fieldLabel : '日志表',
										anchor : '90%',
										id : 'logTablesId',
										name : 'logTablesId',
										width : 300,
										selectOnFocus : true,
										editable : false,
										queryMode : 'local',
										typeAhead : true,
										displayField : 'name',
										store : storeLogTable,
										valueField : 'id',
										multiSelect : true,
										listConfig : {
											maxHeight : 120
										}
									}, {
										xtype : 'combobox',
										fieldLabel : '清除',
										anchor : '90%',
										id : 'clearFwId',
										name : 'clearFwId',
										width : 300,
										selectOnFocus : true,
										editable : false,
										queryMode : 'local',
										typeAhead : true,
										displayField : 'name',
										store : storeClearFw,
										valueField : 'id',
										listConfig : {
											maxHeight : 100
										},
										listeners : {
											change : {
												fn : me.onClearFwChange,
												scope : me
											}
										}
									}, {
										xtype : 'datefield',
										id : 'dataF',
										name : 'dataF',
										format: 'Y-m-d',
										hidden : true,
										flex : 1,
										fieldLabel : '清除日期(起)'
									}, {
										xtype : 'datefield',
										id : 'dataZ',
										name : 'dataZ',
										format: 'Y-m-d',
										hidden : true,
										flex : 1,
										fieldLabel : '清除日期(至)'
									}],
							dockedItems : [{
										xtype : 'toolbar',
										flex : 1,
										dock : 'bottom',
										items : [{
													xtype : 'button',
													iconCls: 'icon-groupdelete',
													text : '清除',
													listeners : {
														click : {
															fn : me.onClearSD,
															scope : me
														}
													}
												},
				                                {
				                                    xtype: 'tbfill'
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
				                                }]
									}]
						}, {
							xtype : 'form',
							title : '设置清除',
							id : 'qc_sz',
							items : [{
										xtype : 'combobox',
										fieldLabel : '时间类型',
										anchor : '90%',
										id : 'eeeee',
										name : 'cmdUserType3',
										width : 300,
										selectOnFocus : true,
										editable : false,
										queryMode : 'local',
										typeAhead : true,
										displayField : 'name',
										store : storeClearFwSz,
										valueField : 'id',
			                            allowBlank: false,
			                            blankText: '您未输入时间类型！',
			                            emptyText: '时间类型必须输入',
										listConfig : {
											maxHeight : 120
										}
									}, 
									radiogroup],
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'bottom',
										items : [{
													xtype : 'button',
													iconCls: 'icon-groupdelete',
													text : '保存',
				                                    listeners: {
				                                        click: {
				                                            fn: me.onButtonOk32Click,
				                                            scope: me
				                                        }
				                                    }
												},
				                                {
				                                    xtype: 'tbfill'
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
				                                }]
									}]
						}]
			}],
			listeners : {
				afterrender : {
					fn : me.onViewportAfterRender,
					scope : me
				}
			}
		});

		me.callParent(arguments);
	},

	// 清除日期修改时
	onClearFwChange : function(item, e, eOpts) {
		var record = Ext.getCmp('clearFwId').getValue();
		if (record == 'beforeD') {
			Ext.getCmp('dataZ').show();
		} else if (record == 'betweenD') {
			Ext.getCmp('dataF').show();
			Ext.getCmp('dataZ').show();
		} else {
			Ext.getCmp('dataF').hide();
			Ext.getCmp('dataZ').hide();
		}
	},

	onViewportAfterRender : function(component, eOpts) {
		var tabId = OSS.getUrlParam('tabId');
		if (tabId == '1') {
			Ext.getCmp('tabpanelSzId').setActiveTab(Ext.getCmp('qc_sz'));
		} else {
			Ext.getCmp('tabpanelSzId').setActiveTab(Ext.getCmp('qc_sd'));
		}
	},
	
	// 手动清除
	onClearSD: function(button, e, eOpts) {
		var logTablesId = Ext.getCmp("logTablesId").getValue();

		var clearFwId = Ext.getCmp("clearFwId").getValue();

		var dataF = Ext.getCmp("dataF").getValue();
		var dataZ = Ext.getCmp("dataZ").getValue();

		var formpPanel = Ext.getCmp("qc_sd");
    	var params=formpPanel.getForm().getValues();
    	
		if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
			    waitMsg : '正在提交数据,请稍后...', 
			    waitTitle: '系统提示',
			    submitEmptyText: false,
	            url : '/OSS/admin/log/log_clearLogSD',  
	            method : 'post',  
	            params : params, 
	            //提交成功的回调函数  
	            success : function(form, action) {  
	                if (action.result.msg == 'OK') {  
	                	OSS.AlertInfo("数据提交成功!");
	                }else if(action.result.msg == 'ERROR') {  
	                	OSS.AlertError("数据提交失败!");
	                }  
	            },  
	            //提交失败的回调函数  
	            failure : function(form, action) {  
	                switch (action.failureType) {    
	                case Ext.form.Action.CLIENT_INVALID:    
	                    OSS.AlertError('错误提示', '表单数据非法请核实后重新输入！');    
	                    break;    
	                case Ext.form.Action.CONNECT_FAILURE:    
	                    OSS.AlertError('错误提示', '网络连接异常！');    
	                    break;    
	                case Ext.form.Action.SERVER_INVALID:    
	                   OSS.AlertError('错误提示', "您的输入用户信息有误，请核实后重新输入！");    
	                   simple.form.reset();      
	                }  
	            } 
    		});
    	}
	},
    onButtonCancel32Click: function(rowmodel, record, index, eOpts) {
		window.parent.editWinClose();
    },
	// 设置清除，保存
	onButtonOk32Click: function(button, e, eOpts) {
		var formpPanel = Ext.getCmp("qc_sz");
    	var params=formpPanel.getForm().getValues();
    	//alert(formpPanel.getForm().getValues().rg);
    	
		if (formpPanel.form.isValid()) {  
    		formpPanel.form.submit({
			    waitMsg : '正在提交数据,请稍后...', 
			    waitTitle: '系统提示',
			    submitEmptyText: false,
	            url : '/OSS/admin/log/log_clearLogZD',  
	            method : 'post',  
	            params : params, 
	            //提交成功的回调函数  
	            success : function(form, action) {  
	                if (action.result.msg == 'OK') {  
	                	OSS.AlertInfo("数据提交成功!");
	                }else if(action.result.msg == 'ERROR') {  
	                	OSS.AlertError("数据提交失败!");
	                }
	            },  
	            //提交失败的回调函数  
	            failure : function(form, action) {  
	                switch (action.failureType) {    
	                case Ext.form.Action.CLIENT_INVALID:    
	                    OSS.AlertError('错误提示', '表单数据非法请核实后重新输入！');    
	                    break;    
	                case Ext.form.Action.CONNECT_FAILURE:    
	                    OSS.AlertError('错误提示', '网络连接异常！');    
	                    break;    
	                case Ext.form.Action.SERVER_INVALID:    
	                   OSS.AlertError('错误提示', "您的输入用户信息有误，请核实后重新输入！");    
	                   simple.form.reset();      
	                }  
	            } 
    		});
    	}
	}
});

var GetKetValueStore = function(url) {
	var store = new Ext.data.JsonStore({
				root : 'users',
				autoLoad : true,
				totalProperty : 'totalCount',
				idProperty : 'id',
				remoteSort : false,
				fields : [{
							name : 'id',
							type : 'string'
						}, {
							name : 'name',
							type : 'string'
						}],
				proxy : new Ext.data.HttpProxy({
							url : url,
							reader : {
								type : 'json',
								root : 'users'
							}
						})
			});
	return store;
};

var InitLogManageClear = function() {

	Ext.tip.QuickTipManager.init();

	new OSS.view.InitLogManageClear();
};