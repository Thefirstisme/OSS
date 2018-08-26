Ext.define('OSS.view.publishList', {
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
	                        xtype: 'rownumberer',
	                        width    : 40,
	                        sortable: false,
	                        resizable: true
                    	},
                        {
							xtype : 'gridcolumn',
							width    : 250,
							text : '报文标识号',
							dataIndex : 'msgid'
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
                            width    : 150,
                            text: '生成时间',
                            dataIndex: 'createDt'
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 150,
                            text: '上报/接收时间',
                            dataIndex: 'publishDt',
                            renderer:renderpublishDt
                        },
                        {
                            xtype: 'gridcolumn',
                            width    : 50,
                            text: '报文 ',
                            dataIndex: 'msgid',
                            sortable:false,
                            renderer:renderXML
                        },
                        {
                            xtype: 'gridcolumn',
                            width    : 50,
                            text: '结果 ',
                            dataIndex: 'msgid',
                            sortable:false,
                            renderer:renderreXML
                        }
                        ,{
                            xtype: 'gridcolumn',
                            width    : 200,
                            text: '状态',
                            dataIndex: 'status',
                            renderer:renderstatus
                        } 
                        
                    ],                   
                    features : [ 
                                { 
                               	 ftype : 'filters',
                               	 encode: false,
                               	 menuFilterText: '搜索',
                               	 filters: [
//                               	     {type: 'string',dataIndex: 'debtsId'}
//                                    ,{type: 'string',dataIndex: 'finName'}
//                                    ,{type: 'string',dataIndex: 'state'}
//                                    ,{type: 'string',dataIndex: 'town'}
                               	 ]
                                }
                           ],
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
									blankText: '您未输入申报日期',
			                        emptyText: '请输入申报日期',
			                        //allowBlank: false,
			                        editable: true,
			                        value: ServerDate,
									maxLength : 50,
									labelWidth : 70
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
								},
                                    {
                                    xtype: 'tbfill'
                                }
                            ]
                        }
                    ],
	                listeners: {
	                    itemdblclick: {
	                        fn: me.onGridPanelItemDblClick,
	                        scope: me
	                    }
	                }
                }
            ]
        });

        me.callParent(arguments);
    },
    onCmbPageSizeMainSelect : function(combo, records, eOpts) {
		var pSize = parseInt(records[0].data.id);
		Ext.getCmp('PagingToolbarMain').pageSize = pSize;
		storeMain.pageSize = pSize;
		refreshGriPanel(_doaction);
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
    }
});
var _doaction="1";
function showRowData(t,msgid){
  var xmlId="xml_"+msgid;
  if(t==2){
	  xmlId="xml_re_"+msgid;
  }
  if(Ext.get('showxmlpanel')){
	  Ext.get('xml_show').dom.value=Ext.get(xmlId).dom.innerHTML;
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
	    tools:[{id:"close",handler:function(){Ext.get('showxmlpanel').hide();}}],
	    width: 500,
	    height: 350,
	    html: "<textarea id=\"xml_show\" data-height=\"490\" style=\"height: 310px;width:490px;\">"+Ext.get(xmlId).dom.innerHTML+"</textarea>",
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
	
	var custId="cust_"+record.data.msgid;	
    if (value == '0') {
        return "<span id="+custId+" style='color:red;font-weight:bold;'>未上报</span>";
    } else  if (value == '1'){
        return "<span id="+custId+" style='color:green;font-weight:bold;'>已上报</span>";
    } else  if (value == '3'){
        return "<span id="+custId+" style='color:green;font-weight:bold;'>上报中...</span>";
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
	var btnxmlreId="btn_xml_re_"+record.data.msgid;
	if(record.data.status == '0' || record.data.status == '9'){
		return "<img id='"+btnxmlreId+"'  style=\"cursor:pointer;padding-left:5px;display:none;\" onclick=\"showRowData(2,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
	}else{
		return "<img id='"+btnxmlreId+"' style=\"cursor:pointer;padding-left:5px;\" onclick=\"showRowData(2,'"+value+"')\" src=\"../resource/images/icons/icoSummary/report.png\" \>";
	}
}
function renderCheckbox(value,cellmeta,record,rowIndex,columnIndex,store){
	if (record.data.status == '0') {
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
			idList=idList+i.dom.value;
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
	Ext.getCmp('GridPanelMain').doComponentLayout();
	Ext.getCmp('GridPanelMain').invalidateScroller();
};
var storeMain = Ext.create('Ext.data.JsonStore', {
	autoLoad: true,
	pageSize:50,
	idProperty: 'msgid',
	remoteSort: true,
	fields: [
	    {name: 'msgid',type:'string'},     
	    {name: 'rptId',type:'string'},
	    {name: 'rptNm',type:'string'},
	    {name: 'createDt',type:'string'},
	    {name: 'publishDt',type:'string'},
	    {name: 'status',type:'string'},
	    {name: 'xml',type:'string'},
	    {name: 'dataDt',type:'string'},
	    {name: 'reXml',type:'string'}
	  
    ],
    proxy:new Ext.data.HttpProxy({
		url:OSS.getAppName+'/rpt/rptpublishHis_toList',
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
			var id= i.dom.value;
			var custId="cust_"+id;
			Ext.get(custId).dom.style="color:green;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="上报中...";	
			i.dom.disabled=true;
		}
	}); 
	
	Ext.Ajax.request({ 
		url:OSS.getAppName+'/rpt/rptpublishHis_toEdit',
		method : 'post', 
		params : {msgids: msgids},
		success : function(response, options){	
			//var custId="cust_"+options.params.id;
			 //Ext.get(custId).dom.innerHTML="上报成功!";	
			startMonitor();
		 },
		 failure : function(response){ 
			// var custId="cust_"+options.params.id;
			// Ext.get(custId).dom.style="color:red;font-weight:bold;";
			 //Ext.get(custId).dom.innerHTML="上报失败!";
		 }
	});
	 
	var task_Mointor = {
	 	run : function() {
	 		var datatime = OSS.getExtValue('txtdatatime');
	 		Ext.Ajax.request({ 
	 			url:OSS.getAppName+'/rpt/rptpublishHis_toList',
	 			method : 'post', 
	 			params : {msgids: msgids,datatime:datatime},
	 			success : function(response, options){	
	 				var responsesData = Ext.JSON.decode(response.responseText);
	 				var data;
	 				if(responsesData){
	 					data=responsesData.data;
	 				}
	 				var isEnd=true;
	 				if(data)
	 				{
	 					 for (var i = 0; i < data.length; i++) { 
	 						if("3" != data[i].status){
	 							setStatus(data[i].msgid,data[i]);
	 						}else{
	 							isEnd=false;
	 						}
	 					 }
	 				}
	 				if(isEnd){
	 					eOpts.disabled=false;
	 					stopMonitor();
	 				}
	 			}
	 		});
	 		 
	 	},    
	 	interval : 4000
	}; 
	function stopMonitor()  
    {  
        Ext.TaskManager.stop(task_Mointor);  
    }
	function startMonitor()  
    {  
		Ext.TaskManager.start(task_Mointor);  
    }
	
	
	function setStatus(msgid,record) {		
		var custId="cust_"+msgid;
	    if (record.status == '0') {
	    	Ext.get(custId).dom.style="color:red;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="未上报";
	    } else  if (record.status == '1'){
	    	Ext.get(custId).dom.style="color:green;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="已上报";
	    } else  if (record.status == '3'){
	    	Ext.get(custId).dom.style="color:green;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="上报中...";
	    }else  if (record.status == '2'){
	    	Ext.get(custId).dom.style="color:red;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="上报失败";
	    }
	    else  if (record.status == '9'){
	    	Ext.get(custId).dom.style="color:green;font-weight:bold;";
			Ext.get(custId).dom.innerHTML="下发数据";
	    }
	    var dtId="publish_"+msgid;
	    Ext.get(dtId).dom.innerHTML=record.publishDt;
	    var xmlId="xml_"+msgid;
	    Ext.get(xmlId).dom.innerHTML=record.xml;
	    var xmlreId="xml_re_"+msgid;
	    Ext.get(xmlreId).dom.innerHTML=record.reXml;
	    var btnxmlreId="btn_xml_re_"+record.msgid;
	    Ext.get(btnxmlreId).show();
	}
  }
}

var InitpublishList=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.publishList();
};

