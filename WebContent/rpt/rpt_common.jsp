<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>
<%@page import="java.util.Date"%>
<%
	String referer=request.getHeader("Referer");
	if(referer==null||!referer.startsWith("http://localhost:7001/webapp/")){
		//response.sendRedirect("http://localhost:8080/OSS/login.jsp");
	}
	
	Date dt=new Date(System.currentTimeMillis());
	//String currentDate =DateUtil.date2String(DateUtil.addDays(dt, -1),DateUtil.FORMAT_DATE);
	String currentDate =DateUtil.date2String(dt,DateUtil.FORMAT_DATE);
	String shangBaoDateMaxValue =DateUtil.date2String(DateUtil.addDays(dt, 0),DateUtil.FORMAT_DATE3);
	String shangBaoDateMinValue =DateUtil.date2String(DateUtil.addDays(dt, -25),DateUtil.FORMAT_DATE3);
%>
<html>

<head>
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
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/rpt_util.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript">

//是否需要修改
var ifNeedChangeDic = function(value) {
	if (value == '0') {
		return "";
	} else if (value == '2') {
		return "否";
	} else if (value == '1') {
		return "是";
	}
};

var ServerDate='<%=currentDate %>';
var maxValue='<%=shangBaoDateMaxValue%>';
var minValue='<%=shangBaoDateMinValue%>';
var defaultOrgId='CN00192001';
</script>
</head>

</html>
