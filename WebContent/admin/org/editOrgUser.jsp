<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构修改</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/TreeFilter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/oss.treepanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/admin/org/editOrgUser.js?_t=<%=Math.random()%>"></script>
</head>
<body>
<script type="text/javascript">	
	    Ext.onReady(InitOrgUserEdit);
</script>
</body>
</html>