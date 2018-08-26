<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上海银行上海自贸区人行信息报送系统</title>
<link rel="Shortcut Icon" href="<%=request.getContextPath()%>/resource/images/favicon1.gif" type="image/gif" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<style>
.loginTopCls {
	text-align: center;
	font-size: 18pt;
	font-family: 华文行楷;
	font-weight: bold;
	color: #191970;
	background-image: url(resource/images/logingb.png);
	vertical-align: middle;
	padding-top: 25px;
	height: 80px;
}

.lableTitle {
	vertical-align: middle;
	text-align: center;
	margin-top: 5px;
}

.ds {
	padding-top: 80px;
}

.textField-loginUser {
	background-image: url(resource/images/icons/icoSummary/user.png)
		!important;
	background-repeat: no-repeat;
	background-position: left;
	padding-left: 18px;
}

.textField-loginKey {
	background-image: url(resource/images/icons/icoSummary/key.png)
		!important;
	background-repeat: no-repeat;
	background-position: left;
	padding-left: 18px;
}
</style>
</head>
<body>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/login.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript">	
	    Ext.onReady(initLogin);
</script>
</body>
</html>