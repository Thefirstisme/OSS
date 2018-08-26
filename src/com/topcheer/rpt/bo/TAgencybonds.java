package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TAgencybonds {

    private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private String bondId;
	private String bondNm;
	private String issuCorpAcct;
	private String currencyCd;
	private Date declareDt;
	private String txnOrgId;
	private Date sltDt;
	private String periodLen;
	private String periodUnit;
	private Date matureDt;
	private BigDecimal nobondsissued;
	private String countryCd;
	private String domechargeAreaCd;
	private String txnAttri;
	private String rateType;
	private BigDecimal fixRate;
	private String priceDatum;
	private BigDecimal floatSpread;
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

	public String getStatus() {
		return status;
	}

	public Timestamp getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Timestamp modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
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

	public TAgencybonds(){}

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
	public String getBondId() {
		return bondId;
	}
	/**
	*
	* @param bondId
	*/
	public void setBondId(String bondId) {
		this.bondId = bondId;
	}

	/**
	*
	* @return
	*/
	public String getBondNm() {
		return bondNm;
	}
	/**
	*
	* @param bondNm
	*/
	public void setBondNm(String bondNm) {
		this.bondNm = bondNm;
	}

	/**
	*
	* @return
	*/
	public String getIssuCorpAcct() {
		return issuCorpAcct;
	}
	/**
	*
	* @param issuCorpAcct
	*/
	public void setIssuCorpAcct(String issuCorpAcct) {
		this.issuCorpAcct = issuCorpAcct;
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
	public String getTxnOrgId() {
		return txnOrgId;
	}
	/**
	*
	* @param txnOrgId
	*/
	public void setTxnOrgId(String txnOrgId) {
		this.txnOrgId = txnOrgId;
	}

	/**
	*
	* @return
	*/
	public Date getSltDt() {
		return sltDt;
	}
	/**
	*
	* @param sltDt
	*/
	public void setSltDt(Date sltDt) {
		this.sltDt = sltDt;
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

	/**
	*
	* @return
	*/
	public Date getMatureDt() {
		return matureDt;
	}
	/**
	*
	* @param matureDt
	*/
	public void setMatureDt(Date matureDt) {
		this.matureDt = matureDt;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getNobondsissued() {
		return nobondsissued;
	}
	/**
	*
	* @param nobondsissued
	*/
	public void setNobondsissued(BigDecimal nobondsissued) {
		this.nobondsissued = nobondsissued;
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

	/**
	*
	* @return
	*/
	public String getTxnAttri() {
		return txnAttri;
	}
	/**
	*
	* @param txnAttri
	*/
	public void setTxnAttri(String txnAttri) {
		this.txnAttri = txnAttri;
	}

	/**
	*
	* @return
	*/
	public String getRateType() {
		return rateType;
	}
	/**
	*
	* @param rateType
	*/
	public void setRateType(String rateType) {
		this.rateType = rateType;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getFixRate() {
		return fixRate;
	}
	/**
	*
	* @param fixRate
	*/
	public void setFixRate(BigDecimal fixRate) {
		this.fixRate = fixRate;
	}

	/**
	*
	* @return
	*/
	public String getPriceDatum() {
		return priceDatum;
	}
	/**
	*
	* @param priceDatum
	*/
	public void setPriceDatum(String priceDatum) {
		this.priceDatum = priceDatum;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getFloatSpread() {
		return floatSpread;
	}
	/**
	*
	* @param floatSpread
	*/
	public void setFloatSpread(BigDecimal floatSpread) {
		this.floatSpread = floatSpread;
	}

}
