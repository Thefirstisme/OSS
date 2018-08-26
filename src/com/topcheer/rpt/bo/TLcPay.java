package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TLcPay {

      private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private BigDecimal bal;
	private String currencyCd;
	private String abroadOppBankId;
	private String applicantNm;
	private String applicantOrgId;
	private String applicantCountryCd;
	private String applicantDomeAreaCd;
	private Date bisMatureDt;
	private Date lcMatureDt;
	private String periodCon;
	private String periodLen;
	private String periodUnit;
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

	public TLcPay(){}

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
	public BigDecimal getBal() {
		return bal;
	}
	/**
	*
	* @param bal
	*/
	public void setBal(BigDecimal bal) {
		this.bal = bal;
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
	public String getAbroadOppBankId() {
		return abroadOppBankId;
	}
	/**
	*
	* @param abroadOppBankId
	*/
	public void setAbroadOppBankId(String abroadOppBankId) {
		this.abroadOppBankId = abroadOppBankId;
	}

	/**
	*
	* @return
	*/
	public String getApplicantNm() {
		return applicantNm;
	}
	/**
	*
	* @param applicantNm
	*/
	public void setApplicantNm(String applicantNm) {
		this.applicantNm = applicantNm;
	}

	/**
	*
	* @return
	*/
	public String getApplicantOrgId() {
		return applicantOrgId;
	}
	/**
	*
	* @param applicantOrgId
	*/
	public void setApplicantOrgId(String applicantOrgId) {
		this.applicantOrgId = applicantOrgId;
	}

	/**
	*
	* @return
	*/
	public String getApplicantCountryCd() {
		return applicantCountryCd;
	}
	/**
	*
	* @param applicantCountryCd
	*/
	public void setApplicantCountryCd(String applicantCountryCd) {
		this.applicantCountryCd = applicantCountryCd;
	}

	/**
	*
	* @return
	*/
	public String getApplicantDomeAreaCd() {
		return applicantDomeAreaCd;
	}
	/**
	*
	* @param applicantDomeAreaCd
	*/
	public void setApplicantDomeAreaCd(String applicantDomeAreaCd) {
		this.applicantDomeAreaCd = applicantDomeAreaCd;
	}

	/**
	*
	* @return
	*/
	public Date getBisMatureDt() {
		return bisMatureDt;
	}
	/**
	*
	* @param bisMatureDt
	*/
	public void setBisMatureDt(Date bisMatureDt) {
		this.bisMatureDt = bisMatureDt;
	}

	/**
	*
	* @return
	*/
	public Date getLcMatureDt() {
		return lcMatureDt;
	}
	/**
	*
	* @param lcMatureDt
	*/
	public void setLcMatureDt(Date lcMatureDt) {
		this.lcMatureDt = lcMatureDt;
	}

	/**
	*
	* @return
	*/
	public String getPeriodCon() {
		return periodCon;
	}
	/**
	*
	* @param periodCon
	*/
	public void setPeriodCon(String periodCon) {
		this.periodCon = periodCon;
	}

	/**
	*
	* @return
	*/
	public String getPeriodLen() {
		return periodLen;
	}
	/**
	*
	* @param periodLen
	*/
	public void setPeriodLen(String periodLen) {
		this.periodLen = periodLen;
	}

	/**
	*
	* @return
	*/
	public String getPeriodUnit() {
		return periodUnit;
	}
	/**
	*
	* @param periodUnit
	*/
	public void setPeriodUnit(String periodUnit) {
		this.periodUnit = periodUnit;
	}

}
