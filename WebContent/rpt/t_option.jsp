<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>

<%@page import="java.util.Date"%>
<%
Date dt=new Date(System.currentTimeMillis());
  String currentDate =DateUtil.date2String(DateUtil.addDays(dt, -1),DateUtil.FORMAT_DATE);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>期权</title>
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
var ServerDate='<%=currentDate %>';
var storeTxnAttri=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Txn_Attri_Cde") %>});
var getTxnAttriRender=function(value){var r = storeTxnAttri.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeCountryCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Country_Cde") %>});
var getCountryCdRender=function(value){var r = storeCountryCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeDomechargeAreaCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Dom_Area_Cde") %>});
var getDomechargeAreaCdRender=function(value){var r = storeDomechargeAreaCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeCurrencyCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Currency_Cde") %>});
var getCurrencyCdRender=function(value){var r = storeCurrencyCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};


</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_option/TOptionlist.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_option/TOptionedit.js?_t=<%=Math.random()%>"></script>
</head>
<body>
<script type="text/javascript">	
	    Ext.onReady(InitTOptionList);
</script>
</body>
</html>
