package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TOffsheetfinTol;

public class TOffsheetfinTolService extends JdbcOracleBaseService{

	public List<?> findTOffsheetfinTolList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TOffsheetfinTol");
	}

	public List<?> findTOffsheetfinTolList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TOffsheetfinTol");
	}

	public List<?> findTOffsheetfinTolList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TOffsheetfinTol" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TOffsheetfinTol 分页数据
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
			sort = " IF_NEED_CHANGE  DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_OffsheetFin_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_OffsheetFin_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTOffsheetfinTolList(sql);
	}

/**
	* 获取 TOffsheetfinTol 分页数据
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
			sort = " IF_NEED_CHANGE  DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id FROM ZMQ_T_OffsheetFin_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id from ZMQ_T_OffsheetFin_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTOffsheetfinTolList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_OffsheetFin_Tol where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_OffsheetFin_Tol
	* @param ent
	* @return
	*/
	public int setTOffsheetfinTol(TOffsheetfinTol ent){
		String sql = "Update ZMQ_T_OffsheetFin_Tol Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Acct_Id=@Acct_Id, Currency_Cd=@Currency_Cd, Day_Bal_Fill=@Day_Bal_Fill, Report_Id=@Report_Id, Declare_Dt=@Declare_Dt, tol_record=@tol_record, Belong_Org_Id=@Belong_Org_Id,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt";
		return this.getCount(sql, this.getTOffsheetfinTolParameterList(ent));
	}

	/**
	* 新增 一条 TOffsheetfinTol
	* @param ent
	* @return
	*/
	public int addTOffsheetfinTol(TOffsheetfinTol ent){
		String sql = "Insert Into ZMQ_T_OffsheetFin_Tol  (if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Acct_Id, @Currency_Cd, @Day_Bal_Fill, @Report_Id, @Declare_Dt, @tol_record, @Belong_Org_Id, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTOffsheetfinTolParameterList(ent));
	}

	/**
	* 通过主键删除 T_OffsheetFin_Tol
	* @param seq
	* @return
	*/
	public int delTOffsheetfinTol(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "delete from ZMQ_T_OffsheetFin_Tol where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_OffsheetFin_Tol 数据
	* @param keyId
	* @return
	*/
	public TOffsheetfinTol getTOffsheetfinTol(String id){
		TOffsheetfinTol result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "select if_Need_Change,ifChecked,Acct_Id,Currency_Cd,Day_Bal_Fill,Report_Id,Declare_Dt,tol_record,Belong_Org_Id,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_OffsheetFin_Tol WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				List<TOffsheetfinTol> list=(List<TOffsheetfinTol>)findTOffsheetfinTolList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_OffsheetFin_Tol 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTOffsheetfinTolParameterList(TOffsheetfinTol ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@Day_Bal_Fill", DbType.BigDecimal, ent.getDayBalFill()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@tol_record", DbType.String, ent.getTolRecord()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
       	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
        return sqlParameterList;
	}

}
