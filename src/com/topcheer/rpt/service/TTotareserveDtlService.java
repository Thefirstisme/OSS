package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TTotareserveDtl;

public class TTotareserveDtlService extends JdbcOracleBaseService{

	public List<?> findTTotareserveDtlList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TTotareserveDtl");
	}

	public List<?> findTTotareserveDtlList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TTotareserveDtl");
	}

	public List<?> findTTotareserveDtlList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TTotareserveDtl" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TTotareserveDtl 分页数据
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
			sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt  DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS id, if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_TotaReserve_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_TotaReserve_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTTotareserveDtlList(sql);
	}

/**
	* 获取 TTotareserveDtl 分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getByPage(int startIndex, int endIndex, String filter, String sort, String classPath){
		if (filter.length() == 0){
			filter = "1=1";
		}
		if (sort.length() == 0){
			sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt  DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd')  AS id, if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal FROM ZMQ_T_TotaReserve_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal from ZMQ_T_TotaReserve_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTTotareserveDtlList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_TotaReserve_Dtl where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_TotaReserve_Dtl
	* @param ent
	* @return
	*/
	public int setTTotareserveDtl(TTotareserveDtl ent){
		String sql = "Update ZMQ_T_TotaReserve_Dtl Set if_Need_Change=@if_Need_Change, Out_In_Acct_Ind=@Out_In_Acct_Ind, Netting_Bal=@Netting_Bal,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt";
		return this.getCount(sql, this.getTTotareserveDtlParameterList(ent));
	}

	/**
	* 新增 一条 TTotareserveDtl
	* @param ent
	* @return
	*/
	public int addTTotareserveDtl(TTotareserveDtl ent){
		String sql = "Insert Into ZMQ_T_TotaReserve_Dtl  (if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @Acct_Id, @Declare_Dt, @Out_In_Acct_Ind, @Netting_Bal, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		int t = this.getCount(sql, this.getTTotareserveDtlParameterList(ent));
		updateTolRecord("ZMQ_T_TotaReserve_Dtl",ent.getAcctId(),ent.getDeclareDt());
		return t;
	}

	/**
	* 通过主键删除 T_TotaReserve_Dtl
	* @param seq
	* @return
	*/
	public int delTTotareserveDtl(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "delete from ZMQ_T_TotaReserve_Dtl where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				result= this.getCount(sql, sqlParameterList);
				updateTolRecord("ZMQ_T_TotaReserve_Dtl",idList[0],idList[1]);
			}
		}
		return result;
	}

	/**
	* 获得一条T_TotaReserve_Dtl 数据
	* @param keyId
	* @return
	*/
	public TTotareserveDtl getTTotareserveDtl(String id){
		TTotareserveDtl result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "select if_Need_Change,Acct_Id,Declare_Dt,Out_In_Acct_Ind,Netting_Bal,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_TotaReserve_Dtl WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				List<TTotareserveDtl> list=(List<TTotareserveDtl>)findTTotareserveDtlList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_TotaReserve_Dtl 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTTotareserveDtlParameterList(TTotareserveDtl ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Out_In_Acct_Ind", DbType.String, ent.getOutInAcctInd()));
		sqlParameterList.add(new Parameter("@Netting_Bal", DbType.BigDecimal, ent.getNettingBal()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
       	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
