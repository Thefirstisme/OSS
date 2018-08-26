Ext.define('OSS.view.TEquityotherinvestTolList', {
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
									var status = JudgeAuthority(grid.getStore().getAt(rowIndex).get("id"));
									if(status==OSS.MsgStatusSuccessful){
										OSS.AlertInfo("数据已上报，不可以删除"); 
									}else if(status==OSS.MsgStatusReporting){
										OSS.AlertInfo("数据上报中，不可以删除"); 
								    }else{
								    	delRowData(grid.getStore().getAt(rowIndex));
								    }
								},
								stopSelection : false
							}]
						}, {
							xtype : 'gridcolumn',
							text : '账号',
							dataIndex : 'acctId'
						}, {
							xtype : 'gridcolumn',
							text : '货币',
							 renderer: getCurrencyCdRender,
							dataIndex : 'currencyCd'
						}, {
							xtype : 'gridcolumn',
							text : '日终余额',
							dataIndex : 'dayBalFill',
							renderer : BalChange
						}, {
							xtype : 'gridcolumn',
							text : '资产负债指标代码',
							width:250,
							renderer : getBalanceCdRender,
							dataIndex : 'balanceCd'
						}, {
							xtype : 'gridcolumn',
							text : '申报日期',
							dataIndex : 'declareDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}, {
							xtype : 'gridcolumn',
							text : '总记录条数',
							dataIndex : 'tolRecord'
						}, {
							xtype : 'gridcolumn',
							text : '所属机构代码',
							dataIndex : 'belongOrgId'
						} , {
							xtype : 'gridcolumn',
							text : '创建人',
							dataIndex : 'createUser'
						}, {
							xtype : 'gridcolumn',
							text : '创建日期',
							dataIndex : 'createTime'
						}, {
							xtype : 'gridcolumn',
							text : '修改人',
							dataIndex : 'modifiedUser'
						}, {
							xtype : 'gridcolumn',
							text : '修改日期',
							dataIndex : 'modifiedTime'
						}, {
			           	    xtype : 'gridcolumn',
				            text : '状态',
				            dataIndex : 'status'
			            }

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
									}, 
									{
										xtype : 'button',
										iconCls : 'icon-arrowredo',
										id: 'btnReturn',
										text : '返回',
										listeners : {
											click : {
												fn : me.onReturnClick,
												scope : me
											}
										}
									},
									 {
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
										text : '添加股权及其他投资-汇总',
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
							title : '股权及其他投资-汇总明细',
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
										dataIndex : 'declareDt',
			                            format:'Y-m-d',
			                            renderer : stringToDate
									}, {
										xtype : 'gridcolumn',
										text : '明细序号',
										dataIndex : 'detailSeq'
									}, {
										xtype : 'gridcolumn',
										text : '出/入账标志',
										renderer: getOutInAcctIndRender,
										dataIndex : 'outInAcctInd'
									}, {
										xtype : 'gridcolumn',
										text : '记帐日期',
										dataIndex : 'acctingDt',
			                            format:'Y-m-d',
			                            renderer : stringToDate
									}, {
										xtype : 'gridcolumn',
										text : '原始交易日期',
										dataIndex : 'origTxnDt',
			                            format:'Y-m-d',
			                            renderer : stringToDate
									}, {
										xtype : 'gridcolumn',
										text : '交易性质',
									    renderer: getTxnAttriRender,
										dataIndex : 'txnAttri'
									}, {
										xtype : 'gridcolumn',
										text : '金额',
										dataIndex : 'bal',
										renderer : BalChange
									}, {
										xtype : 'gridcolumn',
										text: '国别代码',
										renderer: getCountryCdRender,
										dataIndex : 'countryCd'
									}, {
										xtype : 'gridcolumn',
										text: '国内地区码',
										renderer: getDomechargeAreaCdRender,
										dataIndex : 'domechargeAreaCd'
									}, {
										xtype : 'gridcolumn',
										text : '对方账号',
										dataIndex : 'oppositeAcctno'
									}, {
										xtype : 'gridcolumn',
										text : '对方户名',
										dataIndex : 'oppositeAcctName'
									} , {
										xtype : 'gridcolumn',
										text : '创建人',
										dataIndex : 'createUser'
									}, {
										xtype : 'gridcolumn',
										text : '创建日期',
										dataIndex : 'createTime'
									}, {
										xtype : 'gridcolumn',
										text : '修改人',
										dataIndex : 'modifiedUser'
									}, {
										xtype : 'gridcolumn',
										text : '修改日期',
										dataIndex : 'modifiedTime'
									}, {
						           	    xtype : 'gridcolumn',
							            text : '状态',
							            dataIndex : 'status'
						            }

]
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
			}],
			listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
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
		OSS.setExtValue('tableName', 'T_EquityOtherInvest_Tol');
		OSS.setExtValue('tPath', 'TEquityotherinvestTol');
	},
	onGridpanelSelect : function(rowmodel, record, index, eOpts) {
		OSS.setExtValue('hidMainId', record.data.id);
		OSS.getExtControl('btnInfoMore').setDisabled(false);
		refreshDetailData();
	},
//	infoListMore : function(item, e, eOpts) {
//		window.parent.ContentTablePanelSet('390a038c3e7b47958fb9a6a04e051a19',
//				'股权及其他投资-汇总明细', 'rpt/t_equityotherinvest_dtl.jsp?mainId='
//						+ OSS.getExtValue('hidMainId'));
//	}
	//修改内容 2014.03.09 HSL 
  	onReturnClick : function(item, e, eOpts) {
  		var dt=OSS.getUrlParam('txtDeclareDt');
  		if(dt!=undefined && dt.length>0){
  			location.href='t_error_count.jsp?declareDt='+dt;		
  		}
  	}, 
  	infoListMore : function(item, e, eOpts) {
//  		var fixDepoInd = Ext.getCmp('GridPanelMain').getSelectionModel()
//  				.getSelection();
  		//window.parent.ContentTablePanelSet('572e81ba481f4108bd5689cfda99a105','单位存款-汇总明细', 'rpt/t_corpdepo_dtl.jsp?mainId='+ OSS.getExtValue('hidMainId') + "&fixDepoInd="+ fixDepoInd[0].get("fixDepoInd"));
  		window.location.href='t_equityotherinvest_dtl.jsp?mainId='+OSS.getExtValue('hidMainId')+ '&'+OSS.paraName+'='+OSS.userId;
  	},   
  	onViewportAfterRender: function(component, eOpts) {
  		var dt=OSS.getUrlParam('txtDeclareDt');
  		if(dt!=undefined && dt.length>0){
  			OSS.getExtControl('txtDeclareDt').setDisabled(true);
  			OSS.setExtValue('txtDeclareDt',dt);
  		}else{
  			OSS.getExtControl('btnReturn').setVisible(false);
  		}
  		storeMain.load();
      } 
  	//修改结束 
  	
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
			autoLoad : false,
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
						name : 'currencyCd',
						type : 'string'
					}, {
						name : 'dayBalFill',
						type : 'string'
					}, {
						name : 'balanceCd',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'tolRecord',
						type : 'string'
					}, {
						name : 'belongOrgId',
						type : 'string'
					}, {
						name : 'ifNeedChange',
						type : 'string'
					}
, {
						name : 'createUser',
						type : 'string'
					}, {
						name : 'createTime',
						type : 'string'
					}, {
						name : 'modifiedUser',
						type : 'string'
					}, {
						name : 'modifiedTime',
						type : 'string'
					}, {
						name : 'status',
						type : 'string'
					}
],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName
								+ '/rpt/rptTEquityotherinvestTol_toList',
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
//storeMain.on('beforeload', function(store, options) {
//			var new_params = {
//				acctId : OSS.getExtValue('txtSearchAcctId'),
//				declareDt: OSS.getExtValue('txtDeclareDt')
//			};
//			Ext.apply(store.proxy.extraParams, new_params);
//		});
storeMain.on('beforeload', function(store, options) {
	var dt=OSS.getUrlParam('txtDeclareDt');
	var decDt=OSS.getExtValue('txtDeclareDt');
	if(dt!=undefined && dt.length>0){
		decDt=dt;
	}
			var new_params = {
				acctId : OSS.getExtValue('txtSearchAcctId'),
				declareDt: decDt
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
						name : 'txnAttri',
						type : 'string'
					}, {
						name : 'bal',
						type : 'string'
					}, {
						name : 'countryCd',
						type : 'string'
					}, {
						name : 'domechargeAreaCd',
						type : 'string'
					}, {
						name : 'oppositeAcctno',
						type : 'string'
					}, {
						name : 'oppositeAcctName',
						type : 'string'
					}, {
						name : 'ifNeedChange',
						type : 'string'
					}
, {
						name : 'createUser',
						type : 'string'
					}, {
						name : 'createTime',
						type : 'string'
					}, {
						name : 'modifiedUser',
						type : 'string'
					}, {
						name : 'modifiedTime',
						type : 'string'
					}, {
						name : 'status',
						type : 'string'
					}
],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName
								+ '/rpt/rptTEquityotherinvestDtl_toList',
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
				url : OSS.getAppName + "/rpt/rptTEquityotherinvestTol_toDel",
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
var InitTEquityotherinvestTolList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.TEquityotherinvestTolList();
};
