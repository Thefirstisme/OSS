package com.topcheer.rpt.service;

import java.util.ArrayList;
import java.util.List;

import com.topcheer.base.utils.PropertyUtils;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.CTCd;

public class CTCdService extends JdbcOracleBaseService{
	// 已有的货币代码
	public static String SPDBCountryCd = PropertyUtils.getProperty("SPDBCountryCd");

	public List<?> findCTCdList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.CTCd");
	}

	public List<?> findCTCdList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.CTCd");
	}
	
	public List<?> getDic(String sysId){
		if(sysId.isEmpty()){
			sysId="1=2";
		}
		// 查询币种时，只查询目前的币种，临时解决方案，需要调整
		if(sysId.equals("T_Currency_Cde")){
			return getDic(sysId, SPDBCountryCd);
		}
		String sql="select Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from OPT.dbo.C_T_Cd where Table_Name='"+sysId+"'";
		return this.findCTCdList(sql);
	}

	public List<?> getDic(String sysId, String cd1InStr){
		if(sysId.isEmpty()){
			sysId="1=2";
		}
		String sql="select Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from OPT.dbo.C_T_Cd where Table_Name='"+sysId+"' and Cd1 in (" + cd1InStr +")";
		return this.findCTCdList(sql);
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
			sql = String.format("select Report_Id+'_'+convert(varchar(10),Declare_Dt,112)+'_'+Declare_Seq AS id,Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from ( select row_number() over(order by %1$s) as num ,Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from RPT.dbo.C_T_Cd where %2$s ) as a where num > %3$s and num <= %4$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from RPT.dbo.C_T_Cd where %2$s order by %1$s", sort, filter);
		}
		return this.findCTCdList(sql);
	}

	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from RPT.dbo.C_T_Cd where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 C_T_Cd
	* @param ent
	* @return
	*/
	public int setCTCd(CTCd ent){
		String sql = "Update RPT.dbo.C_T_Cd Set Cd2=@Cd2, Cd3=@Cd3, Cd4=@Cd4, Cd5=@Cd5, Cd_Desc=@Cd_Desc Where  Report_Id=@Report_Id and Declare_Dt=@Declare_Dt and Declare_Seq=@Declare_Seq";
		return this.getCount(sql, this.getCTCdParameterList(ent));
	}

	/**
	* 新增 一条 CTCd
	* @param ent
	* @return
	*/
	public int addCTCd(CTCd ent){
		String sql = "Insert Into RPT.dbo.C_T_Cd  (Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc) Values(@Table_Name, @Table_Desc, @Cd1, @Cd2, @Cd3, @Cd4, @Cd5, @Cd_Desc)";
		return this.getCount(sql, this.getCTCdParameterList(ent));
	}

	/**
	* 通过主键删除 C_T_Cd
	* @param seq
	* @return
	*/
	public int delCTCd(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from RPT.dbo.C_T_Cd where Report_Id = @Report_Id and convert(varchar(10),Declare_Dt,112) = @Declare_Dt and Declare_Seq=@Declare_Seq";
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
	* 获得一条C_T_Cd 数据
	* @param keyId
	* @return
	*/
	public CTCd getCTCd(String id){
		CTCd result = null;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "select Table_Name,Table_Desc,Cd1,Cd2,Cd3,Cd4,Cd5,Cd_Desc from RPT.dbo.C_T_Cd WHERE Report_Id = @Report_Id and convert(varchar(10),Declare_Dt,112) = @Declare_Dt and Declare_Seq=@Declare_Seq";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Report_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Declare_Dt", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Declare_Seq", DbType.String, idList[2]));
				List<CTCd> list=(List<CTCd>)findCTCdList(sql,sqlParameterList);
				if(list!=null && list.size()>0){
					result=list.get(0);
				}
			}
		}
		return result;
	}

	/**
	* 从C_T_Cd 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getCTCdParameterList(CTCd ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Table_Name", DbType.String, ent.getTableName()));
		sqlParameterList.add(new Parameter("@Table_Desc", DbType.String, ent.getTableDesc()));
		sqlParameterList.add(new Parameter("@Cd1", DbType.String, ent.getCd1()));
		sqlParameterList.add(new Parameter("@Cd2", DbType.String, ent.getCd2()));
		sqlParameterList.add(new Parameter("@Cd3", DbType.String, ent.getCd3()));
		sqlParameterList.add(new Parameter("@Cd4", DbType.String, ent.getCd4()));
		sqlParameterList.add(new Parameter("@Cd5", DbType.String, ent.getCd5()));
		sqlParameterList.add(new Parameter("@Cd_Desc", DbType.String, ent.getCdDesc()));
		return sqlParameterList;
	}

}
