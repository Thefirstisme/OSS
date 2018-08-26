<%@ page language="java" pageEncoding="GB18030"%>

<%@page import="com.quarts.manager.QuartzManager" %>
<%@page import="com.quarts.manager.vo.QuartzJobVo"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Date" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/core/";

String jobId = request.getParameter("id");

QuartzJobVo quartz = QuartzManager.getInstance().getQuartzJobById(jobId);
if(quartz==null) quartz=new QuartzJobVo();

SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm:ss");
String curTime = sdf1.format(new Date(System.currentTimeMillis()))+"T"+sdf2.format(new Date(System.currentTimeMillis()));
%>

<html>
  <head>
    <base href="<%=basePath%>">
    <title>quarize</title>
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
    <input id="jobId" name="jobId" type="hidden" value="<%=StringUtils.trimToEmpty(quartz.getJobId()) %>">
<table width="80%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="20%">����������</td>
    <td width="80%"><input name="jobClass" type="text" id="jobClass" value="<%=StringUtils.trimToEmpty(quartz.getJobClass()) %>" size="40"></td>
  </tr>
  <tr>
    <td>�������ݣ�</td>
    <td><textarea name="jobDataMap" cols="40" rows="4" id="jobDataMap"><%=StringUtils.trimToEmpty(quartz.getJobDataMap()) %></textarea>���磺{age:28,name:'test'}</td>
  </tr>  
  <tr>
    <td>��������</td>
    <td><input name="jobName" type="text" id="jobName" value="<%=StringUtils.trimToEmpty(quartz.getJobName()) %>" size="40">�����Բ��</td>
  </tr>
  <tr>
    <td>����������</td>
    <td><input name="triggerName" type="text" id="triggerName" value="<%=StringUtils.trimToEmpty(quartz.getTriggerName()) %>" size="40">�����Բ��</td>
  </tr>
  <%--
  <tr>
    <td>����������</td>
    <td><input name="jobGroup" type="text" id="jobGroup" value="<%=StringUtils.trimToEmpty(quartz.getJobGroup()) %>" size="40"></td>
  </tr>  
  <tr>
    <td>������������</td>
    <td><input name="triggerGroup" type="text" id="triggerGroup" value="<%=StringUtils.trimToEmpty(quartz.getTriggerGroup()) %>" size="40"></td>
  </tr>
  --%> 
  <tr>
    <td>ִ�п�ʼʱ�䣺</td>
    <td><input name="startTime" type="text" id="startTime" value="<%=StringUtils.trimToEmpty(quartz.getStartTime()) %>" size="40">����ʽ��<%=curTime %> ��</td>
  </tr>
  <tr>
    <td>ִ�н���ʱ�䣺</td>
    <td><input name="endTime" type="text" id="endTime" value="<%=StringUtils.trimToEmpty(quartz.getEndTime()) %>" size="40"></td>
  </tr>
	<tr>
    <td>���������ͣ�</td>
    <td>
        <input type="radio" id="triggerType" name="triggerType" value="1" <%="1"==StringUtils.trimToEmpty(quartz.getTriggerType())?"checked":"" %> onClick="changeTrigger(this.value)">��ʱ������cron��
        <input type="radio" id="triggerType" name="triggerType" value="2" <%="2"==StringUtils.trimToEmpty(quartz.getTriggerType())?"checked":"" %> onClick="changeTrigger(this.value)">ÿ�������봥����simple��
    </td>
  </tr>
  <tr>
    <td>���ʱ�䣺</td>
    <td><input name="repeatInterval" type="text" id="repeatInterval" value="<%=StringUtils.trimToEmpty(quartz.getRepeatInterval()) %>" size="40">�����룩</td>
  </tr>
  <tr>
    <td>ִ�д�����</td>
    <td><input name="repeatCount" type="text" id="repeatCount" value="<%=StringUtils.trimToEmpty(quartz.getRepeatCount()) %>" size="40"></td>
  </tr>
  <tr>
    <td>CRON���ʽ��</td>
    <td><input name="cronExpression" type="text" id="cronExpression" value="<%=StringUtils.trimToEmpty(quartz.getCronExpression()) %>" size="40">
      <a href="<%=basePath%>quartz/CronExpressions.txt" target="_blank">����</a></td>
  </tr>
  <tr>
    <td>������</td>
    <td><textarea name="description" cols="40" rows="4" id="description"><%=StringUtils.trimToEmpty(quartz.getDescription()) %></textarea></td>
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
//�ж�һ��radio���Ƿ���ѡ�е�
function radioIsChecked(obj){
    var objId = "";
    var flag = false;
    
    if(!obj)
    {       
        return objId;
    };

    if(obj.length)
  {
    //�ж��radio
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked){
             objId = obj[i].value;
           flag = true;
           break;
        }
      }
  }else{
    //ֻ��һ��radio
    if(obj.checked){
        objId = obj.value;
        flag = true;
    }
  }

  //�ж��Ƿ���ѡ�е�
  if(!flag)
    alert("��ѡ��һ����������");

  return objId;
}

function checkNull(){
    if(quartzForm.jobClass.value==""){
		alert("����������������");
		quartzForm.jobClass.focus();
		return false;
	}
	
	var id = radioIsChecked(quartzForm.triggerType);
    if(id=="") return false;
    
    if(quartzForm.description.value==""){
        alert("����������������");
        quartzForm.description.focus();
        return false;
    }
    
    return true;
}

//ҳ���ύ
function onSubmitDo(){
    //alert(quartzForm.jobId.value);
	if(!checkNull()) return;
		
 	//========�ж����������޸�===========//
  	if(quartzForm.jobId.value==""){
  		quartzForm.action="<%=basePath%>quartz/controller.jsp?method=addJob";
  	} else {
  		quartzForm.action="<%=basePath%>quartz/controller.jsp?method=modifyJob";
	}
	
	//alert(quartzForm.action);	
	quartzForm.submit();
}

function changeTrigger(type){
    if(type=="1"){
        quartzForm.repeatInterval.value="";
        quartzForm.repeatCount.value="";
        
        quartzForm.repeatInterval.disabled=true;
        quartzForm.repeatCount.disabled=true;
        quartzForm.cronExpression.disabled=false;
        
    }
    if(type=="2"){
        quartzForm.cronExpression.value="";
        
        quartzForm.repeatInterval.disabled=false;
        quartzForm.repeatCount.disabled=false;
        quartzForm.cronExpression.disabled=true;
    }
	if(type=="3"){
        quartzForm.repeatInterval.value="";
        quartzForm.repeatCount.value="";
        quartzForm.cronExpression.value="";
        
        quartzForm.repeatInterval.disabled=false;
        quartzForm.repeatCount.disabled=false;
        quartzForm.cronExpression.disabled=false;
    }
}
//-->
</script>
</html>
