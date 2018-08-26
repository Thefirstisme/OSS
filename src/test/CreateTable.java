package test;

import java.util.List;

import com.topcheer.jdbc.JdbcBaseService;

public class CreateTable extends JdbcBaseService{
	
	public  List<ImpTemp> getTableNameData(){
		String querySql = " select table_name from imp_temp group by table_name having  table_name like  '%Dtl'  ";
		
		List t = this.getResultPojoList(querySql, "test.ImpTemp");
		
		return t;
	}
	
	public List<ImpTemp> getTableNameData(String tableName){
		String querySql = " select * from imp_temp where table_name='" +tableName+ "'";
		
		List t = this.getResultPojoList(querySql, "test.ImpTemp");
		
		return t;
	}
	
	
	public String tidySql(List<ImpTemp> t){
		
		StringBuffer  strBufAll = new  StringBuffer();
		ImpTemp currTable = (ImpTemp)t.get(0);
		String ifExists = "if exists (select 1 from  sysobjects  where  id = object_id('"+currTable.getTableName()+"') and type = 'U')  drop table "+currTable.getTableName()+" go ";
		String createTable = "create table " + currTable.getTableName() + "( " ; 
		strBufAll.append(ifExists).append(createTable);
		// 整理字段
		for(int i = 0; i < t.size(); i ++){
			ImpTemp imp = t.get(i);
			// 设置主键 not null 
			String isNull = (imp.getColumnName().equals("Acct_Id") || imp.getColumnName().equals("Declare_Dt") || imp.getColumnName().equals("Detail_Seq")) ? " not null, " : " null, ";
			
			strBufAll.append(imp.getColumnName()).append("    ").append(imp.getColumnType()).append(isNull);
		}
		// 设置主键
		strBufAll.append(" constraint PK_T_SYSFINAFLOW_DTL primary key nonclustered (Acct_Id, Declare_Dt, Detail_Seq)  ) go ");
		
		// table comment
		strBufAll.append(" declare @CurrentUser sysname select @CurrentUser = user_name() execute sp_addextendedproperty 'MS_Description',    '" +currTable.getTableComment()+ "',    'user', @CurrentUser, 'table', '"+currTable.getTableName()+"' go");
		
		// 设置字段备注
		for(int i = 0; i < t.size(); i ++){
			ImpTemp imp = t.get(i);
			// 设置主键 not null 
			String columnComment = " declare @CurrentUser sysname select @CurrentUser = user_name() execute sp_addextendedproperty 'MS_Description',    '"+imp.getColumnComment()+"',    'user', @CurrentUser, 'table', '" +currTable.getTableComment()+ "', 'column', '"+imp.getColumnName()+"' go ";
			
			strBufAll.append(columnComment);
		}
		
		return strBufAll.toString();
	}
	
	
	public static void main(String[] args) {
		CreateTable c = new CreateTable();
		List t = c.getTableNameData();
		System.out.println(t.size());
	}
	
}
