<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="java.util.Date"%>
<%@include file="rpt_common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>FTE、FTN、FTU账户信息报送</title>
<script type="text/javascript">

var storeIdenType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Iden_Type_Cde") %>});
var getIdenTypeRender=function(value){var r = storeIdenType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeOperType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Oper_Type_Cde") %>});
var getOperTypeRender=function(value){var r = storeOperType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeCateg=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Cat_Cde") %>});
var getCategRender=function(value){var r = storeCateg.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};
// 货币
var storeCurrencyCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Currency_Cde") %>});
var getCurrencyCdRender=function(value){var r = storeCurrencyCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

// 账户状态
var accstatusType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Acct_Stat_Cde") %>});
var getAccstatusTypeRender=function(value){var r = accstatusType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};
// 国民经济部门分类
var depttypeType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Nat_Econm_Dept_Type_Cde") %>});
var getDepttypeTypeRender=function(value){var r = depttypeType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeBalanceCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Balance_Cd") %>});
var getBalanceCdRender=function(value){var r = storeBalanceCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};


</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_fte_acctinfo/TFteAcctinfolist.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_fte_acctinfo/TFteAcctinfoedit.js?_t=<%=Math.random()%>"></script>
</head>
<body>
<script type="text/javascript">	
	    Ext.onReady(InitTFteAcctinfoList);
</script>
</body>
</html>
