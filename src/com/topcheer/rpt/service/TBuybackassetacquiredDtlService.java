package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TBuybackassetacquiredDtl;

public class TBuybackassetacquiredDtlService extends JdbcOracleBaseService{

	public List<?> findTBuybackassetacquiredDtlList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TBuybackassetacquiredDtl");
	}

	public List<?> findTBuybackassetacquiredDtlList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TBuybackassetacquiredDtl");
	}

	public List<?> findTBuybackassetacquiredDtlList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TBuybackassetacquiredDtl" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TBuybackassetacquiredDtl 分页数据
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
			sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt,Detail_Seq  DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_BuyBackAssetAcquired_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BuyBackAssetAcquired_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTBuybackassetacquiredDtlList(sql);
	}

/**
	* 获取 TBuybackassetacquiredDtl 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt FROM ZMQ_T_BuyBackAssetAcquired_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt from ZMQ_T_BuyBackAssetAcquired_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTBuybackassetacquiredDtlList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_BuyBackAssetAcquired_Dtl where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_BuyBackAssetAcquired_Dtl
	* @param ent
	* @return
	*/
	public int setTBuybackassetacquiredDtl(TBuybackassetacquiredDtl ent){
		String sql = "Update ZMQ_T_BuyBackAssetAcquired_Dtl Set if_Need_Change=@if_Need_Change, Out_In_Acct_Ind=@Out_In_Acct_Ind, Accting_Dt=@Accting_Dt, Orig_Txn_Dt=@Orig_Txn_Dt, Bal=@Bal, Opposite_Cust_Attri=@Opposite_Cust_Attri, Opposite_Acctno=@Opposite_Acctno, Opposite_Acct_Name=@Opposite_Acct_Name, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, Buy_Asset_Type=@Buy_Asset_Type, Orig_Asset_Total_Val=@Orig_Asset_Total_Val, Orig_Period_Unit=@Orig_Period_Unit, Orig_Period_len=@Orig_Period_len, Txn_Attri=@Txn_Attri, Int_Start_Dt=@Int_Start_Dt, Mature_Dt=@Mature_Dt,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Detail_Seq=@Detail_Seq";
		return this.getCount(sql, this.getTBuybackassetacquiredDtlParameterList(ent));
	}

	/**
	* 新增 一条 TBuybackassetacquiredDtl
	* @param ent
	* @return
	*/
	public int addTBuybackassetacquiredDtl(TBuybackassetacquiredDtl ent){
		String sql = "Insert Into ZMQ_T_BuyBackAssetAcquired_Dtl  (if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @Acct_Id, @Declare_Dt, @Detail_Seq, @Out_In_Acct_Ind, @Accting_Dt, @Orig_Txn_Dt, @Bal, @Opposite_Cust_Attri, @Opposite_Acctno, @Opposite_Acct_Name, @Country_Cd, @Domecharge_Area_Cd, @Buy_Asset_Type, @Orig_Asset_Total_Val, @Orig_Period_Unit, @Orig_Period_len, @Txn_Attri, @Int_Start_Dt, @Mature_Dt, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		int t = this.getCount(sql, this.getTBuybackassetacquiredDtlParameterList(ent));
		updateTolRecord("ZMQ_T_BuyBackAssetAcquired_Dtl",ent.getAcctId(),ent.getDeclareDt());
		return t;
	}

	/**
	* 通过主键删除 T_BuyBackAssetAcquired_Dtl
	* @param seq
	* @return
	*/
	public int delTBuybackassetacquiredDtl(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_BuyBackAssetAcquired_Dtl where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
				updateTolRecord("ZMQ_T_BuyBackAssetAcquired_Dtl",idList[0],idList[1]);
			}
		}
		return result;
	}

	/**
	* 获得一条T_BuyBackAssetAcquired_Dtl 数据
	* @param keyId
	* @return
	*/
	public TBuybackassetacquiredDtl getTBuybackassetacquiredDtl(String id){
		TBuybackassetacquiredDtl result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Bal,Opposite_Cust_Attri,Opposite_Acctno,Opposite_Acct_Name,Country_Cd,Domecharge_Area_Cd,Buy_Asset_Type,Orig_Asset_Total_Val,Orig_Period_Unit,Orig_Period_len,Txn_Attri,Int_Start_Dt,Mature_Dt,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BuyBackAssetAcquired_Dtl WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				List<TBuybackassetacquiredDtl> list=(List<TBuybackassetacquiredDtl>)findTBuybackassetacquiredDtlList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_BuyBackAssetAcquired_Dtl 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTBuybackassetacquiredDtlParameterList(TBuybackassetacquiredDtl ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, ent.getDetailSeq()));
		sqlParameterList.add(new Parameter("@Out_In_Acct_Ind", DbType.String, ent.getOutInAcctInd()));
		sqlParameterList.add(new Parameter("@Accting_Dt", DbType.Date, ent.getAcctingDt()));
		sqlParameterList.add(new Parameter("@Orig_Txn_Dt", DbType.Date, ent.getOrigTxnDt()));
		sqlParameterList.add(new Parameter("@Bal", DbType.BigDecimal, ent.getBal()));
		sqlParameterList.add(new Parameter("@Opposite_Cust_Attri", DbType.String, ent.getOppositeCustAttri()));
		sqlParameterList.add(new Parameter("@Opposite_Acctno", DbType.String, ent.getOppositeAcctno()));
		sqlParameterList.add(new Parameter("@Opposite_Acct_Name", DbType.String, ent.getOppositeAcctName()));
		sqlParameterList.add(new Parameter("@Country_Cd", DbType.String, ent.getCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@Buy_Asset_Type", DbType.String, ent.getBuyAssetType()));
		sqlParameterList.add(new Parameter("@Orig_Asset_Total_Val", DbType.BigDecimal, ent.getOrigAssetTotalVal()));
		sqlParameterList.add(new Parameter("@Orig_Period_Unit", DbType.String, ent.getOrigPeriodUnit()));
		sqlParameterList.add(new Parameter("@Orig_Period_len", DbType.String, ent.getOrigPeriodLen()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@Int_Start_Dt", DbType.Date, ent.getIntStartDt()));
		sqlParameterList.add(new Parameter("@Mature_Dt", DbType.Date, ent.getMatureDt()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));


		return sqlParameterList;
	}

}
