var reusable = null;
function CalenderMessage(msg) {
	//alert(reusable);
	if (!reusable) {
		reusable=Ext.create('widget.uxNotification', {
			title: '提示信息',
			closeAction: 'hide',
			position: 'br',
			manager: 'PanelMainHtmlEdit',
			useXAxis: false,
			iconCls: 'icon-information',
			autoHide: false
		});
	}
	reusable.update(msg);
	reusable.show();
}
var getRowClass = function(record) {
    if (record.data.VerifyState == '1') {
        return "verifyClass";
    }
};
var LeftCellTip = function(value, meta, rec, rowIndex, coIndex, ds) {
	return "<div title='" + rec.data.LeftValue + "'>" + value + "</div>";
};
var RightCellTip = function(value, meta, rec, rowIndex, coIndex, ds) {
	return "<div title='" + rec.data.RightValue + "'>" + value + "</div>";
};
var CommandPerpare = function(grid, toolbar, rowIndex, record) {
    var firstButton = toolbar.items.get(0);
    var secondButton = toolbar.items.get(1);
    var thirdButton = toolbar.items.get(2);
    if (record.data.VerifyState == '0') {
        if (thirdButton) {
            thirdButton.hide();
        }
        if (secondButton) {
            secondButton.hide();
        }
    }
    else {
        if (firstButton) {
            firstButton.hide();
        }
    }
};
function CalenderMessage2(msg) {
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
        html: msg,
        autoHide: false,
        title: '提示信息'
    });
}

var isIE = false;
var isFF = false;
var isSa = false;
var GlobalValue = 0;
if ((navigator.userAgent.indexOf("MSIE") > 0) && (parseInt(navigator.appVersion) >= 4)) isIE = true;
if (navigator.userAgent.indexOf("Firefox") > 0) isFF = true;
if (navigator.userAgent.indexOf("Safari") > 0) isSa = true;
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
    var oldEditValue;
    //给单元格添加双击事件
    function addGridDbClickEvent() {
        $("td.simpleInput").bind("dblclick", function() {
            var val = $.trim($(this).html());
            oldEditValue = val;
            if (val.indexOf("<input") > -1) { return; }
            $('.simpleInput').each(function() {
                $(this).removeClass("selectCell");
            });
            var width = $(this).css("width");
            var height = $(this).css("height");
            var isnum = $(this).attr("isnum");
            if (isnum) {
                if (isnum == "0") {
                    $(this).html("<input type='text' onblur='EdTable.saveEdit(this)' style='width:" + width + ";height:" + height + "; padding:0px; margin:0px;text-align: right;' value='" + val + "' maxlength='20' onpaste=\"return false\" onkeypress=\"return onlyNumber(event);\" onfocus=\"this.style.imeMode='disabled';\">");
                }
                else {
                    $(this).html("<input type='text' onblur='EdTable.saveEdit(this)' style='width:" + width + ";height:" + height + "; padding:0px; margin:0px;' value='" + val + "' maxlength='300'>");
                }
                $(this).children("input").select();
            }
        });
    }

    // 给单元格添加键盘事件
    function addGridKeyPressEvent() {
        $(document).keyup(function(event) {
            if (event.keyCode == 37) {
                // 左箭头
                var selectCell = $(".selectCell").prev()[0];
                if (selectCell != undefined) {
                    $(".selectCell").removeClass("selectCell").prev().addClass("selectCell");
                }
            } else if (event.keyCode == 38) {
                // 上箭头
                var col = $(".selectCell").prevAll().length;
                var topCell = $(".selectCell").parent("tr").prev().children()[col];
                if (topCell != undefined) {
                    $(".selectCell").removeClass("selectCell");
                    $(topCell).addClass("selectCell");
                }
            } else if (event.keyCode == 39) {
                // 右箭头
                var selectCell = $(".selectCell").next()[0];
                if (selectCell != undefined) {
                    $(".selectCell").removeClass("selectCell").next().addClass("selectCell");
                }
            } else if (event.keyCode == 40 || event.keyCode == 9) {
                // 下箭头
                var col = $(".selectCell").prevAll().length;
                var topCell = $(".selectCell").parent("tr").next().children()[col];
                if (topCell != undefined) {
                    $(".selectCell").removeClass("selectCell");
                    $(topCell).addClass("selectCell");
                }
            } else if (event.keyCode == 13) {
                // 回车键
                var selectCell = $(".selectCell")[0];
                if (selectCell != undefined) {
                    $(selectCell).dblclick();
                }
                else {
                    if (isIE) {
                        event.returnValue = false;
                    }
                    else {
                        event.preventDefault();
                    }
                }
            }
        });
    }

    // 单元格失去焦点后保存表格信息
    function saveEdit(gridCell) {
        var pnt = $(gridCell).parent();
        var tt = $(gridCell);
        var rowIndex = pnt.attr("rowindex");
        var colName = pnt.attr("colname");
        var val = $.trim($(gridCell).attr("value"));
        var regex=new RegExp("^(-?\\d+)(\\.\\d+)?$");
        if(!StringRegex(regex,val)){
        	//$(gridCell).attr("value",oldEditValue);  
        	$(pnt).html(oldEditValue);
            $(gridCell).remove();
        	OSS.AlertError('单元格数据不能包含非数字的数据！\''+val+'\'');
        }else{
	        var reportCode=Ext.getCmp('txtReportCode').getValue();
	        //var reportType=Ext.getCmp('txtReportType').getValue();
	        var dt=Ext.getCmp('txtCurrentTime').getValue();
	        if (val != oldEditValue) {
	            var myMask = new Ext.LoadMask(document.body, { msg: '正在保存调整数据,请稍等...' });
	            myMask.show();
	            Ext.Ajax.request({ 
	        		url: OSS.getAppName+"/jgb/jgb_setCellDataUpdate",
	        		method : 'post', 
	        		params : {
	        			id: reportCode,
	        			ri: rowIndex,
	        			cn: colName,
	        			val: val,
	        			ti:dt,
	        			orgid:'',
	        			oid: OSS.getExtValue('txtReceiveObject'),
	        			uid: OSS.getExtValue('txtSubmitUnit')
	        		},
	        		success : function(response, options){ 
	        			 var data = Ext.JSON.decode(response.responseText);  
	        			 if(data)
	        			 {
	        				 if (data.msg != "0") {
	                             //$(pnt).html($(gridCell).attr("value"));
	                             //$(gridCell).remove();
	        					 setReportSearch(Ext.getCmp('PanelMainHtmlEdit'));
	                         }
	                         else {
	                             $(pnt).html(oldEditValue);
	                             $(gridCell).remove();
	                         }
	        			 }
	        		 },
	        		 failure : function(response){ 
	        			 $(pnt).html($(gridCell).attr("value"));
	                     $(gridCell).remove();
	        		 },
	        		 callback: function(o, r, n){
	        			 myMask.hide();
	        		 }
	        	});
	        }
	        else {
	            $(pnt).html($(gridCell).attr("value"));
	            $(gridCell).remove();
	        }
    		}
	    }
	    return {
	        initBindGridEvent: initBindGridEvent,
	        saveEdit: saveEdit
	    };
} ();
var setFocus=function(obj){
	if(obj!=null){
		obj.focus();   
	}
};
var StringRegex=function(regex,s){
	return regex.test(s);
};
function onlyNumber(e) {
    var iKeyCode = window.event ? e.keyCode : e.which;
    if (!(((iKeyCode >= 48) && (iKeyCode <= 57)) || (iKeyCode == 13) || (iKeyCode == 46) || (iKeyCode == 45) || (iKeyCode == 37) || (iKeyCode == 39) || (iKeyCode == 8))) {
        if (isIE) {
            e.returnValue = false;
        }
        else {
            e.preventDefault();
        }
    }
}
function SetButtonEnter(e) {
    var iKeyCode = window.event ? e.keyCode : e.which;
    if (iKeyCode == 13) {
        if (isIE) {
            e.returnValue = false;
        }
        else {
            e.preventDefault();
        }
    }
}

var PredicateChange = function(value) {
    var result = "等于";
    switch (value) {
        case "=":
            result = "等于";
            break;
        case "!=":
            result = "不等于";
            break;
        case ">":
            result = "大于";
            break;
        case ">=":
            result = "大于等于";
            break;
        case "<":
            result = "小于";
            break;
        case "<=":
            result = "小于等于";
            break;
        default:
            result = "等于";
            break;
    }
    return result;
};
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
function ShowCellLocation(rowNo, colNo) {
    if (rowNo) {
        $("#locationMsg").css("display", "block");
        $("#locationMsg").html("当期位置,列:"+colNo+" 行:"+rowNo);
    }
}
function HideCellLocation() {
    $("#locationMsg").css("display", "none");
}

function setCellRightMenu(){
	var isData=OSS.getExtValue('txtDataExist');
	if(isData=='1'){
		$("#editableTable td").each(function(){
			var id=$(this).attr("id");
			if(id){
				var isDrill=$(this).attr("isDrill");
				var colname=$(this).attr("colname");
				var rowindex=$(this).attr("rowindex");
				if(isDrill){
					Ext.get(id).on("contextmenu",function(e){
		    			showRightMenu(e,colname,rowindex);
		    		});
				}
			}
		});
	}
}
function showRightMenu(oEvent,colname,rowindex){
	oEvent.preventDefault();    
	oEvent.stopEvent();// 取消浏览器默认事件   
	OSS.setExtValue('txtCurrColName', colname);
	OSS.setExtValue('txtCurrRowIndex', rowindex);
    var array = [ {    
                text : '查看指标组成',
                iconCls: 'icon-textlefttoright',
                handler : function() {
                	//var win=OSS.view.RegulatoryKpiDrill();
                	//win.refresh();
                	//win.show();
                	new OSS.view.RegulatoryKpiDrill().show();
                	setTreeGridInit();
                }    
            }
//    , {    
//                text : '修改代码',    
//                handler : function() {  
//  
//                }    
//            }
    ];    
    var nodemenu = new Ext.menu.Menu({    
        items : array    
    });
    nodemenu.showAt(oEvent.getXY());
}