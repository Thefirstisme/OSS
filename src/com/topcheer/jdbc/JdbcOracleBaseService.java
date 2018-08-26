package com.topcheer.jdbc;

import java.io.Reader;
import java.io.StringReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.topcheer.base.OSSLog4j.Log_sql;
import com.topcheer.base.utils.DateUtil;
import com.topcheer.jdbc.dbmanager.ConnectionOracleManager;
import com.topcheer.jdbc.ormap.OrMap;
import com.topcheer.jdbc.ormap.OrMapUtil;
import com.topcheer.jdbc.page.PageUtil;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.jdbc.para.SqlParaImprove;
import com.topcheer.jdbc.util.PropertiesUtil;
import com.topcheer.jdbc.util.WordStringUtil;
import com.topcheer.rpt.RptUtil;

public class JdbcOracleBaseService {

	//private static final String METHOD_PREFIX = "set";
	protected static Log logger = LogFactory.getLog(JdbcOracleBaseService.class);
	
	private static Log_sql log_sql = new Log_sql();

	protected Connection getConnection() {
		return ConnectionOracleManager.getInstance().getConnection();
	}

	protected void release(ResultSet rs, Statement stmt, Connection conn) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null)
				conn.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			logger.error(ex.toString());
		}
	}

	protected void release(Statement stmt, Connection conn) {
		release(null, stmt, conn);
	}

	protected void release(Statement stmt) {
		release(null, stmt, null);
	}

	protected void release(Connection conn) {
		release(null, null, conn);
	}

	protected List<Object> getResultPojoList(String querySql, String pojoClassName) {
		return getResultPojoList(querySql, pojoClassName, -1);
	}


	protected List<Object> getResultPojoList(String querySql, List<Parameter> paraList, String pojoClassName) {
		return getResultPojoList(querySql, paraList, pojoClassName, -1);
	}
	
	protected List<Object> getResultPojoList(String querySql, String pojoClassName,
			int maxRows) {
		List<Object> pojoList = new ArrayList<Object>();
		int rsCount = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(querySql);
			rs = pstmt.executeQuery();
			
			ResultSetMetaData rsmd = rs.getMetaData();
			Class<?> pojoClass = Class.forName(pojoClassName);
			
			List<?> orMapList = OrMapUtil.generateORMap(pojoClass, rsmd);
			while (rs.next()) {
				if ((maxRows == -1) || (rsCount < maxRows)) {
					Object pojo = pojoClass.newInstance();
					Object columnValue = null;
					
					Method setMethod = null;

					for (int i = 0; i < orMapList.size(); ++i) {
						OrMap orMap = (OrMap) orMapList.get(i);
						
						if (String.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getString(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { String.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Date.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getDate(orMap.getColumnName());
							
							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Date.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Timestamp.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs
									.getTimestamp(orMap.getColumnName());
							
							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Timestamp.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Integer.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Integer(rs.getInt(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Integer.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Long.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Long(rs.getLong(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Long.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Double.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Double(rs.getDouble(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Double.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (BigDecimal.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getBigDecimal(orMap
									.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { BigDecimal.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
					}

					pojoList.add(pojo);
					++rsCount;
				}
			}
			
			conn.commit();
			
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("ClassNotFoundException", e);
		} catch (InstantiationException e) {
			e.printStackTrace();
			logger.error("InstantiationException", e);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			logger.error("IllegalAccessException", e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error("IllegalArgumentException", e);
		} catch (SecurityException e) {
			e.printStackTrace();
			logger.error("SecurityException", e);
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			logger.error("InvocationTargetException", e);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			logger.error("NoSuchMethodException", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Exception", e);
		} finally {
			//log_sql.log(conn, querySql, pojoClassName, rsCount);
			release(rs, pstmt, conn);
		}

		return pojoList;
	}
	
	/**
	 * 根据paraList查询数据
	 * @param querySql
	 * @param paraList
	 * @param pojoClassName
	 * @param maxRows
	 * @return
	 */
	protected List<Object> getResultPojoList(String querySql, List<Parameter> paraList, String pojoClassName,
			int maxRows) {
		List<Object> pojoList = new ArrayList<Object>();
		int rsCount = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(SqlParaImprove.getStringImprove(querySql));
			SqlParaImprove.setParameterImprove(querySql, paraList, pstmt);
			
			rs = pstmt.executeQuery();

			ResultSetMetaData rsmd = rs.getMetaData();
			Class<?> pojoClass = Class.forName(pojoClassName);

			List<?> orMapList = OrMapUtil.generateORMap(pojoClass, rsmd);
			while (rs.next()) {
				if ((maxRows == -1) || (rsCount < maxRows)) {
					Object pojo = pojoClass.newInstance();

					Object columnValue = null;

					Method setMethod = null;

					for (int i = 0; i < orMapList.size(); ++i) {
						OrMap orMap = (OrMap) orMapList.get(i);
						if (String.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getString(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { String.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Date.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getDate(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Date.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Timestamp.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs
									.getTimestamp(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Timestamp.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Integer.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Integer(rs.getInt(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Integer.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Long.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Long(rs.getLong(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Long.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Double.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Double(rs.getDouble(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Double.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (BigDecimal.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getBigDecimal(orMap
									.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { BigDecimal.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
					}

					pojoList.add(pojo);
					++rsCount;
				}
			}
			
			conn.commit();
			
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("ClassNotFoundException", e);
		} catch (InstantiationException e) {
			e.printStackTrace();
			logger.error("InstantiationException", e);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			logger.error("IllegalAccessException", e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error("IllegalArgumentException", e);
		} catch (SecurityException e) {
			e.printStackTrace();
			logger.error("SecurityException", e);
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			logger.error("InvocationTargetException", e);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			logger.error("NoSuchMethodException", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Exception", e);
		} finally {
			log_sql.log(conn, querySql, pojoClassName, rsCount);
			release(rs, pstmt, conn);
		}

		return pojoList;
	}
	/**
	 * 获得结果集
	 * @param proSql 存储过程语句
	 * @return
	 */
	protected int getProcedurePojoScalar(String proSql){
		int result=0;
		Connection conn = null;
		ResultSet rs = null;
		CallableStatement cs = null;
		try {
			conn = getConnection();
			conn.setAutoCommit(true);
			cs = conn.prepareCall("{ ? = call "+proSql+" }");
			rs = cs.executeQuery();
			while(rs.next()){
				result=rs.getInt(1);
				break;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error("IllegalArgumentException", e);
		} catch (SecurityException e) {
			e.printStackTrace();
			logger.error("SecurityException", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Exception", e);
		} finally {
			log_sql.log(conn, proSql, 0);
			release(rs, null, conn);
		}
		return result;
	}
	
	/**
	 * 获得结果集
	 * @param proSql 存储过程语句
	 * @param pojoClassName 返回列表对象命名路径
	 * @return
	 */
	protected List<Object> getProcedurePojoList(String proSql, String pojoClassName){
		List<Object> pojoList = new ArrayList<Object>();
		int rsCount = 0;
		Connection conn = null;
		ResultSet rs = null;
		CallableStatement cs = null;
		try {
			conn = getConnection();
			conn.setAutoCommit(true);
			cs = conn.prepareCall("{ ? = call "+proSql+" }");
			rs = cs.executeQuery();
		    pojoList=this.rsToList(rs, pojoClassName);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error("IllegalArgumentException", e);
		} catch (SecurityException e) {
			e.printStackTrace();
			logger.error("SecurityException", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Exception", e);
		} finally {
			log_sql.log(conn, proSql, pojoClassName, rsCount);
			release(rs, null, conn);
		}
		return pojoList;
	}
	
	// 1、存储过程 获得rs
	// 2、RS转List
	private List<Object> rsToList(ResultSet rs, String pojoClassName) {
		List<Object> pojoList = new ArrayList<Object>();
		try {
			
			ResultSetMetaData rsmd = rs.getMetaData();
			Class<?> pojoClass = Class.forName(pojoClassName);

			List<?> orMapList = OrMapUtil.generateORMap(pojoClass, rsmd);
			while (rs.next()) {
					Object pojo = pojoClass.newInstance();

					Object columnValue = null;

					Method setMethod = null;

					for (int i = 0; i < orMapList.size(); ++i) {
						OrMap orMap = (OrMap) orMapList.get(i);
						if (String.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getString(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { String.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Date.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getDate(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Date.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Timestamp.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs
									.getTimestamp(orMap.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Timestamp.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Integer.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Integer(rs.getInt(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Integer.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Long.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Long(rs.getLong(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Long.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (Double.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = new Double(rs.getDouble(orMap
									.getColumnName()));

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { Double.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
						if (BigDecimal.class.getName().equals(
								orMap.getAttributeType())) {
							columnValue = rs.getBigDecimal(orMap
									.getColumnName());

							setMethod = pojoClass.getMethod("set"
									+ WordStringUtil.capitalize(orMap
											.getAttributeName()),
									new Class[] { BigDecimal.class });

							setMethod
									.invoke(pojo, new Object[] { columnValue });
						}
					}

					pojoList.add(pojo);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("ClassNotFoundException", e);
		} catch (InstantiationException e) {
			e.printStackTrace();
			logger.error("InstantiationException", e);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			logger.error("IllegalAccessException", e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error("IllegalArgumentException", e);
		} catch (SecurityException e) {
			e.printStackTrace();
			logger.error("SecurityException", e);
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			logger.error("InvocationTargetException", e);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			logger.error("NoSuchMethodException", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Exception", e);
		} finally {
			// TODO
		}

		return pojoList;
	}

	protected Object getResultPojo(String querySql, String pojoClassName) {
		List<Object> pojoList = getResultPojoList(querySql, pojoClassName, -1);
		Object obj = new Object();
		try {
			Class<?> pojoClass = Class.forName(pojoClassName);
			obj = pojoClass.newInstance();
		} catch (Exception localException) {
		}
		if ((pojoList != null) && (pojoList.size() > 0)) {
			return pojoList.get(0);
		}
		return obj;
	}

	protected int getResultRow(String countSql) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int r = 0;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(countSql);
			rs = pstmt.executeQuery();

			if (rs.next()){
				r = rs.getInt(1);
			}
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}

		return r;
	}
	/**
	 * 获得首行首列 值
	 * @param countSql
	 * @return
	 */
	protected String getCallString(String countSql) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String r = "";
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(countSql);
			rs = pstmt.executeQuery();

			if (rs.next()){
				r = rs.getString(1);
			}
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}

		return r;
	}
	/**
	 * 获得首行首列 值
	 * @param countSql
	 * @return
	 */
	protected String getResultScalar(String countSql) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String r = "";
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(countSql);
			rs = pstmt.executeQuery();

			if (rs.next()){
				r = rs.getString(1);
			}
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}

		return r;
	}
	/**
	 * 获得首行首列 值
	 * @param countSql
	 * @return
	 */
	protected String getResultScalar(String countSql, List<Parameter> paraList) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String r = "";
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(SqlParaImprove.getStringImprove(countSql));
			SqlParaImprove.setParameterImprove(countSql, paraList, pstmt);
			
			rs = pstmt.executeQuery();

			if (rs.next()){
				r = rs.getString(1);
			}
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}

		return r;
	}
	protected int checkHasResult(String countSql) {
		return ((getResultRow(countSql) > 0) ? 1 : 0);
	}

	protected void execUpdate(String sql) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);

			pstmt.executeUpdate();

			conn.commit();
		} catch (SQLException e) {
			roolback(conn);
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(null, pstmt, conn);
		}
	}
	protected void execUpdateClob(String sql,String clobStr) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			Reader clobReader = new StringReader(clobStr); // 将 text转成流形式
			pstmt.setCharacterStream(1, clobReader, clobStr.length());// 替换sql语句中的？
			pstmt.executeUpdate();
			conn.commit();
		} catch (SQLException e) {
			roolback(conn);
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(null, pstmt, conn);
		}
	}
	protected int execBatchUpdates(List<?> strList) {
		int count = 0;
		if ((strList != null) && (strList.size() > 0)) {
			Connection conn = null;
			Statement stmt2 = null;
			
			try {
				conn = getConnection();
				stmt2 = conn.createStatement();
				conn.setAutoCommit(false);
				DatabaseMetaData dbmData = conn.getMetaData();
				if (dbmData.supportsBatchUpdates()) {
					
					for (int i = 0; i < strList.size(); ++i) {
						stmt2.addBatch((String) strList.get(i));
						//logger.debug((String) strList.get(i));
					}
					int [] rows = stmt2.executeBatch();
					//conn.commit();
					for(int j=0;j<rows.length;j++){
						count +=rows[j];
					}
				}
				
				conn.commit();
			} catch (SQLException e) {
				roolback(conn);
				e.printStackTrace();
				logger.error("SQLException", e);
			} finally {
				release(null, stmt2, conn);
			}
		}
		return count;
	}

	protected void roolback(Connection conn) {
		if (conn == null)
			return;
		try {
			conn.rollback();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		}
	}

	private List<HashMap<String, Object>> rs2MapList(ResultSet rs) {
		if (rs == null) {
			return null;
		}
		List<HashMap<String, Object>> rsMapList = new ArrayList<HashMap<String, Object>>();
		try {
			ResultSetMetaData rsmd = rs.getMetaData();
			int count = rsmd.getColumnCount();

			while (rs.next()) {
				HashMap<String, Object> rsMap = new HashMap<String, Object>();
				for (int i = 1; i <= count; ++i) {
					String columnName = rsmd.getColumnName(i);
					int columnType = rsmd.getColumnType(i);

					rsMap.put(columnName, (12 == columnType) ? rs.getString(columnName) : rs
							.getObject(columnName));
				}

				rsMapList.add(rsMap);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		}

		return rsMapList;
	}

	protected List<HashMap<String, Object>> getResultMapList(String querySql, int startRow, int pageSize) {
		String dbType = PropertiesUtil.getInstance().getProperty("db.type");

		dbType = (StringUtils.isEmpty(dbType)) ? "oracle" : dbType;

		String pageSql = PageUtil.makePageSql(dbType, querySql, startRow,
				pageSize);

		return getResultMapList(pageSql);
	}

	protected List<HashMap<String, Object>> getResultMapList(String querySql) {
		List<HashMap<String, Object>> mapList = null;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(querySql);
			rs = pstmt.executeQuery();

			mapList = rs2MapList(rs);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}

		return mapList;
	}

	protected HashMap<String, Object> getResultMap(String querySql) {
		List<HashMap<String, Object>> mapList = getResultMapList(querySql);
		return (((mapList != null) && (mapList.size() > 0)) ? mapList
				.get(0) : null);
	}
	
	
	
	/**
	 * 使用PreparedStatement，根据paraList执行SQL
	 * @param sql
	 * @param paraList
	 * @return
	 */
	public boolean execSqlWithPara(String sql, List<Parameter> paraList){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean r = false;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(SqlParaImprove.getStringImprove(sql));
			SqlParaImprove.setParameterImprove(sql, paraList, pstmt);
			//pstmt.set
			// TODO 
//			pstmt.setInt(1, 100);
//			pstmt.setString(2, "1234567890");
			
			pstmt.execute();
			conn.commit();
			r = true;
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}
		return r;
	}
	

	/**
	 * 使用PreparedStatement，根据paraList执行SQL
	 * @param sql
	 * @param paraList
	 * @return
	 */
	public int getCount(String sql, List<Parameter> paraList){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int r = 0;
		try {
			conn = getConnection();
			
			System.out.println(sql);
			String sql2 = sql;
			for(Parameter p:paraList){
				System.out.println(p.getName()+"|"+p.getM_Value()+"|"+p.getM_DBType());
				sql2 = sql2.replace(p.getName(), "'"+p.getM_Value()+"'");
			}
			System.out.println(sql2);
			
			pstmt = conn.prepareStatement(SqlParaImprove.getStringImprove(sql));
			SqlParaImprove.setParameterImprove(sql, paraList, pstmt);
			
			r = pstmt.executeUpdate();
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("SQLException", e);
		} finally {
			release(rs, pstmt, conn);
		}
		return r;
	}

	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, Date declareDt){
		updateTolRecord(tableName, acctId, DateUtil.date2String(declareDt, DateUtil.FORMAT_DATE));
	}
	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, String declareDt){
		String querySql ="select count(0) from "+tableName+" where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd')";
		int tolRecord = getResultRow(querySql);
		
		String updateSql = "update "+RptUtil.replacLastDalToTol(tableName)+" set Tol_Record = '"+tolRecord+"' where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd')";
		
		if("ZMQ_T_CorpDepo_Dtl".equalsIgnoreCase(tableName)){
			updateSql = "update "+RptUtil.replacLastDalToTol(tableName)+" set Tol_Record = '"+tolRecord+"' where SUBACCOUNTNO ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd')";
		}
		execUpdate(updateSql);
	}
	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, Date declareDt,String CurrencyCd){
		updateTolRecord(tableName, acctId, DateUtil.date2String(declareDt, DateUtil.FORMAT_DATE),CurrencyCd);
	}
	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, String declareDt,String CurrencyCd){
		String querySql ="select count(0) from "+tableName+" where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd') and Currency_Cd = '"+CurrencyCd+"'";
		int tolRecord = getResultRow(querySql);
		
		String updateSql = "update "+RptUtil.replacLastDalToTol(tableName)+" set Tol_Record = '"+tolRecord+"' where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd') and Currency_Cd = '"+CurrencyCd+"'";
		
		execUpdate(updateSql);
	}
	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, Date declareDt,String CurrencyCd,String belongOrgId){
		updateTolRecord(tableName, acctId, DateUtil.date2String(declareDt, DateUtil.FORMAT_DATE),CurrencyCd,belongOrgId);
	}
	/**
	 * 更新汇总表的总记录条数
	 * @param acctId
	 * @param declareDt
	 */
	public void updateTolRecord(String tableName, String acctId, String declareDt,String CurrencyCd,String belongOrgId){
		String querySql ="select count(0) from "+tableName+" where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd') and Currency_Cd = '"+CurrencyCd+"' and BELONG_ORG_ID='"+belongOrgId+"'";
		int tolRecord = getResultRow(querySql);
		
		String updateSql = "update "+RptUtil.replacLastDalToTol(tableName)+" set Tol_Record = '"+tolRecord+"' where acct_id ='"+acctId+"' and Declare_Dt = to_date('"+declareDt+"','yyyy-MM-dd') and Currency_Cd = '"+CurrencyCd+"' and BELONG_ORG_ID='"+belongOrgId+"'";
		
		execUpdate(updateSql);
	}
	
}
