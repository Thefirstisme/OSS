package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TCurrswaps {

      private String id;
	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private String txnType;
	private String fxTradeType;
	private String buyCurrency;
	private BigDecimal buyAmt;
	private BigDecimal buyPrc;
	private String sellCurrency;
	private BigDecimal sellAmt;
	private BigDecimal sellPrc;
	private Date deliverydate;
	private String oppositeAcctno;
	private String oppositeAcctName;
	private String oppositeBankCd;
	private String countryCd;
	private String domechargeAreaCd;
	private String txnAttri;
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

	public TCurrswaps(){}

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
	public String getTxnType() {
		return txnType;
	}
	/**
	*
	* @param txnType
	*/
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	/**
	*
	* @return
	*/
	public String getFxTradeType() {
		return fxTradeType;
	}
	/**
	*
	* @param fxTradeType
	*/
	public void setFxTradeType(String fxTradeType) {
		this.fxTradeType = fxTradeType;
	}

	/**
	*
	* @return
	*/
	public String getBuyCurrency() {
		return buyCurrency;
	}
	/**
	*
	* @param buyCurrency
	*/
	public void setBuyCurrency(String buyCurrency) {
		this.buyCurrency = buyCurrency;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getBuyAmt() {
		return buyAmt;
	}
	/**
	*
	* @param buyAmt
	*/
	public void setBuyAmt(BigDecimal buyAmt) {
		this.buyAmt = buyAmt;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getBuyPrc() {
		return buyPrc;
	}
	/**
	*
	* @param buyPrc
	*/
	public void setBuyPrc(BigDecimal buyPrc) {
		this.buyPrc = buyPrc;
	}

	/**
	*
	* @return
	*/
	public String getSellCurrency() {
		return sellCurrency;
	}
	/**
	*
	* @param sellCurrency
	*/
	public void setSellCurrency(String sellCurrency) {
		this.sellCurrency = sellCurrency;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getSellAmt() {
		return sellAmt;
	}
	/**
	*
	* @param sellAmt
	*/
	public void setSellAmt(BigDecimal sellAmt) {
		this.sellAmt = sellAmt;
	}

	/**
	*
	* @return
	*/
	public BigDecimal getSellPrc() {
		return sellPrc;
	}
	/**
	*
	* @param sellPrc
	*/
	public void setSellPrc(BigDecimal sellPrc) {
		this.sellPrc = sellPrc;
	}

	/**
	*
	* @return
	*/
	public Date getDeliverydate() {
		return deliverydate;
	}
	/**
	*
	* @param deliverydate
	*/
	public void setDeliverydate(Date deliverydate) {
		this.deliverydate = deliverydate;
	}

	/**
	*
	* @return
	*/
	public String getOppositeAcctno() {
		return oppositeAcctno;
	}
	/**
	*
	* @param oppositeAcctno
	*/
	public void setOppositeAcctno(String oppositeAcctno) {
		this.oppositeAcctno = oppositeAcctno;
	}

	/**
	*
	* @return
	*/
	public String getOppositeAcctName() {
		return oppositeAcctName;
	}
	/**
	*
	* @param oppositeAcctName
	*/
	public void setOppositeAcctName(String oppositeAcctName) {
		this.oppositeAcctName = oppositeAcctName;
	}

	/**
	*
	* @return
	*/
	public String getOppositeBankCd() {
		return oppositeBankCd;
	}
	/**
	*
	* @param oppositeBankCd
	*/
	public void setOppositeBankCd(String oppositeBankCd) {
		this.oppositeBankCd = oppositeBankCd;
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

}
