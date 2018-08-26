package com.topcheer.errorcount.bo;

public class ErrorCountInfo {
	private String id;
	
	private String tableName;
	private String count;
	private String declareDt;
	//table表示表的英文名加.jsp
	private String table;
	
	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	public ErrorCountInfo() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getDeclareDt() {
		return declareDt;
	}
	public void setDeclareDt(String declareDt) {
		this.declareDt = declareDt;
	}
	
	
}
