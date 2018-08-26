<%@ page language="java" pageEncoding="GB18030"%>

<%@page import="java.util.List"%>
<%@page import="java.io.File" %>
<%@page import="com.quarts.manager.QuartzManager" %>
<%@page import="com.quarts.manager.xo.XmlJob"%>
<%@page import="org.quartz.impl.StdSchedulerFactory" %>
<%@page import="org.quartz.Scheduler" %>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.quarts.manager.vo.QuartzJobVo"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/admin/";

String appRealPath = request.getSession().getServletContext().getRealPath("/");
//String quartzPath = appRealPath+"WEB-INF"+File.separator+"classes";
String quartzPath = appRealPath+"admin\\quartz";

//��Ҫ������quartz_jobs.xml��quartz_jobs_map.xml�ļ��ľ���·��
QuartzManager.getInstance().setQuartzPath(quartzPath);
//��Ҫ����ʼ��
QuartzManager.getInstance().init();
List jobList = QuartzManager.getInstance().getQuartzJobList();

//��ʱ���Ƿ�����
StdSchedulerFactory factory = (StdSchedulerFactory)config.getServletContext().getAttribute("org.quartz.impl.StdSchedulerFactory.KEY");
Scheduler scheduler = factory.getScheduler();
boolean isStarted=scheduler.isStarted();
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
    <link href="styles/global.css" rel="stylesheet" type="text/css">
  </head>
<body>
<div class="currentPositionDiv">
  <table class="currentPositionTable" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td>
        <span class="orange">&gt;&gt; 
          quartz�����ļ�����·��:<%=quartzPath + File.separator%><a href="<%=basePath %>quartz/quartz_jobs.xml" target="_blank">quartz_jobs.xml</a>
        </span>
	     </td>
    </tr>
  </table>
</div>

<br/>
<br/>
<div class="searchResultDiv">
<table width="100%" border="0" cellpadding="0" cellspacing="1"  class="searchResultTable">
  <tr  class="resultTableTitle">
    <td width="6%">&nbsp;</td>
    <td width="12%">������</td>
    <td width="8%">��������</td>
    <td width="38%">��������</td>
    <td width="18%">��ʼʱ��</td>
    <td width="18%">����ʱ��</td>
  </tr>
  <%
  if(jobList!=null&&jobList.size()>0){
    for(int i=0;i<jobList.size();i++){
        XmlJob job = (XmlJob)jobList.get(i);
        QuartzJobVo quartz=new QuartzJobVo(job);
  %>
  <tr class="<%=(i%2)==1?"resultTableRowDeep":"resultTableRowLight" %>">
    <td><input type="radio" id="id" name="id" value="<%=job.getId() %>" /></td>
    <td><%=StringUtils.trimToEmpty(quartz.getTriggerName()) %></td>
    <td><%=StringUtils.trimToEmpty(quartz.getTriggerType())=="1"?"cron":"simple" %></td>
    <td><%=StringUtils.trimToEmpty(quartz.getDescription()) %></td>
    <td><%=StringUtils.trimToEmpty(quartz.getStartTime()) %></td>
    <td><%=StringUtils.trimToEmpty(quartz.getEndTime()) %></td>
  </tr>
  <%      
    }
  }
  %>  
</table>
</div>
<p> 
  <input type="button" class="bigbutton" name="b1" value="����" onClick="location.href='<%=basePath%>quartz/job_info.jsp'">&nbsp;
  <input type="button" class="bigbutton" name="b2" value="�޸�" onClick="modify()">&nbsp;
  <input type="button" class="bigbutton" name="b3" value="ɾ��" onClick="remove()">&nbsp;
  <%if(isStarted){ %>
  <input type="button" class="bigbutton" name="b4" value="ֹͣ" onClick="shutDownScheduler()">&nbsp;
  <%}else{
   %>
  <input type="button" class="bigbutton" name="b5" value="����" onClick="startScheduler()">&nbsp;
  <%} %>
  <!-- �Ժ���չʱ��ʵ�� -->
  <!-- 
  <input type="button" name="b6" value="����������" onClick="location.href='<%=basePath%>quartz/listener_list.jsp'">&nbsp;
   -->
  <br/>
  <br/>
  ע�⣺�������޸�ʱ����ֹͣ��ʱ������ɾ��ʱ��Ҫֹͣ��ʱ����
</p>
</body>
<script language="JavaScript">
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
  	alert("��ѡ��һ������");

  return objId;
}

//�޸�
function modify()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    //alert(id);
    
    location.href="<%=basePath%>quartz/job_info.jsp?id="+id;
}

//ɾ��
function remove()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    if(confirm("ȷ��ɾ����������?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=removeJob&id="+id;
}

//ֹͣ��ʱ��
function shutDownScheduler()
{    
    if(confirm("ȷ��ֹͣ��ʱ����?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=shutDown";
}
//������ʱ��
function startScheduler()
{    
    if(confirm("ȷ��������ʱ����?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=start";
}

//-->
</script>
</html>
