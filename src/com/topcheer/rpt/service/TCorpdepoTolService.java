package com.topcheer.rpt.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TCorpdepoTol;

public class TCorpdepoTolService extends JdbcOracleBaseService{

	public List<?> findTCorpdepoTolList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TCorpdepoTol");
	}

	public List<?> findTCorpdepoTolList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TCorpdepoTol");
	}

	public List<?> findTCorpdepoTolList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TCorpdepoTol" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TCorpdepoTol 分页数据
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
			sort = " IF_NEED_CHANGE,SubAccountNo,Declare_Dt  DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT SubAccountNo || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_CorpDepo_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_CorpDepo_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTCorpdepoTolList(sql);
	}

/**
	* 获取 TCorpdepoTol 分页数据
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
			sort = " IF_NEED_CHANGE,SubAccountNo,Declare_Dt  DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT SubAccountNo || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFICATION_TIME,CREAT_USER,CREAT_TIME FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked FROM ZMQ_T_CorpDepo_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFICATION_TIME,CREAT_USER,CREAT_TIME from ZMQ_T_CorpDepo_Tol where %2$s order by %1$s", sort, filter);
		}
		return this.findTCorpdepoTolList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_CorpDepo_Tol where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_CorpDepo_Tol
	* @param ent
	* @return
	*/
	public int setTCorpdepoTol(TCorpdepoTol ent){
		String sql = "Update ZMQ_T_CorpDepo_Tol Set Cust_Nm=@Cust_Nm, Categ=@Categ, Depo_Rate=@Depo_Rate, Cust_Type=@Cust_Type, Balance_Cd=@Balance_Cd, Iden_Type=@Iden_Type, Iden_No=@Iden_No, Currency_Cd=@Currency_Cd, Day_Bal_Fill=@Day_Bal_Fill, Tol_Record=@Tol_Record, Open_Org_Id=@Open_Org_Id, if_Need_Change=@if_Need_Change, Fix_Depo_Ind=@Fix_Depo_Ind,  ifChecked=@ifChecked, Acct_Id=@Acct_Id, modified_User=zmq_query_ts_user_name(@modifiedUser), modified_time = sysdate Where SubAccountNo=@SubAccountNo  and Declare_Dt=@Declare_Dt";
//		ent.setStatus("0");
		//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		java.util.Date  date=new 
//		java.sql.Date  date1=new java.sql.Date(date.getTime());
//		ent.setModificationtime(date1);
//		Date modificationTime = DateUtil.string2Timestamp(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME), DateUtil.FORMAT_DATETIME);
//		ent.setModificationtime(modificationTime);
//		sql = new ServiceUtil().getSQL(ent.getmodifiedUser(),sql, "0");
		return this.getCount(sql, this.getTCorpdepoTolParameterList(ent));
	}

	/**
	* 新增 一条 TCorpdepoTol
	* @param ent
	* @return
	*/
	public int addTCorpdepoTol(TCorpdepoTol ent){
		String sql = "Insert Into ZMQ_T_CorpDepo_Tol  (Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,CREATE_USER,CREATE_TIME) Values(@Acct_Id, @Cust_Nm, @Categ, @Depo_Rate, @Cust_Type, @Balance_Cd, @Iden_Type, @Iden_No, @Currency_Cd, @Day_Bal_Fill, @Declare_Dt, @Tol_Record, @Open_Org_Id, @if_Need_Change, @Fix_Depo_Ind, @SubAccountNo, @ifChecked, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTCorpdepoTolParameterList(ent));
	}

	/**
	* 通过主键删除 T_CorpDepo_Tol
	* @param seq
	* @return
	*/
	public int delTCorpdepoTol(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "delete from ZMQ_T_CorpDepo_Tol where SubAccountNo = @SubAccountNo and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				//sql = new ServiceUtil().getSQL(sql, "1");
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@SubAccountNo", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_CorpDepo_Tol 数据
	* @param keyId
	* @return
	*/
	public TCorpdepoTol getTCorpdepoTol(String id){
		TCorpdepoTol result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==2){
				String sql = "select Acct_Id,Cust_Nm,Categ,Depo_Rate,Cust_Type,Balance_Cd,Iden_Type,Iden_No,Currency_Cd,Day_Bal_Fill,Declare_Dt,Tol_Record,Open_Org_Id,if_Need_Change,Fix_Depo_Ind,SubAccountNo,ifChecked,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_CorpDepo_Tol WHERE SubAccountNo = @SubAccountNo and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@SubAccountNo", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				List<TCorpdepoTol> list=(List<TCorpdepoTol>)findTCorpdepoTolList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_CorpDepo_Tol 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTCorpdepoTolParameterList(TCorpdepoTol ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Cust_Nm", DbType.String, ent.getCustNm()));
		sqlParameterList.add(new Parameter("@Categ", DbType.String, ent.getCateg()));
		sqlParameterList.add(new Parameter("@Depo_Rate", DbType.BigDecimal, ent.getDepoRate()));
		sqlParameterList.add(new Parameter("@Cust_Type", DbType.String, ent.getCustType()));
		sqlParameterList.add(new Parameter("@Balance_Cd", DbType.String, ent.getBalanceCd()));
		sqlParameterList.add(new Parameter("@Iden_Type", DbType.String, ent.getIdenType()));
		sqlParameterList.add(new Parameter("@Iden_No", DbType.String, ent.getIdenNo()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@Day_Bal_Fill", DbType.BigDecimal, ent.getDayBalFill()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Tol_Record", DbType.String, ent.getTolRecord()));
		sqlParameterList.add(new Parameter("@Open_Org_Id", DbType.String, ent.getOpenOrgId()));
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@Fix_Depo_Ind", DbType.String, ent.getFixDepoInd()));
		sqlParameterList.add(new Parameter("@SubAccountNo", DbType.String, ent.getSubaccountno()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		//sqlParameterList.add(new Parameter("@modificationTime", DbType.DateTime, ent.getModificationtime()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
		sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
