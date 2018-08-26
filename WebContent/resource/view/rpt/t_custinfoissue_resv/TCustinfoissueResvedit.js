Ext.define('OSS.view.RowDataEdit', {
			extend : 'Ext.window.Window',
			animCollapse : true,
			modal : true,
			resizable : false,
			closeAction : 'destroy',
			height : 250,
			width : 400,
			iconCls : 'icon-tabedit',
			title : '关联账户信息下发',
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
													xtype : 'hiddenfield',
													id : 'reportId',
													name : 'reportId',
													maxLength : 11,
													fieldLabel : '报表编码',
													blankText : '您未输入报表编码',
													emptyText : '请输入报表编码',
													allowBlank : false,
													value : '310101',
													regex : /^[0-9]+$/,
													regexText : '只能输入数字'
//												}, {
//													xtype : 'combobox',
//													id : 'idenType',
//													name : 'idenType',
//													width : 360,
//													fieldLabel : '证件类型',
//													blankText : '您未输入证件类型',
//													emptyText : '请输入证件类型',
//													allowBlank : false,
//													editable : false,
//													queryMode : 'local',
//													typeAhead : true,
//													value : '-1',
//													displayField : 'name',
//													store : storeIdenType,
//													valueField : 'id'
												}, {
													xtype : 'textfield',
													id : 'orgId',
													name : 'orgId',
													maxLength : 14,
													minLength : 11,
													fieldLabel : '所属机构代码',
													blankText : '您未输入所属机构代码',
													emptyText : '请输入所属机构代码',
													allowBlank : false,
													regex : /^[a-zA-Z0-9\-]+$/,
													regexText : '只能输入字母和数字'
												}, {
													xtype : 'textfield',
													id : 'custNm',
													name : 'custNm',
													maxLength : 64,
													fieldLabel : '户名',
													blankText : '您未输入户名',
													emptyText : '请输入户名',
													allowBlank : true
													// regex: /^[a-zA-Z0-9]+$/,
												// regexText: '只能输入字母和数字'
												}, {
													xtype : 'textfield',
													id : 'custNo',
													name : 'custNo',
													maxLength : 35,
													fieldLabel : '账号',
													blankText : '您未输入账号',
													emptyText : '请输入账号',
													allowBlank : true,
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
							getTCustinfoissueResvInfo();
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
				getTCustinfoissueResvInfo();
			}

		});
var initWin;
function getTCustinfoissueResvInfo() {
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
					url : OSS.getAppName + '/rpt/rptTCustinfoissueResv_toEnt',
					method : 'post',
					params : {
						id : keyid
					},
					success : function(result) {
						var d = Ext.JSON.decode(result.responseText)[0];
						OSS.setExtValue('reportId', d.reportId);
						OSS.setExtValue('orgId', d.orgId);
						OSS.setExtValue('custNm', d.custNm);
						OSS.setExtValue('custNo', d.custNo);
						OSS.setExtValue('operType', d.operType);
						OSS.setExtValue('declareDt', d.declareDt);
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
					url : OSS.getAppName + "/rpt/rptTCustinfoissueResv_"
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
