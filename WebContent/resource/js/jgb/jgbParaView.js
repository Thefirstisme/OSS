function MenuReady() {
//    Ext.override(Ext.menu.Menu, {
//        showAt: function(xy, parentMenu, _e) {
//            this.parentMenu = parentMenu;
//            if (!this.el) {
//                this.render();
//            }
//            if (_e !== false) {
//                this.fireEvent("beforeshow", this);
//                xy = this.el.adjustForConstraints(xy);
//            }
//            this.el.setXY(xy);
//            var maxHeight = Ext.getBody().getHeight() - xy[1];
//            if (this.el.getHeight() > maxHeight) {
//                this.el.setHeight(maxHeight);
//                this.el.applyStyles('overflow-y: auto;');
//            }
//            this.el.show();
//            this.hidden = false;
//            this.focus();
//            this.fireEvent("show", this);
//        },
//        autoWidth: function() {
//            if (/^\d+$/.test(this.width + '')) {
//                this.width += "px";
//            }
//        }
//    });
}
window.setKpiFormula = function(kpiId,kpiName) {
	Ext.getCmp('txtKPI_FORMULAEdit').setValue(kpiId);
};
function CalenderMessage(msg) {
    Ext.create('Ext.ux.window.Notification', {
        title: '提示信息',
        closeVisible: true,
        autoHide: false,
        iconCls: 'icon-exclamation',
        position: 'br',
        manager: 'demo1',
        html: msg
    }).show();
}

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