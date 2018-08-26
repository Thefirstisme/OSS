<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="Shortcut Icon" href="resources/images/favicon1.gif" type="image/gif" />
<title>面板页</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/jsTest/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/js/portal/portal.css" />
</head>
<body>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/jsTest/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/web.util.js?t=20131101"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/BoxReorderer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/TabReorderer.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/PortalDropZone.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/PortalPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/PortalColumn.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/Portlet.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/ChartPortlet.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/portal/classes/GridPortlet.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/itemportal.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript">	
	    Ext.onReady(initItemPortal);
</script>
<span id="app-msg" style="display:none;"></span>
</body>
</html>