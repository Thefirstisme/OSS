package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TAgencybonds;

public class TAgencybondsService extends JdbcOracleBaseService{

	public List<?> findTAgencybondsList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TAgencybonds");
	}

	public List<?> findTAgencybondsList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TAgencybonds");
	}

	public List<?> findTAgencybondsList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TAgencybonds" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TAgencybonds 分页数据
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
			sql = String.format("SELECT REPORT_ID || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || DECLARE_SEQ AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_AgencyBonds WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_AgencyBonds where %2$s order by %1$s", sort, filter);
		}
		return this.findTAgencybondsList(sql);
	}

/**
	* 获取 TAgencybonds 分页数据
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
			sql = String.format("SELECT REPORT_ID || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || DECLARE_SEQ AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread FROM ZMQ_T_AgencyBonds WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread from ZMQ_T_AgencyBonds where %2$s order by %1$s", sort, filter);
		}
		return this.findTAgencybondsList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_AgencyBonds where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_AgencyBonds
	* @param ent
	* @return
	*/
	public int setTAgencybonds(TAgencybonds ent){
		String sql = "Update ZMQ_T_AgencyBonds Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Bond_Id=@Bond_Id, Bond_Nm=@Bond_Nm, Issu_Corp_Acct=@Issu_Corp_Acct, Currency_Cd=@Currency_Cd, Txn_Org_Id=@Txn_Org_Id, Slt_Dt=@Slt_Dt, Period_len=@Period_len, Period_Unit=@Period_Unit, Mature_Dt=@Mature_Dt, Nobondsissued=@Nobondsissued, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, Txn_Attri=@Txn_Attri, Rate_Type=@Rate_Type, Fix_Rate=@Fix_Rate, Price_Datum=@Price_Datum, Float_Spread=@Float_Spread,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  REPORT_ID=@REPORT_ID and Declare_Dt=@Declare_Dt and DECLARE_SEQ=@DECLARE_SEQ";
		return this.getCount(sql, this.getTAgencybondsParameterList(ent));
	}

	/**
	* 新增 一条 TAgencybonds
	* @param ent
	* @return
	*/
	public int addTAgencybonds(TAgencybonds ent){
		String sql = "Insert Into ZMQ_T_AgencyBonds  (if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Report_Id, @Declare_Seq, @Bond_Id, @Bond_Nm, @Issu_Corp_Acct, @Currency_Cd, @Declare_Dt, @Txn_Org_Id, @Slt_Dt, @Period_len, @Period_Unit, @Mature_Dt, @Nobondsissued, @Country_Cd, @Domecharge_Area_Cd, @Txn_Attri, @Rate_Type, @Fix_Rate, @Price_Datum, @Float_Spread, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTAgencybondsParameterList(ent));
	}

	/**
	* 通过主键删除 T_AgencyBonds
	* @param seq
	* @return
	*/
	public int delTAgencybonds(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_AgencyBonds where REPORT_ID = @REPORT_ID and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and DECLARE_SEQ=@DECLARE_SEQ";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@REPORT_ID", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@DECLARE_SEQ", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_AgencyBonds 数据
	* @param keyId
	* @return
	*/
	public TAgencybonds getTAgencybonds(String id){
		TAgencybonds result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Bond_Id,Bond_Nm,Issu_Corp_Acct,Currency_Cd,Declare_Dt,Txn_Org_Id,Slt_Dt,Period_len,Period_Unit,Mature_Dt,Nobondsissued,Country_Cd,Domecharge_Area_Cd,Txn_Attri,Rate_Type,Fix_Rate,Price_Datum,Float_Spread,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_AgencyBonds WHERE REPORT_ID = @REPORT_ID and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and DECLARE_SEQ=@DECLARE_SEQ";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@REPORT_ID", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@DECLARE_SEQ", DbType.String, idList[2]));
				List<TAgencybonds> list=(List<TAgencybonds>)findTAgencybondsList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_AgencyBonds 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTAgencybondsParameterList(TAgencybonds ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, ent.getDeclareSeq()));
		sqlParameterList.add(new Parameter("@Bond_Id", DbType.String, ent.getBondId()));
		sqlParameterList.add(new Parameter("@Bond_Nm", DbType.String, ent.getBondNm()));
		sqlParameterList.add(new Parameter("@Issu_Corp_Acct", DbType.String, ent.getIssuCorpAcct()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Txn_Org_Id", DbType.String, ent.getTxnOrgId()));
		sqlParameterList.add(new Parameter("@Slt_Dt", DbType.Date, ent.getSltDt()));
		sqlParameterList.add(new Parameter("@Period_len", DbType.String, ent.getPeriodLen()));
		sqlParameterList.add(new Parameter("@Period_Unit", DbType.String, ent.getPeriodUnit()));
		sqlParameterList.add(new Parameter("@Mature_Dt", DbType.Date, ent.getMatureDt()));
		sqlParameterList.add(new Parameter("@Nobondsissued", DbType.BigDecimal, ent.getNobondsissued()));
		sqlParameterList.add(new Parameter("@Country_Cd", DbType.String, ent.getCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@Rate_Type", DbType.String, ent.getRateType()));
		sqlParameterList.add(new Parameter("@Fix_Rate", DbType.BigDecimal, ent.getFixRate()));
		sqlParameterList.add(new Parameter("@Price_Datum", DbType.String, ent.getPriceDatum()));
		sqlParameterList.add(new Parameter("@Float_Spread", DbType.BigDecimal, ent.getFloatSpread()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
       	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
