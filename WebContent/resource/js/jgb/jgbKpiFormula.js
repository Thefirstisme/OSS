var EdTable = function() {
    // 给单元格绑定事件
    function initBindGridEvent() {
        $("td.editable").unbind();
        // 添加单元格点击事件
        addGridClickEvent();
        // 添加单元格双击事件
        addGridDbClickEvent();
        // 添加键盘事件
        //addGridKeyPressEvent();
    }

    // 给单元格添加单击事件
    function addGridClickEvent() {
        $("td.simpleInput").bind("click", function() {
            $('.simpleInput').each(function() {
                $(this).removeClass("selectCell");
            });
            // 给选中的元素添加选中样式
            $(this).addClass("selectCell");
        });
    }

    //给单元格添加双击事件
    function addGridDbClickEvent() {
        $("td.simpleInput").bind("dblclick", function() {
            var rowIndex = $(this).attr("rowindex");
            var colName = $(this).attr("colname");
            var id = Ext.getCmp("cmbKPIReportList").getValue();
            var myMask = new Ext.LoadMask(document.body, { msg: '正在校验和缓存数据,请稍等...' });
            myMask.show();
            Ext.Ajax.request({ 
        		url: OSS.getAppName+"/jgb/jgbKpiFormulaCell_saveFormulaFactor",
        		method : 'post', 
        		params : {
        			id: id,
        			ri: rowIndex,
        			cn: colName
        		},
        		success : function(response, options){ 
        			 var data = Ext.JSON.decode(response.responseText);  
        			 myMask.hide();
        			 if(data)
        			 {
        				 if (data.msg == "0") {
        					 $('.simpleInput').each(function() {
                                 $(this).removeClass("selectCell");
                             });
        					 setEditRefreshData();
                         }
        				 else if (data.msg == "1") {
        					 //Ext.Msg.alert("提示", "第一项公式因子只能选择当前编辑的报表单元格", setCmbReportDataInit);
        					 Ext.Msg.alert("提示", "第一项公式因子只能选择当前编辑的报表单元格");
                         }else{
                        	 Ext.Msg.alert("提示", data.msg);
                         }
        			 }
        		 },
        		 failure : function(response){ 
        			 myMask.hide();
        		 },
        		 callback: function(o, r, n){
        			 myMask.hide();
        		 }
        	});
        });
    }

    // 单元格失去焦点后保存表格信息
    function saveEdit(gridCell) {
        var pnt = $(gridCell).parent();
        var tt = $(gridCell);
        var rowIndex = pnt.attr("rowindex");
        var colName = pnt.attr("colname");
        var val = $(gridCell).attr("value");
        CompanyX.SaveCellEditValue(rowIndex, colName, val, {
            success: function(result) {
                if (result != "0") {
                    $(pnt).html($(gridCell).attr("value"));
                    $(gridCell).remove();
                }
                else {
                    $(pnt).html($(gridCell).attr("value"));
                    $(gridCell).remove();
                }
            },
            failure: function() {
                $(pnt).html($(gridCell).attr("value"));
                $(gridCell).remove();
            }
        });

    }
    return {
        initBindGridEvent: initBindGridEvent,
        saveEdit: saveEdit
    };
} ();
function setCmbReportDataInit() {
    var editCode = Ext.getCmp("hidEditReportId").getValue();
    Ext.getCmp("cmbReport").setValue(editCode);
    Ext.getCmp("cmbReport").fireEvent('select');
}
function setButtonExpress(text, type) {
	Ext.Ajax.request({ 
		url: OSS.getAppName+"/jgb/jgbKpiFormulaCell_setButtonExpressText",
		method : 'post', 
		params : {te: text,ty:type},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText); 
			 if(data.msg!='0')
			 {
				 Ext.Msg.alert("提示", data.msg);
			 }else{
				 setEditRefreshData();
			 }
		 },
		 failure : function(response){ 
		 }
	});
}
function setButtonExpressOper(text, type) {
	Ext.Ajax.request({ 
		url: OSS.getAppName+"/jgb/jgbKpiFormulaCell_setButtonExpressTextOper",
		method : 'post', 
		params : {te: text,ty:type},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);  
			 if(data.msg!='0')
			 {
				 Ext.Msg.alert("提示", data.msg);
			 }else{
				 setEditRefreshData();
			 }
		 },
		 failure : function(response){ 
		 }
	});
}
function GetStringCurrentEval() {
    var msg;
    var expression = "1==2";
    CompanyX.GetStringEval(expression, {
        success: function(result) {
            alert(result);
        }
    });
}
function CalenderMessage(msg) {
    Ext.net.Notification.show({
        hideFx: {
            fxName: 'switchOff',
            args: [{}]
        },
        showFx: {
            args: [
                            'C3DAF9',
                            1,
                            {
                                duration: 2.0
                            }
                          ],
            fxName: 'frame'
        },
        pinEvent: 'click',
        alignToCfg: {
            offset: [-20, -20],
            position: 'br-br'
        },
        html: '<span style="color:red;">' + msg + '</span>',
        title: '提示信息'
    });
}
var completeTimeTrait = function(e, newValue, oldValue) {
    var type = e.record.data.FACTORTYPE;
    var iscustom = e.record.data.ISCUSTOM;
    //alert(type);
    if (type == '2' && iscustom == '0') {
        return true;
    }
    else {
        return false;
    }
};
var cmdTimeTrait_Render = function(value, meta, rec) {
    var r = Store_TimeTrait.getById(value);
    if (Ext.isEmpty(r)) {
        return "--";
    }
    var typeNameRec = Store_ReportType.getById(rec.data.REPORTTYPE);
    if (Ext.isEmpty(typeNameRec)) {
        return r.data.Places;
    }
    else {
        var paraDesc = "";
        var paraVal = typeNameRec.data.PARAVAL;
        switch (paraVal) {
            case "101":
                paraDesc = "月";
                break;
            case "102":
                paraDesc = "季";
                break;
            case "103":
                paraDesc = "半年";
                break;
            case "104":
                paraDesc = "年";
                break;
        }
        //alert(r.data.Places);
        return r.data.Places + paraDesc;
    }
};
var FormulaCellTip = function(value, meta, rec, rowIndex, coIndex, ds) {
    if (value != null && value != "") {
        var tips = "<div ext:qtitle='' ext:qtip='" + value + "'>" + value + "</div>";
        return tips;
    }
};
function ShowCellLocation(rowNo, colNo) {
    if (rowNo) {
        $("#locationMsg").css("display", "block");
        $("#locationMsg").html("当期位置,列:"+colNo+" 行:"+rowNo);
    }
}
function HideCellLocation() {
    $("#locationMsg").css("display", "none");
}
$.fn.smartFloat = function() {
    var position = function(element) {
        var top = element.position().top;
        var pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function() {
        position($(this));
    });
};