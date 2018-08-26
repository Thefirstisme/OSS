package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TTotareserveTol;

public class TTotareserveTolService extends JdbcOracleBaseService{

	public List<?> findTTotareserveTolList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TTotareserveTol");
	}

	public List<?> findTTotareserveTolList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TTotareserveTol");
	}

	public List<?> findTTotareserveTolList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TTotareserveTol" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TTotareserveTol 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_TotaReserve_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_TotaReserve_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTTotareserveTolList(sql);
	}

/**
	* 获取 TTotareserveTol 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM ZMQ_T_TotaReserve_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked from ZMQ_T_TotaReserve_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTTotareserveTolList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_TotaReserve_Tol where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_TotaReserve_Tol
	* @param ent
	* @return
	*/
	public int setTTotareserveTol(TTotareserveTol ent){
		String sql = "Update ZMQ_T_TotaReserve_Tol Set if_Need_Change=@if_Need_Change, Currency_Cd=@Currency_Cd, Day_Bal_Fill=@Day_Bal_Fill, Balance_Cd=@Balance_Cd, tol_record=@tol_record, Belong_Org_Id=@Belong_Org_Id, ifChecked=@ifChecked,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt";
		return this.getCount(sql, this.getTTotareserveTolParameterList(ent));
	}

	/**
	* 新增 一条 TTotareserveTol
	* @param ent
	* @return
	*/
	public int addTTotareserveTol(TTotareserveTol ent){
		String sql = "Insert Into ZMQ_T_TotaReserve_Tol  (if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @Acct_Id, @Currency_Cd, @Day_Bal_Fill, @Balance_Cd, @Declare_Dt, @tol_record, @Belong_Org_Id, @ifChecked, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTTotareserveTolParameterList(ent));
	}

	/**
	* 通过主键删除 T_TotaReserve_Tol
	* @param seq
	* @return
	*/
	public int delTTotareserveTol(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "delete from ZMQ_T_TotaReserve_Tol where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_TotaReserve_Tol 数据
	* @param keyId
	* @return
	*/
	public TTotareserveTol getTTotareserveTol(String id){
		TTotareserveTol result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_TotaReserve_Tol WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				List<TTotareserveTol> list=(List<TTotareserveTol>)findTTotareserveTolList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_TotaReserve_Tol 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTTotareserveTolParameterList(TTotareserveTol ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@Day_Bal_Fill", DbType.BigDecimal, ent.getDayBalFill()));
		sqlParameterList.add(new Parameter("@Balance_Cd", DbType.String, ent.getBalanceCd()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@tol_record", DbType.String, ent.getTolRecord()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
       	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
