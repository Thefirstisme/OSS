Ext.define('OSS.view.TErrorCount', {
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
							text : '报表名称',
							width : 300,
							dataIndex : 'tableName',
							//renderer :  function(table,meta,rec,rowIndex,coIndex,ds){
							renderer :  function(table,meta,rec,rowIndex,coIndex,ds){
								//return '<a href='+rec.data.tableName+'.jsp?txtDeclareDt="'+rec.data.declareDt+'" >'+table.substring(10,35)+'</a>';
								return '<a href='+rec.data.table.substring(4,rec.data.table.length)+'.jsp?txtDeclareDt='+rec.data.declareDt+' >'+rec.data.tableName+'</a>';
						    }

						}, {
							xtype : 'gridcolumn',
							text : '错误数量',
							width : 300,
							dataIndex : 'count',
							renderer :  function(value,meta,rec,rowIndex,coIndex,ds){
								return '<a href=\'#\' onclick=\'showErrWindows("'+rec.data.table+'","'+rec.data.declareDt+'")\' >'+value+'</a>';
						    }
						}, {
							xtype : 'gridcolumn',
							text : '申报日期',
							width : 300,
							dataIndex : 'declareDt',
							renderer :  function(value,meta,rec,rowIndex,coIndex,ds){
								return rec.data.declareDt.substring(0,10);
						    }
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
//										xtype : 'textfield',
//										id : 'tableName',
//										fieldLabel : '申报序号',
//										emptyText : '请输入查询申报序号',
//										maxLength : 6,
//										labelWidth : 60
//									}, {
										xtype : 'datefield',
										id : 'txtDeclareDt',
										format : 'Y-m-d',
										fieldLabel : '申报日期',
										emptyText : '请输入申报日期',
										value: ServerDate,
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
										text : '错误详细信息',
										listeners : {
											click : {
												fn : me.onShowErrInfoClick,
												//fn : me.queryByCondition,
												scope : me
											}
										}
//									}, {
//										xtype : 'button',
//										iconCls : 'icon-databaserefresh',
//										text : '显示所有',
//										listeners : {
//											click : {
//												fn : me.onShowAllClick,
//												//fn : me.queryByCondition,
//												scope : me
//											}
//										}
//									}, {
//										xtype : 'button',
//										iconCls : 'icon-cogadd',
//										text : '显示一天',
//										listeners : {
//											click : {
//												fn : me.onShowOneDayClick,
//												//fn : me.queryByCondition,
//												scope : me
//											} 
//										}
									}]
						}],
				listeners : {
					itemdblclick : {
						fn : me.onGridPanelItemDblClick,
						scope : me
					}
				}
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
	onShowOneDayClick : function(button, e, eOpts) {
		OSS.setExtValue('txtDeclareDt', ServerDate);
		refreshGriPanel();
	},
	onGridPanelItemDblClick : function(dataview, record, item, index, e, eOpts) {
		editRowData(record.data.id, 'edit');
	},
	onShowAllClick : function(item, e, eOpts) {
		OSS.setExtValue('txtDeclareDt', '');
		refreshGriPanel();
	},
//	onShowErrInfoClick : function(item, e, eOpts) {
//		//Ext.onReady(InitErrInfoList);
//		new OSS.view.TErrInfo().show();
//	},
	onViewportAfterRender: function(component, eOpts) {
		var dt=OSS.getUrlParam('declareDt');
		if(dt!=undefined && dt.length>0){
			OSS.setExtValue('txtDeclareDt', dt);
		}
//		storeMain.load();
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
						name : 'tableName',
						type : 'string'
					}, {
						name : 'count',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'table',
						type : 'string'
					}],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName
								+ '/rpt/rptTErrorCountAction_toList',
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
	var dt=OSS.getUrlParam('declareDt');
	var declareDt=OSS.getExtValue('txtDeclareDt');
	if(dt!=undefined && dt.length>0){
		declareDt=dt;
	}
			var new_params = {
				// acctId:OSS.getExtValue('txtSearchAcctId')
				//tableName : OSS.getExtValue('tableName'),
				mainId1 : OSS.getUrlParam('declareDt'),
				declareDt: declareDt
				
				//mainId : OSS.getUrlParam('mainId')
			};
			//alert(new_params.declareDt);
			//alert(new_params.mainId1);
//			if(new_params.mainId1  != null) {
//				new_params.declareDt = new_params.mainId1;
//				OSS.setExtValue('txtDeclareDt', new_params.mainId1);
//			}
			//alert('11');
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
				url : OSS.getAppName + "/rpt/rptTErrorCountAction_toDel",
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
var showErrWindows=function(tablename,declareDt){
	new OSS.view.TErrInfo().show();
	OSS.setExtValue('hidErrorTableName', tablename);
	OSS.setExtValue('hidErrorDeclareDt', declareDt);
};
var InitErrorCountList = function() {
	Ext.tip.QuickTipManager.init();
	new OSS.view.TErrorCount();
};
