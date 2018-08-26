package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 各项贷款-明细
* @author Administrator
*
*/
public class TTotaloanDtl {

      private String id;
	private String ifNeedChange;
	private String acctId;
	private Date declareDt;
	private String detailSeq;
	private String outInAcctInd;
	private Date acctingDt;
	private Date origTxnDt;
	private String txnAttri;
	private BigDecimal bal;
	private String countryCd;
	private String domechargeAreaCd;
	private String oppositeAcctno;
	private String oppositeAcctName;
	private String idenType;
	private String catCd;
	private String periodLen;
	private String periodUnit;
	private Date intStartDt;
	private Date matureDt;
	private BigDecimal rate;
	private String idenNo;
	private String overdue;
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

	public TTotaloanDtl(){}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
			this.id = id;
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
	*证件类型
	* @return
	*/
	public String getIdenType() {
		return idenType;
	}
	/**
	*证件类型
	* @param idenType
	*/
	public void setIdenType(String idenType) {
		this.idenType = idenType;
	}

	/**
	*贷款类别
	* @return
	*/
	public String getCatCd() {
		return catCd;
	}
	/**
	*贷款类别
	* @param catCd
	*/
	public void setCatCd(String catCd) {
		this.catCd = catCd;
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
	*利率
	* @return
	*/
	public BigDecimal getRate() {
		return rate;
	}
	/**
	*利率
	* @param rate
	*/
	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	/**
	*
	* @return
	*/
	public String getIdenNo() {
		return idenNo;
	}
	/**
	*
	* @param idenNo
	*/
	public void setIdenNo(String idenNo) {
		this.idenNo = idenNo;
	}

	/**
	*
	* @return
	*/
	public String getOverdue() {
		return overdue;
	}
	/**
	*
	* @param overdue
	*/
	public void setOverdue(String overdue) {
		this.overdue = overdue;
	}

}
