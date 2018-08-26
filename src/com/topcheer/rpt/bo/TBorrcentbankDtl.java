package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 向中央银行借款
* @author Administrator
*
*/
public class TBorrcentbankDtl {

      private String id;
	private String acctId;
	private Date declareDt;
	private String detailSeq;
	private String outInAcctInd;
	private Date acctDt;
	private Date origTxnDt;
	private BigDecimal bal;
	private String periodUnit;
	private String periodLen;
	private Date intStartDt;
	private Date matureDt;
	private String oppositeName;
	private BigDecimal yieldRate;
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

	public TBorrcentbankDtl(){}

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
	public Date getAcctDt() {
		return acctDt;
	}
	/**
	*记帐日期
	* @param acctDt
	*/
	public void setAcctDt(Date acctDt) {
		this.acctDt = acctDt;
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
	*金额
	* @return
	*/
	public BigDecimal getBal() {
		return bal;
	}
	/**
	*金额
	* @param bal
	*/
	public void setBal(BigDecimal bal) {
		this.bal = bal;
	}

	/**
	*期限单位
	* @return
	*/
	public String getPeriodUnit() {
		return periodUnit;
	}
	/**
	*期限单位
	* @param periodUnit
	*/
	public void setPeriodUnit(String periodUnit) {
		this.periodUnit = periodUnit;
	}

	/**
	*期限长度
	* @return
	*/
	public String getPeriodLen() {
		return periodLen;
	}
	/**
	*期限长度
	* @param periodLen
	*/
	public void setPeriodLen(String periodLen) {
		this.periodLen = periodLen;
	}

	/**
	*起息日
	* @return
	*/
	public Date getIntStartDt() {
		return intStartDt;
	}
	/**
	*起息日
	* @param intStartDt
	*/
	public void setIntStartDt(Date intStartDt) {
		this.intStartDt = intStartDt;
	}

	/**
	*到期日
	* @return
	*/
	public Date getMatureDt() {
		return matureDt;
	}
	/**
	*到期日
	* @param matureDt
	*/
	public void setMatureDt(Date matureDt) {
		this.matureDt = matureDt;
	}

	/**
	*对方名称
	* @return
	*/
	public String getOppositeName() {
		return oppositeName;
	}
	/**
	*对方名称
	* @param oppositeName
	*/
	public void setOppositeName(String oppositeName) {
		this.oppositeName = oppositeName;
	}

	/**
	*年化利率
	* @return
	*/
	public BigDecimal getYieldRate() {
		return yieldRate;
	}
	/**
	*年化利率
	* @param yieldRate
	*/
	public void setYieldRate(BigDecimal yieldRate) {
		this.yieldRate = yieldRate;
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
