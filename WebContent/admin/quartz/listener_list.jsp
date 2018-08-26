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
					����
				</td>
				<td width="70%">
					������
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
			<input type="button" name="b1" value="����"
				onClick="location.href='<%=basePath%>quartz/listener_info.jsp'">
			&nbsp;
			<input type="button" name="b2" value="�޸�" onClick="modify()">
			&nbsp;
			<input type="button" name="b3" value="ɾ��" onClick="remove()">
			&nbsp;
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
    
    alert(id);
    
    location.href="<%=basePath%>quartz/listener_info.jsp?id="+id;
}

//ɾ��
function remove()
{
    var id = radioIsChecked(document.all.id);
    if(id=="") return;
    
    if(confirm("ȷ��ɾ����������?"))
        location.href="<%=basePath%>quartz/controller.jsp?method=removeListener&id="+id;
}
//-->
</script>
</html>
