Ext.define('OSS.view.InitTbDatainterfaceList', {
	extend : 'Ext.container.Viewport',

	layout : {
		type : 'border'
	},

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'gridpanel',
				region : 'center',
				bodyBorder : false,
				title : '',
				id : 'tbDataId',
				store : tbDataStore,
				columnLines : false,
				columns : [{
							xtype : 'rownumberer',
							width : 40,
							sortable : false,
							resizable : true
						}, {
							xtype : 'actiontextcolumn',
							width : 50,
							items : [{
										iconCls : 'icon-tabedit',
										text : '删除',
										tooltip : '删除',
										handler : function(grid, rowIndex,
												colIndex) {
											editPLoan(grid.getStore()
													.getAt(rowIndex));
										},
										stopSelection : false
									}]
						}, {
							xtype : 'gridcolumn',
							text : '接口名称',
							dataIndex : 'interfacename'
						}, {
							xtype : 'gridcolumn',
							text : '接口代码',
							dataIndex : 'interfacecode'
						}, {
							xtype : 'gridcolumn',
							dataIndex : 'temporarytable',
							text : '临时表名称'
						}, {
							xtype : 'gridcolumn',
							text : '逻辑处理过程名',
							dataIndex : 'procedurename'
						}, {
							xtype : 'gridcolumn',
							text : '添加时间',
							dataIndex : 'addtime'
						}, {
							xtype : 'gridcolumn',
							text : '修改时间',
							dataIndex : 'modifytime'
						}],
				dockedItems : [
						// {
						// xtype: 'pagingtoolbar',
						// dock: 'bottom',
						// width: 150,
						// id:'pageStore',
						// store: tbDataStore,
						// displayInfo: true
						// },
						{
					xtype : 'pagingtoolbar',
					id : 'PagingToolbarMain',
					dock : 'bottom',
					width : 150,
					pageSize : 20,
					store : tbDataStore,
					displayInfo : true,
					displayMsg : '显示 {0} - {1}条, 共 {2}条',
					emptyMsg : "没有可显示的记录",
					items : [{
								xtype : 'combobox',
								id : 'cmbPageSizeMain',
								width : 120,
								fieldLabel : '每页显示',
								labelWidth : 60,
								value : '20',
								editable : false,
								store : storePageSize,
								displayField : 'name',
								valueField : 'id',
								typeAhead : true,
								triggerAction : 'all',
								queryMode : 'local',
								listeners : {
									select : {
										fn : me.onCmbPageSizeMainSelect,
										scope : me
									}
								}
							}],
					plugins : Ext.create('Ext.ux.ProgressBarPager', {})
				}, {
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								xtype : 'button',
								id : 'ButtonRoleSet',
								iconCls : 'icon-cog',
								text : '导入接口维护',
								tooltip : '导入接口维护',
								menu : {
									xtype : 'menu',
									width : 120,
									items : [{
												xtype : 'menuitem',
												id : 'ButtonGroupPermit',
												iconCls : 'icon-cogadd',
												text : '添加导入接口',
												listeners : {
													click : {
														fn : me.onButtonToAdd,
														scope : me
													}
												}
											}, {
												xtype : 'menuitem',
												id : 'ButtonGroupPermits',
												iconCls : 'icon-cogedit',
												text : '修改导入接口',
												listeners : {
													click : {
														fn : me.onButtonToEdit,
														scope : me
													}
												}
											}]
								}
							}, {
								xtype : 'button',
								id : 'BtnSetRoleGroup',
								iconCls : 'icon-coggo',
								text : '导入接口归属',
								listeners : {
									click : {
										fn : me.onBtnSetRoleGroupClick,
										scope : me
									}
								}
							}, {
								xtype : 'tbfill'
							}, {
								xtype : 'button',
								iconCls : 'icon-pageexcel',
								text : '导出EXCEL',
								menu : {
									xtype : 'menu',
									width : 120,
									items : [{
												xtype : 'menuitem',
												icon : '',
												iconCls : 'icon-pageexcel',
												text : '导出当前页',
												listeners : {
													click : {
														fn : me.onExportCurrPageClick,
														scope : me
													}
												}
											}, {
												xtype : 'menuitem',
												icon : '',
												iconCls : 'icon-pageexcel',
												text : '导出五级',
												listeners : {
													click : {
														fn : me.onExportFiveAllClick,
														scope : me
													}
												}
											}, {
												xtype : 'menuitem',
												icon : '',
												iconCls : 'icon-pageexcel',
												text : '导出所有',
												listeners : {
													click : {
														fn : me.onExportAllClick,
														scope : me
													}
												}
											}]
								}
							}, {
								// xtype : 'hiddenfield',
								xtype : 'textfield',
								anchor : '100%',
								id : 'hidCurrentId',
								fieldLabel : 'Label'
							}]
				}],
				listeners : {
					itemclick : {
						fn : me.onDataSelectionChange,
						scope : me
					}
				}
			}]
		});

		me.callParent(arguments);
	},
	onCmbPageSizeMainSelect : function(combo, records, eOpts) {
		var pSize = parseInt(records[0].data.id);
		tbDataStore.removeAll();
		tbDataStore.currentPage = 1;
		Ext.getCmp('PagingToolbarMain').pageSize = pSize;
		tbDataStore.pageSize = pSize;
		tbDataStore.load();
	},
	queryByCondition : function(item, e, eOpts) {
		dataRefresh();
	},
	onExportCurrPageClick : function(button, e, eOpts) {
		if (tbDataStore.getTotalCount() > 0) {
			setDownCurrPageFileReq(this.down('gridpanel'));
		} else {
			OSS.AlertError('没有可下载数据，请更改查询或查询条件！');
		}
	},
	onExportFiveAllClick : function(button, e, eOpts) {
		if (tbDataStore.getTotalCount() > 0) {
			setDownAllFileReq(this.down('gridpanel'));
		} else {
			OSS.AlertError('没有可下载数据，请更改查询或查询条件！');
		}
	},
	onExportAllClick : function(button, e, eOpts) {
		if (tbDataStore.getTotalCount() > 0) {
			setDownFiveAllFileReq(this.down('gridpanel'));
		} else {
			OSS.AlertError('没有可下载数据，请更改查询或查询条件！');
		}
	},
	onButtonToAdd : function(button, e, eOpts) {
		toAdd();
	},
	onButtonToEdit : function(button, e, eOpts) {
		toEdit();
	},

	onDataSelectionChange : function(model, selected, eOpts) {
		var record = Ext.getCmp('tbDataId').getSelectionModel().getSelection();
		Ext.getCmp("hidCurrentId").setValue(record[0].get("interfaceid"));
	}
});

var tbDataStore = Ext.create('Ext.data.JsonStore', {
			autoLoad : false,
			pageSize : 20,
			idProperty : 'interfaceid',
			remoteSort : true,
			fields : [{
						name : 'interfaceid',
						type : 'string'
					}, {
						name : 'interfacename',
						type : 'string'
					}, {
						name : 'interfacecode',
						type : 'string'
					}, {
						name : 'temporarytable',
						type : 'string'
					}, {
						name : 'procedurename',
						type : 'string'
					}, {
						name : 'addtime',
						type : 'string'
					}, {
						name : 'modifytime',
						type : 'string'
					}],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName + '/tbdata_toList',
						// url:'/OSS/bir/tbdata/tbdata_toList',
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'total'
						},
						simpleSortMode : true
					}),
			sorters : [{
					// property : 'statisDt',
					// direction : 'DESC'
					}]
		});

var dataRefresh = function() {
	tbDataStore.removeAll();
	tbDataStore.currentPage = 1;
	tbDataStore.load();
};
function editPLoan(obj) {
	// winOpen('修改手工台账(对私)信息', 410, 500, 'icon-tabedit',
	// 'j03_p_loan_info_mng_toEdit.jsp?keyid=' + obj.get("keyid"), dataRefresh);
}

// 接口新增
function toAdd() {
	winOpen('接口新增', 700, 490, 'icon-tabedit', 'interface_toAdd.jsp?');
}

// 接口修改
function toEdit() {
	var id= Ext.getCmp("hidCurrentId").getValue();
	winOpen('接口修改', 700, 490, 'icon-tabedit', 'interface_toEdit.jsp?id='+id);
}
/**
 * 下载当前页请求
 * 
 * @returns
 */
var setDownCurrPageFileReq = function(grid) {
};
/**
 * 下载所有
 * 
 * @param grid
 * @returns
 */
var setDownAllFileReq = function(grid) {
};
/**
 * 下载所有五级
 * 
 * @param grid
 * @returns
 */
var setDownFiveAllFileReq = function(grid) {
};
var setDownFile = function(acionId, cols) {
};

var InitTbDatainterfaceList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.InitTbDatainterfaceList();
};
