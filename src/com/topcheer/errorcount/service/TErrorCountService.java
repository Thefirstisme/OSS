package com.topcheer.errorcount.service;

import java.util.List;

import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.util.PropertiesUtil;
import com.topcheer.rpt.RptUtil;

public class TErrorCountService extends JdbcOracleBaseService{

	public List<?> findTBankaccepbillPayList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.errorcount.bo.ErrorCountInfo");
	}

	public String getSqlByProperties(int startIndex, int endIndex,String Declare_Dt,String sort) {
		if(sort.contains("count")) {
			sort = "Declare_Dt asc , "+sort;
			sort = sort.replace("count", "count(*) ");
		}
		String tableName = PropertiesUtil.getInstance().getProperty("tableName");
		tableName = tableName.toLowerCase();
		String[] table = tableName.split(",");
		StringBuffer sb = new StringBuffer();
		if(Declare_Dt.equals("3000-12-31")) {
			
			 sb.append("select * from ( select a.*,ROWNUM rn  from (");
			 for(int i=1;i<=table.length;i++) { 
				 if(table[i-1].endsWith("_tol")) {
					String dtlTableName = table[i-1].replace("_tol", "_dtl").replace("_Tol", "_Dtl");
					//String sqlTol = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1'  having count(*) <> 0 group by '"+getCHNTable(RptUtil.getTableName(table[i-1]))+"','"+table[i-1].toLowerCase()+"',Declare_Dt ";
					String sqlTol = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' group by Declare_Dt  having count(*) <> 0  ";
					sb.append(sqlTol).append(" union all "); 
					String sqlDtl = "select '"+getCHNTable(dtlTableName)+"' as table_Name,'"+dtlTableName.toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1'  group by Declare_Dt  having count(*) <> 0  ";
				    // strSql = "select '"+getCHNTable(dtlTableName)+"' as table_Name,'"+dtlTableName.toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1' group by Declare_Dt  having count(*) <> 0  ";
					sb.append(sqlDtl); 
				} else {
					 String s = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1'  group by  Declare_Dt  having count(*) <> 0 ";
					 sb.append(s); 
				}
				if(i<table.length)
				{
					sb.append(" union all "); 
				} 
			}
			sb.append(String.format("   ) a ) b where rn>=%1$s and rn<=%2$s",startIndex,endIndex)); 
			//return sb.toString().substring(0, sb.length()-11);//+" order by "+sort;
			return sb.toString();
			
		} else {
			 sb.append("select * from ( select a.*,ROWNUM rn  from (");
			for(int i=1;i<=table.length;i++) {
				 
				if(table[i-1].endsWith("_tol")) {
					String dtlTableName = table[i-1].replace("_tol", "_dtl");
					//String sqlTol = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') having count(*) <> 0 group by '"+getCHNTable(RptUtil.getTableName(table[i-1]))+"','"+table[i-1].toLowerCase()+"',Declare_Dt";
					String sqlTol = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt  having count(*) <> 0  ";				 
					sb.append(sqlTol).append(" union all "); 
					//String sqlDtl = "select '"+getCHNTable(dtlTableName)+"' as table_Name,'"+dtlTableName.toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') having count(*) <> 0 group by '"+getCHNTable(dtlTableName)+"','"+table[i-1].toLowerCase()+"',Declare_Dt";
					String sqlDtl = "select '"+getCHNTable(dtlTableName)+"' as table_Name,'"+dtlTableName.toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt having count(*) <> 0  ";
					sb.append(sqlDtl); 
				} else {
					 String s = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt having count(*) <> 0  ";
					 sb.append(s); 
				}
				if(i<table.length)
				{
					sb.append(" union all "); 
				} 
			}
			sb.append(String.format("   ) a ) b where rn>=%1$s and rn<=%2$s",startIndex,endIndex)); 
			//System.out.print(sb.toString().substring(0, sb.length()-11));
			return sb.toString(); 
			 
		}
	}
	
	public int getRowNumByProperties(String Declare_Dt) {

		String tableName = PropertiesUtil.getInstance().getProperty("tableName");
		tableName = tableName.toLowerCase();
		String[] table = tableName.split(",");
		StringBuffer sb = new StringBuffer();
		if(Declare_Dt.equals("3000-12-31")) {
			sb.append(" select count(*)  from (");
			 for(int i=1;i<=table.length;i++) { 
				 if(table[i-1].endsWith("_tol")) {
					String dtlTableName = table[i-1].replace("_tol", "_dtl");
					String sqlTol = "select COUNT(*) as count from "+table[i-1]+" where if_Need_Change = '1' group by Declare_Dt  having count(*) <> 0  ";
					sb.append(sqlTol).append(" union all "); 
					String sqlDtl = "select COUNT(*) as count from "+dtlTableName+" where if_Need_Change = '1'  group by Declare_Dt  having count(*) <> 0 ";
				    sb.append(sqlDtl); 
				} else {
					 String s = "select  COUNT(*) as count  from "+table[i-1]+" where if_Need_Change = '1'  group by Declare_Dt  having count(*) <> 0 ";
					 sb.append(s); 
				}
				if(i<table.length)
				{
					sb.append(" union all "); 
				} 
			 }
				sb.append("  ) a"); 
			//return sb.toString().substring(0, sb.length()-11);
		} else {
			 sb.append("select count(*)  from (");
				for(int i=1;i<=table.length;i++) {
					if(table[i-1].endsWith("_tol")) {
						String dtlTableName = table[i-1].replace("_tol", "_dtl");
						//String sqlTol = "select '"+getCHNTable(table[i-1])+"' as table_Name,'"+table[i-1].toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') having count(*) <> 0 group by '"+getCHNTable(RptUtil.getTableName(table[i-1]))+"','"+table[i-1].toLowerCase()+"',Declare_Dt";
						String sqlTol = "select COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt  having count(*) <> 0  ";				 
						sb.append(sqlTol).append(" union all "); 
						//String sqlDtl = "select '"+getCHNTable(dtlTableName)+"' as table_Name,'"+dtlTableName.toLowerCase()+"' as \"table\",COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') having count(*) <> 0 group by '"+getCHNTable(dtlTableName)+"','"+table[i-1].toLowerCase()+"',Declare_Dt";
						String sqlDtl = "select COUNT(*) as count,Declare_Dt as declare_Dt from "+dtlTableName+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt having count(*) <> 0  ";
						sb.append(sqlDtl); 
					} else {
						 String s = "select COUNT(*) as count,Declare_Dt as declare_Dt from "+table[i-1]+" where if_Need_Change = '1' and Declare_Dt = to_date('"+Declare_Dt+"','yyyy-MM-dd') group by Declare_Dt having count(*) <> 0  ";
						 sb.append(s); 
					}
					if(i<table.length)
					{
						sb.append(" union all "); 
					} 
				}
				sb.append("   ) "); 
		}
		return  this.getResultRow(sb.toString());
	}
	
	/**
	* 获取 J01FinOrg 分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getByPage(int startIndex, int endIndex, String filter, String sort){
		String sql = "";
		sql = this.getSqlByProperties(startIndex,endIndex,filter,sort);
		//System.out.println(sql);
		return this.getResultPojoList(sql, "com.topcheer.errorcount.bo.ErrorCountInfo");
	}
	
	public List<?> getErrInfoByPage(int startIndex, int endIndex, String tableName, String declareDt){
		String sql = "select '"+RptUtil.getTableName(RptUtil.getTableName(tableName.replace("_dtl", "_tol")).replace("_dtl", "_tol"))+"' as table_Name,Acct_Id ,Declare_Dt,CHK_ERR_INFO as err_info from "+tableName+" where if_Need_Change = '1' and Declare_Dt = to_date('"+declareDt.substring(0, 10)+"','yyyy-MM-dd') ";
		if(!tableName.endsWith("_tol") && !tableName.endsWith("_dtl")) {
			sql = sql.replace("Acct_Id", "Declare_Seq as acct_Id");
		} 
		//System.out.println(sql);
		return this.getResultPojoList(sql, "com.topcheer.errorcount.bo.ErrorInfo");
	}

	
	/**
	 * 通过条件判断表的中文名是汇总还是明细
	 * @param 表的英文名
	 * @return 表的业务编号
	 */
	public String getCHNTable(String tableName) {
		String lowerTableName=tableName.toLowerCase();
		if(lowerTableName.endsWith("_tol")){
			return RptUtil.getTableName(RptUtil.getTableName(lowerTableName))+"汇总表";
		} else if(lowerTableName.endsWith("_dtl")) {
			return RptUtil.getTableName(RptUtil.getTableName(lowerTableName.replace("_dtl", "_tol")))+"明细表";
		} else {
			return RptUtil.getTableName(RptUtil.getTableName(lowerTableName));
			//return RptUtil.getTableName(tableName);
		}
	}
}
