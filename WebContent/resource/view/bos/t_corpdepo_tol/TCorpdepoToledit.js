Ext.define('OSS.view.RowDataEdit', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 480,
	width : 400,
	iconCls : 'icon-tabedit',
	title : '单位存款-汇总维护',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
					items : [{
								xtype : 'form',
								title : '',
								region : 'center',
								id : 'editForm',
								bodyPadding : 10,
								border : false,
								autoScroll : true,
								bodyStyle : 'background-color: #DFE8F6;',
								fieldDefaults : 'labelWidth: 100',
								items : [{
											xtype : 'textfield',
											id : 'acctId',
											name : 'acctId',
											width : 360,
											maxLength : 35,
											fieldLabel : '账号',
											blankText : '您未输入账号',
											emptyText : '请输入账号',
											allowBlank : false,
											//disabled : true,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'datefield',
											id : 'declareDt',
											name : 'declareDt',
											width : 360,
											fieldLabel : '申报日期',
											blankText : '您未输入申报日期',
											emptyText : '请输入申报日期',
											allowBlank : false,
											editable : false,
											//disabled : true,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'combobox',
											id : 'fixDepoInd',
											name : 'fixDepoInd',
											width : 360,
											fieldLabel : '定期标志',
											blankText : '您未输入定期标志',
											emptyText : '请输入定期标志',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeFixDepoInd,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'custNm',
											name : 'custNm',
											width : 360,
											maxLength : 64,
											fieldLabel : '户名',
											blankText : '您未输入户名',
											emptyText : '请输入户名',
											allowBlank : false
										},  {
											xtype : 'combobox',
											anchor : '100%',
											id : 'categ',
											name : 'categ',
											width : 360,
											fieldLabel : '类别',
											blankText : '您未输入类别',
											emptyText : '请输入类别',
											selectOnFocus : true,
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeCateg,

											confirmTo : 'custNm',
											vtype : 'custCateg',
											vtypeText : '户名、帐号不符合标准',

											valueField : 'id'
										},{
											xtype : 'textfield',
											id : 'subaccountno',
											name : 'subaccountno',
											width : 360,
											maxLength : 20,
											fieldLabel : '子帐号/序号',
											blankText : '您未输入子帐号/序号',
											emptyText : '请输入子帐号/序号',
											value : '1',
											allowBlank : false,
											disable : true
										}, {
											xtype : 'textfield',
											id : 'depoRate',
											name : 'depoRate',
											width : 360,
											fieldLabel : '存款利率',
											blankText : '您未输入存款利率',
											emptyText : '请输入存款利率',
											allowBlank : false,
											maxLength : 10,
											decimalPrecision : 6,
											value : '0',
											hideTrigger : true,
											// regex :
											// /^([+-]?[0-9])+(\.[0-9]{1,6})?$/,
											regex : /^[+-]?\d{1,2}(?:\.\d{1,6})?$/,
											regexText : '只能输入数字,且最大值为99.999999'
										}, {
											xtype : 'combobox',
											id : 'custType',
											name : 'custType',
											width : 360,
											fieldLabel : '客户类型',
											blankText : '您未输入客户类型',
											emptyText : '请输入客户类型',
											allowBlank : false,
											selectOnFocus : true,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											displayField : 'name',
											store : storeCustType,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'balanceCd',
											name : 'balanceCd',
											width : 360,
											maxLength : 11,
											fieldLabel : '资产负债指标代码',
											blankText : '您未输入资产负债指标代码',
											emptyText : '请输入资产负债指标代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9\/]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'combobox',
											id : 'idenType',
											name : 'idenType',
											width : 360,
											fieldLabel : '证件类型',
											blankText : '您未输入证件类型',
											emptyText : '请输入证件类型',
											allowBlank : false,
											selectOnFocus : true,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',

											confirmTo : 'custType',
											vtype : 'custIdenType',
											vtypeText : '证件类型与客户类型不符',
											store : storeIdenType,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'idenNo',
											name : 'idenNo',
											width : 360,
											maxLength : 20,
											fieldLabel : '证件号码',
											blankText : '您未输入证件号码',
											emptyText : '请输入证件号码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9\-]+$/,
											regexText : '只能输入数字、字母和“-”'
										}, {
											xtype : 'combobox',
											id : 'currencyCd',
											name : 'currencyCd',
											width : 360,
											fieldLabel : '货币代码',
											blankText : '您未输入货币代码',
											emptyText : '请输入货币代码',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeCurrencyCd,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'dayBalFill',
											name : 'dayBalFill',
											width : 360,
											fieldLabel : '日终余额',
											blankText : '您未输入日终余额',
											emptyText : '请输入日终余额',
											allowBlank : false,
											maxLength : 25,
											decimalPrecision : 2,
											value : '0',
											hideTrigger : true,
											regex : /^[+-]?\d{1,22}(?:\.\d{1,2})?$/,
											regexText : '只能输入数字,且整数位最大22位,小数位2位'
										}, {
											xtype : 'hiddenfield',
											id : 'tolRecord',
											name : 'tolRecord',
											value : '0'
										}, {
											xtype : 'textfield',
											id : 'openOrgId',
											name : 'openOrgId',
											width : 360,
											maxLength : 12,
											fieldLabel : '开户机构代码',
											blankText : '您未输入开户机构代码',
											emptyText : '请输入开户机构代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'hiddenfield',
											anchor : '100%',
											id : 'txtEditType',
											name : 'txtEditType',
											value : 'add'
										}, {
											xtype : 'hiddenfield',
											anchor : '100%',
											id : 'id',
											name : 'id',
											value : '0'
										}, {
											xtype : 'hiddenfield',
											anchor : '100%',
											id : 'hidDataEdit',
											name : 'hidDataEdit'
										}]
							}],
					dockedItems : {
						xtype : 'toolbar',
						dock : 'bottom',
						items : [{
									xtype : 'button',
									id : 'ButtonLoad32',
									iconCls : 'icon-arrowrefreshsmall',
									text : '重置',
									listeners : {
										click : {
											fn : me.onButtonLoadClick,
											scope : me
										}
									}
								}, {
									xtype : 'tbfill'
								}, {
									xtype : 'button',
									id : 'ButtonOk32',
									iconCls : 'icon-databasesave',
									text : '提交',
									listeners : {
										click : {
											fn : me.onButtonOkClick,
											scope : me
										}
									}
								}, {
									xtype : 'button',
									id : 'ButtonCancel32',
									iconCls : 'icon-doorout',
									text : '关闭', 
									listeners : {
										click : {
											fn : me.onButtonCancelClick,
											scope : me
										}
									}
								}]
					},
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
	onWindowShow : function(component, eOpts) {
		initWin = this;
		setTimeout(function() {
					getTCorpdepoTolInfo();
				}, 100);
	},

	onWindowHide : function(component, eOpts) {
		var dataEdit = OSS.getExtValue("hidDataEdit");
		if (dataEdit == '1') {
			refreshGriPanel();
		}
	},
	onButtonCancelClick : function(component, eOpts) {
		this.destroy();
	},
	onButtonOkClick : function(component, eOpts) {
		toUpdate();
	},
	onButtonLoadClick : function(component, eOpts) {
		getTCorpdepoTolInfo();
	}

});
var initWin;
function getTCorpdepoTolInfo() {
	var keyid = OSS.getExtValue('id');
	OSS.setExtValue('txtEditType', 'add');
	OSS.setExtValue('hidDataEdit', '0');

	if (keyid != "0") {
		OSS.setExtValue('txtEditType', 'edit');
		var myMask = new Ext.LoadMask(initWin.id, {
					msg : '正在加载数据,请稍等...'
				});
		myMask.show();
		Ext.Ajax.request({
					url : OSS.getAppName + '/rpt/rptTCorpdepoTol_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('acctId', d.acctId);
						OSS.setExtValue('fixDepoInd', d.fixDepoInd);
						OSS.setExtValue('custNm', d.custNm);
						OSS.setExtValue('categ', d.categ);
						OSS.setExtValue('subaccountno', d.subaccountno);
						OSS.setExtValue('depoRate', d.depoRate);
						OSS.setExtValue('custType', d.custType);
						OSS.setExtValue('balanceCd', d.balanceCd);
						OSS.setExtValue('idenType', d.idenType);
						OSS.setExtValue('idenNo', d.idenNo);
						OSS.setExtValue('currencyCd', d.currencyCd);
						OSS.setExtValue('dayBalFill', d.dayBalFill);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('tolRecord', d.tolRecord);
						OSS.setExtValue('openOrgId', d.openOrgId);
						OSS.getExtControl('ButtonOk32').setDisabled(false);
					},
					failure : function(response) {
						OSS.AlertWarning("数据加载失败");
					},
					callback : function(o, r, n) {
						myMask.hide();
					}
				});
	} else {
		Ext.getCmp("editForm").getForm().reset();
	}
}
var toUpdate = function() {
	var editType = OSS.getExtValue('txtEditType');
	var actionId = 'toAdd';
	if (editType == 'edit') {
		actionId = 'toEdit';
	}
	var formpPanel1 = Ext.getCmp("editForm");
	if (formpPanel1.form.isValid()) {
		var myMask = new Ext.LoadMask(initWin.id, {
					msg : '正在提交数据,请稍等...'
				});
		myMask.show();
		OSS.setExtValue('hidDataEdit', '1');
		var params = formpPanel1.getForm().getValues();
		Ext.Ajax.request({
					url : OSS.getAppName + "/rpt/rptTCorpdepoTol_" + actionId,
					method : 'post',
					params : params,
					success : function(response, options) {
						var data = Ext.JSON.decode(response.responseText);
						if (data) {
							if (data.success) {
								OSS.AlertInfo("数据提交成功!");
							} else {
								OSS.AlertError(data.msg);
							}
						}
					},
					failure : function(response) {
					},
					callback : function(o, r, n) {
						myMask.hide();
					}
				});
	}
};
