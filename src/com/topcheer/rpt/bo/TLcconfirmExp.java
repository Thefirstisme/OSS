package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TLcconfirmExp {

      private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private BigDecimal bal;
	private String abroadOppBankId;
	private String benefCorpNm;
	private String benefCorpOrgId;
	private String benefCountryCd;
	private String benefDomeAreaCd;
	private Date confirmMatureDt;
	private String currencyCd;
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

	public TLcconfirmExp(){}

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
	public String getBenefCorpNm() {
		return benefCorpNm;
	}
	/**
	*
	* @param benefCorpNm
	*/
	public void setBenefCorpNm(String benefCorpNm) {
		this.benefCorpNm = benefCorpNm;
	}

	/**
	*
	* @return
	*/
	public String getBenefCorpOrgId() {
		return benefCorpOrgId;
	}
	/**
	*
	* @param benefCorpOrgId
	*/
	public void setBenefCorpOrgId(String benefCorpOrgId) {
		this.benefCorpOrgId = benefCorpOrgId;
	}

	/**
	*
	* @return
	*/
	public String getBenefCountryCd() {
		return benefCountryCd;
	}
	/**
	*
	* @param benefCountryCd
	*/
	public void setBenefCountryCd(String benefCountryCd) {
		this.benefCountryCd = benefCountryCd;
	}

	/**
	*
	* @return
	*/
	public String getBenefDomeAreaCd() {
		return benefDomeAreaCd;
	}
	/**
	*
	* @param benefDomeAreaCd
	*/
	public void setBenefDomeAreaCd(String benefDomeAreaCd) {
		this.benefDomeAreaCd = benefDomeAreaCd;
	}

	/**
	*
	* @return
	*/
	public Date getConfirmMatureDt() {
		return confirmMatureDt;
	}
	/**
	*
	* @param confirmMatureDt
	*/
	public void setConfirmMatureDt(Date confirmMatureDt) {
		this.confirmMatureDt = confirmMatureDt;
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

}
