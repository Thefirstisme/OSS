Ext.define('OSS.view.RowDataEdit', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 500,
	width : 400,
	iconCls : 'icon-tabedit',
	title : '应付信用证（进口开证）维护',
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
											value : '210302',
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
											xtype : 'textfield',
											id : 'bal',
											name : 'bal',
											width : 360,
											fieldLabel : '金额',
											blankText : '您未输入金额',
											emptyText : '请输入金额',
											allowBlank : false,
											maxLength : 25,
											decimalPrecision : 2,
											value : '0',
											hideTrigger : true,
											regex : /^[+-]?\d{1,22}(?:\.\d{1,2})?$/,
											regexText : '只能输入数字,且整数位最大22位,小数位2位'
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
											xtype : 'textfield',
											id : 'abroadOppBankId',
											name : 'abroadOppBankId',
											width : 360,
											maxLength : 11,
											fieldLabel : '境内外对手行代码',
											blankText : '您未输入境内外对手行代码',
											emptyText : '请输入境内外对手行代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'textfield',
											id : 'applicantNm',
											name : 'applicantNm',
											width : 360,
											maxLength : 128,
											fieldLabel : '申请人名称',
											blankText : '您未输入申请人名称',
											emptyText : '请输入申请人名称',
											allowBlank : false
											//regex : /^[a-zA-Z0-9]+$/,
											//regexText : '只能输入字母和数字'
										}, {
											xtype : 'textfield',
											id : 'applicantOrgId',
											name : 'applicantOrgId',
											width : 360,
											maxLength : 20,
											fieldLabel : '申请人机构代码',
											blankText : '您未输入申请人机构代码',
											emptyText : '请输入申请人机构代码',
											allowBlank : false,
											regex : /^[a-zA-Z0-9-]+$/,
											regexText : '只能输入字母或数字或-'
										}, {
											xtype : 'combobox',
											id : 'applicantCountryCd',
											name : 'applicantCountryCd',
											width : 360,
											fieldLabel : '申请人国别代码',
											blankText : '您未输入申请人国别代码',
											emptyText : '请输入申请人国别代码',
											allowBlank : false,
											editable : true,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeCountryCd,
											confirmTo : 'applicantDomeAreaCd',
											vtype : 'custApplicantCountryCd',
											vtypeText : '您未输入申请人国内地区代码',
											valueField : 'id'
										}, {
											xtype : 'combobox',
											id : 'applicantDomeAreaCd',
											name : 'applicantDomeAreaCd',
											width : 360,
											fieldLabel : '申请人国内地区代码',
											blankText : '您未输入申请人国内地区代码',
											emptyText : '请输入申请人国内地区代码',
											editable : true,
											queryMode : 'local',
											typeAhead : true,
											value : '310000',
											displayField : 'name',
											store : storeDomechargeAreaCd,
											valueField : 'id'
										}, {
											xtype : 'datefield',
											id : 'bisMatureDt',
											name : 'bisMatureDt',
											width : 360,
											fieldLabel : '业务到期日',
											blankText : '您未输入业务到期日',
											emptyText : '请输入业务到期日',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'datefield',
											id : 'lcMatureDt',
											name : 'lcMatureDt',
											width : 360,
											fieldLabel : '信用证到期日',
											blankText : '您未输入信用证到期日',
											emptyText : '请输入信用证到期日',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'combobox',
											id : 'periodCon',
											name : 'periodCon',
											width : 360,
											fieldLabel : '期限条件',
											blankText : '您未输入期限条件',
											emptyText : '请输入期限条件',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storePeriodCon,
											valueField : 'id'
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
					getTLcPayInfo();
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
		getTLcPayInfo();
	}

});
var initWin;
function getTLcPayInfo() {
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
					url : OSS.getAppName + '/rpt/rptTLcPay_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('ifchecked', d.ifchecked);
						OSS.setExtValue('reportId', d.reportId);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('belongOrgId', d.belongOrgId);
						OSS.setExtValue('bal', d.bal);
						OSS.setExtValue('currencyCd', d.currencyCd);
						OSS.setExtValue('abroadOppBankId', d.abroadOppBankId);
						OSS.setExtValue('applicantNm', d.applicantNm);
						OSS.setExtValue('applicantOrgId', d.applicantOrgId);
						OSS.setExtValue('applicantCountryCd',
								d.applicantCountryCd);
						OSS.setExtValue('applicantDomeAreaCd',
								d.applicantDomeAreaCd);
						OSS.setExtValue('bisMatureDt', d.bisMatureDt);
						OSS.setExtValue('lcMatureDt', d.lcMatureDt);
						OSS.setExtValue('periodCon', d.periodCon);
						OSS.setExtValue('periodLen', d.periodLen);
						OSS.setExtValue('periodUnit', d.periodUnit);
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
//		var mainId = OSS.getUrlParam('mainId');
//		if (mainId != '') {
//			var idList = mainId.split("_");
//			OSS.setExtValue('acctId', idList[0]);
//			var dt = idList[1].substring(0, 4) + '-'
//					+ idList[1].substring(4, 6) + '-'
//					+ idList[1].substring(6, 8);
//			OSS.setExtValue('declareDt', dt);
//		}
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
					url : OSS.getAppName + "/rpt/rptTLcPay_" + actionId,
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
