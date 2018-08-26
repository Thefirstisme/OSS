package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 应收及预付款-明细
* @author Administrator
*
*/
public class TResvableprepaymentDtl {

      private String id;
	private String acctId;
	private Date declareDt;
	private String currencyCd;
	private String belongOrgId;
	private String detailSeq;
	private String outInAcctInd;
	private Date acctingDt;
	private Date origTxnDt;
	private BigDecimal bal;
	private String txnAttri;
	private String oppositeName;
	private String oppositeBankCd;
	private String oppositeCountryCd;
	private String domechargeAreaCd;
	private String ifNeedChange;
	private String modifiedUser;
	private Timestamp modifiedTime;
	private String status;
	private String createUser;
	private Timestamp createTime;
	private String nbId;

	public String getNbId() {
		return nbId;
	}

	public void setNbId(String nbId) {
		this.nbId = nbId;
	}

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

	public TResvableprepaymentDtl(){}

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
	 * 货币
	 * @return
	 */
	public String getCurrencyCd() {
		return currencyCd;
	}

	/**
	 * 货币
	 * @param currencyCd
	 */
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}

	
	/**
	 * 所属机构代码
	 * @return
	 */
	public String getBelongOrgId() {
		return belongOrgId;
	}

	/**
	 * 所属机构代码
	 * @param belongOrgId
	 */
	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
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
	*对方国别代码
	* @return
	*/
	public String getOppositeCountryCd() {
		return oppositeCountryCd;
	}
	/**
	*对方国别代码
	* @param oppositeCountryCd
	*/
	public void setOppositeCountryCd(String oppositeCountryCd) {
		this.oppositeCountryCd = oppositeCountryCd;
	}

	/**
	*国内地区代码
	* @return
	*/
	public String getDomechargeAreaCd() {
		return domechargeAreaCd;
	}
	/**
	*国内地区代码
	* @param domechargeAreaCd
	*/
	public void setDomechargeAreaCd(String domechargeAreaCd) {
		this.domechargeAreaCd = domechargeAreaCd;
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
