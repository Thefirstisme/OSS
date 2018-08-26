<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="Shortcut Icon" href="resources/images/favicon1.gif" type="image/gif" />
<title>上海银行上海自贸区人行信息报送系统</title>
<link rel="Shortcut Icon" href="<%=request.getContextPath()%>/resource/images/favicon1.gif" type="image/gif" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<style>
		.TopLeftCls{
			padding-left: 15px;
			width:204px;
			height:60px;
		}
		.TopCenterCls{
			padding-left: 15px; 
			width: auto; 
			font-weight: bold; 
			font-family: 华文行楷;
			font-size: 20pt; 
			color: #4798D7;
			text-align:center;
			vertical-align: middle;
			margin: 15px 0 0 0;
		}
		.TopRightCls{
			width:305px;
		}
		.x-tab-default-top .x-tab-inner {
			height: 14px !important;
			line-height: 14px !important;
		}
		.ext-ie .x-tree .x-panel-body {position: relative;}
	    .ext-ie .x-tree .x-tree-root-ct  {position: absolute;}
	</style>
</head>
<body>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/web.util.js?t=20131101"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/BoxReorderer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/TabReorderer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/TabCloseMenu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/TreeFilter.js?t=1"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/oss.treepanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/main.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript">	
	    Ext.onReady(InitMain);
</script>
</body>
</html>