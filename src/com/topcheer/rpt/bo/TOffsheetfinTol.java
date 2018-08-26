package com.topcheer.rpt.bo;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

/**
 * 表外理财-汇总
 * 
 * @author Administrator
 * 
 */
public class TOffsheetfinTol {

	private String id;
	private String acctId;
	private String currencyCd;
	private BigDecimal dayBalFill;
	private String reportId;
	private Date declareDt;
	private String tolRecord;
	private String belongOrgId;
	private String ifchecked;
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

	public TOffsheetfinTol() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 账号
	 * 
	 * @return
	 */
	public String getAcctId() {
		return acctId;
	}

	/**
	 * 账号
	 * 
	 * @param acctId
	 */
	public void setAcctId(String acctId) {
		this.acctId = acctId;
	}

	/**
	 * 货币
	 * 
	 * @return
	 */
	public String getCurrencyCd() {
		return currencyCd;
	}

	/**
	 * 货币
	 * 
	 * @param currencyCd
	 */
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}

	/**
	 * 日终余额
	 * 
	 * @return
	 */
	public BigDecimal getDayBalFill() {
		return dayBalFill;
	}

	/**
	 * 日终余额
	 * 
	 * @param dayBalFill
	 */
	public void setDayBalFill(BigDecimal dayBalFill) {
		this.dayBalFill = dayBalFill;
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
	 * 总记录条数
	 * 
	 * @return
	 */
	public String getTolRecord() {
		return tolRecord;
	}

	/**
	 * 总记录条数
	 * 
	 * @param tolRecord
	 */
	public void setTolRecord(String tolRecord) {
		this.tolRecord = tolRecord;
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

	public String getIfchecked() {
		return ifchecked;
	}

	public void setIfchecked(String ifchecked) {
		this.ifchecked = ifchecked;
	}

	public String getIfNeedChange() {
		return ifNeedChange;
	}

	public void setIfNeedChange(String ifNeedChange) {
		this.ifNeedChange = ifNeedChange;
	}

}