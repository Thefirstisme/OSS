<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="java.util.Date"%>
<%@include file="rpt_common.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>报表发布</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/css/iconSummary.css" />
<style>
 .status_green{
  color:green;font-weight:bold;
 }
 .status_red{
  color:red;font-weight:bold;
 }
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/timeout.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/js/lib/web.util.js?t=201403261"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/ux/ProgressBarPager.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/rpt_util.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript">
var ServerDate='<%=currentDate %>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_publish/Tpublish.js?_t=<%=Math.random()%>"></script>
</head>
<body>

<script type="text/javascript">	
	    Ext.onReady(InitpublishList);
</script>
<script type="text/javascript">	
//window.onerror=function(){return true;}; 
</script>
</body>
</html>
