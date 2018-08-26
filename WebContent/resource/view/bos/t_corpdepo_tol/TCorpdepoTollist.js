Ext.define('OSS.view.TCorpdepoTolList', {
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
						}, {
							xtype : 'gridcolumn',
							text : '是否需要修改',
							renderer : ifNeedChangeDic,
							dataIndex : 'ifNeedChange'
						}, {
							xtype : 'actiontextcolumn',
							width : 105,
							items : [{
								iconCls : 'icon-tabedit',
								text : '修改',
								tooltip : '修改',
								handler : function(grid, rowIndex, colIndex) {
									editRowData(grid.getStore().getAt(rowIndex)
													.get('id'), 'edit');
								},
								stopSelection : false
							}, {
								icon : '../resource/images/icons/icoSummary/tab_delete.png',
								text : '删除',
								tooltip : '删除',
								handler : function(grid, rowIndex, colIndex) {
									delRowData(grid.getStore().getAt(rowIndex));
								},
								stopSelection : false
							}]
						}, {
							xtype : 'gridcolumn',
							text : '账号',
							dataIndex : 'acctId'
						}, {
							xtype : 'gridcolumn',
							text : '定期标志',
							renderer : getFixDepoIndRender,
							dataIndex : 'fixDepoInd'
						}, {
							xtype : 'gridcolumn',
							text : '户名',
							dataIndex : 'custNm'
						}, {
							xtype : 'gridcolumn',
							text : '类别',
							renderer : getCategRender,
							dataIndex : 'categ'
						}, {
							xtype : 'gridcolumn',
							text : '子帐号/序号',
							dataIndex : 'subaccountno'
						}, {
							xtype : 'gridcolumn',
							text : '存款利率',
							dataIndex : 'depoRate'
						}, {
							xtype : 'gridcolumn',
							text : '客户类型',
							renderer : getCustTypeRender,
							dataIndex : 'custType'
						}, {
							xtype : 'gridcolumn',
							text : '资产负债指标代码',
							dataIndex : 'balanceCd'
						}, {
							xtype : 'gridcolumn',
							text : '证件类型',
							renderer : getIdenTypeRender,
							dataIndex : 'idenType'
						}, {
							xtype : 'gridcolumn',
							text : '证件号码',
							dataIndex : 'idenNo'
						}, {
							xtype : 'gridcolumn',
							text : '货币代码',
							renderer : getCurrencyCdRender,
							dataIndex : 'currencyCd'
						}, {
							xtype : 'gridcolumn',
							text : '日终余额',
							dataIndex : 'dayBalFill'
						}, {
							xtype : 'gridcolumn',
							text : '申报日期',
							dataIndex : 'declareDt'
						}, {
							xtype : 'gridcolumn',
							text : '总记录条数',
							dataIndex : 'tolRecord'
						}, {
							xtype : 'gridcolumn',
							text : '开户机构代码',
							dataIndex : 'openOrgId'
						}],
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
										id : 'txtSearchAcctId',
										fieldLabel : '账号',
										emptyText : '请输入查询账号',
										maxLength : 30,
										labelWidth : 40
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
									}, {
										xtype : 'hiddenfield',
										id : 'hidMainId',
										name : 'hidMainId',
										value : '0'
									}, {
										xtype : 'button',
										iconCls : 'icon-databaserefresh',
										text : '上报确认',
										listeners : {
											click : {
												fn : me.onShbRHClick,
												scope : me
											}
										}
									}, {
										xtype : 'button',
										iconCls : 'icon-cogadd',
										text : '添加单位存款-汇总',
										listeners : {
											click : {
												fn : me.onAddParaClick,
												scope : me
											}
										}
									}]
						}],
				listeners : {
					itemdblclick : {
						fn : me.onGridPanelItemDblClick,
						scope : me
					},
					select : {
						fn : me.onGridpanelSelect,
						scope : me
					}
				}
			}, {
				xtype : 'tabpanel',
				region : 'south',
				resizable : true,
				height : 200,
				layout : {
					type : 'border'
				},
				activeTab : 0,
				items : [{
							xtype : 'gridpanel',
							title : '单位存款-汇总明细',
							id : 'logInfoList',
							store : logInfoListStore,
							columns : [{
										xtype : 'rownumberer',
										width : 40,
										sortable : false,
										resizable : true
									}, {
										xtype : 'gridcolumn',
										text : '是否需要修改',
										renderer : ifNeedChangeDic,
										dataIndex : 'ifNeedChange'
									}, {
										xtype : 'gridcolumn',
										text : '账号',
										dataIndex : 'acctId'
									}, {
										xtype : 'gridcolumn',
										text : '申报日期',
										dataIndex : 'declareDt'
									}, {
										xtype : 'gridcolumn',
										text : '明细序号',
										dataIndex : 'detailSeq'
									}, {
										xtype : 'gridcolumn',
										text : '出/入账标志',
										renderer : getOutInAcctIndRender,
										dataIndex : 'outInAcctInd'
									}, {
										xtype : 'gridcolumn',
										text : '记帐日期',
										dataIndex : 'acctingDt'
									}, {
										xtype : 'gridcolumn',
										text : '原始交易日期',
										dataIndex : 'origTxnDt'
									}, {
										xtype : 'gridcolumn',
										text : '金额',
										dataIndex : 'bal'
									}, {
										xtype : 'gridcolumn',
										text : '对方账号',
										dataIndex : 'oppositeAcctno'
									}, {
										xtype : 'gridcolumn',
										text : '对方户名',
										dataIndex : 'oppositeAcctName'
									}, {
										xtype : 'gridcolumn',
										text : '对方银行代码',
										dataIndex : 'oppositeBankCd'
									}, {
										xtype : 'gridcolumn',
										text : '国别代码',
										renderer : getCountryCdRender,
										dataIndex : 'countryCd'
									}, {
										xtype : 'gridcolumn',
										text : '国内地区码',
										renderer : getDomechargeAreaCdRender,
										dataIndex : 'domechargeAreaCd'
									}, {
										xtype : 'gridcolumn',
										text : '交易性质',
										renderer : getTxnAttriRender,
										dataIndex : 'txnAttri'
									}, {
										xtype : 'gridcolumn',
										text : '期限长度',
										dataIndex : 'periodLen'
									}, {
										xtype : 'gridcolumn',
										text : '期限单位',
										renderer : getPeriodUnitRender,
										dataIndex : 'periodUnit'
									}, {
										xtype : 'gridcolumn',
										text : '到期日',
										dataIndex : 'matureDt'
									}]
						}],
				dockedItems : [{
							xtype : 'toolbar',
							dock : 'bottom',
							layout : {
								align : 'stretchmax',
								type : 'hbox'
							},
							items : [{
										xtype : 'tbfill'
									}, {
										xtype : 'button',
										id : 'btnInfoMore',
										disabled : true,
										iconCls : 'icon-groupadd',
										text : '明细处理',
										listeners : {
											click : {
												fn : me.infoListMore,
												scope : me
											}
										}
									}]
						}]
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
		new OSS.view.ShangBaoView().show();
		OSS.setExtValue('tableName', 'T_CorpDepo_Tol');
		OSS.setExtValue('tPath', 'TCorpdepoTol');
	},
	onGridpanelSelect : function(rowmodel, record, index, eOpts) {
		OSS.setExtValue('hidMainId', record.data.id);
		OSS.getExtControl('btnInfoMore').setDisabled(false);
		refreshDetailData();
	},
	infoListMore : function(item, e, eOpts) {
		var fixDepoInd = Ext.getCmp('GridPanelMain').getSelectionModel()
				.getSelection();
		window.parent.ContentTablePanelSet('572e81ba481f4108bd5689cfda99a105',
				'单位存款-汇总明细', 'bos/t_corpdepo_dtl.jsp?mainId='
						+ OSS.getExtValue('hidMainId') + "&fixDepoInd="
						+ fixDepoInd[0].get("fixDepoInd"));
	}
});
var refreshGriPanel = function() {
	storeMain.removeAll();
	storeMain.currentPage = 1;
	storeMain.load();
	Ext.getCmp('GridPanelMain').doComponentLayout();
	Ext.getCmp('GridPanelMain').invalidateScroller();
	OSS.setExtValue('hidMainId', '0');
	OSS.getExtControl('btnInfoMore').setDisabled(true);
	refreshDetailData();
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
						name : 'acctId',
						type : 'string'
					}, {
						name : 'fixDepoInd',
						type : 'string'
					}, {
						name : 'custNm',
						type : 'string'
					}, {
						name : 'categ',
						type : 'string'
					}, {
						name : 'subaccountno',
						type : 'string'
					}, {
						name : 'depoRate',
						type : 'string'
					}, {
						name : 'custType',
						type : 'string'
					}, {
						name : 'balanceCd',
						type : 'string'
					}, {
						name : 'idenType',
						type : 'string'
					}, {
						name : 'idenNo',
						type : 'string'
					}, {
						name : 'currencyCd',
						type : 'string'
					}, {
						name : 'dayBalFill',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'tolRecord',
						type : 'string'
					}, {
						name : 'openOrgId',
						type : 'string'
					}, {
						name : 'ifNeedChange',
						type : 'string'
					}],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName + '/bos/bosTCorpdepoTol_toList',
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
				acctId : OSS.getExtValue('txtSearchAcctId'),
				declareDt: OSS.getExtValue('txtDeclareDt')
			};
			Ext.apply(store.proxy.extraParams, new_params);
		});
var refreshDetailData = function() {
	logInfoListStore.removeAll();
	logInfoListStore.load();
};
var logInfoListStore = Ext.create('Ext.data.JsonStore', {
			autoLoad : false,
			pageSize : 5,
			idProperty : 'id',
			remoteSort : false,
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'acctId',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'detailSeq',
						type : 'string'
					}, {
						name : 'outInAcctInd',
						type : 'string'
					}, {
						name : 'acctingDt',
						type : 'string'
					}, {
						name : 'origTxnDt',
						type : 'string'
					}, {
						name : 'bal',
						type : 'string'
					}, {
						name : 'oppositeAcctno',
						type : 'string'
					}, {
						name : 'oppositeAcctName',
						type : 'string'
					}, {
						name : 'oppositeBankCd',
						type : 'string'
					}, {
						name : 'countryCd',
						type : 'string'
					}, {
						name : 'domechargeAreaCd',
						type : 'string'
					}, {
						name : 'txnAttri',
						type : 'string'
					}, {
						name : 'periodLen',
						type : 'string'
					}, {
						name : 'periodUnit',
						type : 'string'
					}, {
						name : 'matureDt',
						type : 'string'
					}, {
						name : 'ifNeedChange',
						type : 'string'
					}],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName + '/rpt/rptTCorpdepoDtl_toList',
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
logInfoListStore.on('beforeload', function(store, options) {
			var new_params = {
				mainId : OSS.getExtValue('hidMainId')
			};
			Ext.apply(store.proxy.extraParams, new_params);
		});
function editRowData(id, editType) {
	new OSS.view.RowDataEdit().show();
	OSS.setExtValue('txtEditType', editType);
	OSS.setExtValue('id', id);
	OSS.getExtControl('acctId').setDisabled(false);
	OSS.getExtControl('declareDt').setDisabled(false);
	if (id != '0') {
		OSS.getExtControl('ButtonOk32').setDisabled(true);
		OSS.getExtControl('acctId').setDisabled(true);
		OSS.getExtControl('declareDt').setDisabled(true);
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
				url : OSS.getAppName + "/rpt/rptTCorpdepoTol_toDel",
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
var InitTCorpdepoTolList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.TCorpdepoTolList();
};
