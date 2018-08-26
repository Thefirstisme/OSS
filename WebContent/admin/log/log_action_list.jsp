<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SQL日志查询</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/web.util.js?t=20131101"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/admin/log/log_action_list.js?_t=<%=Math.random()%>"></script>
</head>
<body>
<script type="text/javascript">	
	    Ext.onReady(InitLogActionList);
</script>
</body>
</html>