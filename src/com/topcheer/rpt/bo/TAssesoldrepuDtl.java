package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 卖出回购资产
* @author Administrator
*
*/
public class TAssesoldrepuDtl {

    private String id;
	private String acctId;
	private Date declareDt;
	private String detailSeq;
	private String outInAcctInd;
	private Date acctingDt;
	private Date intStartDt;
	private Date matureDt;
	private Date origTxnDt;
	private BigDecimal bal;
	private String oppositeAcctno;
	private String oppositeAcctName;
	private String oppositeBankCd;
	private String countryCd;
	private String domechargeAreaCd;
	private String saleAssetType;
	private BigDecimal assetTotalVal;
	private String repoPeriodUnit;
	private String repoPeriodLen;
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

	public TAssesoldrepuDtl(){}

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
	*卖出资产类别
	* @return
	*/
	public String getSaleAssetType() {
		return saleAssetType;
	}
	/**
	*卖出资产类别
	* @param saleAssetType
	*/
	public void setSaleAssetType(String saleAssetType) {
		this.saleAssetType = saleAssetType;
	}

	/**
	*资产总价值
	* @return
	*/
	public BigDecimal getAssetTotalVal() {
		return assetTotalVal;
	}
	/**
	*资产总价值
	* @param assetTotalVal
	*/
	public void setAssetTotalVal(BigDecimal assetTotalVal) {
		this.assetTotalVal = assetTotalVal;
	}

	/**
	*回购期限单位
	* @return
	*/
	public String getRepoPeriodUnit() {
		return repoPeriodUnit;
	}
	/**
	*回购期限单位
	* @param repoPeriodUnit
	*/
	public void setRepoPeriodUnit(String repoPeriodUnit) {
		this.repoPeriodUnit = repoPeriodUnit;
	}

	/**
	*回购期限长度
	* @return
	*/
	public String getRepoPeriodLen() {
		return repoPeriodLen;
	}
	/**
	*回购期限长度
	* @param repoPeriodLen
	*/
	public void setRepoPeriodLen(String repoPeriodLen) {
		this.repoPeriodLen = repoPeriodLen;
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
