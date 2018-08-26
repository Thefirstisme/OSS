package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TBorrcentbankDtl;

public class TBorrcentbankDtlService extends JdbcOracleBaseService{

	public List<?> findTBorrcentbankDtlList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TBorrcentbankDtl");
	}

	public List<?> findTBorrcentbankDtlList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TBorrcentbankDtl");
	}

	public List<?> findTBorrcentbankDtlList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TBorrcentbankDtl" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TBorrcentbankDtl 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_BorrCentBank_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BorrCentBank_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTBorrcentbankDtlList(sql);
	}

/**
	* 获取 TBorrcentbankDtl 分页数据
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
			sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Detail_Seq AS id, Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change FROM (SELECT a.*, ROWNUM rn FROM (SELECT Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change FROM ZMQ_T_BorrCentBank_Dtl WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change from ZMQ_T_BorrCentBank_Dtl where %2$s order by %1$s", sort, filter);
		}
		return this.findTBorrcentbankDtlList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_BorrCentBank_Dtl where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_BorrCentBank_Dtl
	* @param ent
	* @return
	*/
	public int setTBorrcentbankDtl(TBorrcentbankDtl ent){
		String sql = "Update ZMQ_T_BorrCentBank_Dtl Set Out_In_Acct_Ind=@Out_In_Acct_Ind, Acct_Dt=@Acct_Dt, Orig_Txn_Dt=@Orig_Txn_Dt, Bal=@Bal, Period_Unit=@Period_Unit, Period_len=@Period_len, Int_Start_Dt=@Int_Start_Dt, Mature_Dt=@Mature_Dt, Opposite_Name=@Opposite_Name, Yield_Rate=@Yield_Rate, Txn_Attri=@Txn_Attri, if_Need_Change=@if_Need_Change,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Detail_Seq=@Detail_Seq";
		return this.getCount(sql, this.getTBorrcentbankDtlParameterList(ent));
	}

	/**
	* 新增 一条 TBorrcentbankDtl
	* @param ent
	* @return
	*/
	public int addTBorrcentbankDtl(TBorrcentbankDtl ent){
		String sql = "Insert Into ZMQ_T_BorrCentBank_Dtl  (Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change,CREATE_USER,CREATE_TIME) Values(@Acct_Id, @Declare_Dt, @Detail_Seq, @Out_In_Acct_Ind, @Acct_Dt, @Orig_Txn_Dt, @Bal, @Period_Unit, @Period_len, @Int_Start_Dt, @Mature_Dt, @Opposite_Name, @Yield_Rate, @Txn_Attri, @if_Need_Change, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		int t =  this.getCount(sql, this.getTBorrcentbankDtlParameterList(ent));
		updateTolRecord("ZMQ_T_BorrCentBank_Dtl",ent.getAcctId(),ent.getDeclareDt());
		return t;
	}

	/**
	* 通过主键删除 T_BorrCentBank_Dtl
	* @param seq
	* @return
	*/
	public int delTBorrcentbankDtl(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_BorrCentBank_Dtl where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
				updateTolRecord("ZMQ_T_BorrCentBank_Dtl",idList[0],idList[1]);
			}
		}
		return result;
	}

	/**
	* 获得一条T_BorrCentBank_Dtl 数据
	* @param keyId
	* @return
	*/
	public TBorrcentbankDtl getTBorrcentbankDtl(String id){
		TBorrcentbankDtl result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select Acct_Id,Declare_Dt,Detail_Seq,Out_In_Acct_Ind,Acct_Dt,Orig_Txn_Dt,Bal,Period_Unit,Period_len,Int_Start_Dt,Mature_Dt,Opposite_Name,Yield_Rate,Txn_Attri,if_Need_Change,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_BorrCentBank_Dtl WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				List<TBorrcentbankDtl> list=(List<TBorrcentbankDtl>)findTBorrcentbankDtlList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_BorrCentBank_Dtl 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTBorrcentbankDtlParameterList(TBorrcentbankDtl ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, ent.getAcctId()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, ent.getDetailSeq()));
		sqlParameterList.add(new Parameter("@Out_In_Acct_Ind", DbType.String, ent.getOutInAcctInd()));
		sqlParameterList.add(new Parameter("@Acct_Dt", DbType.Date, ent.getAcctDt()));
		sqlParameterList.add(new Parameter("@Orig_Txn_Dt", DbType.Date, ent.getOrigTxnDt()));
		sqlParameterList.add(new Parameter("@Bal", DbType.BigDecimal, ent.getBal()));
		sqlParameterList.add(new Parameter("@Period_Unit", DbType.String, ent.getPeriodUnit()));
		sqlParameterList.add(new Parameter("@Period_len", DbType.String, ent.getPeriodLen()));
		sqlParameterList.add(new Parameter("@Int_Start_Dt", DbType.Date, ent.getIntStartDt()));
		sqlParameterList.add(new Parameter("@Mature_Dt", DbType.Date, ent.getMatureDt()));
		sqlParameterList.add(new Parameter("@Opposite_Name", DbType.String, ent.getOppositeName()));
		sqlParameterList.add(new Parameter("@Yield_Rate", DbType.BigDecimal, ent.getYieldRate()));
		sqlParameterList.add(new Parameter("@Txn_Attri", DbType.String, ent.getTxnAttri()));
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
