package test;

public class ImpTemp {
	private String tableName;
	private String columnName;
	private String columnComment;
	private String tableComment;
	private String columnType;
	private String ifPk;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getColumnComment() {
		return columnComment;
	}

	public void setColumnComment(String columnComment) {
		this.columnComment = columnComment;
	}

	public String getTableComment() {
		return tableComment;
	}

	public void setTableComment(String tableComment) {
		this.tableComment = tableComment;
	}

	public String getColumnType() {
		return columnType;
	}

	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getIfPk() {
		return ifPk;
	}

	public void setIfPk(String ifPk) {
		this.ifPk = ifPk;
	}

}
