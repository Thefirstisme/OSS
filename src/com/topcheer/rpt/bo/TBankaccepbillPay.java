package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TBankaccepbillPay {

      private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private Date acptDt;
	private Date acptMatureDt;
	private BigDecimal acptAmt;
	private String currencyCd;
	private String corpAcctId;
	private String corpNm;
	private String corpId;
	private String countryCd;
	private String domechargeAreaCd;
	private String modifiedUser;
	private Timestamp modifiedTime;
	private String status;
	private String createUser;
	private Timestamp createTime;

	public String getModifiedUser() {
		return modifiedUser;
	}

	public void setModifiedUser(String modifiedUser) {
		this.modifiedUser = modifiedUser;
	}

	public Timestamp getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Timestamp modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public TBankaccepbillPay(){}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
			this.id = id;
	}
	/**
	*
	* @return
	*/
	public String getIfNeedChange() {
		return ifNeedChange;
	}
	/**
	*
	* @param ifNeedChange
	*/
	public void setIfNeedChange(String ifNeedChange) {
		this.ifNeedChange = ifNeedChange;
	}

	/**
	*
	* @return
	*/
	public String getIfchecked() {
		return ifchecked;
	}
	/**
	*
	* @param ifchecked
	*/
	public void setIfchecked(String ifchecked) {
		this.ifchecked = ifchecked;
	}

	/**
	*
	* @return
	*/
	public String getReportId() {
		return reportId;
	}
	/**
	*
	* @param reportId
	*/
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	/**
	*
	* @return
	*/
	public String getDeclareSeq() {
		return declareSeq;
	}
	/**
	*
	* @param declareSeq
	*/
	public void setDeclareSeq(String declareSeq) {
		this.declareSeq = declareSeq;
	}

	/**
	*
	* @return
	*/
	public Date getDeclareDt() {
		return declareDt;
	}
	/**
	*
	* @param declareDt
	*/
	public void setDeclareDt(Date declareDt) {
		this.declareDt = declareDt;
	}

	/**
	*
	* @return
	*/
	public String getBelongOrgId() {
		return belongOrgId;
	}
	/**
	*
	* @param belongOrgId
	*/
	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
	}

	/**
	*
	* @return
	*/
	public Date getAcptDt() {
		return acptDt;
	}
	/**
	*
	* @param acptDt
	*/
	public void setAcptDt(Date acptDt) {
		this.acptDt = acptDt;
	}

	/**
	*
	* @return
	*/
	public Date getAcptMatureDt() {
		return acptMatureDt;
	}
	/**
	*
	* @param acptMatureDt
	*/
	public void setAcptMatureDt(Date acptMatureDt) {
		this.acptMatureDt = acptMatureDt;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getAcptAmt() {
		return acptAmt;
	}
	/**
	*
	* @param acptAmt
	*/
	public void setAcptAmt(BigDecimal acptAmt) {
		this.acptAmt = acptAmt;
	}

	/**
	*
	* @return
	*/
	public String getCurrencyCd() {
		return currencyCd;
	}
	/**
	*
	* @param currencyCd
	*/
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}

	/**
	*
	* @return
	*/
	public String getCorpAcctId() {
		return corpAcctId;
	}
	/**
	*
	* @param corpAcctId
	*/
	public void setCorpAcctId(String corpAcctId) {
		this.corpAcctId = corpAcctId;
	}

	/**
	*
	* @return
	*/
	public String getCorpNm() {
		return corpNm;
	}
	/**
	*
	* @param corpNm
	*/
	public void setCorpNm(String corpNm) {
		this.corpNm = corpNm;
	}

	/**
	*
	* @return
	*/
	public String getCorpId() {
		return corpId;
	}
	/**
	*
	* @param corpId
	*/
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	/**
	*
	* @return
	*/
	public String getCountryCd() {
		return countryCd;
	}
	/**
	*
	* @param countryCd
	*/
	public void setCountryCd(String countryCd) {
		this.countryCd = countryCd;
	}

	/**
	*
	* @return
	*/
	public String getDomechargeAreaCd() {
		return domechargeAreaCd;
	}
	/**
	*
	* @param domechargeAreaCd
	*/
	public void setDomechargeAreaCd(String domechargeAreaCd) {
		this.domechargeAreaCd = domechargeAreaCd;
	}

}
