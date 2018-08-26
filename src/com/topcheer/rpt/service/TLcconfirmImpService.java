package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TLcconfirmImp;

public class TLcconfirmImpService extends JdbcOracleBaseService{

	public List<?> findTLcconfirmImpList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TLcconfirmImp");
	}

	public List<?> findTLcconfirmImpList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TLcconfirmImp");
	}

	public List<?> findTLcconfirmImpList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TLcconfirmImp" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TLcconfirmImp 分页数据
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
			sql = String.format("SELECT Report_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status FROM ZMQ_T_LCConfirm_Imp WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_LCConfirm_Imp where %2$s order by %1$s", sort, filter);
		}
		return this.findTLcconfirmImpList(sql);
	}

/**
	* 获取 TLcconfirmImp 分页数据
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
			sql = String.format("SELECT Report_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Declare_Seq AS id, if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd FROM ZMQ_T_LCConfirm_Imp WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd from ZMQ_T_LCConfirm_Imp where %2$s order by %1$s", sort, filter);
		}
		return this.findTLcconfirmImpList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_LCConfirm_Imp where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_LCConfirm_Imp
	* @param ent
	* @return
	*/
	public int setTLcconfirmImp(TLcconfirmImp ent){
		String sql = "Update ZMQ_T_LCConfirm_Imp Set if_Need_Change=@if_Need_Change, ifChecked=@ifChecked, Belong_Org_Id=@Belong_Org_Id, Bal=@Bal, Abroad_Opp_Bank_Id=@Abroad_Opp_Bank_Id, Applicant_Corp_Nm=@Applicant_Corp_Nm, Applicant_Corp_Org_Id=@Applicant_Corp_Org_Id, Applicant_Country_Cd=@Applicant_Country_Cd, Applicant_Dome_Area_Cd=@Applicant_Dome_Area_Cd, Confirm_Mature_Dt=@Confirm_Mature_Dt, Currency_Cd=@Currency_Cd,modified_User=zmq_query_ts_user_name(@modifiedUser),modified_time=sysdate Where  Report_Id=@Report_Id and Declare_Dt=@Declare_Dt and Declare_Seq=@Declare_Seq";
		return this.getCount(sql, this.getTLcconfirmImpParameterList(ent));
	}

	/**
	* 新增 一条 TLcconfirmImp
	* @param ent
	* @return
	*/
	public int addTLcconfirmImp(TLcconfirmImp ent){
		String sql = "Insert Into ZMQ_T_LCConfirm_Imp  (if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd,CREATE_USER,CREATE_TIME) Values(@if_Need_Change, @ifChecked, @Report_Id, @Declare_Seq, @Declare_Dt, @Belong_Org_Id, @Bal, @Abroad_Opp_Bank_Id, @Applicant_Corp_Nm, @Applicant_Corp_Org_Id, @Applicant_Country_Cd, @Applicant_Dome_Area_Cd, @Confirm_Mature_Dt, @Currency_Cd, zmq_query_ts_user_name(@CREATE_USER), sysdate)";
		return this.getCount(sql, this.getTLcconfirmImpParameterList(ent));
	}

	/**
	* 通过主键删除 T_LCConfirm_Imp
	* @param seq
	* @return
	*/
	public int delTLcconfirmImp(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_LCConfirm_Imp where Report_Id = @Report_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
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
	* 获得一条T_LCConfirm_Imp 数据
	* @param keyId
	* @return
	*/
	public TLcconfirmImp getTLcconfirmImp(String id){
		TLcconfirmImp result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select if_Need_Change,ifChecked,Report_Id,Declare_Seq,Declare_Dt,Belong_Org_Id,Bal,Abroad_Opp_Bank_Id,Applicant_Corp_Nm,Applicant_Corp_Org_Id,Applicant_Country_Cd,Applicant_Dome_Area_Cd,Confirm_Mature_Dt,Currency_Cd,modified_User,MODIFIED_TIME,CREATE_USER,CREATE_TIME,status from ZMQ_T_LCConfirm_Imp WHERE Report_Id = @Report_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Report_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				List<TLcconfirmImp> list=(List<TLcconfirmImp>)findTLcconfirmImpList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从T_LCConfirm_Imp 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTLcconfirmImpParameterList(TLcconfirmImp ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@if_Need_Change", DbType.String, ent.getIfNeedChange()));
		sqlParameterList.add(new Parameter("@ifChecked", DbType.String, ent.getIfchecked()));
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, ent.getDeclareSeq()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Belong_Org_Id", DbType.String, ent.getBelongOrgId()));
		sqlParameterList.add(new Parameter("@Bal", DbType.BigDecimal, ent.getBal()));
		sqlParameterList.add(new Parameter("@Abroad_Opp_Bank_Id", DbType.String, ent.getAbroadOppBankId()));
		sqlParameterList.add(new Parameter("@Applicant_Corp_Nm", DbType.String, ent.getApplicantCorpNm()));
		sqlParameterList.add(new Parameter("@Applicant_Corp_Org_Id", DbType.String, ent.getApplicantCorpOrgId()));
		sqlParameterList.add(new Parameter("@Applicant_Country_Cd", DbType.String, ent.getApplicantCountryCd()));
		sqlParameterList.add(new Parameter("@Applicant_Dome_Area_Cd", DbType.String, ent.getApplicantDomeAreaCd()));
		sqlParameterList.add(new Parameter("@Confirm_Mature_Dt", DbType.Date, ent.getConfirmMatureDt()));
		sqlParameterList.add(new Parameter("@Currency_Cd", DbType.String, ent.getCurrencyCd()));
		sqlParameterList.add(new Parameter("@modifiedUser", DbType.String, ent.getModifiedUser()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
   	sqlParameterList.add(new Parameter("@CREATE_USER", DbType.String, ent.getCreateUser()));
		return sqlParameterList;
	}

}
