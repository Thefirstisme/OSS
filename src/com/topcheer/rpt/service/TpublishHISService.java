package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.topcheer.jdbc.JdbcSQL2005HISBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.Tpublish;

public class TpublishHISService extends JdbcSQL2005HISBaseService{
	
	// 由FTZMIS给接入机构统一编码。接入机构发起各种交易时，必须填写
    // private static String FTZMIS_SRC = PropertyUtils.getProperty("FTZMIS_SRC");
	
	public List<?> findTCorpdepoTolList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.Tpublish");
	}

	public List<?> findTCorpdepoTolList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.Tpublish");
	}
	
	public List<?> findTpublishList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.Tpublish" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}
	/**
	* 获取 Tpublish 分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getByPage(int startIndex, int endIndex, String filter, String sort){
		if (filter.length() == 0){
			filter = "1=1";
		}
		if (sort.length() == 0){
			sort = "create_dt DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("select msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,xml,re_xml,ispublish "
					+ "from ( select row_number() over(order by %1$s) as num ,msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,xml,re_xml,ispublish "
					+ "from HIS.dbo.T_Publish_Rpt where %2$s ) as a "
					+ "where num > %3$s and num <= %4$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,xml,re_xml,ispublish "
					+ "from HIS.dbo.T_Publish_Rpt where %2$s order by %1$s", sort, filter);
		}
		return this.findTpublishRptList(sql);
	}

	public List<?> getByPage(int startIndex, int endIndex, String filter, String sort, String classPath, String tableName){
		if (filter.length() == 0){
			filter = "1=1";
		}
		if (sort.length() == 0){
			sort = "Declare_Dt DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("select * from ( select row_number() over(order by %1$s) as num , * from HIS.dbo."+tableName+" where %2$s ) as a where num > %3$s and num <= %4$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select * from HIS.dbo."+tableName+" where %2$s order by %1$s", sort, filter);
		}
		return this.findTpublishList(sql, classPath);
	}
	/**
	* 获取分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getList(){		
		String sql = "SELECT [create_dt]"
				+ ",[rpt_id]"
				+ ",[rpt_nm]"
				+ ",[status]"
				+ ",[xml]"
				+ "FROM [HIS].[dbo].[T_Publish_Rpt]"; 
		return this.findTpublishRptList(sql);
	}

	public List<?> findTpublishRptList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.Tpublish");
	}


	/**
	* 获取分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getList(String mode){		
		String sql = "SELECT [create_dt]"
				+ ",[rpt_id]"
				+ ",[msgid]"
				+ ",[publish_dt]"
				+ ",[rpt_nm]"
				+ ",[status]"
				+ ",[xml]"
				+ "FROM [HIS].[dbo].[T_Publish_Rpt] "
				+ " WHERE ispublish = '" +mode+"'"; 
		return this.findTpublishRptList(sql);
	}
	
	public List<?> getList(String mode,String msgids){
		//123,1213,3333
		msgids = msgids.replaceAll(",", "','");
		msgids="'"+msgids+"'";
		String sql = "SELECT [create_dt]"
				+ ",[rpt_id]"
				+ ",[msgid]"
				+ ",[publish_dt]"
				+ ",[rpt_nm]"
				+ ",[status]"
				+ ",[xml]"
				+ "FROM [HIS].[dbo].[T_Publish_Rpt]" 
				+ " WHERE msgid in (" + msgids +")"
				+ " and ispublish = '" +mode+"'"; 
		return this.findTpublishRptList(sql);
	}
	
	

	/**
	* 更新 一条 Tpublish
	* @param ent
	* @return
	*/
	public int setpublisRpt(Tpublish ent){
		String sql = "UPDATE [HIS].[dbo].[T_Publish_Rpt]"
				+ " SET [status] = @status"	
				+ ",[publish_dt] = @publish_dt"
				+ " WHERE msgid = @msgid"; 
		this.execSqlWithPara(sql,this.getTCorpdepoDtlParameterList(ent));
		return 1;
	}
	
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from HIS.dbo.T_Publish_Rpt where %1$s ", filter);
		return  this.getResultRow(sql);
	}
	
	/**
	* 更新 一条 Tpublish 
	* @param ent
	* @return
	*/
	public int setpublisRptResult(Tpublish ent){
		String sql = "UPDATE [HIS].[dbo].[T_Publish_Rpt]"
				+ " SET [status] = @status"
				+ ",[re_xml] = @re_xml"
				+ ",[publish_dt] = @publish_dt";
		if("2".equals(ent.getStatus())){
			sql += " WHERE rpt_id = @rpt_id and data_dt =@data_dt"; 
		}else{
			sql += " WHERE msgid = @msgid"; 
		}
		this.execSqlWithPara(sql,this.getTCorpdepoDtlParameterList(ent));
		return 1;
	}

	
	/**
	* 获得一条T_publishRpt 数据
	* @param keyId
	* @return
	*/
	public Tpublish getpublishRpt(String id){
		Tpublish result = null;
		if(!id.isEmpty()){			
			String sql = "SELECT [create_dt]"
					+ ",[rpt_nm]"	
					+ ",[msgid]"
					+ ",[rpt_id]"
					+ ",[publish_dt]"
					+ ",[data_dt]"
					+ ",[status]"
					+ ",[xml]"
					+ ",[ispublish]"
					+ " FROM [HIS].[dbo].[T_Publish_Rpt]"
					+ " WHERE msgid ='" + id+"'"; 
			List<?> list = findTpublishRptList(sql);				
			if(list!=null && list.size()>0){
				result=(Tpublish)list.get(0);
			}
		}
		return result;
	}
	
	public int addPublishRpt(Tpublish ent){
		String sql = "INSERT INTO [HIS].[dbo].[T_Publish_Rpt]"
				+ "([create_dt]"
				+ ",[data_dt]"
				+ ",[rpt_id]"
				+ ",[msgid]"
				+ ",[rpt_nm]"
				+ ",[publish_dt]"
				+ ",[status]"
				+ ",[ispublish]"
				+ ",[xml])"
				+ " VALUES"
				+ " (@create_dt"
				+ ",@data_dt"
				+ ",@rpt_id"
				+ ",@msgid"
				+ ",@rpt_nm"
				+ ",@publish_dt"
				+ ",@status"
				+ ",@ispublish"
				+ ",@xml)";
		return this.getCount(sql, this.getTCorpdepoDtlParameterList(ent));
	}


	
	/**
	 * 向T_Publish_Rpt表插入数据
	 * @param sql
	 */
	public void inertTPublishRpt(String sql){
		this.execUpdate(sql);
	}
	
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getRowCount(String tableName, String filter){
		String sql = String.format("select count(*) from  %1$s  where %2$s ", tableName, filter);
		return  this.getResultRow(sql);
	}
	/**
	* 从T_PublishRpt 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTCorpdepoDtlParameterList(Tpublish ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@msgid", DbType.String, ent.getMsgid()));
		sqlParameterList.add(new Parameter("@rpt_id", DbType.String, ent.getRptId()));
		sqlParameterList.add(new Parameter("@create_dt", DbType.String, ent.getCreateDt()));
		sqlParameterList.add(new Parameter("@data_dt", DbType.String, ent.getDataDt()));
		sqlParameterList.add(new Parameter("@publish_dt", DbType.String, ent.getPublishDt()));
		sqlParameterList.add(new Parameter("@rpt_nm", DbType.String, ent.getRptNm()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
		sqlParameterList.add(new Parameter("@xml", DbType.String, ent.getXml()));
		sqlParameterList.add(new Parameter("@re_xml", DbType.String, ent.getReXml()));
		sqlParameterList.add(new Parameter("@ispublish", DbType.String, ent.getIspublish()));
		return sqlParameterList;
	}
	
}
