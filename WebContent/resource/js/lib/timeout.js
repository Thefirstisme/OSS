Ext.Ajax.on('requestcomplete', checkUserSessionStatus, this);
function checkUserSessionStatus(conn, response, options) {
	var str = response.responseText;
	if (str == 'timeout') {
		Ext.Msg.alert('信息', '连接已超时,请重新登录!', function() {
			Ext.Ajax.request({
				url : '/OSS/admin/login/login_getLoginPath',
				method : 'post',
				params : {},
				success : reLogin,

				failure : function(response) {
				}
			});
		});
	}
}
function reLogin(result) {
	var c1 = result.responseText;
	top.location.href = c1;
}