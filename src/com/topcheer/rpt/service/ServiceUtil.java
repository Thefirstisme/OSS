package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;

public class ServiceUtil {

	public String getSQL(String modified,String str,String status){
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		String date =df.format(new Date());
		String[] st= str.split("Where");
		String sql = ""+st[0]+" modified_User=@modifiedUser, modified_time = sysdate, STATUS=@status where "+st[1];
		return sql;
	}
	
	public List getValue(String status){
		List list = new ArrayList<Object>();
		
		return list;
	}
	
}
