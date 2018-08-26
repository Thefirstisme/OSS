Ext.define('OSS.view.InitTbDatainterface_toEdit', {
			extend : 'Ext.container.Viewport',

			initComponent : function() {
				var me = this;

				Ext.applyIf(me, {
							items : [{
										xtype : 'textfield',
										id : 'interfacename',
										name : 'interfacename',
										fieldLabel : '接口名称'
									}, {
										xtype : 'textfield',
										id : 'temporarytable',
										name : 'temporarytable',
										fieldLabel : '临时表名'
									}, {
										xtype : 'textfield',
										id : 'interfacecode',
										name : 'interfacecode',
										fieldLabel : '接口代码'
									}, {
										xtype : 'textfield',
										id : 'procedurename',
										name : 'procedurename',
										fieldLabel : '逻辑过程'
									}, {
										xtype : 'textfield',
										id : '',
										name : '',
										fieldLabel : '导入行数'
									}, {}, {
										xtype : 'toolbar',
										items : [{
													xtype : 'button',
													text : '重置'
												}, {
													xtype : 'button',
													text : '提交'
												}, {
													xtype : 'button',
													text : '关闭'
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
			onViewportAfterRender : function(component, eOpts) {
				setTimeout(function() {PageUIDataInit();}, 500);
			}

		});

var PageUIDataInit = function() {
	var id = OSS.getUrlParam('id');
	Ext.Ajax.request({
				// url: "/OSS/admin/source/source_getSource",
				url : OSS.getAppName + '/tbdata_getInfo',
				method : 'post',
				params : {
					id : id
				},
				success : function(response, options) {
					var data = Ext.JSON.decode(response.responseText);
					alert(data);
					if (data) {
						Ext.getCmp("interfacename").setValue(data[0].interfacename);
						Ext.getCmp("temporarytable").setValue(data[0].temporarytable);
						Ext.getCmp("interfacecode").setValue(data[0].interfacecode);
						Ext.getCmp("procedurename").setValue(data[0].procedurename);
						// Ext.getCmp("cmbWindowAddNodeIcon").setValue(data[0].iconCss);
					}
				},
				failure : function(response) {

				}
			});
};

var InitTbDatainterface_toEdit = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitTbDatainterface_toEdit();
};