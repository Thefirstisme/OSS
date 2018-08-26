package com.topcheer.mq;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.xmlToBean.CastorUtil;
import com.topcheer.base.xmlToBean.bo.Capsule;
import com.topcheer.base.xmlToBean.bo.TCustinfoissueResvMap;
import com.topcheer.fileio.OSSFileWriter;
import com.topcheer.rpt.bo.TCustinfoissueResv;
import com.topcheer.rpt.bo.Tpublish;
import com.topcheer.rpt.service.TpublishService;

public class XmlUtil {
	
	protected static Logger logger = Logger.getLogger(XmlUtil.class.getName());
	
	public final static String SUCCESS = "1";
	public final static String FAILURE = "2";
	public final static String DELAY = "3";

	public final static String LCP_SUCCESS = "90000";
	public static String getResMsgID(String xml) {
		try {			
			int begin = xml.indexOf("<MsgID>");
			int end = xml.indexOf("</MsgID>");
			return xml.substring(begin+7,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public static String getResMsgNo(String xml) {
		try {			
			int begin = xml.lastIndexOf("<MsgNo>");
			int end = xml.lastIndexOf("</MsgNo>");
			return xml.substring(begin+7,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public static String getResMsgRef(String xml) {
		try {			
			int begin = xml.indexOf("<MsgRef>");
			int end = xml.indexOf("</MsgRef>");
			return xml.substring(begin+8,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static String getWorkDate(String xml) {
		try {			
			int begin = xml.indexOf("<WorkDate>");
			int end = xml.indexOf("</WorkDate>");
			return xml.substring(begin+10,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static String getAddWord(String xml) {
		try {			
			int begin = xml.indexOf("<AddWord>");
			int end = xml.indexOf("</AddWord>");
			return xml.substring(begin+9,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public static String getResult(String xml) {
		try {			
			int begin = xml.indexOf("<Result>");
			int end = xml.indexOf("</Result>");
			return xml.substring(begin+8,end);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public static void setpublisRpt(TpublishService service ,String msgID,String msgNo,String xml) {
		try {
			boolean isNew =false;
			
			Tpublish ent = service.getpublishRpt(msgID);
			// 未查询到，则新增
			if(null == ent){
				isNew =true;
				ent = new Tpublish();
				ent.setMsgid(msgID);
				ent.setRptId(msgNo);
				ent.setIspublish("1");
				ent.setRptNm(com.topcheer.rpt.RptUtil.getTableName(msgNo));
				ent.setCreateDt(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME));	
				ent.setStatus(SUCCESS);
			}
			logger.debug("根据msgID查询Tpublish，结果为--->" + isNew);
			// 如果是账户信息下发
			if("310101".endsWith(msgNo)){
				ent.setStatus("9");
				ent.setIspublish("2");
				ent.setXml(xml);
				ent.setRptNm("账户信息下发");
			} else {
				// 如果是上报数据返回
				String reResult = "交易失败"; 
				String status = "2";
				if("90000".equals(getResult(xml))){
					reResult = "交易成功";
					status = "1";
				}
				ent.setStatus(status);
				ent.setReResult(reResult);
				ent.setReInformation(getAddWord(xml));
			}
			ent.setReXml(xml);
			ent.setDataDt(DateUtil.date8to10(getWorkDate(xml)));
			ent.setPublishDt(DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME));	
			logger.info("msgID为" + msgID + "的数据上报结果为" +ent.getReResult() + "; 备注为 : " + ent.getReInformation() + ";ent.getStatus()--->"+ ent.getStatus());
			if(isNew){
				service.addPublishRpt(ent);
			}else{
				logger.info("人行重复发送了msgID为" + msgID + "的数据");
				service.setpublisRptResult(ent);
			}
			//生成备份文件
			if("9".equals(ent.getStatus())){
				OSSFileWriter.createFile(ent, OSSFileWriter.XML_BAKPATH_FTZACCREL);
			}else{
				OSSFileWriter.createFile(ent, OSSFileWriter.XML_BAKPATH_FEEDBACK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 验证一条tCustinfoissueResv是否合法
	 * @param tCustinfoissueResv
	 * @return 合法返回“”，不合法返回错误信息
	 */
	public static String verify(TCustinfoissueResv tCustinfoissueResv) {
		logger.info("人行发送的报文校验开始--->" + tCustinfoissueResv.getCustNo());
		StringBuffer sb = new StringBuffer(" ");
		//String id = tCustinfoissueResv.getReportId()+"_" +tCustinfoissueResv.getOrgId() +"_" +tCustinfoissueResv.getCustNo();
		//TCustinfoissueResv temp = getTCustinfoissueResv(id);

		if(!tCustinfoissueResv.getReportId().matches("\\d{6}")) {
			sb.append("报表编号错误:"+tCustinfoissueResv.getReportId()+";");
		} else if(StringUtils.isNotEmpty(tCustinfoissueResv.getOrgId())) {
			if(tCustinfoissueResv.getOrgId().length() > 14 && tCustinfoissueResv.getOrgId().length()<12){
				sb.append("所属机构代码错误:"+tCustinfoissueResv.getOrgId()+";");
			}
		} else if(!tCustinfoissueResv.getCustNm().matches("(.|\n){1,128}")) {
			sb.append("户名错误："+tCustinfoissueResv.getCustNm()+";");
		} else if(!tCustinfoissueResv.getCustNo().matches("[\\d\\w]{1,35}")) {
			sb.append("账号错误："+tCustinfoissueResv.getCustNo()+";");
		} else if(!tCustinfoissueResv.getOperType().equals("1")&&!tCustinfoissueResv.getOperType().equals("2")&&!tCustinfoissueResv.getOperType().equals("3")) {
			sb.append("操作类型错误:"+tCustinfoissueResv.getOperType()+";");
		} else if(!tCustinfoissueResv.getSubmitDate().matches("[\\d]{8}")) {
			sb.append("申报日期错误："+tCustinfoissueResv.getSubmitDate()+";");
		} 
//		else if("2".equals(tCustinfoissueResv.getOperType()) && temp==null) {
//			sb.append(" 主键错误，需要修改的客户信息下发记录没找到，确认主键为： "+id+" 的操作类型是否为2");
//		}
		logger.info("人行发送的报文校验结束--->" + tCustinfoissueResv.getCustNo() + ";结果为-->" +sb.toString() +"<--;(空为通过)");
		return sb.toString().substring(1, sb.toString().length());
	}
	
	public static String verify(List<TCustinfoissueResv> list){
		StringBuffer retStr = new StringBuffer("");
		if(list!=null && list.size()>0){
			for(int i = 0; i <list.size(); i++){
				TCustinfoissueResv tCustinfoissueResv = list.get(i);
				retStr.append(verify(tCustinfoissueResv));
			}
			logger.info("人行发送的报文校验结束retStr--->" + retStr + "<---");
		}
		return retStr.toString();
	}
	
	/**
	 * 根据人行发送的客户信息，转换成实体list
	 *	1、  若原数据的状态【新增】，则更新申报日期、开户日期；
	 *	2、  若原数据的状态【关户】，则 更新申报日期、开户日期，更新OperType由关户改为新增、删除关户日期；
	 * @param xmlStr
	 */
	@SuppressWarnings("unchecked")
	public static List<TCustinfoissueResv> toCastTCustinfoissueResvByXml(String xmlStr){
		List<TCustinfoissueResv> list = new ArrayList<TCustinfoissueResv>();
	
	//	xmlStr = "<CFX>                                                                          "
	//			+"    <HEAD>                                                                     "
	//			+"        <VER>1.0</VER>                                                         "
	//			+"        <SRC>100000000000</SRC>                                                "
	//			+"        <DES>613002100003</DES>                                                "
	//			+"        <APP>FTZMIS</APP>                                                      "
	//			+"        <MsgNo>310101</MsgNo>                                                  "
	//			+"        <MsgID>100000000000201405161607555333</MsgID>                          "
	//			+"        <MsgRef>100000000000201405161607555333</MsgRef>                        "
	//			+"        <WorkDate>20140516</WorkDate>                                          "
	//			+"        <EditFlag>1</EditFlag>                                                 "
	//			+"        <Reserve></Reserve>                                                    "
	//			+"    </HEAD>                                                                    "
	//			+"    <MSG>                                                                      "
	//			+"        <FTZ310101>                                                            "
	//			+"            <AccOrgCode>105290040053</AccOrgCode>                              "
	//			+"            <AccountName>外高桥股份有限公司</AccountName>                      "
	//			+"            <AccountNo>31501579511061000013</AccountNo>                        "
	//			+"            <OperType>1</OperType>                                             "
	//			+"            <ReportCode>310101</ReportCode>                                    "
	//			+"            <SubmitDate>20140313</SubmitDate>                                  "
	//			+"        </FTZ310101>                                                           "
	//			+"        <FTZ310101>                                                            "
	//			+"            <AccOrgCode>105290061008</AccOrgCode>                              "
	//			+"            <AccountName>外高桥物流园区有限公司</AccountName>                  "
	//			+"            <AccountNo>31514002000220100031</AccountNo>                        "
	//			+"            <OperType>1</OperType>                                             "
	//			+"            <ReportCode>310101</ReportCode>                                    "
	//			+"            <SubmitDate>20140317</SubmitDate>                                  "
	//			+"        </FTZ310101>                                                           "
	//			+"        <FTZ310101>                                                            "
	//			+"            <AccOrgCode>105290061008</AccOrgCode>                              "
	//			+"            <AccountName>上海长玖房地产开发有限公司</AccountName>              "
	//			+"            <AccountNo>31514002000220100093</AccountNo>                        "
	//			+"            <OperType>1</OperType>                                             "
	//			+"            <ReportCode>310101</ReportCode>                                    "
	//			+"            <SubmitDate>20140327</SubmitDate>                                  "
	//			+"        </FTZ310101>                                                           "
	//			+"        <FTZ310101>                                                            "
	//			+"            <AccOrgCode>104290001847</AccOrgCode>                              "
	//			+"            <AccountName>上海传奇.公司</AccountName>                           "
	//			+"            <AccountNo>2014011512345611</AccountNo>                            "
	//			+"            <OperType>1</OperType>                                             "
	//			+"            <ReportCode>310101</ReportCode>                                    "
	//			+"            <SubmitDate>20140515</SubmitDate>                                  "
	//			+"        </FTZ310101>                                                           "
	//			+"        <FTZ310101>                                                            "
	//			+"            <AccOrgCode>313290000017</AccOrgCode>                              "
	//			+"            <AccountName>上海和广通信技术股份有限公司</AccountName>            "
	//			+"            <AccountNo>123456789</AccountNo>                                   "
	//			+"            <OperType>1</OperType>                                             "
	//			+"            <ReportCode>310101</ReportCode>                                    "
	//			+"            <SubmitDate>20140509</SubmitDate>                                  "
	//			+"        </FTZ310101>                                                           "
	//			+"    </MSG>                                                                     "
	//			+"</CFX>                                                                         ";
		
		if(StringUtils.isNotEmpty(xmlStr)){
			// 增加XML头，人行发送的报文是以<CFX>开始的
			logger.info("人行发送的报文--->" + xmlStr);
			if( !xmlStr.startsWith("<?xml")){
				xmlStr = "<?xml version=\"1.0\" encoding=\"GBK\"?>" + xmlStr;
			}
			// XML转换成bean
			TCustinfoissueResvMap tCustinfoissueResvMap = (TCustinfoissueResvMap)CastorUtil.stringToBean(xmlStr, "T_Custinfoissue.xml");
			
			if(tCustinfoissueResvMap !=null && tCustinfoissueResvMap.getCapsule() != null){
				// 获得list
				Capsule capsule = tCustinfoissueResvMap.getCapsule();
				list = (List<TCustinfoissueResv>)capsule.getList();
				// 将客户信息保存至数据库
				if(list!=null && list.size() >0){
					logger.info("人行发送的报文中capsule.getList()--->" + capsule.getList().size());
					for(int i=0; i < list.size(); i++){
						TCustinfoissueResv ent = (TCustinfoissueResv)list.get(i);
						//ent.setDeclareDt(DateUtil.string2Date(ent.getSubmitDate(), DateUtil.FORMAT_DATE2));
						tidyTCustinfoissueResv(ent);
						//ent.setLastUpdateTime(new Timestamp(System.currentTimeMillis()));
						//this.addTCustinfoissueResv(ent);
					}
				}
			}
		}
		return list;
	}


	
	public static void tidyTCustinfoissueResv(TCustinfoissueResv ent){
		// 申报日期以人行下发的submitDate为准，开户日期以系统接收时间为准；
		// 如果人行在次下发，申报日期仍以人行下发的submitDate为准，开户日期仍以系统接收时间为准；
		
		ent.setDeclareDt(DateUtil.string2Date(ent.getSubmitDate(), DateUtil.FORMAT_DATE2));
		// 关户时，将关户日期设置为declareDt
		if("3".equals(ent.getOperType())){
			ent.setCloseDt(ent.getDeclareDt());
		}
		//else if("1".equals(ent.getOperType())){
			// 开户时，将开户日期设置为declareDt  
			// 20140522 开户日期设置为系统当前时间
			ent.setOpenDt(new Date(System.currentTimeMillis()));
		//}
	}
}
