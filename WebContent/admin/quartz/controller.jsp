<%@ page language="java" pageEncoding="GB18030"%>

<%@page import="com.quarts.manager.QuartzManager" %>
<%@page import="com.quarts.manager.vo.QuartzJobVo"%>
<%@page import="org.quartz.impl.StdSchedulerFactory" %>

<%

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/core/";

String method = request.getParameter("method");

if("addJob".equals(method)){
    QuartzJobVo quartz = new QuartzJobVo(request);
    
    QuartzManager.getInstance().addQuartzJob(quartz);    
    response.sendRedirect(basePath+"quartz/job_list.jsp");
}
if("modifyJob".equals(method)){
    QuartzJobVo quartz = new QuartzJobVo(request);
    
    QuartzManager.getInstance().modifyQuartzJob(quartz);
    response.sendRedirect(basePath+"quartz/job_list.jsp");
}
if("removeJob".equals(method)){
    String jobId = request.getParameter("id");
    
    QuartzManager.getInstance().removeQuartzJob(jobId);
    response.sendRedirect(basePath+"quartz/job_list.jsp");
}
if("addListener".equals(method)){
    QuartzJobVo quartz = new QuartzJobVo(request);
    
    QuartzManager.getInstance().addQuartzListener(quartz);
    response.sendRedirect(basePath+"quartz/listener_list.jsp");
}
if("modifyListener".equals(method)){
    QuartzJobVo quartz = new QuartzJobVo(request);
    
    QuartzManager.getInstance().modifyQuartzListener(quartz);
    response.sendRedirect(basePath+"quartz/listener_list.jsp");
}
if("removeListener".equals(method)){
    String listenerId = request.getParameter("id");
    
    QuartzManager.getInstance().removeQuartzListener(listenerId);
    response.sendRedirect(basePath+"quartz/listener_list.jsp");
}
if("start".equals(method)){
    StdSchedulerFactory factory = (StdSchedulerFactory)config.getServletContext().getAttribute("org.quartz.impl.StdSchedulerFactory.KEY");    
    QuartzManager.getInstance().start(factory);
    response.sendRedirect(basePath+"quartz/job_list.jsp");
}
if("shutDown".equals(method)){
    StdSchedulerFactory factory = (StdSchedulerFactory)config.getServletContext().getAttribute("org.quartz.impl.StdSchedulerFactory.KEY");    
    QuartzManager.getInstance().shutDown(factory);
    response.sendRedirect(basePath+"quartz/job_list.jsp");
}

%>
