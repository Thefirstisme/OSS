Ext.define('OSS.view.InitTbDatainterface_toAdd', {
			extend : 'Ext.container.Viewport',

			initComponent : function() {
				var me = this;

				Ext.applyIf(me, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '接口名称'
									}, {
										xtype : 'textfield',
										fieldLabel : '临时表名'
									}, {
										xtype : 'textfield',
										fieldLabel : '接口代码'
									}, {
										xtype : 'textfield',
										fieldLabel : '逻辑过程'
									}, {
										xtype : 'textfield',
										fieldLabel : '导入行数'
									}, {
										xtype : 'gridpanel',
										title : '接口修改',
										columns : [{
													xtype : 'gridcolumn',
													dataIndex : 'string',
													text : 'String'
												}, {
													xtype : 'numbercolumn',
													dataIndex : 'number',
													text : 'Number'
												}, {
													xtype : 'datecolumn',
													dataIndex : 'date',
													text : 'Date'
												}, {
													xtype : 'booleancolumn',
													dataIndex : 'bool',
													text : 'Boolean'
												}],
										dockedItems : [{
													xtype : 'toolbar',
													dock : 'top',
													items : [{
																xtype : 'button',
																text : '添加'
															}, {
																xtype : 'button',
																text : '修改'
															}, {
																xtype : 'button',
																text : '删除'
															}, {
																xtype : 'button',
																text : '上移'
															}, {
																xtype : 'button',
																text : '下移'
															}]
												}]
									}, {
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
									}]
						});

				me.callParent(arguments);
			}

		});

var InitTbDatainterface_toAdd = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitTbDatainterface_toAdd();
};