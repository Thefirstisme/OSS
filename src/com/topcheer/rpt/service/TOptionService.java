package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;

import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TOption;

public class TOptionService extends JdbcOracleBaseService{

	public List<?> findTOptionList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TOption");
	}

	public List<?> findTOptionList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TOption");
	}

	/**
	* 获取 J01FinOrg 分页数据
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
			sort = "Declare_Dt DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("select Acct_Id+'_'+convert(varchar(10),Declare_Dt,112)+'_'+Detail_Seq AS id,if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Mature_Dt,Deliverydate,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ( select row_number() over(order by %1$s) as num ,if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Mature_Dt,Deliverydate,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from RPT.dbo.T_Option where %2$s ) as a where num > %3$s and num <= %4$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Mature_Dt,Deliverydate,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from RPT.dbo.T_Option where %2$s order by %1$s", sort, filter);
		}
		return this.findTOptionList(sql);
	}

	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from RPT.dbo.T_Option where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_Option
	* @param ent
	* @return
	*/
	public int setTOption(TOption ent){
		String sql = "Update RPT.dbo.T_Option Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Belong_Org_Id=@Belong_Org_Id, Buy_Currency=@Buy_Currency, Buy_Amt=@Buy_Amt, Buy_Prc=@Buy_Prc, Sell_Currency=@Sell_Currency, Sell_Amt=@Sell_Amt, Sell_Prc=@Sell_Prc, Mature_Dt=@Mature_Dt, Deliverydate=@Deliverydate, Opposite_Acctno=@Opposite_Acctno, Opposite_Acct_Name=@Opposite_Acct_Name, Opposite_Bank_Cd=@Opposite_Bank_Cd, Country_Cd=@Country_Cd, Domecharge_Area_Cd=@Domecharge_Area_Cd, Txn_Attri=@Txn_Attri,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Detail_Seq=@Detail_Seq";
		return this.getCount(sql, this.getTOptionParameterList(ent));
	}

	/**
	* 新增 一条 TOption
	* @param ent
	* @return
	*/
	public int addTOption(TOption ent){
		String sql = "Insert Into RPT.dbo.T_Option  (if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Mature_Dt,Deliverydate,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Report_Id, @Declare_Seq, @Declare_Dt, @Belong_Org_Id, @Buy_Currency, @Buy_Amt, @Buy_Prc, @Sell_Currency, @Sell_Amt, @Sell_Prc, @Mature_Dt, @Deliverydate, @Opposite_Acctno, @Opposite_Acct_Name, @Opposite_Bank_Cd, @Country_Cd, @Domecharge_Area_Cd, @Txn_Attri, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTOptionParameterList(ent));
	}

	/**
	* 通过主键删除 T_Option
	* @param seq
	* @return
	*/
	public int delTOption(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from RPT.dbo.T_Option where Acct_Id = @Acct_Id and convert(varchar(10),Declare_Dt,112) = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_Option 数据
	* @param keyId
	* @return
	*/
	public TOption getTOption(String id){
		TOption result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Buy_Currency,Buy_Amt,Buy_Prc,Sell_Currency,Sell_Amt,Sell_Prc,Mature_Dt,Deliverydate,Opposite_Acctno,Opposite_Acct_Name,Opposite_Bank_Cd,Country_Cd,Domecharge_Area_Cd,Txn_Attri,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from RPT.dbo.T_Option WHERE Acct_Id = @Acct_Id and convert(varchar(10),Declare_Dt,112) = @Declare_Dt and Detail_Seq=@Detail_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Acct_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Detail_Seq", DbType.String, idList[2]));
				List<TOption> list=(List<TOption>)findTOptionList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_Option 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTOptionParameterList(TOption ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, ent.getDeclareSeq()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.DateTime, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@Buy_Currency", DbType.String, ent.getBuyCurrency()));
		sqlParameterList.add(new Parameter("@Buy_Amt", DbType.String, ent.getBuyAmt()));
		sqlParameterList.add(new Parameter("@Buy_Prc", DbType.String, ent.getBuyPrc()));
		sqlParameterList.add(new Parameter("@Sell_Currency", DbType.String, ent.getSellCurrency()));
		sqlParameterList.add(new Parameter("@Sell_Amt", DbType.String, ent.getSellAmt()));
		sqlParameterList.add(new Parameter("@Sell_Prc", DbType.String, ent.getSellPrc()));
		sqlParameterList.add(new Parameter("@Mature_Dt", DbType.DateTime, ent.getMatureDt()));
		sqlParameterList.add(new Parameter("@Deliverydate", DbType.DateTime, ent.getDeliverydate()));
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
