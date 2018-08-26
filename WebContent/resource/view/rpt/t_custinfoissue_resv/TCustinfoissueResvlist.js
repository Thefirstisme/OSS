Ext.define('OSS.view.TCustinfoissueResvList', {
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
				id : 'GridPanelMain',
				store : storeMain,
				columnLines : false,
				columns : [{
							xtype : 'rownumberer',
							width : 40,
							sortable : false,
							resizable : true
						}, 
//						{
//							xtype : 'actiontextcolumn',
//							width : 105,
//							items : [
//							{
//								iconCls : 'icon-tabedit',
//								text : '修改',
//								tooltip : '修改',
//								handler : function(grid, rowIndex, colIndex) {
//									editRowData(grid.getStore().getAt(rowIndex)
//													.get('id'), 'edit');
//								},
//								stopSelection : false
//							}, {
//								icon : '../resource/images/icons/icoSummary/tab_delete.png',
//								text : '删除',
//								tooltip : '删除',
//								handler : function(grid, rowIndex, colIndex) {
//									delRowData(grid.getStore().getAt(rowIndex));
//								},
//								stopSelection : false
//							}
//							]
//						}, 
							{
							xtype : 'gridcolumn',
							text : '报表编码',
							dataIndex : 'reportId'
						}, {
							xtype : 'gridcolumn',
							text : '所属机构代码',
							dataIndex : 'accOrgCode'
						}, {
							xtype : 'gridcolumn',
							text : '帐号',
							dataIndex : 'custNo'
						}, {
							xtype : 'gridcolumn',
							text : '户名',
							dataIndex : 'custNm'
						}, 
//							{
//							xtype : 'gridcolumn',
//							text : '类别',
//							renderer : getCategRender,
//							dataIndex : 'categ'
//						}, 
						{
							xtype : 'gridcolumn',
							text : '操作类型',
							renderer : getOperTypeRender,
							dataIndex : 'operType'
						}, {
							xtype : 'gridcolumn',
							text : '申报日期',
							dataIndex : 'declareDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}, {
							xtype : 'gridcolumn',
							text : '开户日期',
							dataIndex : 'openDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}, {
							xtype : 'gridcolumn',
							text : '关户日期',
							dataIndex : 'closeDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}
//						, {
//							xtype : 'gridcolumn',
//							text : '下发日期',
//							dataIndex : 'lastUpdateTime'
//						}
],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							id : 'PagingToolbarMain',
							dock : 'bottom',
							width : 150,
							pageSize : 20,
							store : storeMain,
							displayInfo : true,
							displayMsg : '显示 {0} - {1}条, 共 {2}条',
							emptyMsg : "没有可显示的记录",
							items : [{
										xtype : 'combobox',
										id : 'cmbPageSizeMain',
										width : 120,
										fieldLabel : '每页显示',
										labelWidth : 60,
										value : '50',
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
										xtype : 'textfield',
										id : 'txtSearchReportId',
										fieldLabel : '报表编号',
										emptyText : '请输入查询报表编号',
										maxLength : 30,
										labelWidth : 60
									}, {
										xtype : 'datefield',
										id : 'txtDeclareDt',
										format : 'Y-m-d',
										fieldLabel : '申报日期',
										emptyText : '请输入申报日期',
										editable : true,
										maxLength : 10,
										labelWidth : 70
									}, {
										xtype : 'button',
										iconCls : 'icon-zoom',
										text : '查询',
										listeners : {
											click : {
												fn : me.queryByCondition,
												scope : me
											}
										}
									}, {
										xtype : 'tbfill'
									}
//									, {
//										xtype : 'button',
//										iconCls : 'icon-cogadd',
//										text : '添加',
//										listeners : {
//											click : {
//												fn : me.onAddParaClick,
//												scope : me
//											}
//										}
//									}
									]
						}],
				listeners : {
//					itemdblclick : {
//						fn : me.onGridPanelItemDblClick,
//						scope : me
//					}
				}
			}]
		});

		me.callParent(arguments);
	},
	onCmbPageSizeMainSelect : function(combo, records, eOpts) {
		var pSize = parseInt(records[0].data.id);
		Ext.getCmp('PagingToolbarMain').pageSize = pSize;
		storeMain.pageSize = pSize;
		refreshGriPanel();
	},

	// 根据条件进行查询
	queryByCondition : function(item, e, eOpts) {
		refreshGriPanel();
	},
	onAddParaClick : function(button, e, eOpts) {
		editRowData('0', 'add');
	},
	onGridPanelItemDblClick : function(dataview, record, item, index, e, eOpts) {
		editRowData(record.data.id, 'edit');
	},
	onShbRHClick : function(item, e, eOpts) {
		toSubmitTol();
	}
});
var refreshGriPanel = function() {
	storeMain.removeAll();
	storeMain.currentPage = 1;
	storeMain.load();
	Ext.getCmp('GridPanelMain').doComponentLayout();
	Ext.getCmp('GridPanelMain').invalidateScroller();
};
var storeMain = Ext.create('Ext.data.JsonStore', {
			autoLoad : true,
			pageSize : 50,
			idProperty : 'id',
			remoteSort : true,
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'reportId',
						type : 'string'
					}, {
						name : 'custNm',
						type : 'string'
					}, 
//						{
//						name : 'categ',
//						type : 'string'
//					}, 
						{
						name : 'operType',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'openDt',
						type : 'string'
					}, {
						name : 'closeDt',
						type : 'string'
					}, {
						name : 'accOrgCode',
						type : 'string'
					}, {
						name : 'custNo',
						type : 'string'
					}
//					, {
//						name : 'lastUpdateTime',
//						type : 'date'
//					}
					
],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName
								+ '/rpt/rptTCustinfoissueResv_toList',
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'total'
						},
						simpleSortMode : true
					}),
			sorters : [{
						property : 'declareDt',
						direction : 'DESC'
					}]
		});
storeMain.on('beforeload', function(store, options) {
			var new_params = {
				reportId : OSS.getExtValue('txtSearchReportId'),
				declareDt: OSS.getExtValue('txtDeclareDt'),
				declareSeq : OSS.getExtValue('txtSearchDeclareSeq')
			};
			Ext.apply(store.proxy.extraParams, new_params);
		});
function editRowData(id, editType) {
	new OSS.view.RowDataEdit().show();
	OSS.setExtValue('txtEditType', editType);
	OSS.setExtValue('id', id);
	OSS.getExtControl('idenType').setDisabled(false);
    OSS.getExtControl('idenNo').setDisabled(false);
	if (id != '0') {
		OSS.getExtControl('ButtonOk32').setDisabled(true);
		 OSS.getExtControl('idenType').setDisabled(true);
		 OSS.getExtControl('idenNo').setDisabled(true);
	}
}
function delRowData(obj) {
	Ext.MessageBox.show({
				title : '信息',
				msg : "您确定删除所选记录吗？",
				buttons : Ext.MessageBox.YESNO,
				fn : function(btn) {
					if (btn == 'yes') {
						delData(obj.get("id"));
					}
				},
				animEl : 'mb4',
				icon : Ext.MessageBox.QUESTION
			});
}
var delData = function(id) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在提交删除信息,请稍等...'
			});
	myMask.show();
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rptTCustinfoissueResv_toDel",
				method : 'post',
				params : {
					id : id
				},
				success : function(response, options) {
					var c1 = Ext.JSON.decode(response.responseText);
					if (c1.success) {
						OSS.AlertInfo(c1.msg, refreshGriPanel);
					} else {
						OSS.AlertInfo(c1.msg);
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
};
var InitTCustinfoissueResvList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.TCustinfoissueResvList();
};
