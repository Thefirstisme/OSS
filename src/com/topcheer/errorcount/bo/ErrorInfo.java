package com.topcheer.errorcount.bo;

public class ErrorInfo {

	private String tableName;
	private String acctId;
	private String declareDt;
	private String errInfo;
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getAcctId() {
		return acctId;
	}
	public void setAcctId(String acctId) {
		this.acctId = acctId;
	}
	public String getDeclareDt() {
		return declareDt;
	}
	public void setDeclareDt(String declareDt) {
		this.declareDt = declareDt;
	}
	public String getErrInfo() {
		return errInfo;
	}
	public void setErrInfo(String errInfo) {
		this.errInfo = errInfo;
	}
	
}
