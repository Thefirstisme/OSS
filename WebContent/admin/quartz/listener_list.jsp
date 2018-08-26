<%@ page language="java" pageEncoding="GB18030"%>

<%@page import="java.util.List"%>
<%@page import="com.quarts.manager.QuartzManager"%>
<%@page import="com.quarts.manager.xo.XmlJobListener"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/core/";

    List listenerList = QuartzManager.getInstance().getQuartzListenerList();
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
		<br />
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td width="10%">
					&nbsp;
				</td>
				<td width="20%">
					名称
				</td>
				<td width="70%">
					类名称
				</td>
			</tr>
			<%
			    if (listenerList != null && listenerList.size() > 0) {
			        for (int i = 0; i < listenerList.size(); i++) {
			            XmlJobListener listener = (XmlJobListener) listenerList.get(i);
			%>
			<tr>
				<td>
					<input type="radio" id="id" name="id"
						value="<%=listener.getId()%>" />
				</td>
				<td><%=StringUtils.trimToEmpty(listener.getName())%></td>
				<td><%=StringUtils.trimToEmpty(listener.getClassName())%></td>
			</tr>
			<%
			    }
			    }
			%>
		</table>
		<p>
			<input type="button" name="b1" value="新增"
				onClick="location.href='<%=basePath%>quartz/listener_info.jsp'">
			&nbsp;
			<input type="button" name="b2" value="修改" onClick="modify()">
			&nbsp;
			<input type="button" name="b3" value="删除" onClick="remove()">
			&nbsp;
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
    
    alert(id);
    
    location.href="<%=basePath%>quartz/listener_info.jsp?id="+id;
}

//删除
function remove()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    if(confirm("确定删除此任务吗?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=removeListener&id="+id;
}
//-->
</script>
</html>
