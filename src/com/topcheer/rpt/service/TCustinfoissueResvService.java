package com.topcheer.rpt.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.velocity.bo.Batch;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.call.CallSqlUtil;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.jdbc.util.WordStringUtil;
import com.topcheer.mq.EnvironmentInfo;
import com.topcheer.mq.MQSender;
import com.topcheer.mq.XmlUtil;
import com.topcheer.rpt.RptUtil;
import com.topcheer.rpt.bo.TCustinfoissueResv;
import com.topcheer.rpt.bo.Tpublish;

public class TCustinfoissueResvService extends JdbcOracleBaseService{

	public List<?> findTCustinfoissueResvList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.TCustinfoissueResv");
	}

	public List<?> findTCustinfoissueResvList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.TCustinfoissueResv");
	}

	public List<?> findTCustinfoissueResvList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.TCustinfoissueResv" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}

	/**
	* 获取 TCustinfoissueResv 分页数据
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
			sort = " DECLARE_DT DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT ACC_ORG_CODE || '_' || Cust_No || '_' || to_char(Last_Update_Time,'yyyy-MM-dd HH24:Mi:ss') AS id, Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt,ACC_ORG_CODE,Cust_No,Last_Update_Time FROM (SELECT a.*, ROWNUM rn FROM (SELECT Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt,ACC_ORG_CODE,Cust_No,Last_Update_Time FROM ZMQ_T_CustInfoIssue_Resv WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt, ACC_ORG_CODE,Cust_No,Last_Update_Time from ZMQ_T_CustInfoIssue_Resv where %2$s order by %1$s", sort, filter);
		}
		return this.findTCustinfoissueResvList(sql);
	}

/**
	* 获取 TCustinfoissueResv 分页数据
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
			sort = " DECLARE_DT DESC ";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT REPORT_ID || '_' || Iden_Type || '_' || Iden_No AS id, Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt FROM (SELECT a.*, ROWNUM rn FROM (SELECT Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt FROM ZMQ_T_CustInfoIssue_Resv WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", sort, filter, startIndex, endIndex);
		}
		else{
          sql = String.format("select Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt from ZMQ_T_CustInfoIssue_Resv where %2$s order by %1$s", sort, filter);
		}
		return this.findTCustinfoissueResvList(sql, classPath);
	}
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_CustInfoIssue_Resv where %1$s ", filter);
		return  this.getResultRow(sql);
	}

	/**
	* 更新 一条 T_CustInfoIssue_Resv
	* @param ent
	* @return
	*/
	public int setTCustinfoissueResv(TCustinfoissueResv ent){
		String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Report_Id=@Report_Id, Iden_Type=@Iden_Type, Iden_No=@Iden_No, Cust_Nm=@Cust_Nm, Categ=@Categ, Oper_Type=@Oper_Type, Declare_Dt=@Declare_Dt, Open_Dt=@Open_Dt, Close_Dt=@Close_Dt , Acc_Org_Code=@Acc_Org_Code , Cust_No=@Cust_No, Last_Update_Time=sysdate Where Cust_No=@Cust_No";
		return this.getCount(sql, this.getTCustinfoissueResvParameterList(ent));
	}

	/**
	* 新增 一条 TCustinfoissueResv
	* @param ent
	* @return
	*/
	public int addTCustinfoissueResv(TCustinfoissueResv ent){
		String sql = "Insert Into ZMQ_T_CustInfoIssue_Resv  (Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt,ACC_ORG_CODE,Cust_No,Last_Update_Time) Values(@Report_Id, @Iden_Type, @Iden_No, @Cust_Nm, @Categ, @Oper_Type, @Declare_Dt, @Open_Dt, @Close_Dt,@Acc_Org_Code,@Cust_No, sysdate)";
		return this.getCount(sql, this.getTCustinfoissueResvParameterList(ent));
	}

	/**
	* 通过主键删除 T_CustInfoIssue_Resv
	* @param seq
	* @return
	*/
	public int delTCustinfoissueResv(String id){
		int result=0;
		if(!id.isEmpty()){
			String[] idList = id.split("_");
			if(idList.length==3){
				String sql = "delete from ZMQ_T_CustInfoIssue_Resv where Report_Id=@Report_Id and Iden_Type=@Iden_Type and Iden_No=@Iden_No";
				List<Parameter> sqlParameterList = new ArrayList<Parameter>();
				sqlParameterList.add(new Parameter("@Report_Id", DbType.String, idList[0]));
				sqlParameterList.add(new Parameter("@Iden_Type", DbType.String, idList[1]));
				sqlParameterList.add(new Parameter("@Iden_No", DbType.String, idList[2]));
				result= this.getCount(sql, sqlParameterList);
			}
		}
		return result;
	}

	/**
	* 获得一条T_CustInfoIssue_Resv 数据
	* @param keyId
	* @return
	*/
	public TCustinfoissueResv getTCustinfoissueResv(String id){
		TCustinfoissueResv result = null;
		if(!id.isEmpty()){
			String sql = "select Report_Id,Iden_Type,Iden_No,Cust_Nm,Categ,Oper_Type,Declare_Dt,Open_Dt,Close_Dt,Acc_Org_Code,Cust_No from ZMQ_T_CustInfoIssue_Resv WHERE Cust_No=@Cust_No";
			List<Parameter> sqlParameterList = new ArrayList<Parameter>();
			sqlParameterList.add(new Parameter("@Cust_No", DbType.String, id));
			List<TCustinfoissueResv> list=(List<TCustinfoissueResv>)findTCustinfoissueResvList(sql,sqlParameterList);
			if(list!=null && list.size()>0){
				result=list.get(0);
			}
		}
		return result;
	}

	/**
	* 从T_CustInfoIssue_Resv 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTCustinfoissueResvParameterList(TCustinfoissueResv ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@Report_Id", DbType.String, ent.getReportId()));
		sqlParameterList.add(new Parameter("@Iden_Type", DbType.String, ent.getIdenType()));
		sqlParameterList.add(new Parameter("@Iden_No", DbType.String, ent.getIdenNo()));
		sqlParameterList.add(new Parameter("@Cust_Nm", DbType.String, ent.getCustNm()));
		sqlParameterList.add(new Parameter("@Categ", DbType.String, ent.getCateg()));
		sqlParameterList.add(new Parameter("@Oper_Type", DbType.String, ent.getOperType()));
		sqlParameterList.add(new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt()));
		sqlParameterList.add(new Parameter("@Open_Dt", DbType.Date, ent.getOpenDt()));
		sqlParameterList.add(new Parameter("@Close_Dt", DbType.Date, ent.getCloseDt()));
		//sqlParameterList.add(new Parameter("@Last_Update_Time", DbType.DateTime, ent.getLastUpdateTime()));
		sqlParameterList.add(new Parameter("@Acc_Org_Code", DbType.String, ent.getAccOrgCode()));
		sqlParameterList.add(new Parameter("@Cust_No", DbType.String, ent.getCustNo()));
		


		
		return sqlParameterList;
	}
	
	public void processCustinfo(TpublishService tPublishService,Tpublish ent) {
		//从数据库得到xml
		//校验是否通过
		//通过的话，保存到数据库，生成返回的xml拼接，插入到数据库中，发送MQ
		//失败的话，生成xml，发送MQ
		//String msgId = "20051024092733000550";
		String xml = ent.getXml();
		String isPass = "";
		List<TCustinfoissueResv> list = XmlUtil.toCastTCustinfoissueResvByXml(xml);
		isPass = this.verifyAll(list);
		if(isPass.equals("Pass")) {
			this.process(list);
		}
		this.toShangBao(isPass,ent,list);
		this.mqSendM(tPublishService,ent.getMsgid());
	}
	
	
	public void mqSendM(TpublishService tPublishService,String msgids) {
		if(!msgids.isEmpty()){
			Tpublish rpt = tPublishService.getpublishRpt(msgids);
			//List<Tpublish> entList=(List<Tpublish>)tPublishService.getList("1",msgids);	
			
			//for(Tpublish rpt : entList){
				String xmlContent = rpt.getReXml();
				String mqStr = WordStringUtil.GBKtoISO88591(xmlContent);
				logger.info(xmlContent);
				// 转码
				MQSender.addMess(mqStr);
				EnvironmentInfo environmentInfo = new EnvironmentInfo();
				try {
					Thread.sleep(environmentInfo.SLEEP_TIME);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				//rpt.setStatus("3");
				rpt.setIspublish("2");
				rpt.setPublishDt(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME));
				String sql = "UPDATE [RPT].[dbo].[T_Publish_Rpt]"
						+ " SET [ispublish] = '"+rpt.getIspublish()	
						+ "' ,[publish_dt] = '"+rpt.getPublishDt()
						+ "' WHERE msgid = '"+rpt.getMsgid()+"'"; 
				this.execUpdate(sql);
				MQSender.mqSendM.run();
			//}
		}
	}
	
	/**
	 * 
	 */
	public void toShangBao(String isPass,Tpublish ent,List list) {
		System.out.println("toShangBao");
//		ApplicationContext ac2 = WebApplicationContextUtils
//				.getWebApplicationContext(ServletActionContext
//						.getServletContext());
		//TpublishService tPublishService = (TpublishService) ac2.getBean("tPublishService");
		TpublishService tPublishService = new TpublishService();
//		String declareDt = this.getStringParameter("declareDt").substring(0,10);                                                                                                                                                                 
//  		String tableName = this.getStringParameter("tableName");   
//  		
//  		String msgNo = this.getStringParameter("msgNo");             
		String declareDt = ent.getDataDt();                                                                                                                                                                 
		String tableName = "T_CustInfoIssue_Resv";   		
		//String msgNo = "310101";    
  		// TODO 判断大小                                                                                                                                                                                                        
  		//（1）单个报文、文件的大小不超过2MB；                                                                                                                                                                                  
  		//（2）单个报文，如为批量头＋明细结构，批量头总笔数不超过200条；                                                                                                                                                        
  		// 如为无批量头结构，明细笔数不超过1000条。                                                                                                                                                                             
  		//String filter = " Declare_Dt='" + declareDt +"'";
  		//String sort = "Declare_Dt DESC";
  		// 获得总数                                                                                                                                                                                                             
  		//int total = tPublishService.getRowCount("rpt.."+tableName, filter);
  		Batch batch1 = new Batch();
//  		if(isPass.equals("Pass")) {//验证成功
//  			batch1.setMsgNo(msgNo);
//  			batch1.setTotalCount(""+list.size());
//  			batch1.setResult("90000");
//  			batch1.setAddWord("成功");
//  			batch1.setInormation("数据接收并保存成功");
//  		} else {
//  			batch1.setMsgNo(msgNo);
//  			batch1.setTotalCount("0");
//  			batch1.setResult("90001");
//  			batch1.setAddWord("错误的数据信息："+isPass);
//  			batch1.setInormation("错误的数据信息："+isPass);
//  		}
		// 整理汇总list集合 ，参数问题需要调整                                                                                                                                                                             
		//List<Batch> entList=(List<Batch>)tPublishService.getByPage(0, total, filter, sort, "com.topcheer.base.velocity.bo.Batch",tableName);
		List<Batch> entList = new ArrayList<Batch>();
		entList.add(batch1);
		// 如果是汇总明细表，则整理明细信息
		if("_tol".endsWith(tableName.substring(tableName.length()-4).toLowerCase())){
			String dtlTableName = RptUtil.replacLastTolToDal(tableName);
	  		// 需要在生成XML文件前，整理明细信息的【明细序号】，调用存储过程Update_Rpt_Tol
	  		String callReturnStr = CallSqlUtil.Update_Update_Rpt_Tol(dtlTableName, declareDt);
	  		if("1".equals(callReturnStr)){                                                                                          
	  			// 整理汇总 + 明细集合                                                                                                                                                                                                  
	  			if(entList != null && entList.size() >0){
	  				for(int i = 0; i<entList.size(); i++){
	  					Batch batch = entList.get(i);                                                                                                                                                                                       
	  					String queryDtlSql = "select * from dbo."+dtlTableName+" where Acct_Id ='"+batch.getAcctId()+"' and  convert(varchar(10),Declare_Dt,112) = '" +batch.getDeclareDt()+ "'";
	  					List<?> dtlList = tPublishService.findTpublishList(queryDtlSql, "com.topcheer.base.velocity.bo.Tran");                                                                                                      
	  					batch.setTranList(dtlList);
	  					batch.setTolRecord(dtlList.size()+""); 
	  				}                                                                                                                                                                                                                     
	  			}                                                                                                                                                                                                                                                                                                                                                                                                  
	  		}                                                                                                                                                                                                                     
		}
		
		//tPublishService.toCommitRH(msgNo, entList, tableName, declareDt,ent.getMsgid());
	}
	/**
	 * 一次性处理一个list的关联账户信息
	 * @param list
	 */
	public void process(List<TCustinfoissueResv> list) {
		if(list!= null && list.size() >0){
			for(int i = 0; i <list.size(); i++){
				// 获得从XML中解析的bean
				TCustinfoissueResv tCustinfoissueResv = list.get(i);
				// 如果OperType为1：新增
				if("1".equals(tCustinfoissueResv.getOperType())){
					// 判断数据库中是否存在
					String id = tCustinfoissueResv.getReportId()+"_" +tCustinfoissueResv.getOrgId() +"_" +tCustinfoissueResv.getCustNo();
					TCustinfoissueResv temp = getTCustinfoissueResv(id);
					// 如果数据库中没有该数据，则新增
					if(temp ==null){
						// 将申报日期设置为开户日期
						tCustinfoissueResv.setOpenDt(tCustinfoissueResv.getDeclareDt());
						tCustinfoissueResv.setOperType("1");
						String sql = "Insert Into ZMQ_T_CustInfoIssue_Resv  (Report_Id,Cust_Nm,Oper_Type,Declare_Dt,Open_Dt) Values(@Report_Id, @Cust_Nm, @Oper_Type, @Declare_Dt, @Open_Dt)";
						this.getCount(sql, this.getTCustinfoissueResvParameterList(tCustinfoissueResv));
					// 如果数据库中存在，则更新
					}else{
						// 更新申报日期、开户日期；
						if("1".equals(temp.getOperType())){
							String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Oper_Type='1', Declare_Dt='"+tCustinfoissueResv.getDeclareDt()+"', Cust_Nm='"+tCustinfoissueResv.getCustNm()+"', Open_Dt='"+tCustinfoissueResv.getDeclareDt()+"' Where  Report_Id='"+tCustinfoissueResv.getReportId()+"'";
							this.execUpdate(sql);
						// 更新申报日期、开户日期，更新OperType由关户改为新增、删除关户日期；
						}else if("3".equals(temp.getOperType())){
							String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Oper_Type='1', Declare_Dt='"+tCustinfoissueResv.getDeclareDt()+"', Cust_Nm='"+tCustinfoissueResv.getCustNm()+"', Open_Dt='"+tCustinfoissueResv.getDeclareDt()+"' Where  Report_Id='"+tCustinfoissueResv.getReportId()+"'";
							this.execUpdate(sql);
						}
					}
				}else if("3".equals(tCustinfoissueResv.getOperType())){
					SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
					String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Oper_Type='3',Cust_Nm='"+tCustinfoissueResv.getCustNm()+"', close_dt='"+df.format(new java.util.Date())+"' Where  Report_Id='"+tCustinfoissueResv.getReportId()+"'";
					this.execUpdate(sql);
				} else if("2".equals(tCustinfoissueResv.getOperType())) {
					String id = tCustinfoissueResv.getReportId()+"_" +tCustinfoissueResv.getOrgId() +"_" +tCustinfoissueResv.getCustNo();
					TCustinfoissueResv temp = getTCustinfoissueResv(id);
					// 如果数据库中没有该数据，则将信息返回给人行
					if(temp !=null){
						// 更新申报日期、开户日期；
						if("1".equals(temp.getOperType())){
							String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Oper_Type='1',Cust_Nm='"+tCustinfoissueResv.getCustNm()+"', Declare_Dt='"+tCustinfoissueResv.getDeclareDt()+"', Open_Dt='"+tCustinfoissueResv.getDeclareDt()+"' Where  Report_Id='"+tCustinfoissueResv.getReportId()+"'";
							this.execUpdate(sql);
						// 更新申报日期、开户日期，更新OperType由关户改为新增、删除关户日期；
						}else if("3".equals(temp.getOperType())){
							String sql = "Update ZMQ_T_CustInfoIssue_Resv Set Oper_Type='1', Cust_Nm='"+tCustinfoissueResv.getCustNm()+"', Declare_Dt='"+tCustinfoissueResv.getDeclareDt()+"', Open_Dt='"+tCustinfoissueResv.getDeclareDt()+"' Where  Report_Id='"+tCustinfoissueResv.getReportId()+"'";
							this.execUpdate(sql);
						}
					}
				}
			}
		}
	}
	/**
	 * 验证一个list的TCustinfoissueResv数据是否合法
	 * @param list
	 * @return 合法返回Pass，不合法返回Error
	 */
	public String verifyAll(List<TCustinfoissueResv> list) {
		StringBuffer sb = new StringBuffer();
		for(TCustinfoissueResv tCustinfoissueResv:list) {
			sb.append(this.verify(tCustinfoissueResv));
		}
		if(!sb.toString().contains("错误")) {
			return "Pass";
		} else {
			return sb.toString();
		}
	}
	/**
	 * 验证一条tCustinfoissueResv是否合法
	 * @param tCustinfoissueResv
	 * @return 合法返回“”，不合法返回错误信息
	 */
	public String verify(TCustinfoissueResv tCustinfoissueResv) {
		StringBuffer sb = new StringBuffer(" ");
		String id = tCustinfoissueResv.getReportId()+"_" +tCustinfoissueResv.getOrgId() +"_" +tCustinfoissueResv.getCustNo();
		TCustinfoissueResv temp = getTCustinfoissueResv(id);

		if(!tCustinfoissueResv.getReportId().matches("\\d{6}")) {
			sb.append("报表编号错误:"+tCustinfoissueResv.getReportId()+";");
		} else if(StringUtils.isNotEmpty(tCustinfoissueResv.getOrgId())) {
			if(tCustinfoissueResv.getOrgId().length() > 14 && tCustinfoissueResv.getOrgId().length()<12){
				sb.append("所属机构代码错误:"+tCustinfoissueResv.getOrgId()+";");
			}
		} else if(!tCustinfoissueResv.getCustNm().matches("[\u4e00-\u9fa5]{1,128}")) {
			sb.append("户名错误："+tCustinfoissueResv.getCustNm()+";");
		} else if(!tCustinfoissueResv.getCustNo().matches("[\\d\\w]{1,35}")) {
			sb.append("账号错误："+tCustinfoissueResv.getCustNo()+";");
		} else if(!tCustinfoissueResv.getOperType().equals("1")&&!tCustinfoissueResv.getOperType().equals("2")&&!tCustinfoissueResv.getOperType().equals("3")) {
			sb.append("操作类型错误:"+tCustinfoissueResv.getOperType()+";");
		} else if(!tCustinfoissueResv.getDeclareDt().toString().matches("[\\d]{8}")) {
			sb.append("申报日期错误："+tCustinfoissueResv.getDeclareDt().toString()+";");
		} else if("2".equals(tCustinfoissueResv.getOperType()) && temp==null) {
			sb.append(" 主键错误，需要修改的客户信息下发记录没找到，确认主键为： "+id+" 的操作类型是否为2");
		}
		return sb.toString().substring(1, sb.toString().length());
	}

	
	
}
