package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TFtuMedlongborrDtl;

public class TFtuMedlongborrDtlService extends JdbcOracleBaseService{

	public List<?> findTFtuMedlongborrDtlList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TFtuMedlongborrDtl");
	}

	public List<?> findTFtuMedlongborrDtlList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TFtuMedlongborrDtl");
	}

	public List<?> findTFtuMedlongborrDtlList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TFtuMedlongborrDtl" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TFtuMedlongborrDtl 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_FTU_MedLongBorr_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_FTU_MedLongBorr_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTFtuMedlongborrDtlList(sql);
	}

/**
	* 获取 TFtuMedlongborrDtl 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_FTU_MedLongBorr_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_FTU_MedLongBorr_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTFtuMedlongborrDtlList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_FTU_MedLongBorr_Dtl where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_FTU_MedLongBorr_Dtl
	* @param ent
	* @return
	*/
	public int setTFtuMedlongborrDtl(TFtuMedlongborrDtl ent){
		String sql = "Update ZMQ_T_FTU_MedLongBorr_Dtl Set Out_In_Acct_Ind=@Out_In_Acct_Ind, Accting_Dt=@Accting_Dt, Orig_Txn_Dt=@Orig_Txn_Dt, Txn_Attri=@Txn_Attri, Period_len=@Period_len, Period_Unit=@Period_Unit, Int_Start_Dt=@Int_Start_Dt, Mature_Dt=@Mature_Dt, Yield_Rate=@Yield_Rate, Bal=@Bal, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, Opposite_Acctno=@Opposite_Acctno, Opposite_Acct_Name=@Opposite_Acct_Name, Opposite_Bank_Cd=@Opposite_Bank_Cd, if_Need_Change=@if_Need_Change,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Detail_Seq=@Detail_Seq";
		return this.getCount(sql, this.getTFtuMedlongborrDtlParameterList(ent));
	}

	/**
	* 新增 一条 TFtuMedlongborrDtl
	* @param ent
	* @return
	*/
	public int addTFtuMedlongborrDtl(TFtuMedlongborrDtl ent){
		String sql = "Insert Into ZMQ_T_FTU_MedLongBorr_Dtl  (Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,CREATE_USER,CREATE_TIME) Values(@Acct_Id, @Declare_Dt, @Detail_Seq, @Out_In_Acct_Ind, @Accting_Dt, @Orig_Txn_Dt, @Txn_Attri, @Period_len, @Period_Unit, @Int_Start_Dt, @Mature_Dt, @Yield_Rate, @Bal, @Country_Cd, @Domecharge_Area_Cd, @Opposite_Acctno, @Opposite_Acct_Name, @Opposite_Bank_Cd, @if_Need_Change, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		int t = this.getCount(sql, this.getTFtuMedlongborrDtlParameterList(ent));
		updateTolRecord("ZMQ_T_FTU_MedLongBorr_Dtl",ent.getAcctId(),ent.getDeclareDt());
		return t;
	}

	/**
	* 通过主键删除 T_FTU_MedLongBorr_Dtl
	* @param seq
	* @return
	*/
	public int delTFtuMedlongborrDtl(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_FTU_MedLongBorr_Dtl where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
				updateTolRecord("ZMQ_T_FTU_FinaBond_Dtl",idList[0],idList[1]);
			}
		}
		return result;
	}

	/**
	* 获得一条T_FTU_MedLongBorr_Dtl 数据
	* @param keyId
	* @return
	*/
	public TFtuMedlongborrDtl getTFtuMedlongborrDtl(String id){
		TFtuMedlongborrDtl result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Accting_Dt,Orig_Txn_Dt,Txn_Attri,Period_len,Period_Unit,Int_Start_Dt,Mature_Dt,Yield_Rate,Bal,Country_Cd,Domecharge_Area_Cd,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_FTU_MedLongBorr_Dtl WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				List<TFtuMedlongborrDtl> list=(List<TFtuMedlongborrDtl>)findTFtuMedlongborrDtlList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_FTU_MedLongBorr_Dtl 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTFtuMedlongborrDtlParameterList(TFtuMedlongborrDtl ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, ent.getDetailSeq()));
		sqlParameterList.add(new Parameter("@Out_In_Acct_Ind", DbType.String, ent.getOutInAcctInd()));
		sqlParameterList.add(new Parameter("@Accting_Dt", DbType.Date, ent.getAcctingDt()));
		sqlParameterList.add(new Parameter("@Orig_Txn_Dt", DbType.Date, ent.getOrigTxnDt()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@Period_len", DbType.String, ent.getPeriodLen()));
		sqlParameterList.add(new Parameter("@Period_Unit", DbType.String, ent.getPeriodUnit()));
		sqlParameterList.add(new Parameter("@Int_Start_Dt", DbType.Date, ent.getIntStartDt()));
		sqlParameterList.add(new Parameter("@Mature_Dt", DbType.Date, ent.getMatureDt()));
		sqlParameterList.add(new Parameter("@Yield_Rate", DbType.BigDecimal, ent.getYieldRate()));
		sqlParameterList.add(new Parameter("@Bal", DbType.BigDecimal, ent.getBal()));
		sqlParameterList.add(new Parameter("@Country_Cd", DbType.String, ent.getCountryCd()));
		sqlParameterList.add(new Parameter("@Domecharge_Area_Cd", DbType.String, ent.getDomechargeAreaCd()));
		sqlParameterList.add(new Parameter("@Opposite_Acctno", DbType.String, ent.getOppositeAcctno()));
		sqlParameterList.add(new Parameter("@Opposite_Acct_Name", DbType.String, ent.getOppositeAcctName()));
		sqlParameterList.add(new Parameter("@Opposite_Bank_Cd", DbType.String, ent.getOppositeBankCd()));
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
        sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
