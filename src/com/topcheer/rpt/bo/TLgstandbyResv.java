package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TLgstandbyResv {

      private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private BigDecimal bal;
	private String abroadOppBankId;
	private String securedPartyNm;
	private String securedPartyOrgId;
	private String securedPartyCountryCd;
	private String securedPartyDomeAreaCd;
	private Date lgMatureDt;
	private String lgType;
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

	public TLgstandbyResv(){}

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
	public String getSecuredPartyNm() {
		return securedPartyNm;
	}
	/**
	*
	* @param securedPartyNm
	*/
	public void setSecuredPartyNm(String securedPartyNm) {
		this.securedPartyNm = securedPartyNm;
	}

	/**
	*
	* @return
	*/
	public String getSecuredPartyOrgId() {
		return securedPartyOrgId;
	}
	/**
	*
	* @param securedPartyOrgId
	*/
	public void setSecuredPartyOrgId(String securedPartyOrgId) {
		this.securedPartyOrgId = securedPartyOrgId;
	}

	/**
	*
	* @return
	*/
	public String getSecuredPartyCountryCd() {
		return securedPartyCountryCd;
	}
	/**
	*
	* @param securedPartyCountryCd
	*/
	public void setSecuredPartyCountryCd(String securedPartyCountryCd) {
		this.securedPartyCountryCd = securedPartyCountryCd;
	}

	/**
	*
	* @return
	*/
	public String getSecuredPartyDomeAreaCd() {
		return securedPartyDomeAreaCd;
	}
	/**
	*
	* @param securedPartyDomeAreaCd
	*/
	public void setSecuredPartyDomeAreaCd(String securedPartyDomeAreaCd) {
		this.securedPartyDomeAreaCd = securedPartyDomeAreaCd;
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

}
