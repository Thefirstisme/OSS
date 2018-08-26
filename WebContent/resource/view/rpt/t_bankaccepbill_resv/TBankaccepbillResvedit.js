Ext.define('OSS.view.RowDataEdit', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 360,
	width : 400,
	iconCls : 'icon-tabedit',
	title : '应收银行承兑汇票维护',
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
											value : '210309',
											width : 360,
											maxLength : 11,
											fieldLabel : '报表编码',
											blankText : '您未输入报表编码',
											emptyText : '请输入报表编码',
											allowBlank : false,
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
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'datefield',
											id : 'collDt',
											name : 'collDt',
											width : 360,
											fieldLabel : '托收日期',
											blankText : '您未输入托收日期',
											emptyText : '请输入托收日期',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'belongOrgId',
											name : 'belongOrgId',
											width : 360,
											maxLength : 14,
											minLength : 11,
											fieldLabel : '所属机构代码',
											blankText : '您未输入所属机构代码',
											emptyText : '请输入所属机构代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'datefield',
											id : 'acptMatureDt',
											name : 'acptMatureDt',
											width : 360,
											fieldLabel : '承兑到期日',
											blankText : '您未输入承兑到期日',
											emptyText : '请输入承兑到期日',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'acptAmt',
											name : 'acptAmt',
											width : 360,
											fieldLabel : '承兑金额',
											blankText : '您未输入承兑金额',
											emptyText : '请输入承兑金额',
											allowBlank : false,
											maxLength : 25,
											decimalPrecision : 2,
											value : '0',
											hideTrigger : true,
											regex : /^[+-]?(?!0+(\.0+)?$)\d{1,22}(?:\.\d{1,2})?$/,
											//regex : /^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$/, 
											regexText : '只能输入不等于0的数字,且整数位最大22位,小数位2位'
										}, {
											xtype : 'combobox',
											id : 'currencyCd',
											name : 'currencyCd',
											width : 360,
											maxLength : 300,
											fieldLabel : '币种',
											blankText : '您未输入币种',
											emptyText : '请输入币种',
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
											id : 'acptOrgNm',
											name : 'acptOrgNm',
											width : 360,
											maxLength : 64,
											fieldLabel : '承兑机构名称',
											blankText : '您未输入承兑机构名称',
											emptyText : '请输入承兑机构名称',
											allowBlank : false
											// regex: /^[a-zA-Z0-9]+$/,
										// regexText: '只能输入字母和数字'
									}	, {
											xtype : 'textfield',
											id : 'acptOrgId',
											name : 'acptOrgId',
											width : 360,
											maxLength : 14,
											minLength : 12,
											fieldLabel : '承兑机构代码',
											blankText : '您未输入承兑机构代码',
											emptyText : '请输入承兑机构代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9-]+$/,
											regexText : '只能输入字母或数字或-'
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
					getTBankaccepbillResvInfo();
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
		getTBankaccepbillResvInfo();
	}

});
var initWin;
function getTBankaccepbillResvInfo() {
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
					url : OSS.getAppName + '/rpt/rptTBankaccepbillResv_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('ifchecked', d.ifchecked);
						OSS.setExtValue('reportId', d.reportId);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('collDt', d.collDt);
						OSS.setExtValue('belongOrgId', d.belongOrgId);
						OSS.setExtValue('acptMatureDt', d.acptMatureDt);
						OSS.setExtValue('acptAmt', d.acptAmt);
						OSS.setExtValue('currencyCd', d.currencyCd);
						OSS.setExtValue('acptOrgNm', d.acptOrgNm);
						OSS.setExtValue('acptOrgId', d.acptOrgId);
						OSS.setExtValue('domechargeAreaCd', d.domechargeAreaCd);
						OSS.setExtValue('countryCd', d.countryCd);
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
		//OSS.setExtValue('belongOrgId',defaultOrgId);
		if (mainId != '' && mainId != undefined) {
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
					url : OSS.getAppName + "/rpt/rptTBankaccepbillResv_"
							+ actionId,
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
