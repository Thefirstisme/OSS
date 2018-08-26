package com.topcheer.rpt.bo;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

/**
* 单位存款-汇总
* @author Administrator
*
*/
public class TCorpdepoTol {

    private String id;
	private String acctId;
	private String custNm;
	private String categ;
	private BigDecimal depoRate;
	private String custType;
	private String balanceCd;
	private String idenType;
	private String idenNo;
	private String currencyCd;
	private BigDecimal dayBalFill;
	private Date declareDt;
	private String tolRecord;
	private String openOrgId;
	private String ifNeedChange;
	private String fixDepoInd;
	private String subaccountno;
	private String ifchecked;
	private String modifiedUser;
	private Timestamp modifiedTime;
	private String status;
	private String createUser;
	private Timestamp createTime;

	public Timestamp getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Timestamp modifiedTime) {
		this.modifiedTime = modifiedTime;
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

	public TCorpdepoTol(){}

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
	*户名
	* @return
	*/
	public String getCustNm() {
		return custNm;
	}
	/**
	*户名
	* @param custNm
	*/
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	/**
	*类别
	* @return
	*/
	public String getCateg() {
		return categ;
	}
	/**
	*类别
	* @param categ
	*/
	public void setCateg(String categ) {
		this.categ = categ;
	}

	/**
	*存款利率
	* @return
	*/
	public BigDecimal getDepoRate() {
		return depoRate;
	}
	/**
	*存款利率
	* @param depoRate
	*/
	public void setDepoRate(BigDecimal depoRate) {
		this.depoRate = depoRate;
	}

	/**
	*客户类型
	* @return
	*/
	public String getCustType() {
		return custType;
	}
	/**
	*客户类型
	* @param custType
	*/
	public void setCustType(String custType) {
		this.custType = custType;
	}

	/**
	*资产负债指标代码
	* @return
	*/
	public String getBalanceCd() {
		return balanceCd;
	}
	/**
	*资产负债指标代码
	* @param balanceCd
	*/
	public void setBalanceCd(String balanceCd) {
		this.balanceCd = balanceCd;
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
	*证件号码
	* @return
	*/
	public String getIdenNo() {
		return idenNo;
	}
	/**
	*证件号码
	* @param idenNo
	*/
	public void setIdenNo(String idenNo) {
		this.idenNo = idenNo;
	}

	/**
	*货币代码
	* @return
	*/
	public String getCurrencyCd() {
		return currencyCd;
	}
	/**
	*货币代码
	* @param currencyCd
	*/
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}

	/**
	*日终余额
	* @return
	*/
	public BigDecimal getDayBalFill() {
		return dayBalFill;
	}
	/**
	*日终余额
	* @param dayBalFill
	*/
	public void setDayBalFill(BigDecimal dayBalFill) {
		this.dayBalFill = dayBalFill;
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
	*总记录条数
	* @return
	*/
	public String getTolRecord() {
		return tolRecord;
	}
	/**
	*总记录条数
	* @param tolRecord
	*/
	public void setTolRecord(String tolRecord) {
		this.tolRecord = tolRecord;
	}

	/**
	*开户机构代码
	* @return
	*/
	public String getOpenOrgId() {
		return openOrgId;
	}
	/**
	*开户机构代码
	* @param openOrgId
	*/
	public void setOpenOrgId(String openOrgId) {
		this.openOrgId = openOrgId;
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
	*定期标志
	* @return
	*/
	public String getFixDepoInd() {
		return fixDepoInd;
	}
	/**
	*定期标志
	* @param fixDepoInd
	*/
	public void setFixDepoInd(String fixDepoInd) {
		this.fixDepoInd = fixDepoInd;
	}

	/**
	*
	* @return
	*/
	public String getSubaccountno() {
		return subaccountno;
	}
	/**
	*
	* @param subaccountno
	*/
	public void setSubaccountno(String subaccountno) {
		this.subaccountno = subaccountno;
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
