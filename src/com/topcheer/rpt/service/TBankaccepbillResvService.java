package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TBankaccepbillResv;

public class TBankaccepbillResvService extends JdbcOracleBaseService{

	public List<?> findTBankaccepbillResvList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TBankaccepbillResv");
	}

	public List<?> findTBankaccepbillResvList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TBankaccepbillResv");
	}

	public List<?> findTBankaccepbillResvList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TBankaccepbillResv" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TBankaccepbillResv 分页数据
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
			sort = " IF_NEED_CHANGE,Report_Id,Declare_Seq,Declare_Dt  DESC";
		}  
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Report_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_BankAccepBill_Resv WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BankAccepBill_Resv where %2$s order by %1$s", sort, filter);
		}
		return this.findTBankaccepbillResvList(sql);
	}

/**
	* 获取 TBankaccepbillResv 分页数据
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
			sort = " IF_NEED_CHANGE,Report_Id,Declare_Seq,Declare_Dt  DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Report_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd FROM ZMQ_T_BankAccepBill_Resv WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd from ZMQ_T_BankAccepBill_Resv where %2$s order by %1$s", sort, filter);
		}
		return this.findTBankaccepbillResvList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_BankAccepBill_Resv where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_BankAccepBill_Resv
	* @param ent
	* @return
	*/
	public int setTBankaccepbillResv(TBankaccepbillResv ent){
		String sql = "Update ZMQ_T_BankAccepBill_Resv Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Coll_Dt=@Coll_Dt, Belong_Org_Id=@Belong_Org_Id, Acpt_Mature_Dt=@Acpt_Mature_Dt, Acpt_Amt=@Acpt_Amt, Currency_Cd=@Currency_Cd, Acpt_Org_Nm=@Acpt_Org_Nm, Acpt_Org_Id=@Acpt_Org_Id, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Report_Id=@Report_Id and Declare_Dt=@Declare_Dt and Declare_Seq=@Declare_Seq";
		return this.getCount(sql, this.getTBankaccepbillResvParameterList(ent));
	}

	/**
	* 新增 一条 TBankaccepbillResv
	* @param ent
	* @return
	*/
	public int addTBankaccepbillResv(TBankaccepbillResv ent){
		String sql = "Insert Into ZMQ_T_BankAccepBill_Resv  (if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Report_Id, @Declare_Seq, @Declare_Dt, @Coll_Dt, @Belong_Org_Id, @Acpt_Mature_Dt, @Acpt_Amt, @Currency_Cd, @Acpt_Org_Nm, @Acpt_Org_Id, @Country_Cd, @Domecharge_Area_Cd, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTBankaccepbillResvParameterList(ent));
	}

	/**
	* 通过主键删除 T_BankAccepBill_Resv
	* @param seq
	* @return
	*/
	public int delTBankaccepbillResv(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_BankAccepBill_Resv where Report_Id = @Report_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Report_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_BankAccepBill_Resv 数据
	* @param keyId
	* @return
	*/
	public TBankaccepbillResv getTBankaccepbillResv(String id){
		TBankaccepbillResv result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Coll_Dt,Belong_Org_Id,Acpt_Mature_Dt,Acpt_Amt,Currency_Cd,Acpt_Org_Nm,Acpt_Org_Id,Country_Cd,Domecharge_Area_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BankAccepBill_Resv WHERE Report_Id = @Report_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Report_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				List<TBankaccepbillResv> list=(List<TBankaccepbillResv>)findTBankaccepbillResvList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_BankAccepBill_Resv 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTBankaccepbillResvParameterList(TBankaccepbillResv ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, ent.getDeclareSeq()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Coll_Dt", DbType.Date, ent.getCollDt()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@Acpt_Mature_Dt", DbType.Date, ent.getAcptMatureDt()));
		sqlParameterList.add(new Parameter("@Acpt_Amt", DbType.BigDecimal, ent.getAcptAmt()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@Acpt_Org_Nm", DbType.String, ent.getAcptOrgNm()));
		sqlParameterList.add(new Parameter("@Acpt_Org_Id", DbType.String, ent.getAcptOrgId()));
		sqlParameterList.add(new Parameter("@Country_Cd", DbType.String, ent.getCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));


		return sqlParameterList;
	}

}
