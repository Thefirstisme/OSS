package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TResvableprepaymentDtl;

public class TResvableprepaymentDtlService extends JdbcOracleBaseService{

	public List<?> findTResvableprepaymentDtlList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TResvableprepaymentDtl");
	}

	public List<?> findTResvableprepaymentDtlList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TResvableprepaymentDtl");
	}

	public List<?> findTResvableprepaymentDtlList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TResvableprepaymentDtl" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TResvableprepaymentDtl 分页数据
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
			sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt,Detail_Seq,currency_cd,BELONG_ORG_ID  DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq || '_' || currency_cd || '_' || BELONG_ORG_ID AS id, Acct_Id,Declare_Dt,currency_cd,BELONG_ORG_ID,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status,nb_id FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,currency_cd,BELONG_ORG_ID,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status,nb_id FROM ZMQ_T_ResvablePrepayment_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Acct_Id,Declare_Dt,currency_cd,BELONG_ORG_ID,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status,nb_id from ZMQ_T_ResvablePrepayment_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTResvableprepaymentDtlList(sql);
	}

/**
	* 获取 TResvableprepaymentDtl 分页数据
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
			sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt,Detail_Seq  DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change FROM ZMQ_T_ResvablePrepayment_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change from ZMQ_T_ResvablePrepayment_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTResvableprepaymentDtlList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_ResvablePrepayment_Dtl where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_ResvablePrepayment_Dtl
	* @param ent
	* @return
	*/
	public int setTResvableprepaymentDtl(TResvableprepaymentDtl ent){
		String sql = "Update ZMQ_T_ResvablePrepayment_Dtl Set Out_In_Acct_Ind=@Out_In_Acct_Ind, Accting_Dt=@Accting_Dt, Orig_Txn_Dt=@Orig_Txn_Dt, Bal=@Bal, Txn_Attri=@Txn_Attri, Opposite_Name=@Opposite_Name, Opposite_Bank_Cd=@Opposite_Bank_Cd, Opposite_Country_Cd=@Opposite_Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, if_Need_Change=@if_Need_Change,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate,nb_id=@nb_id Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Detail_Seq=@Detail_Seq and currency_cd=@currency_cd and BELONG_ORG_ID=@BELONG_ORG_ID";
		return this.getCount(sql, this.getTResvableprepaymentDtlParameterList(ent));
	}

	/**
	* 新增 一条 TResvableprepaymentDtl
	* @param ent
	* @return
	*/
	public int addTResvableprepaymentDtl(TResvableprepaymentDtl ent){
		String sql = "Insert Into ZMQ_T_ResvablePrepayment_Dtl  (Acct_Id,Declare_Dt,Detail_Seq,currency_cd,BELONG_ORG_ID,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change,CREATE_USER,CREATE_TIME,nb_id) Values(@Acct_Id, @Declare_Dt, @Detail_Seq,@currency_cd,@BELONG_ORG_ID,@Out_In_Acct_Ind, @Accting_Dt, @Orig_Txn_Dt, @Bal, @Txn_Attri, @Opposite_Name, @Opposite_Bank_Cd, @Opposite_Country_Cd, @Domecharge_Area_Cd, @if_Need_Change, zmq_query_ts_user_name(@CREATE_USER), sysdate,@nb_id)";
		int t = this.getCount(sql, this.getTResvableprepaymentDtlParameterList(ent));
		updateTolRecord("ZMQ_T_ResvablePrepayment_Dtl",ent.getAcctId(),ent.getDeclareDt(),ent.getCurrencyCd(),ent.getBelongOrgId());
		return t;
	}

	/**
	* 通过主键删除 T_ResvablePrepayment_Dtl
	* @param seq
	* @return
	*/
	public int delTResvableprepaymentDtl(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==5){
				String sql = "delete from ZMQ_T_ResvablePrepayment_Dtl where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq and currency_cd=@currency_cd and BELONG_ORG_ID=@BELONG_ORG_ID";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				sqlParameterList.add(new Parameter("@currency_cd", DbType.String, idList[3]));
				sqlParameterList.add(new Parameter("@BELONG_ORG_ID", DbType.String, idList[4]));
				result= this.getCount(sql, sqlParameterList);
				updateTolRecord("ZMQ_T_ResvablePrepayment_Dtl",idList[0],idList[1],idList[3],idList[4]);
			}
		}
		return result;
	}

	/**
	* 获得一条T_ResvablePrepayment_Dtl 数据
	* @param keyId
	* @return
	*/
	public TResvableprepaymentDtl getTResvableprepaymentDtl(String id){
		TResvableprepaymentDtl result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==5){
				String sql = "select Acct_Id,Declare_Dt,Detail_Seq,currency_cd , BELONG_ORG_ID,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Txn_Attri,Opposite_Name,Opposite_Bank_Cd,Opposite_Country_Cd,Domecharge_Area_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status,nb_id from ZMQ_T_ResvablePrepayment_Dtl WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq and currency_cd=@currency_cd and BELONG_ORG_ID=@BELONG_ORG_ID";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				sqlParameterList.add(new Parameter("@currency_cd", DbType.String, idList[3]));
				sqlParameterList.add(new Parameter("@BELONG_ORG_ID", DbType.String, idList[4]));
				List<TResvableprepaymentDtl> list=(List<TResvableprepaymentDtl>)findTResvableprepaymentDtlList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_ResvablePrepayment_Dtl 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTResvableprepaymentDtlParameterList(TResvableprepaymentDtl ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, ent.getDetailSeq()));
		sqlParameterList.add(new Parameter("@currency_cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@BELONG_ORG_ID", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@Out_In_Acct_Ind", DbType.String, ent.getOutInAcctInd()));
		sqlParameterList.add(new Parameter("@Accting_Dt", DbType.Date, ent.getAcctingDt()));
		sqlParameterList.add(new Parameter("@Orig_Txn_Dt", DbType.Date, ent.getOrigTxnDt()));
		sqlParameterList.add(new Parameter("@Bal", DbType.BigDecimal, ent.getBal()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@Opposite_Name", DbType.String, ent.getOppositeName()));
		sqlParameterList.add(new Parameter("@Opposite_Bank_Cd", DbType.String, ent.getOppositeBankCd()));
		sqlParameterList.add(new Parameter("@Opposite_Country_Cd", DbType.String, ent.getOppositeCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
       	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
       	sqlParameterList.add(new Parameter("@nb_id",DbType.String,ent.getNbId()));
		return sqlParameterList;
	}

}
