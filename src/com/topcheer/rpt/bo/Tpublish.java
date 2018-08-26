package com.topcheer.rpt.bo;

import java.util.Date;

import com.topcheer.base.utils.DateUtil;

/**
* 系统内资金往来
* @author Administrator
*
*/
public class Tpublish {
	private String msgid;
	private String rptId;
	private String rptNm;
	private String createDt;
	private String dataDt;
	private String publishDt;	
	private String status;
	private String xml;
	private String reXml;
	private String ispublish;
	private String reResult;
	private String reInformation;
	public Tpublish(){}

	public Tpublish(String msgid, String rptNm, String xmlCon, String rptId, String dataDt){
		this.msgid = msgid;
		this.rptId = rptId;
		this.rptNm = rptNm;
		this.createDt = DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATETIME);
		this.status = "0";
		this.ispublish = "1";
		this.dataDt = dataDt;
		this.xml = xmlCon;
	}
	

	

	public String getReResult() {
		return reResult;
	}

	public void setReResult(String reResult) {
		this.reResult = reResult;
	}

	public String getReInformation() {
		return reInformation;
	}

	public void setReInformation(String reInformation) {
		this.reInformation = reInformation;
	}

	public String getIspublish() {
		return ispublish;
	}

	public void setIspublish(String ispublish) {
		this.ispublish = ispublish;
	}

	public String getMsgid() {
		return msgid;
	}

	public void setMsgid(String msgid) {
		this.msgid = msgid;
	}

	public String getPublishDt() {
		return publishDt;
	}

	public void setPublishDt(String publishDt) {
		this.publishDt = publishDt;
	}

	public String getRptId() {
		return rptId;
	}


	public void setRptId(String rptId) {
		this.rptId = rptId;
	}


	/**
	*报表名称
	* @return
	*/
	public String getRptNm() {
		return rptNm;
	}
	/**
	*报表名称
	* @param nm
	*/
	public void setRptNm(String rptNm) {
		this.rptNm = rptNm;
	}

	/**
	*xml生成时间
	* @return create_dt
	*/
	public String getCreateDt() {
		return createDt;
	}
	/**
	*xml生成时间
	* @param create_dt
	*/
	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}

	/**
	*发布状态
	* @return
	*/
	public String getStatus() {
		return status;
	}
	/**
	*发布状态
	* @param status
	*/
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	*发布XML
	* @return xml
	*/
	public String getXml() {
		return xml;
	}
	/**
	*发布XML
	* @param xml
	*/
	public void setXml(String xml) {
		this.xml = xml;
	}

	public String getDataDt() {
		return dataDt;
	}

	public void setDataDt(String dataDt) {
		this.dataDt = dataDt;
	}

	public String getReXml() {
		return reXml;
	}

	public void setReXml(String reXml) {
		this.reXml = reXml;
	}

}
