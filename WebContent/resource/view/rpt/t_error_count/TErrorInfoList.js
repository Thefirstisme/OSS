Ext.define('OSS.view.TErrInfo', {
	extend : 'Ext.window.Window',
	height : 430,
	width : 800,
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
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
				id : 'GridPanelMainError',
				store : storeMainError,
				columnLines : false,
				columns : [{
							xtype : 'rownumberer',
							width : 50,
							sortable : false,
							resizable : true
						}, {
							xtype : 'gridcolumn',
							text : '报表名称',
							width : 300,
							dataIndex : 'tableName'
						}, {
							xtype : 'gridcolumn',
							text : '账号',
							width : 150,
							dataIndex : 'acctId'
						}, {
							xtype : 'gridcolumn',
							text : '报送日期',
							width : 100,
							dataIndex : 'declareDt',
							renderer :  function(declareDt){
								//return '<a href='+rec.data.tableName+'.jsp?txtDeclareDt="'+rec.data.declareDt+'" >'+table.substring(10,35)+'</a>';
								return declareDt.substring(0,10);
						    }
						}, {
							xtype : 'gridcolumn',
							text : '错误信息',
							width : 300,
							dataIndex : 'errInfo'
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							id : 'PagingToolbarMainError',
							dock : 'bottom',
							width : 150,
							pageSize : 20,
							store : storeMainError,
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
										xtype : 'hiddenfield',
										id : 'hidErrorTableName'
									}, {
										xtype : 'hiddenfield',
										id : 'hidErrorDeclareDt'
									},
							         {
										xtype : 'tbfill'
									}, {
										xtype : 'hiddenfield',
										id : 'hidMainId',
										name : 'hidMainId',
										value : '0'
									}]
						}]
			}],
			listeners : {
				show : {
					fn : me.onWindowShow,
					scope : me
				},
				hide : {
					fn : me.onWindowHide,
					scope : me
				}
			}
		});

		me.callParent(arguments);
	},
	onCmbPageSizeMainSelect : function(combo, records, eOpts) {
		var pSize = parseInt(records[0].data.id);
		Ext.getCmp('PagingToolbarMainError').pageSize = pSize;
		storeMainError.pageSize = pSize;
		refreshGriPanelError();
	},
	
	// 根据条件进行查询
	queryByCondition : function(item, e, eOpts) {
		refreshGriPanelError();
	},
	onShowOneDayClick : function(button, e, eOpts) {
		OSS.setExtValue('txtDeclareDt', ServerDate);
		refreshGriPanelError();
	},
	onShowAllClick : function(item, e, eOpts) {
		OSS.setExtValue('txtDeclareDt', '');
		refreshGriPanelError();
	},
	onWindowShow : function(component, eOpts) {
		initWin = this;
		setTimeout(function() {storeMainError.load();}, 100);
	},
	onWindowHide : function(component, eOpts) {
		
	}

});
var refreshGriPanelError = function() {
	storeMainError.removeAll();
	storeMainError.currentPage = 1;
	storeMainError.load();
	Ext.getCmp('GridPanelMainError').doComponentLayout();
	Ext.getCmp('GridPanelMainError').invalidateScroller();
};
var storeMainError = Ext.create('Ext.data.JsonStore', {
			autoLoad : false,
			pageSize : 50,
			idProperty : 'id',
			remoteSort : true,
			fields : [{
						name : 'tableName',
						type : 'string'
					}, {
						name : 'acctId',
						type : 'string'
					}, {
						name : 'declareDt',
						type : 'string'
					}, {
						name : 'errInfo',
						type : 'string'
					}],
			proxy : new Ext.data.HttpProxy({
						url : OSS.getAppName
								+ '/rpt/rptTErrorCountAction_toErrInfoList',
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
storeMainError.on('beforeload', function(store, options) {
			var new_params = {
					tableName : OSS.getExtValue('hidErrorTableName'),
					declareDt : OSS.getExtValue('hidErrorDeclareDt')
			};
			//alter("11");
			Ext.apply(store.proxy.extraParams, new_params);
		});



