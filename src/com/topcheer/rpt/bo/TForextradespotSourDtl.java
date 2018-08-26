package com.topcheer.rpt.bo;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

/**
* 外汇买卖（即期）-明细
* @author Administrator
*
*/
public class TForextradespotSourDtl {

    private String id;
	private String acctId;
	private Date declareDt;
	private String detailSeq;
	private String outInAcctInd;
	private Date acctingDt;
	private Date origTxnDt;
	private String fxTradeType;
	private String buyCurrency;
	private BigDecimal buyAmt;
	private BigDecimal buyPrc;
	private String sellCurrency;
	private BigDecimal sellAmt;
	private BigDecimal sellPrc;
	private String oppositeAcctno;
	private String oppositeAcctName;
	private String oppositeBankCd;
	private String countryCd;
	private String domechargeAreaCd;
	private String txnAttri;
	private String ifNeedChange;
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

	public TForextradespotSourDtl(){}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
			this.id = id;
	}
	/**
	*账号
	* @return
	*/
	public String getAcctId() {
		return acctId;
	}
	/**
	*账号
	* @param acctId
	*/
	public void setAcctId(String acctId) {
		this.acctId = acctId;
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
	*明细序号
	* @return
	*/
	public String getDetailSeq() {
		return detailSeq;
	}
	/**
	*明细序号
	* @param detailSeq
	*/
	public void setDetailSeq(String detailSeq) {
		this.detailSeq = detailSeq;
	}

	/**
	*出/入账标志
	* @return
	*/
	public String getOutInAcctInd() {
		return outInAcctInd;
	}
	/**
	*出/入账标志
	* @param outInAcctInd
	*/
	public void setOutInAcctInd(String outInAcctInd) {
		this.outInAcctInd = outInAcctInd;
	}

	/**
	*记帐日期
	* @return
	*/
	public Date getAcctingDt() {
		return acctingDt;
	}
	/**
	*记帐日期
	* @param acctingDt
	*/
	public void setAcctingDt(Date acctingDt) {
		this.acctingDt = acctingDt;
	}

	/**
	*原始交易日期
	* @return
	*/
	public Date getOrigTxnDt() {
		return origTxnDt;
	}
	/**
	*原始交易日期
	* @param origTxnDt
	*/
	public void setOrigTxnDt(Date origTxnDt) {
		this.origTxnDt = origTxnDt;
	}

	/**
	*外汇买卖类型
	* @return
	*/
	public String getFxTradeType() {
		return fxTradeType;
	}
	/**
	*外汇买卖类型
	* @param fxTradeType
	*/
	public void setFxTradeType(String fxTradeType) {
		this.fxTradeType = fxTradeType;
	}

	/**
	*买入币种
	* @return
	*/
	public String getBuyCurrency() {
		return buyCurrency;
	}
	/**
	*买入币种
	* @param buyCurrency
	*/
	public void setBuyCurrency(String buyCurrency) {
		this.buyCurrency = buyCurrency;
	}

	/**
	*买入金额
	* @return
	*/
	public BigDecimal getBuyAmt() {
		return buyAmt;
	}
	/**
	*买入金额
	* @param buyAmt
	*/
	public void setBuyAmt(BigDecimal buyAmt) {
		this.buyAmt = buyAmt;
	}

	/**
	*买入牌价
	* @return
	*/
	public BigDecimal getBuyPrc() {
		return buyPrc;
	}
	/**
	*买入牌价
	* @param buyPrc
	*/
	public void setBuyPrc(BigDecimal buyPrc) {
		this.buyPrc = buyPrc;
	}

	/**
	*卖出币种
	* @return
	*/
	public String getSellCurrency() {
		return sellCurrency;
	}
	/**
	*卖出币种
	* @param sellCurrency
	*/
	public void setSellCurrency(String sellCurrency) {
		this.sellCurrency = sellCurrency;
	}

	/**
	*卖出金额
	* @return
	*/
	public BigDecimal getSellAmt() {
		return sellAmt;
	}
	/**
	*卖出金额
	* @param sellAmt
	*/
	public void setSellAmt(BigDecimal sellAmt) {
		this.sellAmt = sellAmt;
	}

	/**
	*卖出牌价
	* @return
	*/
	public BigDecimal getSellPrc() {
		return sellPrc;
	}
	/**
	*卖出牌价
	* @param sellPrc
	*/
	public void setSellPrc(BigDecimal sellPrc) {
		this.sellPrc = sellPrc;
	}

	/**
	*对方账号
	* @return
	*/
	public String getOppositeAcctno() {
		return oppositeAcctno;
	}
	/**
	*对方账号
	* @param oppositeAcctno
	*/
	public void setOppositeAcctno(String oppositeAcctno) {
		this.oppositeAcctno = oppositeAcctno;
	}

	/**
	*对方户名
	* @return
	*/
	public String getOppositeAcctName() {
		return oppositeAcctName;
	}
	/**
	*对方户名
	* @param oppositeAcctName
	*/
	public void setOppositeAcctName(String oppositeAcctName) {
		this.oppositeAcctName = oppositeAcctName;
	}

	/**
	*对方银行或机构代码
	* @return
	*/
	public String getOppositeBankCd() {
		return oppositeBankCd;
	}
	/**
	*对方银行或机构代码
	* @param oppositeBankCd
	*/
	public void setOppositeBankCd(String oppositeBankCd) {
		this.oppositeBankCd = oppositeBankCd;
	}

	/**
	*国别代码
	* @return
	*/
	public String getCountryCd() {
		return countryCd;
	}
	/**
	*国别代码
	* @param countryCd
	*/
	public void setCountryCd(String countryCd) {
		this.countryCd = countryCd;
	}

	/**
	*国内地区码
	* @return
	*/
	public String getDomechargeAreaCd() {
		return domechargeAreaCd;
	}
	/**
	*国内地区码
	* @param domechargeAreaCd
	*/
	public void setDomechargeAreaCd(String domechargeAreaCd) {
		this.domechargeAreaCd = domechargeAreaCd;
	}

	/**
	*交易性质
	* @return
	*/
	public String getTxnAttri() {
		return txnAttri;
	}
	/**
	*交易性质
	* @param txnAttri
	*/
	public void setTxnAttri(String txnAttri) {
		this.txnAttri = txnAttri;
	}

	/**
	*是否需要修改
	* @return
	*/
	public String getIfNeedChange() {
		return ifNeedChange;
	}
	/**
	*是否需要修改
	* @param ifNeedChange
	*/
	public void setIfNeedChange(String ifNeedChange) {
		this.ifNeedChange = ifNeedChange;
	}

}
