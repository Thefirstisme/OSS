//树的级联选择================================================================================================
function checkchange(node, checked) {
    if (!INDEX_CATEGORY_CHECKING) {
        INDEX_CATEGORY_CHECKING = true;
        checkchild(node, checked);
        checkparent(node);
        INDEX_CATEGORY_CHECKING = false;
    }
}
var INDEX_CATEGORY_CHECKING = false;

//选择子节点
function checkchild(node, checked) {
    node.eachChild(function(child) {
        if (child.childNodes.length > 0) {
            checkchild(child, checked); //递归
        }
        child.ui.toggleCheck(checked);
        child.attributes.checked = checked;
    });
}
//选择父节点
function checkparent(node) {
    if (!node) { return false; }
    var parentNode = node.parentNode;

    if (parentNode !== null) {
        var isall = true;

        parentNode.ui.toggleCheck(isall);
        parentNode.attributes.checked = isall;
    }
    checkparent(parentNode); //递归
}


//	         function checkparent(node) {
//	             if (!node) { return false; }
//	             var parentNode = node.parentNode;

//	             if (parentNode !== null) {
//	                 var isall = true;
//	                 parentNode.eachChild(function (n) {
//	                     if (!n.attributes.checked) {
//	                         isall = false;
//	                     }
//	                 });
//	                 if (isall) {
//	                     parentNode.ui.toggleCheck(isall);
//	                     parentNode.attributes.checked = isall;
//	                 } else {
//	                     parentNode.ui.toggleCheck(isall);
//	                     parentNode.attributes.checked = isall;
//	                 }
//	             }
//	             checkparent(parentNode); //递归
//	         }
//级联选择结束======================================================================================================


//装入当前面页面刷新================================================================================================
function Refresh() {
    location.reload();
}


//关闭浏览器=========================================================================================================
function CloseWin() {
    var ua = navigator.userAgent;
    var browserName = navigator.appName;
    if (browserName == "Microsoft Internet Explorer") {
        var IEversion = parseFloat(ua.substring(ua.indexOf("MSIE ") + 5, ua.indexOf(";", ua.indexOf("MSIE "))));
        if (IEversion < 5.5) {
            var str = '<object id=noTipClose classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11">';
            str += '<param name="Command" value="Close"></object>';
            document.body.insertAdjacentHTML("beforeEnd", str);
            document.all.noTipClose.Click();
        }
        else {
            window.opener = null;
            window.open('', '_self', '');
            window.close();
        }
    }
    else if (browserName == "Netscape") {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
    else {
        window.close();
    }
}

//关闭浏览器=========================================================================================================

//导入EXCEL=========================================================================================================

function ExportExcel(gridPanel, config) {
    if (gridPanel) {
        var tmpStore = gridPanel.getStore();
        var tmpExportContent = '';

        //以下处理分页grid数据导出的问题，从服务器中获取所有数据，需要考虑性能
        var tmpParam = Ext.ux.clone(tmpStore.lastOptions); //此处克隆了原网格数据源的参数信息
        if (tmpParam && tmpParam.params) {
            delete (tmpParam.params[tmpStore.paramNames.start]); //删除分页参数
            delete (tmpParam.params[tmpStore.paramNames.limit]);
        }
        var tmpAllStore = new Ext.data.GroupingStore({//重新定义一个数据源
            proxy: tmpStore.proxy,
            reader: tmpStore.reader
        });
        tmpAllStore.on('load', function(store) {
            config.store = store;
            tmpExportContent = gridPanel.getExcelXml(false, config); //此方法用到了一中的扩展
            if (Ext.isIE || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3) {//在这几种浏览器中才需要，IE8测试不能直接下载了
                if (!Ext.fly('frmDummy')) {
                    var frm = document.createElement('form');
                    frm.id = 'frmDummy';
                    frm.name = id;
                    frm.className = 'x-hidden';
                    document.body.appendChild(frm);
                }
                Ext.Ajax.request({
                    url: 'service/ExportServicePage.aspx', //将生成的xml发送到服务器端
                    method: 'POST',
                    form: Ext.fly('frmDummy'),
                    callback: function(o, s, r) {
                        //alert(r.responseText);
                    },
                    isUpload: true,
                    params: { ExportContent: tmpExportContent, ExportFile: gridPanel.id + '.xls' }
                });
            } else {
                document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(tmpExportContent);
            }
        });
        tmpAllStore.load(tmpParam); //获取所有数据
    }
};
//导入EXCEL=========================================================================================================

function FileDown(URL) {
    parent.location.href = URL;
}
function clickIE4(){
	if (event.button==2){
		return false;
	}
}
function clickNS4(e){
	if (document.layers||document.getElementById&&!document.all){
		if (e.which==2||e.which==3){
			return false;
		}
	}
}
function OnDeny(){
	if(event.ctrlKey || event.keyCode==78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode==115){
		return false;
	}
}
if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS4;
	document.onkeydown=OnDeny();
}else if (document.all&&!document.getElementById){
	document.onmousedown=clickIE4;
	document.onkeydown=OnDeny();
}
document.oncontextmenu=new Function("return false");