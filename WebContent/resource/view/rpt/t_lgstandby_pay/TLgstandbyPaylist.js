Ext.define('OSS.view.TLgstandbyPayList', {
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
							text : '报表编码',
							dataIndex : 'reportId'
						}, {
							xtype : 'gridcolumn',
							text : '申报序号',
							dataIndex : 'declareSeq'
						}, {
							xtype : 'gridcolumn',
							text : '申报日期',
							dataIndex : 'declareDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}, {
							xtype : 'gridcolumn',
							text : '所属机构代码',
							dataIndex : 'belongOrgId'
						}, {
							xtype : 'gridcolumn',
							text : '货币',
							renderer : getCurrencyCdRender,
							dataIndex : 'currencyCd'
						}, {
							xtype : 'gridcolumn',
							text : '金额',
							dataIndex : 'bal',
							renderer : BalChange
						}, {
							xtype : 'gridcolumn',
							text : '境内外对手行代码',
							dataIndex : 'abroadOppBankId'
						}, {
							xtype : 'gridcolumn',
							text : '债务人名称',
							dataIndex : 'debtorNm'
						}, {
							xtype : 'gridcolumn',
							text : '债务人机构代码',
							dataIndex : 'debtorOrgId'
						}, {
							xtype : 'gridcolumn',
							text: '债务人国别代码',
							renderer: getCountryCdRender,
							dataIndex : 'debtorCountryCd'
						}, {
							xtype : 'gridcolumn',
							text : '债务人国内地区代码',
							renderer: getDomechargeAreaCdRender,
							dataIndex : 'debtorDomeAreaCd'
						}, {
							xtype : 'gridcolumn',
							text : '保函到期日',
							dataIndex : 'lgMatureDt',
                            format:'Y-m-d',
                            renderer : stringToDate
						}, {
							xtype : 'gridcolumn',
							text: '保函类型',
							renderer: getLgTypeRender,
							dataIndex : 'lgType'
						} 
						, {
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
							items : [
									{
										xtype : 'textfield',
										id : 'txtSearchDetailSeq',
										fieldLabel: '申报序号',
	                                    emptyText: '请输入查询申报序号',
										maxLength : 6,
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
									}, {
										xtype : 'hiddenfield',
										id : 'hidMainId',
										name : 'hidMainId',
										value : '0'
									},{
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
										text : '添加应付保函/备用证（保函/备用证开立）',
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
					}
				}
			}]
		,listeners: {
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
		OSS.setExtValue('tableName', 'T_LgStandBy_Pay');
		OSS.setExtValue('tPath', 'TLgstandbyPay');
	}
	 //修改内容 2014.03.09 HSL 
	,
	onReturnClick : function(item, e, eOpts) {
		var dt=OSS.getUrlParam('txtDeclareDt');
		if(dt!=undefined && dt.length>0){
			location.href='t_error_count.jsp?declareDt='+dt;		
		}
	}
	, 
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
						name : 'ifNeedChange',
						type : 'string'
					}, {
						name : 'reportId',
						type : 'string'
					}, {
						name : 'declareSeq',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'belongOrgId',
						type : 'string'
					}, {
						name : 'currencyCd',
						type : 'string'
					}, {
						name : 'bal',
						type : 'string'
					}, {
						name : 'abroadOppBankId',
						type : 'string'
					}, {
						name : 'debtorNm',
						type : 'string'
					}, {
						name : 'debtorOrgId',
						type : 'string'
					}, {
						name : 'debtorCountryCd',
						type : 'string'
					}, {
						name : 'debtorDomeAreaCd',
						type : 'string'
					}, {
						name : 'lgMatureDt',
						type : 'string'
					}, {
						name : 'lgType',
						type : 'string'
					}, {
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
						url : OSS.getAppName + '/rpt/rptTLgstandbyPay_toList',
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
//				//acctId : OSS.getExtValue('txtSearchAcctId'),
//				declareSeq : OSS.getExtValue('txtSearchDetailSeq'),
//				declareDt: OSS.getExtValue('txtDeclareDt'),
//				mainId : OSS.getUrlParam('mainId')
//			};
//			Ext.apply(store.proxy.extraParams, new_params);
//		});
storeMain.on('beforeload', function(store, options) {
	var dt = OSS.getUrlParam('txtDeclareDt');
	var decDt = OSS.getExtValue('txtDeclareDt');
	if (dt != undefined && dt.length > 0) {
		decDt = dt;
	}
	var new_params = {
		declareSeq : OSS.getExtValue('txtSearchDeclareSeq'),
		declareDt : decDt,
		mainId : OSS.getUrlParam('mainId')
	};
	Ext.apply(store.proxy.extraParams, new_params);
});
function editRowData(id, editType) {
	new OSS.view.RowDataEdit().show();
	OSS.setExtValue('txtEditType', editType);
	OSS.setExtValue('id', id);
	OSS.getExtControl('declareDt').setDisabled(false);
	if (id != '0') {
		OSS.getExtControl('ButtonOk32').setDisabled(true);
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
				url : OSS.getAppName + "/rpt/rptTLgstandbyPay_toDel",
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
var InitTLgstandbyPayList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.TLgstandbyPayList();
};
