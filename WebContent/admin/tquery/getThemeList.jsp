<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="java.util.Date"%>
<%@page import="com.topcheer.oss.utils.OssCommon"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>单表管理</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/web.util.js?t=20131101"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/ProgressBarPager.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/grid/filter/Filter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/grid/filter/StringFilter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/grid/FiltersFeature.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/ActionTextColumn.js?t=1"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/admin/tquery/getThemeList.js?_t=<%=Math.random()%>"></script>
</head>
<body>

<script type="text/javascript">	
	    Ext.onReady(InitThemeList);
</script>
</body>
</html>