Ext.define('OSS.view.RowDataEdit', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 500,
	width : 420,
	iconCls : 'icon-tabedit',
	title : '代理发债维护',
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
											xtype : 'hiddenfield',
											id : 'ifchecked',
											name : 'ifchecked'
										}, {
											xtype : 'hiddenfield',
											id : 'reportId',
											name : 'reportId',
											value : '210301',
											width : 360,
											maxLength : 11,
											fieldLabel : '报表编码',
											blankText : '您未输入报表编码',
											emptyText : '请输入报表编码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'textfield',
											id : 'bondId',
											name : 'bondId',
											width : 360,
											maxLength : 20,
											fieldLabel : '债券代码',
											blankText : '您未输入债券代码',
											emptyText : '请输入债券代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'textfield',
											id : 'bondNm',
											name : 'bondNm',
											width : 360,
											maxLength : 64,
											fieldLabel : '债券名称',
											blankText : '您未输入债券名称',
											emptyText : '请输入债券名称',
											allowBlank : false
											// regex: /^[a-zA-Z0-9]+$/,
										// regexText: '只能输入字母和数字'
									}	, {
											xtype : 'textfield',
											id : 'issuCorpAcct',
											name : 'issuCorpAcct',
											width : 360,
											maxLength : 35,
											fieldLabel : '发债企业账号',
											blankText : '您未输入发债企业账号',
											emptyText : '请输入发债企业账号',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'combobox',
											id : 'currencyCd',
											name : 'currencyCd',
											width : 360,
											fieldLabel : '货币',
											blankText : '您未输入货币',
											emptyText : '请输入货币',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeCurrencyCd,
											valueField : 'id',
											
											//vtype : 'currencyCd',
											vtypeText : '日元不能输入小数'
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
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'txnOrgId',
											name : 'txnOrgId',
											width : 360,
											maxLength : 14,
											minLenght : 12,
											fieldLabel : '交易机构代码',
											blankText : '您未输入交易机构代码',
											emptyText : '请输入交易机构代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'datefield',
											id : 'sltDt',
											name : 'sltDt',
											width : 360,
											fieldLabel : '结算日期',
											blankText : '您未输入结算日期',
											emptyText : '请输入结算日期',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'periodLen',
											name : 'periodLen',
											width : 360,
											maxLength : 4,
											fieldLabel : '期限长度',
											blankText : '您未输入期限长度',
											emptyText : '请输入期限长度',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'combobox',
											id : 'periodUnit',
											name : 'periodUnit',
											width : 360,
											fieldLabel : '期限单位',
											blankText : '您未输入期限单位',
											emptyText : '请输入期限单位',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storePeriodUnit,
											valueField : 'id'
										}, {
											xtype : 'datefield',
											id : 'matureDt',
											name : 'matureDt',
											width : 360,
											fieldLabel : '到期日',
											blankText : '您未输入到期日',
											emptyText : '请输入到期日',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'nobondsissued',
											name : 'nobondsissued',
											width : 360,
											fieldLabel : '发行总量',
											blankText : '您未输入发行总量',
											emptyText : '请输入发行总量',
											allowBlank : false,
											maxLength : 10,
											value : '0',
											hideTrigger : true,
											regex : /^[+-]?[0-9]+(\.[0-9]{1,2})?$/,
											regexText : '只能输入数字,且至多保留两位小数'
										}, {
											xtype : 'combobox',
											id : 'countryCd',
											name : 'countryCd',
											width : 360,
											fieldLabel : '国别代码',
											blankText : '您未输入国别代码',
											emptyText : '请输入国别代码',
											allowBlank : false,
											editable : true,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeCountryCd,
											confirmTo : 'countryCd',
											vtype : 'custDomechargeAreaCd',
											vtypeText : '您未输入国内地区码',
											valueField : 'id'
										}, {
											xtype : 'combobox',
											id : 'domechargeAreaCd',
											name : 'domechargeAreaCd',
											width : 360,
											fieldLabel : '国内地区码',
											blankText : '您未输入国内地区码',
											emptyText : '请输入国内地区码',
											editable : true,
											queryMode : 'local',
											typeAhead : true,
											value : '310000',
											displayField : 'name',
											store : storeDomechargeAreaCd,
											valueField : 'id'
										}, {
											xtype : 'combobox',
											id : 'txnAttri',
											name : 'txnAttri',
											width : 360,
											fieldLabel : '交易性质',
											blankText : '您未输入交易性质',
											emptyText : '请输入交易性质',
											allowBlank : false,
											editable : true,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeTxnAttri,
											valueField : 'id'
										}, {
											xtype : 'combobox',
											id : 'rateType',
											name : 'rateType',
											width : 360,
											fieldLabel : '利率类型',
											blankText : '您未输入利率类型',
											emptyText : '请输入利率类型',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeRateType,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'fixRate',
											name : 'fixRate',
											width : 360, 
											fieldLabel : '固定利率',
											blankText : '您未输入固定利率',
											emptyText : '请输入固定利率',
											allowBlank : false,
											maxLength : 10,
											decimalPrecision : 6,
											value : '0',
											hideTrigger : true,
											//regex : /^[+-]?0|([0][.]\d{0,6}[1-9])$/,
											regex : /^(\-|\+)?\d{1,2}(?:\.\d{1,6})?$/,
											regexText : '最多只能输入6位小数，最大值为99.999999，最小值为-99.999999'
										}, {
											xtype : 'combobox',
											id : 'priceDatum',
											name : 'priceDatum',
											width : 360,
											fieldLabel : '定价基准',
											blankText : '您未输入定价基准',
											emptyText : '请输入定价基准',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storePriceDatum,
											valueField : 'id'
										}, {
											xtype : 'textfield',
											id : 'floatSpread',
											name : 'floatSpread',
											width : 360,
											maxLength : 13,
											fieldLabel : '浮动点差',
											blankText : '您未输入浮动点差',
											emptyText : '请输入浮动点差',
											allowBlank : false,
											// regex:
											// /^([+-]?[0-9]{1,4})+(\.[0-9]{1,6})?$/,
											regex : /^(\-|\+)?\d{1,5}(?:\.\d{1,6})?$/,
											regexText : '只能输入字母和数字，最大值为99999.999999'
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
					getTAgencybondsInfo();
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
		getTAgencybondsInfo();
	}

});
var initWin;
function getTAgencybondsInfo() {
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
					url : OSS.getAppName + '/rpt/rptTAgencybonds_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('ifchecked', d.ifchecked);
						OSS.setExtValue('reportId', d.reportId);
						OSS.setExtValue('bondId', d.bondId);
						OSS.setExtValue('bondNm', d.bondNm);
						OSS.setExtValue('issuCorpAcct', d.issuCorpAcct);
						OSS.setExtValue('currencyCd', d.currencyCd);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('txnOrgId', d.txnOrgId);
						OSS.setExtValue('sltDt', d.sltDt);
						OSS.setExtValue('periodLen', d.periodLen);
						OSS.setExtValue('periodUnit', d.periodUnit);
						OSS.setExtValue('matureDt', d.matureDt);
						OSS.setExtValue('nobondsissued', d.nobondsissued);
						OSS.setExtValue('domechargeAreaCd', d.domechargeAreaCd);
						OSS.setExtValue('countryCd', d.countryCd);
						OSS.setExtValue('txnAttri', d.txnAttri);
						OSS.setExtValue('rateType', d.rateType);
						OSS.setExtValue('fixRate', d.fixRate);
						OSS.setExtValue('priceDatum', d.priceDatum);
						OSS.setExtValue('floatSpread', d.floatSpread);
						OSS.getExtControl('ButtonOk32').setDisabled(false);
					},
					failure : function(response) {
						OSS.AlertWarning("数据加载失败");
					},
					callback : function(o, r, n) {
						myMask.hide();
					}
				});
		var status = JudgeAuthority(keyid);
		if(status==OSS.MsgStatusSuccessful){
		     alert("数据已上报，不可以修改");
			//OSS.AlertInfo("数据已上报，不可以修改"); 
			Ext.getCmp('ButtonOk32').setDisabled(true);
		}else if(status==OSS.MsgStatusReporting){
			alert("数据上报中，不可以修改");
			//OSS.AlertInfo("数据上报中，不可以修改"); 
			Ext.getCmp('ButtonOk32').setDisabled(true);
	}

	} else {
		Ext.getCmp("editForm").getForm().reset();
		var mainId = OSS.getUrlParam('mainId');
		if (mainId) {
			var idList = mainId.split("_");
			OSS.setExtValue('acctId', idList[0]);
			var dt = idList[1].substring(0, 4) + '-'
					+ idList[1].substring(4, 6) + '-'
					+ idList[1].substring(6, 8);
			OSS.setExtValue('declareDt', dt);
		}
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
		var params2 = {
				userId: OSS.userId
			}; 
		params=Ext.applyIf(params, params2); 
		Ext.Ajax.request({
					url : OSS.getAppName + "/rpt/rptTAgencybonds_" + actionId,
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
