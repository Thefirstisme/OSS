Ext.define('OSS.view.RowDataEdit', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 390,
	width : 400,
	iconCls : 'icon-tabedit',
	title : '向中央银行借款-明细维护',
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
											id : 'acctId',
											name : 'acctId',
											width : 360,
											maxLength : 35,
											fieldLabel : '账号',
											blankText : '您未输入账号',
											emptyText : '请输入账号',
											allowBlank : false,
											regex : /^[a-zA-Z0-9]+$/,
											regexText : '只能输入字母和数字'
										}, {
											xtype : 'hiddenfield',
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
										},
										// {
										// xtype: 'textfield',
										// id:'detailSeq',
										// name:'detailSeq',
										// width:360,
										// maxLength: 6,
										// fieldLabel: '明细序号',
										// blankText: '您未输入明细序号',
										// emptyText: '请输入明细序号',
										// allowBlank: false,
										// regex: /^[a-zA-Z0-9]+$/,
										// regexText: '只能输入字母和数字'
										// },
										{
											xtype : 'combobox',
											id : 'outInAcctInd',
											name : 'outInAcctInd',
											width : 360,
											fieldLabel : '出/入账标志',
											blankText : '您未输入出/入账标志',
											emptyText : '请输入出/入账标志',
											allowBlank : false,

											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeOutInAcctInd,

											confirmTo : 'origTxnDt',
											vtype : 'custOutInAcctIndRegex',
											vtypeText : '原始交易日期应小于等于记账日期，且存在原始交易日期必须选择3或4',
											valueField : 'id'
										}, {
											xtype : 'datefield',
											id : 'acctDt',
											name : 'acctDt',
											width : 360,
											fieldLabel : '记账日期',
											blankText : '您未输入记账日期',
											emptyText : '请输入记账日期',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'datefield',
											id : 'origTxnDt',
											name : 'origTxnDt',
											width : 360,
											fieldLabel : '原始交易日期',
											blankText : '您未输入原始交易日期',
											emptyText : '请输入原始交易日期',
											//allowBlank : false,
											allowBlank : true,
											editable : true,
											//value : ServerDate,
											format : 'Y-m-d'
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
											xtype : 'datefield',
											id : 'intStartDt',
											name : 'intStartDt',
											width : 360,
											fieldLabel : '起息日',
											blankText : '您未输入起息日',
											emptyText : '请输入起息日',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											format : 'Y-m-d',
											listeners:{  
											    'change':function(){    
											    	setMatureDt('intStartDt', 'periodLen','periodUnit','matureDt');    
											    }
											}
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
											regex : /^[0-9]+$/,
											regexText : '只能输入数字',
											listeners:{  
											    'change':function(){    
											    	setMatureDt('intStartDt', 'periodLen','periodUnit','matureDt');    
											    }
											}
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
											valueField : 'id',
											listeners:{  
											    'change':function(){    
											    	setMatureDt('intStartDt', 'periodLen','periodUnit','matureDt');    
											    }
											}
										}, {
											xtype : 'datefield',
											id : 'matureDt',
											name : 'matureDt',
											width : 360,
											fieldLabel : '到期日',
											blankText : '您未输入到期日',
											emptyText : '请输入到期日',
											allowBlank : true,
											editable : false,
											//value : ServerDate,
											format : 'Y-m-d'
										}, {
											xtype : 'textfield',
											id : 'oppositeName',
											name : 'oppositeName',
											width : 360,
											//maxLength : 64,
											fieldLabel : '对方名称',
											blankText : '您未输入对方名称',
											emptyText : '请输入对方名称',
											allowBlank : false,
				                            vtype : 'oppositeAcctName',
				                            vtypeText : '户名只能输入128个字符,一个汉字为两个字符'
										}, {
											xtype : 'textfield',
											id : 'yieldRate',
											name : 'yieldRate',
											width : 360,
											fieldLabel : '年化利率',
											blankText : '您未输入年化利率',
											emptyText : '请输入年化利率',
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
											id : 'txnAttri',
											name : 'txnAttri',
											width : 360,
											fieldLabel : '交易性质',
											blankText : '您未输入交易性质',
											emptyText : '请输入交易性质',
											allowBlank : false,
											editable : false,
											queryMode : 'local',
											typeAhead : true,
											value : '-1',
											displayField : 'name',
											store : storeTxnAttri,
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
					getTBorrcentbankDtlInfo();
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
		getTBorrcentbankDtlInfo();
	}

});
var initWin;
function getTBorrcentbankDtlInfo() {
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
					url : OSS.getAppName + '/rpt/rptTBorrcentbankDtl_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('acctId', d.acctId);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('detailSeq', d.detailSeq);
						OSS.setExtValue('outInAcctInd', d.outInAcctInd);
						OSS.setExtValue('acctDt', d.acctDt);
						OSS.setExtValue('origTxnDt', d.origTxnDt);
						OSS.setExtValue('bal', d.bal);
						OSS.setExtValue('periodLen', d.periodLen);
						OSS.setExtValue('periodUnit', d.periodUnit);
						OSS.setExtValue('intStartDt', d.intStartDt);
						OSS.setExtValue('matureDt', d.matureDt);
						OSS.setExtValue('oppositeName', d.oppositeName);
						OSS.setExtValue('yieldRate', d.yieldRate);
						OSS.setExtValue('txnAttri', d.txnAttri);
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
		if (mainId != '') {
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
					url : OSS.getAppName + "/rpt/rptTBorrcentbankDtl_"
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
