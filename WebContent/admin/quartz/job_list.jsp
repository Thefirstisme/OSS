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

//重要：设置quartz_jobs.xml和quartz_jobs_map.xml文件的绝对路径
QuartzManager.getInstance().setQuartzPath(quartzPath);
//重要：初始化
QuartzManager.getInstance().init();
List jobList = QuartzManager.getInstance().getQuartzJobList();

//定时器是否启动
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
          quartz配置文件绝对路径:<%=quartzPath + File.separator%><a href="<%=basePath %>quartz/quartz_jobs.xml" target="_blank">quartz_jobs.xml</a>
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
    <td width="12%">触发器</td>
    <td width="8%">任务类型</td>
    <td width="38%">任务描述</td>
    <td width="18%">开始时间</td>
    <td width="18%">结束时间</td>
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
  <input type="button" class="bigbutton" name="b1" value="新增" onClick="location.href='<%=basePath%>quartz/job_info.jsp'">&nbsp;
  <input type="button" class="bigbutton" name="b2" value="修改" onClick="modify()">&nbsp;
  <input type="button" class="bigbutton" name="b3" value="删除" onClick="remove()">&nbsp;
  <%if(isStarted){ %>
  <input type="button" class="bigbutton" name="b4" value="停止" onClick="shutDownScheduler()">&nbsp;
  <%}else{
   %>
  <input type="button" class="bigbutton" name="b5" value="启动" onClick="startScheduler()">&nbsp;
  <%} %>
  <!-- 以后扩展时再实现 -->
  <!-- 
  <input type="button" name="b6" value="监听器管理" onClick="location.href='<%=basePath%>quartz/listener_list.jsp'">&nbsp;
   -->
  <br/>
  <br/>
  注意：新增和修改时不用停止定时器，而删除时需要停止定时器。
</p>
</body>
<script language="JavaScript">
<!--
//判断一组radio中是否有选中的
function radioIsChecked(obj){
	var objId = "";
	var flag = false;
	
	if(!obj)
	{		
		return objId;
	};

	if(obj.length)
  {
  	//有多个radio
    for(var i=0;i<obj.length;i++){
    	if(obj[i].checked){
    		 objId = obj[i].value;
	       flag = true;
	       break;
	    }
	  }
  }else{
  	//只有一个radio
  	if(obj.checked){
  		objId = obj.value;
	    flag = true;
  	}
  }

  //判断是否有选中的
  if(!flag)
  	alert("请选择一个任务");

  return objId;
}

//修改
function modify()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    //alert(id);
    
    location.href="<%=basePath%>quartz/job_info.jsp?id="+id;
}

//删除
function remove()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    if(confirm("确定删除此任务吗?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=removeJob&id="+id;
}

//停止定时器
function shutDownScheduler()
{    
    if(confirm("确定停止定时器吗?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=shutDown";
}
//启动定时器
function startScheduler()
{    
    if(confirm("确定启动定时器吗?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=start";
}

//-->
</script>
</html>
