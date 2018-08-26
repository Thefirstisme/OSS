package com.topcheer.rpt.bo;

import java.util.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

/**
* 
* @author Administrator
*
*/
public class TFteAcctinfo {

      private String id;
	private String ifNeedChange;
	private String acctId;
	private Date declareDt;
	private String reportId;
	private String custNm;
	private String currencyCd;
	private String balanceCd;
	private String categ;
	private String idenType;
	private String idenNo;
	private String operType;
	private String depttype;
	private String subaccountno;
	private String accstatus;
	private String belongOrgId;
	private String ifchecked;
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

	public TFteAcctinfo(){}

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
	public String getAcctId() {
		return acctId;
	}
	/**
	*
	* @param acctId
	*/
	public void setAcctId(String acctId) {
		this.acctId = acctId;
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
	public String getCustNm() {
		return custNm;
	}
	/**
	*
	* @param custNm
	*/
	public void setCustNm(String custNm) {
		this.custNm = custNm;
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
	public String getBalanceCd() {
		return balanceCd;
	}
	/**
	*
	* @param balanceCd
	*/
	public void setBalanceCd(String balanceCd) {
		this.balanceCd = balanceCd;
	}

	/**
	*
	* @return
	*/
	public String getCateg() {
		return categ;
	}
	/**
	*
	* @param categ
	*/
	public void setCateg(String categ) {
		this.categ = categ;
	}

	/**
	*
	* @return
	*/
	public String getIdenType() {
		return idenType;
	}
	/**
	*
	* @param idenType
	*/
	public void setIdenType(String idenType) {
		this.idenType = idenType;
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
	public String getOperType() {
		return operType;
	}
	/**
	*
	* @param operType
	*/
	public void setOperType(String operType) {
		this.operType = operType;
	}

	/**
	*
	* @return
	*/
	public String getDepttype() {
		return depttype;
	}
	/**
	*
	* @param depttype
	*/
	public void setDepttype(String depttype) {
		this.depttype = depttype;
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
	public String getAccstatus() {
		return accstatus;
	}
	/**
	*
	* @param accstatus
	*/
	public void setAccstatus(String accstatus) {
		this.accstatus = accstatus;
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
