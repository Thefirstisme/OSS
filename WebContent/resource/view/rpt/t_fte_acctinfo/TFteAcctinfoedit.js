Ext.define('OSS.view.RowDataEdit', {
			extend : 'Ext.window.Window',
			animCollapse : true,
			modal : true,
			resizable : false,
			closeAction : 'destroy',
			height : 440,
			width : 400,
			iconCls : 'icon-tabedit',
			title : 'FTE、FTN、FTU账户信息报送',
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
										fieldDefaults : {
											width : 360,
											labelWidth : 100
										},
										items : [{
													xtype : 'textfield',
													id : 'acctId',
													name : 'acctId',
													maxLength : 35,
													fieldLabel : '账号',
													blankText : '您未输入账号',
													emptyText : '请输入账号',
													allowBlank : false,
													regex : /^[a-zA-Z0-9]+$/,
													regexText : '只能输入字母和数字'
												}, {
													xtype : 'datefield',
													id : 'declareDt',
													name : 'declareDt',
													fieldLabel : '申报日期',
													blankText : '您未输入申报日期',
													emptyText : '请输入申报日期',
													allowBlank : false,
													editable : false,
													value : ServerDate,
													format : 'Y-m-d'
												}, {
													xtype : 'hiddenfield',
													id : 'reportId',
													name : 'reportId',
													value : '210501'
												}, {
													xtype : 'textfield',
													id : 'custNm',
													name : 'custNm',
													maxLength : 128,
													fieldLabel : '户名',
													blankText : '您未输入户名',
													emptyText : '请输入户名',
													allowBlank : false
												}, {
													xtype : 'combobox',
													id : 'currencyCd',
													name : 'currencyCd',
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
													xtype : 'combobox',
													id : 'balanceCd',
													name : 'balanceCd',
													//maxLength : 11,
													minLength : 5,
													fieldLabel : '资产负债指标代码',
													blankText : '您未输入资产负债指标代码',
													emptyText : '请输入资产负债指标代码',
													allowBlank : false,
//													regex : /^[a-zA-Z0-9\/]+$/,
//													regexText : '只能输入字母和数字'
													editable : true,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : storeBalanceCd,
													valueField : 'id'
												}, {
													xtype : 'combobox',
													id : 'categ',
													name : 'categ',
													width : 360,
													fieldLabel : '类别',
													blankText : '您未输入类别',
													emptyText : '请输入类别',
													allowBlank : false,
													editable : false,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : storeCateg,
													valueField : 'id'
												}, {
													xtype : 'combobox',
													id : 'idenType',
													name : 'idenType',
													width : 360,
													fieldLabel : '证件类型',
													blankText : '您未输入证件类型',
													emptyText : '请输入证件类型',
													allowBlank : false,
													editable : false,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : storeIdenType,
													valueField : 'id'
												}, {
													xtype : 'textfield',
													id : 'idenNo',
													name : 'idenNo',
													maxLength : 20,
													fieldLabel : '证件号码',
													blankText : '您未输入证件号码',
													emptyText : '请输入证件号码',
													allowBlank : false,
													regex : /^[a-zA-Z0-9\-]+$/,
													regexText : '只能输入字母和数字'
												}, {
													xtype : 'combobox',
													id : 'operType',
													name : 'operType',
													width : 360,
													fieldLabel : '操作类型',
													blankText : '您未输入操作类型',
													emptyText : '请输入操作类型',
													allowBlank : false,
													editable : false,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : storeOperType,
													valueField : 'id'
												}, {
													xtype : 'combobox',
													id : 'depttype',
													name : 'depttype',
													fieldLabel : '国民经济部门分类',
													blankText : '您未输入国民经济部门分类',
													emptyText : '请输入国民经济部门分类',
													allowBlank : false,
													editable : false,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : depttypeType,
													valueField : 'id'
												}, {
													xtype : 'textfield',
													id : 'subaccountno',
													name : 'subaccountno',
													maxLength : 20,
													fieldLabel : '子帐号',
													blankText : '您未输入子帐号',
													emptyText : '请输入子帐号',
													allowBlank : false,
													regex : /^[a-zA-Z0-9]+$/,
													regexText : '只能输入字母和数字'
												}, {
													xtype : 'combobox',
													id : 'accstatus',
													name : 'accstatus',
													fieldLabel : '帐户状态',
													blankText : '您未输入帐户状态',
													emptyText : '请输入帐户状态',
													allowBlank : false,
													editable : false,
													queryMode : 'local',
													typeAhead : true,
													value : '-1',
													displayField : 'name',
													store : accstatusType,
													valueField : 'id'
												}, {
													xtype : 'textfield',
													id : 'belongOrgId',
													name : 'belongOrgId',
													maxLength : 14,
													minLength : 11,
													fieldLabel : '所属机构代码',
													blankText : '您未输入所属机构代码',
													emptyText : '请输入所属机构代码',
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
							getTFteAcctinfoInfo();
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
				getTFteAcctinfoInfo();
			}

		});
var initWin;
function getTFteAcctinfoInfo() {
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
					url : OSS.getAppName + '/rpt/rptTFteAcctinfo_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('acctId', d.acctId);
						OSS.setExtValue('declareDt', d.declareDt);
						OSS.setExtValue('reportId', d.reportId);
						OSS.setExtValue('custNm', d.custNm);
						OSS.setExtValue('currencyCd', d.currencyCd);
						OSS.setExtValue('balanceCd', d.balanceCd);
						OSS.setExtValue('categ', d.categ);
						OSS.setExtValue('idenType', d.idenType);
						OSS.setExtValue('idenNo', d.idenNo);
						OSS.setExtValue('operType', d.operType);
						OSS.setExtValue('depttype', d.depttype);
						OSS.setExtValue('subaccountno', d.subaccountno);
						OSS.setExtValue('accstatus', d.accstatus);
						OSS.setExtValue('belongOrgId', d.belongOrgId);
						OSS.setExtValue('ifchecked', d.ifchecked);
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
					url : OSS.getAppName + "/rpt/rptTFteAcctinfo_" + actionId,
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
