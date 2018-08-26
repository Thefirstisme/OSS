package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TFwdexeslt;

public class TFwdexesltService extends JdbcOracleBaseService{

	public List<?> findTFwdexesltList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TFwdexeslt");
	}

	public List<?> findTFwdexesltList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TFwdexeslt");
	}

	public List<?> findTFwdexesltList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TFwdexeslt" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TFwdexeslt 分页数据
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
			sql = String.format("SELECT REPORT_ID || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_FwdExeSlt WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_FwdExeSlt where %2$s order by %1$s", sort, filter);
		}
		return this.findTFwdexesltList(sql);
	}

/**
	* 获取 TFwdexeslt 分页数据
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
			sql = String.format("SELECT REPORT_ID || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri FROM ZMQ_T_FwdExeSlt WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri from ZMQ_T_FwdExeSlt where %2$s order by %1$s", sort, filter);
		}
		return this.findTFwdexesltList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_FwdExeSlt where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_FwdExeSlt
	* @param ent
	* @return
	*/
	public int setTFwdexeslt(TFwdexeslt ent){
		String sql = "Update ZMQ_T_FwdExeSlt Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Belong_Org_Id=@Belong_Org_Id, Txn_Type=@Txn_Type, Buy_Currency=@Buy_Currency, Buy_Amt=@Buy_Amt, Buy_Prc=@Buy_Prc, Sell_Currency=@Sell_Currency, Sell_Amt=@Sell_Amt, Sell_Prc=@Sell_Prc, Deliv_Dt1=@Deliv_Dt1, Deliv_Dt2=@Deliv_Dt2, Opposite_Acctno=@Opposite_Acctno, Opposite_Acct_Name=@Opposite_Acct_Name, Opposite_Bank_Cd=@Opposite_Bank_Cd, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, Txn_Attri=@Txn_Attri,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  REPORT_ID=@REPORT_ID and Declare_Dt=@Declare_Dt and Declare_Seq=@Declare_Seq";
		return this.getCount(sql, this.getTFwdexesltParameterList(ent));
	}

	/**
	* 新增 一条 TFwdexeslt
	* @param ent
	* @return
	*/
	public int addTFwdexeslt(TFwdexeslt ent){
		String sql = "Insert Into ZMQ_T_FwdExeSlt  (if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Report_Id, @Declare_Seq, @Declare_Dt, @Belong_Org_Id, @Txn_Type, @Buy_Currency, @Buy_Amt, @Buy_Prc, @Sell_Currency, @Sell_Amt, @Sell_Prc, @Deliv_Dt1, @Deliv_Dt2, @Opposite_Acctno, @Opposite_Acct_Name, @Opposite_Bank_Cd, @Country_Cd, @Domecharge_Area_Cd, @Txn_Attri, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTFwdexesltParameterList(ent));
	}

	/**
	* 通过主键删除 T_FwdExeSlt
	* @param seq
	* @return
	*/
	public int delTFwdexeslt(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_FwdExeSlt where REPORT_ID = @REPORT_ID and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@REPORT_ID", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_FwdExeSlt 数据
	* @param keyId
	* @return
	*/
	public TFwdexeslt getTFwdexeslt(String id){
		TFwdexeslt result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Txn_Type,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Deliv_Dt1,Deliv_Dt2,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_FwdExeSlt WHERE REPORT_ID = @REPORT_ID and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@REPORT_ID", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				List<TFwdexeslt> list=(List<TFwdexeslt>)findTFwdexesltList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_FwdExeSlt 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTFwdexesltParameterList(TFwdexeslt ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, ent.getDeclareSeq()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@Txn_Type", DbType.String, ent.getTxnType()));
		sqlParameterList.add(new Parameter("@Buy_Currency", DbType.String, ent.getBuyCurrency()));
		sqlParameterList.add(new Parameter("@Buy_Amt", DbType.BigDecimal, ent.getBuyAmt()));
		sqlParameterList.add(new Parameter("@Buy_Prc", DbType.BigDecimal, ent.getBuyPrc()));
		sqlParameterList.add(new Parameter("@Sell_Currency", DbType.String, ent.getSellCurrency()));
		sqlParameterList.add(new Parameter("@Sell_Amt", DbType.BigDecimal, ent.getSellAmt()));
		sqlParameterList.add(new Parameter("@Sell_Prc", DbType.BigDecimal, ent.getSellPrc()));
		sqlParameterList.add(new Parameter("@Deliv_Dt1", DbType.Date, ent.getDelivDt1()));
		sqlParameterList.add(new Parameter("@Deliv_Dt2", DbType.Date, ent.getDelivDt2()));
		sqlParameterList.add(new Parameter("@Opposite_Acctno", DbType.String, ent.getOppositeAcctno()));
		sqlParameterList.add(new Parameter("@Opposite_Acct_Name", DbType.String, ent.getOppositeAcctName()));
		sqlParameterList.add(new Parameter("@Opposite_Bank_Cd", DbType.String, ent.getOppositeBankCd()));
		sqlParameterList.add(new Parameter("@Country_Cd", DbType.String, ent.getCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
   	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));

		return sqlParameterList;
	}

}
