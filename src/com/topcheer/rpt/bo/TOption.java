package com.topcheer.rpt.bo;

import java.sql.Timestamp;
import java.util.Date;

/**
 * 期权
 * 
 * @author Administrator
 * 
 */
public class TOption {
	private String id;

	private String ifNeedChange;
	private String ifchecked;
	private String reportId;
	private String declareSeq;
	private Date declareDt;
	private String belongOrgId;
	private String buyCurrency;
	private Double buyAmt;
	private Double buyPrc;
	private String sellCurrency;
	private Double sellAmt;
	private Double sellPrc;
	private Date matureDt;
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

	

	public TOption() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 是否需要修改
	 * 
	 * @return
	 */
	public String getIfNeedChange() {
		return ifNeedChange;
	}

	/**
	 * 是否需要修改
	 * 
	 * @param ifNeedChange
	 */
	public void setIfNeedChange(String ifNeedChange) {
		this.ifNeedChange = ifNeedChange;
	}

	/**
	 * 是否可以上报
	 * 
	 * @return
	 */
	public String getIfchecked() {
		return ifchecked;
	}

	/**
	 * 是否可以上报
	 * 
	 * @param ifchecked
	 */
	public void setIfchecked(String ifchecked) {
		this.ifchecked = ifchecked;
	}

	/**
	 * 报表编码
	 * 
	 * @return
	 */
	public String getReportId() {
		return reportId;
	}

	/**
	 * 报表编码
	 * 
	 * @param reportId
	 */
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	/**
	 * 申报序号
	 * 
	 * @return
	 */
	public String getDeclareSeq() {
		return declareSeq;
	}

	/**
	 * 申报序号
	 * 
	 * @param declareSeq
	 */
	public void setDeclareSeq(String declareSeq) {
		this.declareSeq = declareSeq;
	}

	/**
	 * 申报日期
	 * 
	 * @return
	 */
	public Date getDeclareDt() {
		return declareDt;
	}

	/**
	 * 申报日期
	 * 
	 * @param declareDt
	 */
	public void setDeclareDt(Date declareDt) {
		this.declareDt = declareDt;
	}

	/**
	 * 所属机构代码
	 * 
	 * @return
	 */
	public String getBelongOrgId() {
		return belongOrgId;
	}

	/**
	 * 所属机构代码
	 * 
	 * @param belongOrgId
	 */
	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
	}

	/**
	 * 买入币种
	 * 
	 * @return
	 */
	public String getBuyCurrency() {
		return buyCurrency;
	}

	/**
	 * 买入币种
	 * 
	 * @param buyCurrency
	 */
	public void setBuyCurrency(String buyCurrency) {
		this.buyCurrency = buyCurrency;
	}

	/**
	 * 买入金额
	 * 
	 * @return
	 */
	public Double getBuyAmt() {
		return buyAmt;
	}

	/**
	 * 买入金额
	 * 
	 * @param buyAmt
	 */
	public void setBuyAmt(Double buyAmt) {
		this.buyAmt = buyAmt;
	}

	/**
	 * 买入牌价
	 * 
	 * @return
	 */
	public Double getBuyPrc() {
		return buyPrc;
	}

	/**
	 * 买入牌价
	 * 
	 * @param buyPrc
	 */
	public void setBuyPrc(Double buyPrc) {
		this.buyPrc = buyPrc;
	}

	/**
	 * 卖出币种
	 * 
	 * @return
	 */
	public String getSellCurrency() {
		return sellCurrency;
	}

	/**
	 * 卖出币种
	 * 
	 * @param sellCurrency
	 */
	public void setSellCurrency(String sellCurrency) {
		this.sellCurrency = sellCurrency;
	}

	/**
	 * 卖出金额
	 * 
	 * @return
	 */
	public Double getSellAmt() {
		return sellAmt;
	}

	/**
	 * 卖出金额
	 * 
	 * @param sellAmt
	 */
	public void setSellAmt(Double sellAmt) {
		this.sellAmt = sellAmt;
	}

	/**
	 * 卖出牌价
	 * 
	 * @return
	 */
	public Double getSellPrc() {
		return sellPrc;
	}

	/**
	 * 卖出牌价
	 * 
	 * @param sellPrc
	 */
	public void setSellPrc(Double sellPrc) {
		this.sellPrc = sellPrc;
	}

	/**
	 * 到期日
	 * 
	 * @return
	 */
	public Date getMatureDt() {
		return matureDt;
	}

	/**
	 * 到期日
	 * 
	 * @param matureDt
	 */
	public void setMatureDt(Date matureDt) {
		this.matureDt = matureDt;
	}

	/**
	 * 交割日
	 * 
	 * @return
	 */
	public Date getDeliverydate() {
		return deliverydate;
	}

	/**
	 * 交割日
	 * 
	 * @param deliverydate
	 */
	public void setDeliverydate(Date deliverydate) {
		this.deliverydate = deliverydate;
	}

	/**
	 * 对方账号
	 * 
	 * @return
	 */
	public String getOppositeAcctno() {
		return oppositeAcctno;
	}

	/**
	 * 对方账号
	 * 
	 * @param oppositeAcctno
	 */
	public void setOppositeAcctno(String oppositeAcctno) {
		this.oppositeAcctno = oppositeAcctno;
	}

	/**
	 * 对方户名
	 * 
	 * @return
	 */
	public String getOppositeAcctName() {
		return oppositeAcctName;
	}

	/**
	 * 对方户名
	 * 
	 * @param oppositeAcctName
	 */
	public void setOppositeAcctName(String oppositeAcctName) {
		this.oppositeAcctName = oppositeAcctName;
	}

	/**
	 * 对方银行或机构代码
	 * 
	 * @return
	 */
	public String getOppositeBankCd() {
		return oppositeBankCd;
	}

	/**
	 * 对方银行或机构代码
	 * 
	 * @param oppositeBankCd
	 */
	public void setOppositeBankCd(String oppositeBankCd) {
		this.oppositeBankCd = oppositeBankCd;
	}

	/**
	 * 国别代码
	 * 
	 * @return
	 */
	public String getCountryCd() {
		return countryCd;
	}

	/**
	 * 国别代码
	 * 
	 * @param countryCd
	 */
	public void setCountryCd(String countryCd) {
		this.countryCd = countryCd;
	}

	/**
	 * 国内地区码
	 * 
	 * @return
	 */
	public String getDomechargeAreaCd() {
		return domechargeAreaCd;
	}

	/**
	 * 国内地区码
	 * 
	 * @param domechargeAreaCd
	 */
	public void setDomechargeAreaCd(String domechargeAreaCd) {
		this.domechargeAreaCd = domechargeAreaCd;
	}

	/**
	 * 交易性质
	 * 
	 * @return
	 */
	public String getTxnAttri() {
		return txnAttri;
	}

	/**
	 * 交易性质
	 * 
	 * @param txnAttri
	 */
	public void setTxnAttri(String txnAttri) {
		this.txnAttri = txnAttri;
	}

}
