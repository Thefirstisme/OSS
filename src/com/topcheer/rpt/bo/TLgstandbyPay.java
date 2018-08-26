package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TLgstandbyPay {

      private String id;
	private String ifNeedChange;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private BigDecimal bal;
	private String abroadOppBankId;
	private String debtorNm;
	private String debtorOrgId;
	private String debtorCountryCd;
	private String debtorDomeAreaCd;
	private Date lgMatureDt;
	private String lgType;
	private String currencyCd;
	private String ifchecked;
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

	public TLgstandbyPay(){}

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
	public String getDebtorNm() {
		return debtorNm;
	}
	/**
	*
	* @param debtorNm
	*/
	public void setDebtorNm(String debtorNm) {
		this.debtorNm = debtorNm;
	}

	/**
	*
	* @return
	*/
	public String getDebtorOrgId() {
		return debtorOrgId;
	}
	/**
	*
	* @param debtorOrgId
	*/
	public void setDebtorOrgId(String debtorOrgId) {
		this.debtorOrgId = debtorOrgId;
	}

	/**
	*
	* @return
	*/
	public String getDebtorCountryCd() {
		return debtorCountryCd;
	}
	/**
	*
	* @param debtorCountryCd
	*/
	public void setDebtorCountryCd(String debtorCountryCd) {
		this.debtorCountryCd = debtorCountryCd;
	}

	/**
	*
	* @return
	*/
	public String getDebtorDomeAreaCd() {
		return debtorDomeAreaCd;
	}
	/**
	*
	* @param debtorDomeAreaCd
	*/
	public void setDebtorDomeAreaCd(String debtorDomeAreaCd) {
		this.debtorDomeAreaCd = debtorDomeAreaCd;
	}

	/**
	*
	* @return
	*/
	public Date getLgMatureDt() {
		return lgMatureDt;
	}
	/**
	*
	* @param lgMatureDt
	*/
	public void setLgMatureDt(Date lgMatureDt) {
		this.lgMatureDt = lgMatureDt;
	}

	/**
	*
	* @return
	*/
	public String getLgType() {
		return lgType;
	}
	/**
	*
	* @param lgType
	*/
	public void setLgType(String lgType) {
		this.lgType = lgType;
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

}
