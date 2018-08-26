package com.topcheer.jdbc.call;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;

import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.dbmanager.ConnectionOracleManager;
import com.topcheer.jdbc.dbmanager.ConnectionSQL2005Manager;

public class CallSqlUtil extends JdbcOracleBaseService{

	protected Connection getConnection() {
		return ConnectionSQL2005Manager.getInstance().getConnection();
	}

	/**
	 * 上报确认前调用，用于将明细信息的明细序号字段整理为按流水号生成的。
	 * @param tableName
	 * @param acctId
	 * @param declareDt
	 * @return
	 */
	public static String Update_Update_Rpt_Tol(String tableName, String declareDt) {
		//long t1 = 0;
		CallableStatement cs = null;
		String retValue = "链接问题,请联系管理员";
		Connection connection = ConnectionOracleManager.getInstance().getConnection();
		try {
			connection.setAutoCommit(true);
			cs = connection.prepareCall("{call ZMQ_PRC_RPT_SUM_UPDATE(?,?,?,?,?)}");
			// 输入参数
			cs.setString(1, tableName);
			cs.setString(2, declareDt);
			// 输出参数
			cs.registerOutParameter(3, Types.VARCHAR);
			cs.registerOutParameter(4, Types.VARCHAR);
			cs.registerOutParameter(5, Types.VARCHAR);
			//t1 = System.currentTimeMillis();
			cs.executeUpdate();

			retValue = cs.getString(5);
			System.out.println(cs.getString(3) + "<   >" + cs.getString(4) +"<   >" + cs.getString(5));
			return String.valueOf(retValue);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			//System.out.println("Update_Rpt_Tol执行 "+tableName+"时间为-->" + (System.currentTimeMillis()-t1));
			try {
				if (cs != null)
					cs.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return retValue;
	}
	
	/**
	 * 检查余额连续性
	 * @param rpt_date
	 * @param rpt_chn_name
	 * @param rpt_tab_tol_name
	 * @param rpt_tab_dtl_name
	 * @return
	 */
	public static String ZMQ_PRC_CHK_WORK_BALANCE(String rpt_date, String rpt_chn_name, String rpt_tab_tol_name,  String rpt_tab_dtl_name) {
		CallableStatement cs = null;
		String retValue = "链接问题,请联系管理员";
		Connection connection = ConnectionOracleManager.getInstance().getConnection();
		try {
			connection.setAutoCommit(true);
			cs = connection.prepareCall("{call ZMQ_PRC_CHK_WORK_BALANCE(?,?,?,?,?)}");
			cs.setString(1, rpt_date);
			cs.setString(2, rpt_chn_name);
			cs.setString(3, rpt_tab_tol_name);
			cs.setString(4, rpt_tab_dtl_name);
			cs.registerOutParameter(5, Types.VARCHAR);
			cs.executeUpdate();

			retValue = cs.getString(5);
			System.out.println("存储过程【ZMQ_PRC_CHK_WORK_BALANCE】-->"+cs.getString(5));
			return String.valueOf(retValue);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (cs != null)
					cs.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return retValue;
	}
	
	
	/**
	 * 根据用户id查询用户名
	 */
//	public static String QUERY_TS_USER_NAME(String userId){
//		CallableStatement cs = null;
//		String retValue = "";
//		Connection connection = ConnectionOracleManager.getInstance().getConnection();
//		try {
//			connection.setAutoCommit(true);
//			cs = connection.prepareCall("{call QUERY_TS_USER_NAME(?,?)}");
//			cs.setString(1, userId);
//			cs.registerOutParameter(2, Types.VARCHAR);
//			cs.executeUpdate();
//			
//			retValue = cs.getString(2);
//			System.out.println("获取的用户名是===========》"+cs.getString(2));
//			if(retValue==null)
//				retValue="";
//			return String.valueOf(retValue);
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}finally{
//			try {
//				if(cs != null)
//					cs.close();
//				if(connection!=null)
//					connection.close();
//			} catch (SQLException e) {
//				e.printStackTrace();
//			}
//		}
//		return retValue;
//	}
	
}
