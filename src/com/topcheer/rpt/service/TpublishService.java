package com.topcheer.rpt.service;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;
import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.velocity.bo.Batch;
import com.topcheer.base.velocity.bo.Head;
import com.topcheer.base.velocity.bo.Tran;
import com.topcheer.base.velocity.util.VelocityUtils;
import com.topcheer.fileio.OSSFileWriter;
import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.call.CallSqlUtil;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.jdbc.util.PropertiesUtil;
import com.topcheer.jdbc.util.WordStringUtil;
import com.topcheer.mq.EnvironmentInfo;
import com.topcheer.mq.MQSender;
import com.topcheer.mq.XmlUtil;
import com.topcheer.rpt.RptUtil;
import com.topcheer.rpt.bo.TCustinfoissueResv;
import com.topcheer.rpt.bo.Tpublish;

public class TpublishService extends JdbcOracleBaseService{
	protected static Logger logger = Logger.getLogger(TpublishService.class.getName());
	
	//private OSSFileWriter ossFileWriter;
	
	private TCustinfoissueResvService tCustinfoissueResvService;
	
	public void settCustinfoissueResvService(
			TCustinfoissueResvService tCustinfoissueResvService) {
		this.tCustinfoissueResvService = tCustinfoissueResvService;
	}
	
	public static EnvironmentInfo environmentInfo = new EnvironmentInfo();
	// 由FTZMIS给接入机构统一编码。接入机构发起各种交易时，必须填写
    // private static String FTZMIS_SRC = PropertyUtils.getProperty("FTZMIS_SRC");



	public List<?> findTCorpdepoTolList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.Tpublish");
	}

	public List<?> findTCorpdepoTolList(String querySql,List<Parameter> sqlParameterList) {
		return (List<?>) getResultPojoList(querySql.toString(),sqlParameterList,"com.topcheer.rpt.bo.Tpublish");
	}
	
	public List<?> findTpublishList(String querySql, String classPath) {
		classPath = StringUtils.isEmpty(classPath) ? classPath = "com.topcheer.rpt.bo.Tpublish" : classPath;
		return (List<?>) getResultPojoList(querySql.toString(), classPath);
	}
	/**
	* 获取 Tpublish 分页数据
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
			sort = "create_dt DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT msgid, create_dt, data_dt, publish_dt, rpt_id, rpt_nm, status,ispublish, RE_RESULT,RE_INFORMATION "
					+ "FROM (SELECT a.*, ROWNUM rn "
					+ "FROM (SELECT   msgid, create_dt, data_dt, publish_dt, rpt_id, rpt_nm, status, ispublish, RE_RESULT,RE_INFORMATION "
					+ "FROM zmq_t_publish_rpt  WHERE %2$s ORDER BY %1$s) a  WHERE ROWNUM <= %4$s) b WHERE rn > %3$s ", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,ispublish , RE_RESULT,RE_INFORMATION"
					+ "from ZMQ_T_PUBLISH_RPT where %2$s order by %1$s", sort, filter);
		}
//		if (endIndex != -1){
//			sql = String.format("select msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,ispublish,xml,re_xml "
//					+ "from ( select row_number() over(order by %1$s) as num ,msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,ispublish,xml,re_xml "
//					+ "from ZMQ_T_PUBLISH_RPT where %2$s ) as a "
//					+ "where num > %3$s and num <= %4$s", sort, filter, startIndex, endIndex);
//		}
//		else{
//			sql = String.format("select msgid,create_dt,data_dt,publish_dt,rpt_id,rpt_nm,status,ispublish,xml,re_xml "
//					+ "from ZMQ_T_PUBLISH_RPT where %2$s order by %1$s", sort, filter);
//		}
		return this.findTpublishRptList(sql);
	}

	public List<?> getByPage(int startIndex, int endIndex, String filter, String sort, String classPath, String tableName){
		if (filter.length() == 0){
			filter = "1=1";
		}
		if (sort.length() == 0){
			sort = "Declare_Dt DESC";
		}
		if(tableName.equals("ZMQ_T_FTE_AcctInfo")) {
			sort = "Declare_Dt DESC";
		}
		String sql = "";
		if (endIndex != -1){
			sql = String.format("SELECT *   "+
					"  FROM (SELECT a.*, ROWNUM rn "+
					"          FROM (SELECT   * "+
					"                    FROM "+tableName+"  WHERE %2$s ORDER BY %1$s) a  WHERE ROWNUM <= %4$s) b WHERE rn > %3$s ", sort, filter, startIndex, endIndex);
		}
		else{
			sql = String.format("select * from "+tableName+" where %2$s order by %1$s", sort, filter);
		}
		return this.findTpublishList(sql, classPath);
	}
	/**
	* 获取 J01FinOrg 分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getList(){		
		String sql = "SELECT create_dt "
				+ ", rpt_id "
				+ ", rpt_nm "
				+ ", status "
				+ ", xml "
				+ "FROM ZMQ_T_PUBLISH_RPT "; 
		return this.findTpublishRptList(sql);
	}


	/**
	* 查询某个【汇总表及其明细表】中的数据是否都可以上报，没有需要修改的
	* @param filter
	* @return
	*/
//	public String getIfCheckTolCount(String tableName){
//		int part1 = 0;
//		int part2 = 0;
//		if(StringUtils.isNotEmpty(tableName)){
//			String sqlTol = String.format("select count(*) from "+tableName+" t where if_Need_Change <> '2' ");
//			part1 = this.getResultRow(sqlTol);
//			if("_tol".equals(tableName.substring(tableName.length()-4, tableName.length()).toLowerCase())){
//				String dtlTableName = tableName.substring(0, tableName.length()-4) +"_dtl";
//				String sqlDtl = String.format("select count(*) from "+dtlTableName+" t where if_Need_Change <> '2' ");
//				part2 = this.getResultRow(sqlDtl);
//			}
//		}
//		
//		return part1+"_"+part2;
//	}
	
	/**
	* 查询某个【汇总表及其明细表】中的数据是否都可以上报，没有需要修改的
	* @param filter
	* @return
	*/
	public String getIfCheckTolCount(String tableName,String declareDt){
		String result1="";
		String result2="";
		String result="0";
		if(!tableName.startsWith("ZMQ_")){
			tableName = "ZMQ_"+tableName;
		}
		String tablechnName = RptUtil.getTableName(RptUtil.getTableName(tableName));
		
		//String sqlIsNull = String.format("select count(*) from "+tableName+" t where  Declare_Dt='"+declareDt+"'");
		//if(this.getCallString(sqlIsNull).equals("0")) {
			//result = "汇总数据为空，不需要上报！";
		//} else {
			if(StringUtils.isNotEmpty(tableName)){
				String sqlTol="";
				if("_tol".equals(tableName.substring(tableName.length()-4, tableName.length()).toLowerCase()))
				{
					//这个sql语句查询当前日期和是否需要修改字段不等于2的acct_id（等于2的为不需要修改）
					 sqlTol = String.format("select Acct_Id from "+tableName+" t where if_Need_Change <> '2'  and Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd')");
					
					 result1 = this.getCallString(sqlTol);
					 if(result1=="")//没有值说明没有需要修改的
					 {
					    String dtlTableName = tableName.substring(0, tableName.length()-4) +"_dtl";
					    String sqlDtl;
					   //增加判断是否为单位存款，主键有汇总账号和申报期修改为汇总子账号和申报日期
						if("zmq_t_corpdepo_tol".equals(tableName.toLowerCase()))
						{
							  sqlDtl = String.format("select Acct_Id from "+dtlTableName+" t where if_Need_Change <> '2' and Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd') and Acct_Id in (select SUBACCOUNTNO  from "+tableName+" t where Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd'))");
						 }else
						{
					          sqlDtl = String.format("select Acct_Id from "+dtlTableName+" t where if_Need_Change <> '2' and Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd') and Acct_Id in (select Acct_Id from "+tableName+" t where Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd'))");
						}
					    result2 = this.getCallString(sqlDtl);
					    result=result2==""?"0":"表名： "+tablechnName+" ： 明细中账号为'"+result2+"'的存在待修改数据,请修改后再上报";
					 }else
					 {
						result=result1==""?"0":"表名： "+tablechnName+" ： 汇总中账号为'"+result1+"'的数据待修改,请修改后再上报";
					 }  
					 
				}else if("zmq_t_fte_acctinfo".equals(tableName.toLowerCase())){
					//FTE、FTN、FTU账户信息报送 中主键是Acct_Id、Declare_Dt、Report_Id
					 sqlTol = String.format("select Acct_Id from "+tableName+" t where if_Need_Change <> '2'  and Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd')");	
					 result1 = this.getCallString(sqlTol);
					 result=result1==""?"0":"账号为'"+result1+"'的数据待修改,请修改后再上报";
				}else
				{
					 sqlTol = String.format("select Declare_Seq from "+tableName+" t where if_Need_Change <> '2'  and Declare_Dt=to_date('"+declareDt+"','yyyy-MM-dd')");	
					 result1 = this.getCallString(sqlTol);
					 result=result1==""?"0":"申报序号为'"+result1+"'的数据待修改,请修改后再上报";
				} 	
				
			}
		//} 
		return result;
	}
	/**
	* 查询某个汇总数据的【明细表数据】是否可以上报
	* @param filter
	* @return
	*/
	public int getIfCheckDtlCount(String tableName,String dtlPK){
		int result = 1;
		if(StringUtils.isNotEmpty(tableName)){
			if(!dtlPK.isEmpty()){
				String[] idList = dtlPK.split("_");
				if(idList.length==2){
					StringBuffer sqlBuf = new StringBuffer("select count(*) from ");
					sqlBuf.append(tableName).append(" where Acct_Id='").append(idList[0]).append("' and  Declare_Dt=to_date('").append(idList[1]).append("','yyyy-MM-dd') and if_Need_Change <> '2' ");
					return  this.getResultRow(sqlBuf.toString());
				}
			} 
			//String sql = String.format("select count(*) from "+tableName+" t where if_Need_Change <> '1'  ");
			//return  this.getResultRow(sql);
		}
		return result;
	}


	/**
	 * 获得【汇总--明细】类型的明细表的申报序号
	 * @param tableName
	 * @param acctId
	 * @param declareDt
	 * @return
	 */
	public String getDtlSeq(String tableName,
			String acctId, String declareDt){
		String sql = "select substr(Detail_Seq,length(Detail_Seq)-5,6) from ( select case when count(*)=0  then '000001'  else 'D00000'||to_char(to_number(max(Detail_Seq))+1)  end Detail_Seq    FROM  "+"ZMQ_"+tableName+"  where Acct_Id=rtrim('"+acctId+"') and (to_char(Declare_Dt,'yyyymmdd'))='"+declareDt+"')   T";
		String tempDtlSeq = getResultScalar(sql);
		String z = "00000" + tempDtlSeq;
		if(z.length() >6){
			z = z.substring(z.length()-6, z.length());
		}
		return z;
	}
	
	/**
	 * 获得【表外或其他】的申报序号
	 * @param tableName
	 * @param acctId
	 * @param declareDt
	 * @return
	 */
	public String getDeclareSeq(String tableName,String Report_Id, String declareDt){
		String sql = "select substr(Declare_Seq,length(Declare_Seq)-5,6) from ( select case when count(*)=0  then '000001'  else 'D00000'||to_char(to_number(max(Declare_Seq))+1)  end Declare_Seq    FROM  "+"ZMQ_"+tableName+"  where Report_Id=rtrim('"+Report_Id+"') and (to_char(Declare_Dt,'yyyymmdd'))='"+declareDt+"')   T";
		String tempDtlSeq = getResultScalar(sql);
		String z = "00000" + tempDtlSeq;
		if(z.length() >6){
			z = z.substring(z.length()-6, z.length());
		}
		return z;
	}
	
	/**
	 * 获得【ZMQ_T_PUBLISH_RPT】的申报序号
	 * @param tableName
	 * @param acctId
	 * @param declareDt
	 * @return
	 */
	public String getTPublishMsgId(String rptId, String dataDt){
		String sql = "select substr(MsgId,length(MsgId)-3,4) from ( select case when count(*)=0  then '0001'  else 'D000'||to_char(to_number(max(substr(MsgId,length(MsgId)-3,4)))+1)  end MsgId  FROM  ZMQ_T_Publish_Rpt where rpt_id=rtrim('"+rptId+"') and  data_dt = '"+dataDt+"')   T";
		String tempDtlSeq = getResultScalar(sql);
		String z = "0000" + tempDtlSeq;
		if(z.length() >4){
			z = z.substring(z.length()-4, z.length());
		}
		return z;
	}	

	/**
	 *一键上报时生成xml并返回生成的msgid的list
	 * @param msgNo
	 * @param entList
	 * @param tableName
	 * @param declareDt
	 * @return
	 * @throws Exception 
	 */
	public List<String> toOKCommitRH(String msgNo, List<Batch> entList, String tableName, String declareDt) throws Exception{
		int count =0;
		List<String> msgIdsList = new ArrayList<String>();
		Head head = null;
		// 上报前，先删除该类数据已经生成的报文信息
		//deleteTPublish(declareDt, msgNo);
		
  		// 拼装XML字符串
  		List<Batch> tempList = new ArrayList<Batch>();
  		// 有数据则拼装
  		if(entList != null && entList.size() >0){
  			head = new Head(msgNo,declareDt);
  			for(int i = 0; i < entList.size(); i++){
  				tempList.add(entList.get(i));
  				Batch batch = entList.get(i);
  				count++;
  				String msg = head.getMsgID();
  				if(count%200==0 || i==entList.size()-1){		// 构造 head
  					//String msgId = getTPublishMsgId(msgNo, declareDt);
  					//head = new Head(msgNo,declareDt); 
  					String xmlCon = VelocityUtils.marge(head, tempList, tableName);
  					// 入库
  					Tpublish ent = new Tpublish(head.getMsgID(), RptUtil.getTableName(msgNo),  xmlCon, head.getMsgNo(),declareDt);                                                                                                                                                                             
  					addPublishRpt(ent);
  					msgIdsList.add((head.getMsgID()));
  					tempList = new ArrayList<Batch>();
  					
  				}
  			//记录上报数据id以及报文id到中间表
  				this.dataIdIntoDataBase(msg,batch,tableName);
  			}
  		}else {		
  			// 构造 head
  			//String msgId2 = getTPublishMsgId(msgNo, declareDt);
  			head = new Head(msgNo,declareDt); 
			String xmlCon = VelocityUtils.marge(head, tempList, tableName);
			//记录上报数据id以及报文id到中间表
			//this.dataIdIntoDataBase(msgNo,batch,tableName);
			// 入库
			Tpublish ent = new Tpublish(head.getMsgID(), RptUtil.getTableName(msgNo),  xmlCon, head.getMsgNo(), declareDt);  
			if(!msgNo.equals("310101")) {
				addPublishRpt(ent);
			} else {
				setpublisRpt(ent);
			}
			msgIdsList.add((head.getMsgID()));
			count++;
  		}

		return msgIdsList;
	}

	
	/**
	 *根据报文编号及日期删除报文信息
	 * @param msgNo
	 * @param date
	 */
	public void deleteTPublish(String declareDt, String msgNo){
		String sql = "delete from ZMQ_T_PUBLISH_RPT where data_dt = '"+declareDt+"' and rpt_id = '"+msgNo+"'";
		this.execUpdate(sql);
	}

	public int deleteTPublish(String msgNo){
		//String sql = "delete from ZMQ_T_PUBLISH_RPT where  msgid = '"+msgNo+"'and status = '0'";
		List<String> strList = new ArrayList<String>();
		String sql = "update ZMQ_T_PUBLISH_RPT set status = '4' where  msgid = '"+msgNo+"'and status = '0'";
		strList.add(sql);
		String sql1 = "delete from ZMQ_T_MSGID_DATAID where msg_id='"+msgNo+"'";
		strList.add(sql1);
		return this.execBatchUpdates(strList);
	}

	public List<?> findTpublishRptList(String querySql) {
		return (List<?>) getResultPojoList(querySql.toString(),"com.topcheer.rpt.bo.Tpublish");
	}


	/**
	* 获取 J01FinOrg 分页数据
	* @param startIndex
	* @param endIndex
	* @param filter
	* @param sort
	* @return
	*/
	public List<?> getList(String mode){		
		String sql = "SELECT create_dt "
				+ ", rpt_id "
				+ ", msgid "
				+ ", publish_dt "
				+ ", rpt_nm "
				+ ", status "
				+ ", xml "
				+ "FROM ZMQ_T_PUBLISH_RPT "
				+ " WHERE ispublish = '" +mode+"'"; 
		return this.findTpublishRptList(sql);
	}
	
	public List<?> getList(String mode,String msgids){
		msgids = msgids.replaceAll(",", "','");
		msgids="'"+msgids+"'";
		String sql = "SELECT create_dt "
				+ ", rpt_id "
				+ ", data_dt "
				+ ", msgid "
				+ ", publish_dt "
				+ ", rpt_nm "
				+ ", status "
				+ ", xml "
				+ "FROM ZMQ_T_PUBLISH_RPT " 
				+ " WHERE msgid in (" + msgids +") and STATUS<> '3' ";
		return this.findTpublishRptList(sql);
	}
	
	/**
	* 更新 一条 Tpublish
	* @param ent
	* @return
	*/
	public int setpublisRpt(Tpublish ent){
		String sql = "UPDATE ZMQ_T_PUBLISH_RPT "
				+ " SET status = @status"	
				+ ", publish_dt = @publish_dt"
				+ " WHERE msgid = @msgid"; 
		this.execSqlWithPara(sql,this.getTCorpdepoDtlParameterList(ent));
		return 1;
	}
	
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getPageRowCount(String filter){
		String sql = String.format("select count(*) from ZMQ_T_PUBLISH_RPT where %1$s ", filter);
		return  this.getResultRow(sql);
	}
	
	/**
	* 更新 一条 Tpublish 
	* @param ent
	* @return
	*/
	public int setpublisRptResult(Tpublish ent){
		return setpublisRptResult(ent, tCustinfoissueResvService);
	}

	/**
	* 更新 一条 Tpublish 
	* @param ent
	* @return
	*/
	public int setpublisRptResult(Tpublish ent, TCustinfoissueResvService tCustinfoissueResvService){
		String sql = "UPDATE ZMQ_T_PUBLISH_RPT "
				+ " SET status = @status"
				+ ", re_xml = @re_xml"
				+ ", publish_dt = @publish_dt"
				+ ", re_result = @re_result"
				+ ", re_information = @re_information"
				+ " WHERE msgid = @msgid";
		logger.info("更新ZMQ_T_PUBLISH_RPT状态SQL--->" + sql);
		logger.info("更新ZMQ_T_PUBLISH_RPT状态SQL---> 其中ent.getStatus()-->" + ent.getStatus());
		int t = 0;
		try {
			t = receiveToSend(ent, sql, tCustinfoissueResvService);
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			//this.execSqlWithPara(sql,this.getTCorpdepoDtlParameterList(ent));
		}
		return t;
	}
	
	/**
	* 获得一条T_publishRpt 数据
	* @param keyId
	* @return
	*/
	public Tpublish getpublishRpt(String id){
		Tpublish result = null;
		if(!id.isEmpty()){			
			String sql = "SELECT create_dt "
					+ ", rpt_nm "	
					+ ", msgid "
					+ ", rpt_id "
					+ ", publish_dt "
					+ ", data_dt "
					+ ", status "
					+ ", xml "
					+ ", re_xml "
					+ ", ispublish "
					+ " FROM ZMQ_T_PUBLISH_RPT "
					+ " WHERE msgid ='" + id+"'"; 
			List<?> list = findTpublishRptList(sql);				
			if(list!=null && list.size()>0){
				result=(Tpublish)list.get(0);
			}
		}
		return result;
	}
	
	public int addPublishRpt(Tpublish ent){
		String sql = "INSERT INTO ZMQ_T_PUBLISH_RPT "
				+ "( create_dt "
				+ ", data_dt "
				+ ", rpt_id "
				+ ", msgid "
				+ ", rpt_nm "
				+ ", publish_dt "
				+ ", status "
				+ ", ispublish"
				+ ", re_xml "
				+ ", re_result "
				+ ", re_information )"
				//+ ", xml)"
				+ " VALUES"
				+ " (@create_dt"
				+ ",@data_dt"
				+ ",@rpt_id"
				+ ",@msgid"
				+ ",@rpt_nm"
				+ ",@publish_dt"
				+ ",@status"
				+ ",@ispublish"
				+ ",@re_xml"
				+ ", @re_result "
				+ ", @re_information )";
				//+ ",@xml)";
		int t = 0;
		try {
			t = receiveToSend(ent, sql);
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
		}
		
		return t;
	}

	public int receiveToSend(Tpublish ent, String sql){
		return receiveToSend(ent, sql, tCustinfoissueResvService);
	}
	
	public int receiveToSend(Tpublish ent, String sql, TCustinfoissueResvService tCustinfoissueResvService){
		logger.info("反馈人行的XML ent.getMsgid---》"+ent.getMsgid());
		int t =0;
		if("9".equals(ent.getStatus())){
			int tolCount = 0;
			String result = "90001";
			String addWord = "交易失败";
			String information ="";
			// 获得TCustinfoissueResvService
			tCustinfoissueResvService = new TCustinfoissueResvService();
			// 整理报文，生成实体list
			List<TCustinfoissueResv> list = XmlUtil.toCastTCustinfoissueResvByXml(ent.getXml());
			logger.info("整理报文，生成实体list.size()--->"+list.size());
			// 如果报文不为空，校验是否满足人行标准
			information = XmlUtil.verify(list);
			logger.info("校验结果information--->"+information);
			// 校验通过，则保存账户信息
			if("".equals(information) && list!=null && list.size()>0){
				for(int i = 0; i < list.size(); i++){
					TCustinfoissueResv tCustinfoissueResv = list.get(i);
					TCustinfoissueResv localTCR = tCustinfoissueResvService.getTCustinfoissueResv(tCustinfoissueResv.getCustNo());
					if(localTCR == null){
						tCustinfoissueResvService.addTCustinfoissueResv(tCustinfoissueResv);
					}else{
						tCustinfoissueResvService.setTCustinfoissueResv(tCustinfoissueResv);
					}
					tolCount++;
				}
				result = "90000";
				addWord = "交易成功";
				information = "接收" + tolCount + "条数据";
			}
			// 生成XML字符串
			String reXml = creatXML4zmqAutoReRH(ent, result, addWord, tolCount+"", information);
			logger.info("反馈人行的XML ent.getMsgid---》"+ent.getMsgid() + "    " + reXml);
			// 需要转格式，再发给人行
			String reXmlISO88591 = WordStringUtil.GBKtoISO88591(reXml);
			// 设置信息
			ent.setReResult(addWord);
			ent.setReInformation(information);
			ent.setReXml(reXml);
			ent.setPublishDt(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME));	
			// 返回人行信息
			MQSender.addMess(reXmlISO88591);
		}
		t =this.getCount(sql, this.getTCorpdepoDtlParameterList(ent));
		String insertClob = "update ZMQ_T_PUBLISH_RPT set xml=? where MSGID ='"+ent.getMsgid()+"'";
		super.execUpdateClob(insertClob,ent.getXml());
		// 调用MQ
		MQSender.mqSendM.run();
		return t;
	}
	
	/**
	 * 根据条件生成反馈人行报文
	 * @param msgNo
	 * @param msgID
	 * @param declareDt
	 * @param tolRecord
	 * @return
	 */
	public String creatXML4zmqAutoReRH(Tpublish ent, String result, String addWord, String tolRecord, String information){
		// 构造head
		Head head = getHead(ent);
		// 构造batchList
		List<Batch> batchList = getBatchList(result, addWord, tolRecord, information);
		// 生成XML字符串
		String xmlCon = VelocityUtils.marge(head, batchList, "ZMQ_Auto_RE_RH");
		
		return xmlCon;
	}
	
	/**
	 * 根据ent生成Head
	 * @param ent
	 * @return
	 */
	public Head getHead(Tpublish ent){
		String msgNo = "910103";
		String msgID = ent.getMsgid();
		String declareDt = ent.getDataDt();
		Head head =  new Head(msgNo,msgID,declareDt);
		return head;
	}
	
	/**
	 * 根据条件生成Batch list集合
	 * @param result
	 * @param addWord
	 * @param tolRecord
	 * @param information
	 * @return
	 */
	public List<Batch> getBatchList(String result, String addWord, String tolRecord, String information){
		List<Batch> bList = new ArrayList<Batch>();
		Batch bat = new Batch();
		bat.setResult(result);
		bat.setAddWord(addWord);
		bat.setTolRecord(tolRecord);
		bat.setInformation(information);
		bList.add(bat);
		return bList;
	}
	
	/**
	 * 向T_Publish_Rpt表插入数据
	 * @param sql
	 */
	public void inertTPublishRpt(String sql){
		this.execUpdate(sql);
	}
	
	/**
	* 获得分页 总记录数
	* @param filter
	* @return
	*/
	public int getRowCount(String tableName, String filter){
		String sql = String.format("select count(*) from  %1$s  where %2$s ", tableName, filter);
		return  this.getResultRow(sql);
	}
	/**
	* 从T_PublishRpt 实体读取数据，组装为参数集合
	* @param ent
	* @return
	*/
	public List<Parameter> getTCorpdepoDtlParameterList(Tpublish ent){
		List<Parameter> sqlParameterList = new ArrayList<Parameter>();
		sqlParameterList.add(new Parameter("@msgid", DbType.String, ent.getMsgid()));
		sqlParameterList.add(new Parameter("@rpt_id", DbType.String, ent.getRptId()));
		sqlParameterList.add(new Parameter("@create_dt", DbType.String, ent.getCreateDt()));
		sqlParameterList.add(new Parameter("@data_dt", DbType.String, ent.getDataDt()));
		sqlParameterList.add(new Parameter("@publish_dt", DbType.String, ent.getPublishDt()));
		sqlParameterList.add(new Parameter("@rpt_nm", DbType.String, ent.getRptNm()));
		sqlParameterList.add(new Parameter("@status", DbType.String, ent.getStatus()));
		//sqlParameterList.add(new Parameter("@xml", DbType.String, ent.getXml()));
		sqlParameterList.add(new Parameter("@re_xml", DbType.String, ent.getReXml()));
		sqlParameterList.add(new Parameter("@ispublish", DbType.String, ent.getIspublish()));
		sqlParameterList.add(new Parameter("@re_result", DbType.String, ent.getReResult()));
		sqlParameterList.add(new Parameter("@re_information", DbType.String, ent.getReInformation()));
		return sqlParameterList;
	}
	
	
	/**
	 * 处理关联账户信息下发的方法
	 * @param tpublist表的msgid
	 */
	public void processCustinfo(String msgID) {
		Tpublish ent = this.getpublishRpt(msgID);
		tCustinfoissueResvService.processCustinfo(this,ent);
	}
	
  	
  	/**
  	 * 得到数据库的上报模式
  	 * @return
  	 */
  	public String getModel() {
  		String sql = "select model from ZMQ_REPORT_MODE where Id = '123456'";
  		return this.getResultScalar(sql, null);
  	}
	
  	/**
  	 * 设置上报模式
  	 * @param model
  	 */
  	public void setModel(String model) {
  		String sql = "update ZMQ_REPORT_MODE set model = '"+model+"' where Id = '123456'";
  		this.execUpdate(sql);
  	}
  	
  	/**
  	 * 得到数据库的自动上报时间
  	 * @return
  	 */
	public String getPublishTime() {
  		String sql = "select publishTime from ZMQ_REPORT_MODE where Id = '123456'";
  		return this.getResultScalar(sql, null);

  	}
	
	/**
	 * 设置自动上报时间
	 * @param time
	 */
	public void setPublishTime(String time) {
		String sql = "update ZMQ_REPORT_MODE set publishTime = '"+time+"' where Id = '123456'";
  		this.execUpdate(sql);
  	}
	
	/**
	 * 校验余额连续性
	 * @param rpt_date
	 * @param rpt_tab_tol_name
	 * @return
	 */
	public String zmq_prc_chk_work_balance(String rpt_date,String rpt_tab_tol_name){
		String retStr = "1";
		// 如果有明细，则进行余额连续性校验
		if(rpt_tab_tol_name.toLowerCase().endsWith("_tol")){
			rpt_tab_tol_name = "ZMQ_" + rpt_tab_tol_name;
			String rpt_chn_name = RptUtil.getTableName(RptUtil.getTableName(rpt_tab_tol_name));
			String rpt_tab_dtl_name = rpt_tab_tol_name.toLowerCase().replace("_tol", "_dtl");
			//Date d = DateUtil.string2Date(rpt_date, DateUtil.FORMAT_DATE);
			retStr = CallSqlUtil.ZMQ_PRC_CHK_WORK_BALANCE(rpt_date, rpt_chn_name, rpt_tab_tol_name, rpt_tab_dtl_name);
		}
		return retStr;
	}
	
	
	/**
	 * 生成上报的报文
	 * @param declareDt
	 * @param tolTableName
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public List<String> toCreateXml(String declareDt, String tolTableName) throws Exception{
		// 构造返回的list
		List<String> retList = new ArrayList<String>();
		
		// 如果申报日期为空，则生成当天数据的报文
  		if(StringUtils.isEmpty(declareDt)){
  	  		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
  	  		declareDt  = sdf.format(new Date());
  		}
  		
  		// 如果tolTableName为空，则生成所有数据的报文
  		String[] table = null;
  		if(StringUtils.isEmpty(tolTableName)){
  			table  = PropertiesUtil.getInstance().getProperty("tableName").split(",");
  		}else{
  			table  = tolTableName.split(",");
  		}
  		
  		for(String tableName : table) {
  			// 根据表名获得msgNo
  			String msgNo =   RptUtil.getTableName(tableName);  
  	  		// 判断大小                                                                                                                                                                                                        
  	  		//（1）单个报文、文件的大小不超过2MB；                                                                                                                                                                                  
  	  		//（2）单个报文，如为批量头＋明细结构，批量头总笔数不超过200条；                                                                                                                                                        
  	  		// 如为无批量头结构，明细笔数不超过1000条。                                                                                                                                                                             
  			String filter = " Declare_Dt=to_date('" + declareDt +"','yyyy-MM-dd')";
  	  		String sort ;
  	  		if(tableName.substring((tableName.length()-3), tableName.length()).equalsIgnoreCase("Dtl")||tableName.substring((tableName.length()-3), tableName.length()).equalsIgnoreCase("tOl")||tableName.equalsIgnoreCase("ZMQ_T_FTE_AcctInfo")) {
  	  			sort = " Acct_Id DESC ";
  	  		} else {
  	  			sort = " Declare_Seq DESC";
  	  		}
  	  		// 获得总数                                                                                                                                                                                                             
  	  		int total = this.getRowCount(tableName, filter);
  	  		// 如果没有汇总信息，则不生成XML文件内容
  			if(total == 0){
  				continue;
  			}
  			// 整理汇总list集合 ，参数问题需要调整                                                                                                                                                                             
  			List<Batch> entList=(List<Batch>)this.getByPage(0, total, filter, sort, "com.topcheer.base.velocity.bo.Batch",tableName);
  			
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
  		  					String queryDtlSql;
  		  				    // 增加判断是否为【单位存款】，主键有汇总账号和申报期修改为汇总子账号和申报日期
  							if ("zmq_t_corpdepo_tol".equals(tableName.toLowerCase()))
  							{
  								queryDtlSql =  "select * from " + dtlTableName
  										+ " where Acct_Id ='" + batch.getSubaccountno()
  										+ "' and  Declare_Dt = to_date('"
  										+ batch.getDeclareDt() + "','yyyy-MM-dd')";
  							} 
  							// 增加判断是否为【同业往来（来源及运用）】，主键有ACCT_ID, CURRENCY_CD, DECLARE_DT
  							else if ("zmq_t_tradcurracco_sour_tol".equalsIgnoreCase(tableName) || "zmq_t_tradcurracco_oper_tol".equalsIgnoreCase(tableName))
  							{
  								queryDtlSql =  "select * from " + dtlTableName
  										+ " where Acct_Id ='" + batch.getAcctId()
  										+ "' and  Declare_Dt = to_date('"
  										+ batch.getDeclareDt() + "','yyyy-MM-dd')"
  										+ " and CURRENCY_CD = '" + batch.getCurrencyCd() + "'";
  							}
  							// 增加判断是否为【应收及预付款】或【应付及暂收款】，主键有acct_id,currency_cd,declare_dt,belong_org_id
  							else if ("zmq_t_resvableprepayment_tol".equalsIgnoreCase(tableName) || "zmq_t_accopayatemp_tol".equalsIgnoreCase(tableName))
  							{
  								queryDtlSql =  "select * from " + dtlTableName
  										+ " where Acct_Id ='" + batch.getAcctId()
  										+ "' and  Declare_Dt = to_date('"
  										+ batch.getDeclareDt() + "','yyyy-MM-dd')"
  										+ " and CURRENCY_CD = '" + batch.getCurrencyCd() + "'"
  										+ " and belong_org_id = '" + batch.getBelongOrgId() + "'";
  							}
  							
  							else {
  								queryDtlSql = "select * from " + dtlTableName
  										+ " where Acct_Id ='" + batch.getAcctId()
  										+ "' and  Declare_Dt = to_date('"
  										+ batch.getDeclareDt() + "','yyyy-MM-dd')";

  							}
  		  					//String queryDtlSql = "select * from "+dtlTableName+" where Acct_Id ='"+batch.getAcctId()+"' and  Declare_Dt = to_date('" +batch.getDeclareDt()+ "','yyyy-MM-dd')";
  		  					List<?> dtlList = this.findTpublishList(queryDtlSql, "com.topcheer.base.velocity.bo.Tran");                                                                                                      
  		  					batch.setTranList(dtlList);
  		  					batch.setTolRecord(dtlList.size()+""); 
  		  				}                                                                                                                                                                                                                     
  		  			}                                                                                                                                                                                                                                                                                                                                                                                                  
  		  		}                                                                                                                                                                                                                     
  			}
  			List<String> msgIdsList = this.toOKCommitRH(msgNo, entList, tableName, declareDt);
  			retList.addAll(msgIdsList);
		}
  		
  		return retList;
	}
	
	/**
	 * 将报文发送至MQ
	 * @param entList
	 * @throws Exception 
	 */
	public void sendXmlToMQ(List<Tpublish> entList) throws Exception{
		String xmlContent = "";
		// Status : '0，未上报；1，已上报；2，上报失败；3，上报中；9，下发数据；'
		int i = 0;
		for(Tpublish rpt : entList){
			i++;
			logger.debug("向人行发送的报文id----->" + rpt.getMsgid()+ "这是第 " + i + "/" +entList.size() +" 个报文");
			if(rpt.getStatus().equals("9")) {
				xmlContent = rpt.getReXml();
			} else {
				xmlContent = rpt.getXml();
			}
			// 转码
			String mqStr = WordStringUtil.GBKtoISO88591(xmlContent);
			logger.info(xmlContent);
			// MQ中放入消息
			MQSender.addMess(mqStr);
			//生成备份文件
			OSSFileWriter.createFile(rpt, OSSFileWriter.XML_BAKPATH_SEND);
			// 更新数据状态
			if(!rpt.getStatus().equals("9")){
				rpt.setStatus("3");
				rpt.setPublishDt(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME));
				this.setpublisRpt(rpt);
			}
			//Thread.sleep(environmentInfo.SLEEP_TIME);
		}
		// 执行MQ
		MQSender.mqSendM.run();
	}
	
	/**
	 * 自动上报，供监听器调用
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public void autoSendXmlToMQ(String declareDt, String tolTableName) throws Exception{
		List<String>  listStr = this.toCreateXml(declareDt, tolTableName);
		String msgids = RptUtil.listToString(listStr);
		List<Tpublish> entList = (List<Tpublish>)this.getList(null, msgids);
		try {
			this.sendXmlToMQ(entList);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 将每条数据id以及报文id插入数据库
	 * @param msgNo
	 * @param batch
	 * @param tableName
	 */
	private void dataIdIntoDataBase(String msgNo, Batch batch, String tableName) {
		String dataId = "";
		String declareDt = batch.getDeclareDt();
		if("_tol".equals(tableName.substring(tableName.length()-4, tableName.length()).toLowerCase())){
			//添加判断是否为【单位存款】主键有ACCT_ID, DECLARE_DT，SUBACCOUNTNO
			if ("zmq_t_corpdepo_tol".equals(tableName.toLowerCase()))
				{
					dataId = batch.getSubaccountno()+"_"+batch.getDeclareDt();
					this.inToData(msgNo,dataId,declareDt);
					//明细处理
					if(batch.getTranList().size()>0){
						for(int i = 0;i<batch.getTranList().size();i++){
							Tran tran = (Tran) batch.getTranList().get(i);
							 dataId = tran.getAcctId()+"_"+tran.getDeclareDt()+"_"+tran.getDetailSeq();
							 this.inToData(msgNo,dataId,declareDt);
						}
					}
				} 
				// 增加判断是否为【同业往来（运用）】，主键有ACCT_ID, CURRENCY_CD, DECLARE_DT
				else if ( "zmq_t_tradcurracco_oper_tol".equalsIgnoreCase(tableName))
				{
					dataId=batch.getAcctId()+"_"+ batch.getDeclareDt()+"_"+batch.getCurrencyCd();
					this.inToData(msgNo,dataId,declareDt);
					if(batch.getTranList().size()>0){
						for(int i = 0;i<batch.getTranList().size();i++){
							Tran tran = (Tran) batch.getTranList().get(i);
							 dataId = tran.getAcctId()+"_"+tran.getDeclareDt()+"_"+tran.getDetailSeq()+"_"+tran.getCurrencyCd();
							 this.inToData(msgNo,dataId,declareDt);
						}
					}
				}
			    // 增加判断是否为【同业往来（来源）】，主键有acct_id,currency_cd,declare_dt,belong_org_id
				else if ("zmq_t_tradcurracco_sour_tol".equalsIgnoreCase(tableName) )
				{
					dataId =  batch.getAcctId()+ "_"+ batch.getDeclareDt() + "_"+ batch.getCurrencyCd() + "_" + batch.getBelongOrgId();
					this.inToData(msgNo,dataId,declareDt);
					if(batch.getTranList().size()>0){
						for(int i = 0;i<batch.getTranList().size();i++){
							Tran tran = (Tran) batch.getTranList().get(i);
							 dataId = tran.getAcctId()+"_"+tran.getDeclareDt()+"_"+tran.getDetailSeq()+"_"+tran.getCurrencyCd();
							 this.inToData(msgNo,dataId,declareDt);
						}
					}
				}
				// 增加判断是否为【应收及预付款】或【应付及暂收款】，主键有acct_id,currency_cd,declare_dt,belong_org_id
				else if ( "zmq_t_resvableprepayment_tol".equalsIgnoreCase(tableName) || "zmq_t_accopayatemp_tol".equalsIgnoreCase(tableName))
				{
					dataId =  batch.getAcctId()+ "_"+ batch.getDeclareDt() + "_"+ batch.getCurrencyCd() + "_" + batch.getBelongOrgId();
					this.inToData(msgNo,dataId,declareDt);
					if(batch.getTranList().size()>0){
						for(int i = 0;i<batch.getTranList().size();i++){
							Tran tran = (Tran) batch.getTranList().get(i);
							 dataId = tran.getAcctId()+"_"+tran.getDeclareDt()+"_"+tran.getDetailSeq()+"_"+tran.getCurrencyCd()+"_"+tran.getBelongOrgId();
							 this.inToData(msgNo,dataId,declareDt);
						}
					}
				}
				//非特殊表处理
				else {
					dataId =  batch.getAcctId()+ "_"+ batch.getDeclareDt();
					this.inToData(msgNo,dataId,declareDt);
					if(batch.getTranList().size()>0){
						for(int i = 0;i<batch.getTranList().size();i++){
							Tran tran = (Tran) batch.getTranList().get(i);
							 dataId = tran.getAcctId()+"_"+tran.getDeclareDt()+"_"+tran.getDetailSeq();
							 this.inToData(msgNo,dataId,declareDt);
						}
					}
				}
		}else{
			//判断是否为【FTE、FTN、FTU账户信息报送】，主键为ACCT_ID DECLARE_DT REPORT_ID
			if("zmq_t_fte_acctinfo".equalsIgnoreCase(tableName)){
				dataId = batch.getAcctId()+"_"+batch.getDeclareDt()+"_"+batch.getReportId();
				this.inToData(msgNo,dataId,declareDt);
			}else{
				dataId = batch.getDeclareDt()+"_"+batch.getDeclareSeq()+"_"+batch.getReportId();
				this.inToData(msgNo,dataId,declareDt);
			}
		}
//		System.out.println("报文ID===============>"+msgNo);
//		System.out.println("表名===============>"+tableName);
//		System.out.println("账号===============>"+batch.getAcctId());
//		System.out.println("申报日期===============>"+batch.getDeclareDt());
//		System.out.println("币种===============>"+batch.getCurrencyCd());
//		System.out.println("所属机构代码===============>"+batch.getBelongOrgId());
//		System.out.println("申报序号===============>"+batch.getDeclareSeq());
//		System.out.println("报表编码===============>"+batch.getReportId());
//		System.out.println("子账号===============>"+batch.getSubaccountno());
//		System.out.println("明细表的条数===============>"+batch.getTranList().size());
//		Tran tran = (Tran) batch.getTranList().get(0);
//		System.out.println("明细表账号===============>"+tran.getAcctId());
//		System.out.println("明细表账号===============>"+tran.getDeclareDt());
//		System.out.println("明细表账号===============>"+tran.getDetailSeq());
	}

	/**
	 * 将数据id插入到表中
	 * @param msgNo
	 * @param dataId
	 * @param declareDt
	 */
	private void inToData(String msgNo, String dataId, String declareDt) {
		String sql = "INSERT INTO ZMQ_T_MSGID_DATAID (id,msg_id,data_id,declare_Dt) VALUES ('"+msgNo+"_"+dataId+"','"+msgNo+"','"+dataId+"',to_date('"+declareDt+"','yyyy-mm-dd'))";
		super.execUpdate(sql);
	}

	/**
	 * 根据数据id查询报文状态
	 * @param dataId
	 */
	public List<?> getQueryPublishStatus(String dataId){
		String sql = "select msgid, create_dt, data_dt, publish_dt, rpt_id, rpt_nm, status,ispublish, RE_RESULT,RE_INFORMATION from ZMQ_T_PUBLISH_RPT "
				+ "where msgid in("
				+ "select msg_id from ZMQ_T_MSGID_DATAID "
				+ "where data_id = '"+dataId+"' )";
		
		return this.findTpublishRptList(sql);
	}
	
}
	
