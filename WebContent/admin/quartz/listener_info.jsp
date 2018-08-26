<%@ page language="java" pageEncoding="GB18030"%>

<%@page import="com.quarts.manager.QuartzManager" %>
<%@page import="com.quarts.manager.vo.QuartzJobVo"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/core/";

String listenerId = request.getParameter("id");

QuartzJobVo quartz = QuartzManager.getInstance().getQuartzListenerById(listenerId);
if(quartz==null) quartz=new QuartzJobVo();
%>

<html>
  <head>
    <base href="<%=basePath%>">
    <title>quartz</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    <form name="quartzForm" method="post" action="" onReset="changeTrigger('3')">
    <input id="listenerId" name="listenerId" type="hidden" value="<%=StringUtils.trimToEmpty(quartz.getListenerId()) %>">
<table width="80%" border="0" cellpadding="0" cellspacing="0"> 
  <tr>
    <td>���ƣ�</td>
    <td><input name="listenerName" type="text" id="listenerName" value="<%=StringUtils.trimToEmpty(quartz.getListenerName()) %>" size="40"></td>
  </tr>
  <tr>
    <td>�����ƣ�</td>
    <td><input name="listenerClassName" type="text" id="listenerClassName" value="<%=StringUtils.trimToEmpty(quartz.getListenerClassName()) %>" size="40"></td>
  </tr>
</table>

    <p>
      <input type="button" name="b1" value="��&nbsp;&nbsp;��" onClick="onSubmitDo()">&nbsp;
      <input type="reset" name="b2" value="��&nbsp;&nbsp;��">&nbsp;
      <input type="button" name="b3" value="��&nbsp;&nbsp;��" onClick="history.go(-1)">      
    </p>
    </form>
</body>
<script language="javascript">
<!--
function checkNull(){
    if(quartzForm.listenerName.value==""){
		alert("���������ƣ�");
		quartzForm.listenerName.focus();
		return false;
	}
}

//ҳ���ύ
function onSubmitDo(){
    //alert(quartzForm.listenerId.value);
	if(checkNull()) return;
		
 	//========�ж����������޸�===========//
  	if(quartzForm.listenerId.value==""){
  		quartzForm.action="<%=basePath%>quartz/controller.jsp?method=addListener";
  	} else {
  		quartzForm.action="<%=basePath%>quartz/controller.jsp?method=modifyListener";
	}
	
	//alert(quartzForm.action);	
	quartzForm.submit();
}
//-->
</script>
</html>
