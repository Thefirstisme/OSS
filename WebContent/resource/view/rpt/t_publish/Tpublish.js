Ext.define('OSS.view.publishList1', {
	extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    bodyBorder: false,
                    title: '',
                    id: 'GridPanelMain',
                    store: storeMain,
                    columnLines: false,
                    columns: [
                         {
                        	 header:"<div class=\"x-column-header-inner\"  style=\"height: 26px; padding-top: 4px;\"><input id='allcheckbox' type='checkbox' onclick=checkall(this)></input></div>", 
                        	 dataIndex:'msgid', 
                        	 renderer:renderCheckbox, 
                        	 width:40, 
                        	 sortable:false                        	 
      					}, 
      					{
							xtype : 'rownumberer',
							width : 25,
							sortable : false,
							resizable : true
						}, {
							xtype : 'gridcolumn',//rptId
							width    : 210,
							text : '报文标识号',
							dataIndex : 'msgid'
						}, {
                            xtype: 'gridcolumn',
                            width    : 80,
                            text: '报表编号',
                            dataIndex: 'rptId'
                        }, {
                            xtype: 'gridcolumn',
                            width    : 150,
                            text: '报文名称',
                            dataIndex: 'rptNm'
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 100,
                            text: '报文日期',
                            dataIndex: 'dataDt'
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 110,
                            text: '生成时间',
                            dataIndex: 'createDt'
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 120,
                            text: '上报/接收时间',
                            dataIndex: 'publishDt',
                            renderer:renderpublishDt
                        },
//                        {
//                            xtype: 'gridcolumn',
//                            width    : 50,
//                            text: '报文 ',
//                            dataIndex: 'msgid',
//                            sortable:false,
//                            //dataIndex:'xml'
//                            renderer:renderXML
//                        },
//                        {
//                            xtype: 'gridcolumn',
//                            width    : 50,
//                            text: '报文信息 ',
//                            sortable:false,
//                            dataIndex:'xml'
//                        },
//                        {
//                            xtype: 'gridcolumn',
//                            width    : 50,
//                            text: '结果 ',
//                            dataIndex: 'msgid',
//                            sortable:false,
//                            renderer:renderreXML
//                        }
//                        ,
                        {
                            xtype: 'gridcolumn',
                            width    : 100,
                            text: '状态',
                            dataIndex: 'status',
                            renderer:renderstatus
                        } ,
                         {
                            xtype: 'gridcolumn',
                            width    : 100,
                            text: '返回结果 ',
                            dataIndex: 'reResult'
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 200,
                            text: '返回信息',
                            dataIndex: 'reInformation'
                        } 
                        
                    ],
//                    selModel: Ext.create('Ext.selection.CheckboxModel', {
//
//                    }),                   
                    dockedItems: [{
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
									labelWidth : 70,
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
					},{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
									xtype : 'datefield',
									id : 'txtdatatime',
									format: 'Y-m-d',
									fieldLabel : '申报日期',
			                        emptyText: '请输入申报日期',
			                        editable: false,
			                        value: ServerDate,
									labelWidth : 60,
									width:160
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
								},{
                                    xtype: 'tbfill'
                                },{
									xtype : 'button',
									iconCls : 'icon-databaserefresh',
									text : '删除',
									listeners : {
										click : {
											fn : me.onDeleteModelClick,
											scope : me
										}
									}
                                 },{
										xtype : 'button',
										iconCls : 'icon-databaserefresh',
										text : '选择上报模式',
										listeners : {
											click : {
												fn : me.onSelectModelClick,
												scope : me
											}
										}
                                }, {
									xtype : 'button',
									iconCls : 'icon-databaserefresh',
									text : '一键生成',
									listeners : {
										click : {
											fn : me.onOKShbRHClick,
											scope : me
										}
									}
                                }, {
										xtype : 'button',
										iconCls : 'icon-folderup',
										width    : 100,
										text : '待报数据',
										listeners : {
											click : {
												fn : me.onPClick,
												scope : me
											}
										}
								} , 
                                {
										xtype : 'button',
										iconCls : 'icon-build',
										width    : 120,
										text : '下发数据',
										listeners : {
											click : {
												fn : me.onXClick,
												scope : me
											}
										}
								}, 
								
                                {
										xtype : 'button',
										iconCls : 'icon-cogadd',
										width    : 100,
										id: 'btnStartShbRH',
										text : '开始上报',
										listeners : {
											click : {
												fn : me.onShbRHClick,
												scope : me
											}
										}
								}
                            ]
                        }
                    ],
	                listeners: {
//	                    itemdblclick: {
//	                        fn: me.onGridPanelItemDblClick,
//	                        scope: me
//	                    }
	                }
                }
            ],
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
		refreshGriPanel(_doaction);
	}, 
	onDeleteModelClick : function(item,e,eOpts){
		deleteRptData(this);
	},
	// 选择上报模式
	onSelectModelClick : function(item, e, eOpts) {
		new OSS.view.SelectModelView().show();
	},
	onOKShbRHClick : function(item, e, eOpts) {
		new OSS.view.ShangBaoView().show();
		OSS.setExtValue('OKShbRH', 'yes');
		OSS.setExtValue('tableName', 'T_CorpDepo_Tol,T_FTU_FinaBond_Tol,T_FTU_MedLongBorr_Tol,T_AccoPayaTemp_Tol,T_AsseSoldRepu_Tol,T_BorrCentBank_Tol,T_TradCurrAcco_Sour_Tol,T_SysFinaFlow_Sour_Tol,T_FOREXTradeSpot_Sour_Tol,T_FTU_EntrdSav_Tol,T_AgentEntrdLoanFund_Tol,T_TotaReserve_Tol,T_TotaLoan_Tol,T_Securitie_Tol,T_EquityOtherInvest_Tol,T_ResvablePrepayment_Tol,T_BuyBackAssetAcquired_Tol,T_CentBankReserve_Tol,T_CentBankSpecDepo_Tol,T_CentBankFinSavDepo_Tol,T_TradCurrAcco_Oper_Tol,T_SysFinaFlow_Oper_Tol,T_VaultCash_Tol,T_FOREXTradeSpot_Oper_Tol,T_AgencyBonds,T_Lc_Pay,T_LgStandBy_Pay,T_LCConfirm_Imp,T_BankAccepBill_Pay,T_Lc_Resv,T_LgStandBy_Resv,T_LCConfirm_Exp,T_BankAccepBill_Resv,T_FwdExeSlt,T_CurrSwaps,T_OffsheetFin_Tol,T_FTE_AcctInfo');//
		//OSS.setExtValue('tableName', 'T_CorpDepo_Tol,T_FTU_FinaBond_Tol,T_FTU_MedLongBorr_Tol,T_AccoPayaTemp_Tol,T_AsseSoldRepu_Tol,T_BorrCentBank_Tol,T_TradCurrAcco_Sour_Tol,T_SysFinaFlow_Sour_Tol,T_FOREXTradeSpot_Sour_Tol,T_FTU_EntrdSav_Tol,T_AgentEntrdLoanFund_Tol,T_TotaReserve_Tol,T_TotaLoan_Tol,T_Securitie_Tol,T_EquityOtherInvest_Tol,T_ResvablePrepayment_Tol,T_BuyBackAssetAcquired_Tol,T_CentBankReserve_Tol,T_CentBankSpecDepo_Tol,T_CentBankFinSavDepo_Tol,T_TradCurrAcco_Oper_Tol,T_SysFinaFlow_Oper_Tol,T_VaultCash_Tol,T_FOREXTradeSpot_Oper_Tol,T_AgencyBonds,T_Lc_Pay,T_LgStandBy_Pay,T_LCConfirm_Imp,T_BankAccepBill_Pay,T_Lc_Resv,T_LgStandBy_Resv,T_LCConfirm_Exp,T_BankAccepBill_Resv,T_FwdExeSlt,T_CurrSwaps,T_OffsheetFin_Tol,T_FTE_AcctInfo');//
		OSS.setExtValue('tPath', 'TCorpdepoTol');
	},
	onShbRHClick : function(item, e, eOpts) {
		confrimRptData(this);
	},
	onPClick : function(item, e, eOpts) {
		_doaction="1";
		refreshGriPanel(_doaction);
	},
	onXClick : function(item, e, eOpts) {
		_doaction="2";
		refreshGriPanel(_doaction);
	},
    // 根据条件进行查询
    queryByCondition: function(item, e, eOpts) {
    	refreshGriPanel(_doaction);
    },
    onViewportAfterRender: function(component, eOpts) {
    	setTimeout(function () { toMainPageInit();}, 100);
    }
});


function deleteRptData(eOpts){	
	var record = getSelectIdList();
 	 if(record.length == 0){
 		 Ext.MessageBox.show({ 
              title:"提示", 
              msg:"请先选择需要删除的报表!", 
              icon: Ext.MessageBox.INFO, 
              buttons: Ext.Msg.OK 
          });
 	 }else { 
 		 
 		Ext.MessageBox.show(
 			    {
 			      title: '信息',
 			      msg: "您确定要删除选中的报文吗？",
 			      buttons: Ext.MessageBox.YESNO,
 			      fn: function(btn){
 			    	  	if(btn=='yes'){
 			    	  		publishDeleteRptData(eOpts);
 			    	  	}
 			      },
 			      animEl: 'mb4',
 			      icon: Ext.MessageBox.QUESTION
 		});
 		
 }


function publishDeleteRptData(eOpts){	
	var msgids = getSelectIdList();
	eOpts.disabled=true;
	var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在提交删除信息,请稍等...' });
	myMask.show();
	Ext.Ajax.request({ 
		url:OSS.getAppName+'/rpt/rptpublish_toDelete',
		method : 'post', 
		params : {msgids: msgids},
		success : function(response, options){	
			var c1 = Ext.JSON.decode(response.responseText);
			if (c1.success) {
				OSS.AlertInfo(c1.msg, refreshGriPanelTwo);
			} else {
				OSS.AlertInfo(c1.msg);
			}
			//Ext.MessageBox.alert('成功',  response.responseText);
			
		 },
		 failure : function(response){ 
			// var custId="cust_"+options.params.id;
			// Ext.get(custId).dom.style="color:red;font-weight:bold;";
			 //Ext.get(custId).dom.innerHTML="上报失败!";
			
			 
		 }, 
		 callback: function(o, r, n){
			 myMask.hide();
		 }
	});
	
	}

}

var _doaction="1";
var c1 ="";
function showRowData(t,msgId){
	var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在查询信息,请稍等...' });
	myMask.show();
	
	Ext.Ajax.request({
		url: OSS.getAppName+"/rpt/rptpublish_toEnt",
		method : 'post', 
		params : {
			msgId: msgId,
			t:t
			},
		success : function(response, options){
			c1 = response.responseText;
			showData(t,msgId,c1);
		 },
		 failure : function(response){ 
		 	
		 },
		 callback: function(o, r, n){
		 	 c1 ="";
			 myMask.hide();
		 }
	});
};

function showData(t,msgid,xmlContent){
  var xmlId="xml_"+msgid;
  if(t==2){
	  xmlId="xml_re_"+msgid;
  }
  
  if(Ext.get('showxmlpanel')){
  	   Ext.get('showxmlpanel').html="";
	  Ext.get('showxmlpanel').show();
	  return;
  }
  var intiLeft = (Ext.get('GridPanelMain').getWidth()-500)/2;
  new Ext.Panel({
	    title: '查看窗口',
	    id:'showxmlpanel',
	    x: intiLeft,
	    y: 100,
	    renderTo: Ext.getBody(),
	    floating: true,
	    frame: true,
	    tools:[{id:"close",handler:function(){Ext.get('showxmlpanel').destroy();}}],
	    //closeAction: 'hide',
	    width: 500,
	    height: 350,
	    html: "<textarea id=\"xml_show\" data-height=\"490\" style=\"height: 310px;width:490px;\">"+ xmlContent +"</textarea>",
	    draggable:{
	    	insertProxy: false,
	        onDrag : function(e){
	            var pel = this.proxy.getEl();
	            this.x = pel.getLeft(true);
	            this.y = pel.getTop(true);

	            var s = this.panel.getEl().shadow;
	            if (s) {
	                s.realign(this.x, this.y, pel.getWidth(), pel.getHeight());
	            }
	        },
	        endDrag : function(e){
	            this.panel.setPosition(this.x, this.y);
	        }
	    }
	}).show();
}
function renderstatus(value, cellmeta, record, rowIndex, columnIndex, store) {
	
	var custId="cust_"+Ext.util.Format.trim(record.data.msgid);	
    if (value == '0') {
        return "<span id="+custId+" style='color:red;font-weight:bold;'>未上报</span>";
    } else  if (value == '1'){
        return "<span id="+custId+" style='color:green;font-weight:bold;'>已上报</span>";
    } else  if (value == '3'){
        return "<span id="+custId+" style='color:red;font-weight:bold;'>上报中...</span>";
    }else  if (value == '2'){
    	return "<span id="+custId+" style='color:red;font-weight:bold;'>上报失败</span>";
    }else  if (value == '9'){
    	return "<span id="+custId+" style='color:green;font-weight:bold;'>下发数据</span>";
    }
    
}
function renderpublishDt(value, cellmeta, record, rowIndex, columnIndex, store) {	
	var custId="publish_"+record.data.msgid;
	var xmlId="xml_"+record.data.msgid;
	var xmlreId="xml_re_"+record.data.msgid;
	return "<span id="+custId+">"+value+"</span><span id="+xmlId+" style='display:none'>"+record.data.xml+"</span><span id="+xmlreId+" style='display:none'>"+record.data.reXml+"</span>";
}
function renderXML(value) {	
	return "<img  style=\"cursor:pointer;padding-left:5px;\" onclick=\"showRowData(1,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
}
function renderreXML(value, cellmeta, record, rowIndex, columnIndex, store) {	
	var btnxmlreId="btn_xml_re_"+Ext.util.Format.trim(record.data.msgid);
	if(record.data.status == '0' ){
		return "<img id='"+btnxmlreId+"'  style=\"cursor:pointer;padding-left:5px;display:none;\" onclick=\"showRowData(2,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
		//return "<img id='"+btnxmlreId+"' style=\"cursor:pointer;padding-left:5px;\" onclick=\"showRowData(2,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
	}else{
		return "<img id='"+btnxmlreId+"' style=\"cursor:pointer;padding-left:5px;\" onclick=\"showRowData(2,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
	}
}
function renderCheckbox(value,cellmeta,record,rowIndex,columnIndex,store){
	if (record.data.status == '0' || record.data.status == '9') {
		return "<div class=\"x-column-header-inner\"  style=\"padding-top: 2px;\"><input type='checkbox' name='adds_checkbox' value=\""+value+"\" id='checkbox_"+value+"'></input></div>"; 
	}else{
		return "";
	}
}
function checkall(obj){
	var _checkd=obj.checked;
	Ext.get('GridPanelMain').select('input[name=adds_checkbox]').each(function(i){ 
		if(!i.dom.disabled){
			i.dom.checked=_checkd;
		}
	});  
}
function getSelectIdList(){	
	var idList="";
	Ext.get('GridPanelMain').select('input[name=adds_checkbox]').each(function(i){ 
		if(i.dom.checked && !i.dom.disabled){
			if(idList.length>0)
			{
				idList=idList+',';
			}
			idList=idList+Ext.util.Format.trim(i.dom.value);
		}
	}); 
	return idList;
}; 
var initWin;
var refreshGriPanel=function(mode){
	storeMain.removeAll();
	storeMain.currentPage=1;
	var datatime = OSS.getExtValue('txtdatatime');
	storeMain.load({params:{mode: mode,datatime:datatime}}); 
	//storeMain.load({params:{datatime:datatime}}); 
	Ext.getCmp('GridPanelMain').doComponentLayout();
	Ext.getCmp('GridPanelMain').invalidateScroller();
};

var refreshGriPanelTwo=function(){
	storeMain.removeAll();
	storeMain.currentPage=1;
	var datatime = OSS.getExtValue('txtdatatime');
	//storeMain.load({params:{mode: mode,datatime:datatime}}); 
	storeMain.load({params:{datatime:datatime}}); 
	Ext.getCmp('GridPanelMain').doComponentLayout();
	Ext.getCmp('GridPanelMain').invalidateScroller();
};

var storeMain = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:50,
	idProperty: 'msgid',
	remoteSort: false,
	fields: [
	    {name: 'msgid',type:'string'},     
	    {name: 'rptId',type:'string'},
	    {name: 'rptNm',type:'string'},
	    {name: 'createDt',type:'string'},
	    {name: 'publishDt',type:'string'},
	    {name: 'status',type:'string'},
	    {name: 'xml',type:'string'},
	    {name: 'dataDt',type:'string'},
	    {name: 'reXml',type:'string'},
	    {name: 'reResult',type:'string'},
	    {name: 'reInformation',type:'string'}
	  
    ],
    proxy:new Ext.data.HttpProxy({
		url:OSS.getAppName+'/rpt/rptpublish_toList',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	},
    	simpleSortMode: true
	}),
	sorters: [{
        property: 'dataDt',
        direction: 'DESC'
    }]
});


storeMain.on('beforeload', function(store, options) {	
	var datatime = OSS.getExtValue('txtdatatime');
	var new_params = {
			mode : _doaction,
			datatime : datatime
	};
	Ext.apply(store.proxy.extraParams, new_params);
});
function confrimRptData(eOpts){	
	var record = getSelectIdList();
 	 if(record.length == 0){
 		 Ext.MessageBox.show({ 
              title:"提示", 
              msg:"请先选择需要上报的报表!", 
              icon: Ext.MessageBox.INFO, 
              buttons: Ext.Msg.OK 
          });
 	 }else { 		 
 		Ext.MessageBox.show(
 			    {
 			      title: '信息',
 			      msg: "您确定要开始上报报表？",
 			      buttons: Ext.MessageBox.YESNO,
 			      fn: function(btn){
 			    	  	if(btn=='yes'){
 			    	  		publishRptData(eOpts);
 			    	  	}
 			      },
 			      animEl: 'mb4',
 			      icon: Ext.MessageBox.QUESTION
 		});
 }


function publishRptData(eOpts){	
	//var myMask = new Ext.LoadMask(Ext.getBody(), { msg: '正在提交上传报表,请稍等...' });
	//myMask.show();
	var msgids = getSelectIdList();
	eOpts.disabled=true;
	Ext.get('GridPanelMain').select('input[name=adds_checkbox]').each(function(i){ 
		if(i.dom.checked){
			var id= Ext.util.Format.trim(i.dom.value);
			var custId="cust_"+id;
			if (Ext.get(custId).dom.innerHTML == "未上报") {
				Ext.get(custId).dom.setStyle="color:red;font-weight:bold;";
				Ext.get(custId).dom.innerHTML="上报中...";	
			}
			i.dom.disabled=true;
		}
	}); 
	
	Ext.Ajax.request({ 
		url:OSS.getAppName+'/rpt/rptpublish_toEdit',
		method : 'post', 
		params : {msgids: msgids},
		success : function(response, options){	
			//var custId="cust_"+options.params.id;
			 //Ext.get(custId).dom.innerHTML="上报成功!";	
			//startMonitor();
		 },
		 failure : function(response){ 
			// var custId="cust_"+options.params.id;
			// Ext.get(custId).dom.style="color:red;font-weight:bold;";
			 //Ext.get(custId).dom.innerHTML="上报失败!";
		 }
	});
	 
//	var task_Mointor = {
//	 	run : function() {
//	 		var datatime = OSS.getExtValue('txtdatatime');
//	 		Ext.Ajax.request({ 
//	 			url:OSS.getAppName+'/rpt/rptpublish_toList',
//	 			method : 'post', 
//	 			params : {msgids: msgids,datatime:datatime},
//	 			success : function(response, options){	
//	 				var responsesData = Ext.JSON.decode(response.responseText);
//	 				var data;
//	 				if(responsesData){
//	 					data=responsesData.data;
//	 				}
//	 				var isEnd=true;
//	 				if(data)
//	 				{
//	 					 for (var i=0; i <= data.length; i++) { 
//	 						if(data[i].status != "3"){
//	 							setStatus(data[i].msgid,data[i]);
//	 						}else {
//	 							isEnd=false;
//	 						}
//	 					 }
//	 				}
//	 				if(isEnd){
//	 					eOpts.disabled=false;
//	 					stopMonitor();
//	 				}
//	 			}
//	 		});
//	 		 
//	 	},    
//	 	interval : 4000
//	}; 
	function stopMonitor()  
    {  
        //Ext.TaskManager.stop(task_Mointor);  
    }
	function startMonitor()  
    {  
		//Ext.TaskManager.start(task_Mointor);  
    }
	
	
	function setStatus(msgid,record) {		
		var custId="cust_"+Ext.util.Format.trim(msgid);
		if(record!=null){
			if (record.status == '0') {
				Ext.get(custId).dom.innerHTML="<span id="+custId+" style='color:red;font-weight:bold;'>未上报</span>";
		    } else  if (record.status == '1'){
				Ext.get(custId).dom.innerHTML="<span id="+custId+" style='color:green;font-weight:bold;'>已上报</span>";
		    } else  if (record.status == '3'){
				Ext.get(custId).dom.innerHTML="<span id="+custId+" style='color:red;font-weight:bold;'>上报中...</span>";
		    }else  if (record.status == '2'){
				Ext.get(custId).dom.innerHTML="<span id="+custId+" style='color:red;font-weight:bold;'>上报失败</span>";
		    }else  if (record.status == '9'){
				Ext.get(custId).dom.innerHTML="<span id="+custId+" style='color:green;font-weight:bold;'>下发数据</span>";
		    }
		}

	    var dtId="publish_"+Ext.util.Format.trim(msgid);
	    Ext.get(dtId).dom.innerHTML=record.publishDt;
	    var xmlId="xml_"+Ext.util.Format.trim(msgid);
	    Ext.get(xmlId).dom.innerHTML=record.xml;
	    var xmlreId="xml_re_"+Ext.util.Format.trim(msgid);
	    Ext.get(xmlreId).dom.innerHTML=record.reXml;
	    var btnxmlreId="btn_xml_re_"+Ext.util.Format.trim(msgid);
	    Ext.get(btnxmlreId).show();
	}
  }
}
var InitpublishList=function(){
	if(Ext.isIE){
		   Ext.enableGarbageCollector=false;
		  }
	Ext.tip.QuickTipManager.init();
	new OSS.view.publishList1();
};
var toMainPageInit=function(){
	Ext.Ajax.request({
			url : OSS.getAppName + "/rpt/rptpublish_selectModelInfo",
			method : 'post',
			params : {},
			success : function(response, options) {
				var d = Ext.JSON.decode(response.responseText)[0];
				if (d.auto == '0') {
					OSS.getExtControl('btnStartShbRH').setDisabled(true);
				}else{
					OSS.getExtControl('btnStartShbRH').setDisabled(false);
				}
			},
			failure : function(response) {
			},
			callback : function(o, r, n) {
				//myMask.hide();
			}
		});
};
var windowModelView;
Ext.define('OSS.view.SelectModelView', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 200,
	width : 300,
	iconCls : 'icon-tabedit',
	title : '选择上报模式',
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
						id : 'editFormModelView',
						bodyPadding : 10,
						border : false,
						autoScroll : true,
						bodyStyle : 'background-color: #DFE8F6;',
						fieldDefaults : 'labelWidth: 100',
						items : [
                        {
                            xtype: 'radiogroup',
                            id: 'radiogroupSelect',
                            fieldLabel : '选择上报模式',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: '手工上报',
                                    name      : 'color',
                                    id        : 'radio4',
                                    inputValue: '1',
                                    listeners: {
                                        change: {
                                            fn: me.onRadiofield4Change,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: '自动上报',
                                    name      : 'color',
                                    id        : 'radio5',
                                    inputValue: '2',
                                    listeners: {
                                        change: {
                                            fn: me.onRadiofield5Change,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
								xtype : 'numberfield',
								id : 'hour',
								name : 'hour',
								width : 200,
								maxLength : 2,
								minLength : 1,
								maxValue  : 23,
								minValue  :  0,
								value : 0,
								fieldLabel : '定时上报时',
								blankText : '请输入时间（单位时）',
								emptyText : '请输入时',
								allowBlank : true
							},{
								xtype : 'numberfield',
								id : 'minute',
								name : 'minute',
								width : 200,
								maxLength : 2,
								minLength : 1,
								maxValue  : 59,
								minValue  :  0,
								value : 0,
								fieldLabel : '定时上报分',
								blankText : '请输入时间（单位时）',
								emptyText : '请输入分',
								allowBlank : true
						}]
					}],
			dockedItems : {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [ {
							xtype : 'tbfill'
						}, {
							xtype : 'button',
							id : 'ButtonOk32',
							iconCls : 'icon-databasesave',
							text : '提交',
							listeners : {
								click : {
									fn : me.onButtonSelectModelClick,
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
									fn : me.onButtonViewCancelClick,
									scope : me
								}
							}
						}
//						, {
//							xtype : 'button',
//							id : 'ButtonCancel321',
//							iconCls : 'icon-doorout',
//							text : '测试',
//							listeners : {
//								click : {
//									fn : me.onButtonTestClick,
//									scope : me
//								}
//							}
//						}
						]
			},
			listeners : {
				show : {
					fn : me.onWindowViewShow,
					scope : me
				},
				hide : {
					fn : me.onWindowViewHide,
					scope : me
				}
			}
		});

		me.callParent(arguments);
	},
	onWindowViewShow : function(component, eOpts) {
		windowModelView = this;
		setTimeout(function() {toSelectModelViewPageInit();}, 100);
	},
	onWindowViewHide : function(component, eOpts) {
		windowModelView=null;
	},
	onButtonViewCancelClick : function(component, eOpts) {
		windowModelView=null;
		this.destroy();
	},
	onButtonSelectModelClick : function(component, eOpts) {
		toUpdateModel();
	}
	,onRadiofield4Change: function(field, newValue, oldValue, eOpts) {
		if(newValue){
			//OSS.getExtControl('radiogroupSelect').setValue(0);
			//OSS.getExtControl('radio5').setChecked(false);// checked=false;
			OSS.getExtControl('hour').setDisabled(true);
			OSS.getExtControl('minute').setDisabled(true);
		}else{
			//OSS.getExtControl('radiogroupSelect').setValue(1);
			OSS.getExtControl('hour').setDisabled(false);
			OSS.getExtControl('minute').setDisabled(false);
		}
    }
	,onRadiofield5Change: function(field, newValue, oldValue, eOpts) {
		if(newValue){
			//OSS.getExtControl('radiogroupSelect').setValue(1);
			//OSS.getExtControl('radio4').setChecked(false);
			//OSS.getExtControl('hour').setDisabled(true);
			//OSS.getExtControl('minute').setDisabled(true);
		}else{
			//OSS.getExtControl('radiogroupSelect').setValue(0);
			//OSS.getExtControl('hour').setDisabled(false);
			//OSS.getExtControl('minute').setDisabled(false);
		}
    }
});
var toSelectModelViewPageInit=function(){
	var myMask = new Ext.LoadMask(windowModelView.id, {msg : '正在修改上报模式,请稍等...'});
	myMask.show();
	Ext.Ajax.request({
			url : OSS.getAppName + "/rpt/rptpublish_selectModelInfo",
			method : 'post',
			params : {},
			success : function(response, options) {
				var d = Ext.JSON.decode(response.responseText)[0];
				if (d.auto == '0') {
					OSS.getExtControl('radiogroupSelect').setValue('2');
					OSS.setExtValue('hour', d.hour);
					OSS.setExtValue('minute', d.minute);
				}else{
					OSS.getExtControl('radiogroupSelect').setValue('1');
					OSS.getExtControl('hour').setDisabled(true);
					OSS.getExtControl('minute').setDisabled(true);
				}
			},
			failure : function(response) {
			},
			callback : function(o, r, n) {
				myMask.hide();
			}
		});
};
var toUpdateModel = function() {
	var formpPanel1 = Ext.getCmp("editFormModelView");
	if (formpPanel1.form.isValid()) {
		var myMask = new Ext.LoadMask(windowModelView.id, {msg : '正在修改上报模式,请稍等...'});
		myMask.show();
		Ext.Ajax.request({
			url : OSS.getAppName + "/rpt/rptpublish_selectModel",
			method : 'post',
			params : {
				declareDt3 : OSS.getExtValue('declareDt3'),
				radio4 : OSS.getExtValue('radio4'),
				radio5 : OSS.getExtValue('radio5'),
				hour   : OSS.getExtValue('hour'),
				minute : OSS.getExtValue('minute')
			},
			success : function(response, options) {
				//var message = response.responseText;
				var d = Ext.JSON.decode(response.responseText)[0];
				if (d.t == '1') {
					OSS.AlertInfo("设置上报模式成功！");
					//alert(OSS.getExtValue('radio4').toString()=="true");
					if(OSS.getExtValue('radio4').toString()=="true"){
						OSS.getExtControl('btnStartShbRH').setDisabled(false);
					}else{
						OSS.getExtControl('btnStartShbRH').setDisabled(true);
					}
				}else{
					OSS.AlertInfo("设置上报模式失败，请联系管理员！");
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