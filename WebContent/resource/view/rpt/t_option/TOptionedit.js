Ext.define('OSS.view.RowDataEdit', {
	extend: 'Ext.window.Window',
	animCollapse: true,
    modal: true,
    resizable: false,
    closeAction: 'destroy',
    height: 520,
    width: 400,
    iconCls: 'icon-tabedit',
    title: '期权维护',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    title: '',
                    region: 'center',
                    id:'editForm',
                    bodyPadding: 10,
                    border: false,
                    autoScroll: true,
                    bodyStyle: 'background-color: #DFE8F6;',
                    fieldDefaults: 'labelWidth: 100',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id:'ifchecked',
                            name:'ifchecked'
                        },
                        {
                            xtype: 'datefield',
                            id:'declareDt',
                            name:'declareDt',
                            width:360,
                            fieldLabel: '申报日期',
                            blankText: '您未输入申报日期',
                            emptyText: '请输入申报日期',
                            allowBlank: false,
                            editable: false,
                            value: ServerDate,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'textfield',
                            id:'belongOrgId',
                            name:'belongOrgId',
                            width:360,
		                    maxLength : 14,
							minLength : 11,
                            fieldLabel: '所属机构代码',
                            blankText: '您未输入所属机构代码',
                            emptyText: '请输入所属机构代码',
                            allowBlank: false,
                            regex: /^[a-zA-Z0-9]+$/,
                            regexText: '只能输入字母和数字'
                        },
                        {
                            xtype: 'combobox',
                            id:'buyCurrency',
                            name:'buyCurrency',
                            width:360,
                            fieldLabel: '买入币种',
                            blankText: '您未输入买入币种',
                            emptyText: '请输入买入币种',
                            allowBlank: false,
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            value: '-1',
                            displayField: 'name',
                            store: storeCurrencyCd,
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            id:'buyAmt',
                            name:'buyAmt',
                            width:360,
                            fieldLabel: '买入金额',
                            blankText: '您未输入买入金额',
                            emptyText: '请输入买入金额',
                            allowBlank: false,
                            maxLength: 25,
                    		decimalPrecision: 2,
                            value: '0',
                            hideTrigger: true,
							regex : /^[+-]?\d{1,22}(?:\.\d{1,2})?$/,
							regexText : '只能输入数字,且整数位最大22位,小数位2位'
                        },
                        {
                            xtype: 'textfield',
                            id:'buyPrc',
                            name:'buyPrc',
                            width:360,
                            fieldLabel: '买入牌价',
                            blankText: '您未输入买入牌价',
                            emptyText: '请输入买入牌价',
                            allowBlank: false,
                            maxLength: 14,
                    		decimalPrecision: 6,
                            value: '0',
                            hideTrigger: true,
							regex : /^[+-]?\d{1,6}(?:\.\d{1,6})?$/,
                            regexText: '只能输入数字,且最大值为999999.999999'
                        },
                        {
                            xtype: 'combobox',
                            id:'sellCurrency',
                            name:'sellCurrency',
                            width:360,
                            fieldLabel: '卖出币种',
                            blankText: '您未输入卖出币种',
                            emptyText: '请输入卖出币种',
                            allowBlank: false,
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            value: '-1',
                            displayField: 'name',
                            store: storeCurrencyCd,
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            id:'sellAmt',
                            name:'sellAmt',
                            width:360,
                            fieldLabel: '卖出金额',
                            blankText: '您未输入卖出金额',
                            emptyText: '请输入卖出金额',
                            allowBlank: false,
                            maxLength: 25,
                    		decimalPrecision: 2,
                            value: '0',
                            hideTrigger: true,
							regex : /^[+-]?\d{1,22}(?:\.\d{1,2})?$/,
							regexText : '只能输入数字,且整数位最大22位,小数位2位'
                        },
                        {
                            xtype: 'textfield',
                            id:'sellPrc',
                            name:'sellPrc',
                            width:360,
                            fieldLabel: '卖出牌价',
                            blankText: '您未输入卖出牌价',
                            emptyText: '请输入卖出牌价',
                            allowBlank: false,
                            maxLength: 14,
                    		decimalPrecision: 6,
                            value: '0',
                            hideTrigger: true,
							regex : /^[+-]?\d{1,6}(?:\.\d{1,6})?$/,
                            regexText: '只能输入数字,且最大值为999999.999999'
                        },
                        {
                            xtype: 'datefield',
                            id:'matureDt',
                            name:'matureDt',
                            width:360,
                            fieldLabel: '到期日',
                            blankText: '您未输入到期日',
                            emptyText: '请输入到期日',
                            allowBlank: false,
                            editable: false,
                            value: ServerDate,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'datefield',
                            id:'deliverydate',
                            name:'deliverydate',
                            width:360,
                            fieldLabel: '交割日',
                            blankText: '您未输入交割日',
                            emptyText: '请输入交割日',
                            allowBlank: false,
                            editable: false,
                            value: ServerDate,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'textfield',
                            id:'oppositeAcctno',
                            name:'oppositeAcctno',
                            width:360,
		                    maxLength: 35,
                            fieldLabel: '对方账号',
                            blankText: '您未输入对方账号',
                            emptyText: '请输入对方账号',
                            allowBlank: false,
                            regex: /^[a-zA-Z0-9]+$/,
                            regexText: '只能输入字母和数字'
                        },
                        {
                            xtype: 'textfield',
                            id:'oppositeAcctName',
                            name:'oppositeAcctName',
                            width:360,
		                   // maxLength: 64,
                            fieldLabel: '对方户名',
                            blankText: '您未输入对方户名',
                            emptyText: '请输入对方户名',
                            allowBlank: false,
                            vtype : 'oppositeAcctName',
                            vtypeText : '户名只能输入128个字符,一个汉字为两个字符'
                        },
                        {
                            xtype: 'textfield',
                            id:'oppositeBankCd',
                            name:'oppositeBankCd',
                            width:360,
		                    maxLength: 14,
		                    minLength : 11,
                            fieldLabel: '对方银行或机构代码',
                            blankText: '您未输入对方银行或机构代码',
                            emptyText: '请输入对方银行或机构代码',
                            allowBlank: false,
                            regex: /^[a-zA-Z0-9]+$/,
                            regexText: '只能输入字母和数字'
                        },
                        {
                            xtype: 'combobox',
                            id:'countryCd',
                            name:'countryCd',
                            width:360,
                            fieldLabel: '国别代码',
                            blankText: '您未输入国别代码',
                            emptyText: '请输入国别代码',
                            allowBlank: false,
                            editable: true,
                            queryMode: 'local',
                            typeAhead: true,
                            value: '-1',
                            displayField: 'name',
                            store: storeCountryCd,
                            confirmTo: 'countryCd',
                            vtype: 'custDomechargeAreaCd',
                            vtypeText:'您未输入国内地区码',
                            valueField: 'id' 
                        },
                        {
                            xtype: 'combobox',
                            id:'domechargeAreaCd',
                            name:'domechargeAreaCd',
                            width:360,
                            fieldLabel: '国内地区码',
                            blankText: '您未输入国内地区码',
                            emptyText: '请输入国内地区码',
                            editable: true,
                            queryMode: 'local',
                            typeAhead: true,
                            value: '310000',
                            displayField: 'name',
                            store: storeDomechargeAreaCd,
                            valueField: 'id'  
                        },
                        {
                            xtype: 'combobox',
                            id:'txnAttri',
                            name:'txnAttri',
                            width:360,
                            fieldLabel: '交易性质',
                            blankText: '您未输入交易性质',
                            emptyText: '请输入交易性质',
                            allowBlank: false,
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            value: '-1',
                            displayField: 'name',
                            store: storeTxnAttri,
                            valueField: 'id'  
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'txtEditType',
                            name: 'txtEditType'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'id',
                            name: 'id'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            id: 'hidDataEdit',
                            name: 'hidDataEdit'
                        }
                    ]
                }
            ],
            dockedItems:{
            	xtype: 'toolbar',
            	dock: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'ButtonLoad32',
                        iconCls: 'icon-arrowrefreshsmall',
                        text: '重置',
                        listeners: {
                            click: {
                                fn: me.onButtonLoadClick,
                                scope: me
                            }
                        }
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        id: 'ButtonOk32',
                        iconCls: 'icon-databasesave',
                        text: '提交',
                        listeners: {
                            click: {
                                fn: me.onButtonOkClick,
                                scope: me
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'ButtonCancel32',
                        iconCls: 'icon-doorout',
                        text: '关闭',
                        listeners: {
                            click: {
                                fn: me.onButtonCancelClick,
                                scope: me
                            }
                        }
                    }
                ]
            },
            listeners: {
            	show: {
                    fn: me.onWindowShow,
                    scope: me
                },
                hide: {
                    fn: me.onWindowHide,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    onWindowShow: function(component, eOpts) {
    	initWin=this;
    	setTimeout(function () { getTOptionInfo();}, 100);
    },

    onWindowHide: function(component, eOpts) {
    	var dataEdit=OSS.getExtValue("hidDataEdit");
    	if(dataEdit=='1'){
    		refreshGriPanel();
    	}
    },
    onButtonCancelClick: function(component, eOpts) {
    	this.destroy();
    },
    onButtonOkClick: function(component, eOpts) {
    	toUpdate();
    },
    onButtonLoadClick: function(component, eOpts) {
    	getTOptionInfo();
    }

});
var initWin;
function getTOptionInfo() {
	var keyid = OSS.getExtValue('id');
	OSS.setExtValue('txtEditType','add');
	OSS.setExtValue('hidDataEdit', '0');
	if(keyid!="0"){
		OSS.setExtValue('txtEditType','edit');
		var myMask = new Ext.LoadMask(initWin.id, { msg: '正在加载数据,请稍等...' });
	    myMask.show();
		Ext.Ajax.request({
			url: OSS.getAppName+'/rpt/rptTOption_toEnt',
			method : 'post', 
			params : {
	    		id : keyid
	    	},
	    	 success:function(result){
	    		 var d = Ext.JSON.decode(result.responseText)[0];
	    		 OSS.setExtValue('ifchecked', d.ifchecked);
	    		 OSS.setExtValue('reportId', d.reportId);
	    		 OSS.setExtValue('declareDt', d.declareDt);
	    		 OSS.setExtValue('belongOrgId', d.belongOrgId);
	    		 OSS.setExtValue('buyCurrency', d.buyCurrency);
	    		 OSS.setExtValue('buyAmt', d.buyAmt);
	    		 OSS.setExtValue('buyPrc', d.buyPrc);
	    		 OSS.setExtValue('sellCurrency', d.sellCurrency);
	    		 OSS.setExtValue('sellAmt', d.sellAmt);
	    		 OSS.setExtValue('sellPrc', d.sellPrc);
	    		 OSS.setExtValue('matureDt', d.matureDt);
	    		 OSS.setExtValue('deliverydate', d.deliverydate);
	    		 OSS.setExtValue('oppositeAcctno', d.oppositeAcctno);
	    		 OSS.setExtValue('oppositeAcctName', d.oppositeAcctName);
	    		 OSS.setExtValue('oppositeBankCd', d.oppositeBankCd);
	    		 OSS.setExtValue('domechargeAreaCd', d.domechargeAreaCd);
	    		 OSS.setExtValue('countryCd', d.countryCd);
	    		 OSS.setExtValue('txnAttri', d.txnAttri);
                    OSS.getExtControl('ButtonOk32').setDisabled(false);
	    	 },
			 failure : function(response){ 
				 OSS.AlertWarning("数据加载失败");
			 },
			 callback: function(o, r, n){
				 myMask.hide();
			 }
		});
	}
	else{
				var mainId=OSS.getUrlParam('mainId');
				if(mainId!=''){
					var idList=mainId.split("_");
					 OSS.setExtValue('acctId', idList[0]);
					 var dt=idList[1].substring(0,4)+'-'+idList[1].substring(4,6)+'-'+idList[1].substring(6,8);
					 OSS.setExtValue('declareDt', dt);
				}
			}
}
var toUpdate=function(){
	var editType=OSS.getExtValue('txtEditType');
	var actionId='toAdd';
	if(editType=='edit'){
		actionId='toEdit';
	}
	var formpPanel1 = Ext.getCmp("editForm");
	if(formpPanel1.form.isValid()){
		var myMask = new Ext.LoadMask(initWin.id, { msg: '正在提交数据,请稍等...' });
	    myMask.show();
	    OSS.setExtValue('hidDataEdit', '1');
		var params=formpPanel1.getForm().getValues();
		var params2 = {
				userId: OSS.userId
			}; 
		params=Ext.applyIf(params, params2); 
		Ext.Ajax.request({ 
			url: OSS.getAppName+"/rpt/rptTOption_"+actionId,
			method : 'post', 
			params : params,
			success : function(response, options){ 
				 var data = Ext.JSON.decode(response.responseText);  
				 if(data){
					 if (data.success) {
						 	OSS.AlertInfo("数据提交成功!");
		                }else{ 
		                	OSS.AlertError(data.msg);
		                }  
				 }
			 },
			 failure : function(response){ 
			 },
			 callback: function(o, r, n){
				 myMask.hide();
			 }
		});
	}
};
