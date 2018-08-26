package com.topcheer.rpt.bo;

import java.sql.Timestamp;
import java.util.Date;

/**
* 关户日期
* @author Administrator
*
*/
public class TCustinfoissueResv {

      private String id;
	private String reportId;
	private String idenType;
	private String idenNo;
	private String orgId;
	private String custNm;
	private String custNo;
	private String categ;
	private String operType;
	private Date declareDt;
	private Date openDt;
	private Date closeDt;
	private String accOrgCode;
	private String submitDate;
	private Timestamp lastUpdateTime;

	public TCustinfoissueResv(){}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
			this.id = id;
	}
	/**
	*报表编码
	* @return
	*/
	public String getReportId() {
		return reportId;
	}
	/**
	*报表编码
	* @param reportId
	*/
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	/**
	*证件类型
	* @return
	*/
	public String getIdenType() {
		return idenType;
	}
	/**
	*证件类型
	* @param idenType
	*/
	public void setIdenType(String idenType) {
		this.idenType = idenType;
	}

	/**
	*证件号码
	* @return
	*/
	public String getIdenNo() {
		return idenNo;
	}
	/**
	*证件号码
	* @param idenNo
	*/
	public void setIdenNo(String idenNo) {
		this.idenNo = idenNo;
	}

	/**
	*机构代码
	* @return
	*/
	public String getOrgId() {
		return orgId;
	}
	/**
	*机构代码
	* @param orgId
	*/
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	/**
	*户名
	* @return
	*/
	public String getCustNm() {
		return custNm;
	}
	/**
	*户名
	* @param custNm
	*/
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	/**
	*帐号
	* @return
	*/
	public String getCustNo() {
		return custNo;
	}
	/**
	*帐号
	* @param custNo
	*/
	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	/**
	*类别
	* @return
	*/
	public String getCateg() {
		return categ;
	}
	/**
	*类别
	* @param categ
	*/
	public void setCateg(String categ) {
		this.categ = categ;
	}

	/**
	*操作类型
	* @return
	*/
	public String getOperType() {
		return operType;
	}
	/**
	*操作类型
	* @param operType
	*/
	public void setOperType(String operType) {
		this.operType = operType;
	}

	/**
	*申报日期
	* @return
	*/
	public Date getDeclareDt() {
		return declareDt;
	}
	/**
	*申报日期
	* @param declareDt
	*/
	public void setDeclareDt(Date declareDt) {
		this.declareDt = declareDt;
	}

	/**
	*开户日期
	* @return
	*/
	public Date getOpenDt() {
		return openDt;
	}
	/**
	*开户日期
	* @param openDt
	*/
	public void setOpenDt(Date openDt) {
		this.openDt = openDt;
	}

	/**
	*关户日期
	* @return
	*/
	public Date getCloseDt() {
		return closeDt;
	}
	/**
	*关户日期
	* @param closeDt
	*/
	public void setCloseDt(Date closeDt) {
		this.closeDt = closeDt;
	}

	public String getAccOrgCode() {
		return accOrgCode;
	}

	public void setAccOrgCode(String accOrgCode) {
		this.accOrgCode = accOrgCode;
	}

	public String getSubmitDate() {
		return submitDate;
	}

	public void setSubmitDate(String submitDate) {
		this.submitDate = submitDate;
	}

	public Timestamp getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(Timestamp lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

}
