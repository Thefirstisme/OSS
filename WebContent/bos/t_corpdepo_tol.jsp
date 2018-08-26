<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.topcheer.base.utils.DateUtil"%>
<%@page import="com.topcheer.base.dic.util.DicUtil"%>
<%@page import="java.util.Date"%>
<%@include file="bos_common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>单位存款-汇总</title>
<script type="text/javascript">

var storeCustType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Cust_Type_Cde") %>});
var getCustTypeRender=function(value){var r = storeCustType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeFixDepoInd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Fix_Depo_Ind_Cde") %>});
var getFixDepoIndRender=function(value){var r = storeFixDepoInd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeIdenType=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Iden_Type_Cde") %>});
var getIdenTypeRender=function(value){var r = storeIdenType.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};


var storeCountryCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Country_Cde") %>});
var getCountryCdRender=function(value){var r = storeCountryCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};
 
var storeDomechargeAreaCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Dom_Area_Cde") %>});
var getDomechargeAreaCdRender=function(value){var r = storeDomechargeAreaCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storePeriodUnit=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Period_Unit_Cde") %>});
var getPeriodUnitRender=function(value){var r = storePeriodUnit.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeCateg=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Cat_Cde") %>});
var getCategRender=function(value){var r = storeCateg.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};


var storeCurrencyCd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Currency_Cde") %>});
var getCurrencyCdRender=function(value){var r = storeCurrencyCd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

var storeOutInAcctInd=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Out_In_Acct_Ind_Cde") %>});
var getOutInAcctIndRender=function(value){var r = storeOutInAcctInd.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};


var storeTxnAttri=Ext.create('Ext.data.Store', { fields: kValFields, data : <%=DicUtil.getInstance().getRptDic("T_Txn_Attri_Cde") %>});
var getTxnAttriRender=function(value){var r = storeTxnAttri.getById(value);if (!Ext.isEmpty(r)) {return r.data.name;}else{return value;}};

</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_corpdepo_tol/TCorpdepoTollist.js?_t=<%=Math.random()%>"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/view/rpt/t_corpdepo_tol/TCorpdepoToledit.js?_t=<%=Math.random()%>"></script>
</head>
<body>
<script type="text/javascript">	
	    Ext.onReady(InitTCorpdepoTolList);
</script>
</body>
</html>
