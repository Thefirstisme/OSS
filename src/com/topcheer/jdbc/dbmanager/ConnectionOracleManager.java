package com.topcheer.jdbc.dbmanager;

import java.sql.Connection;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.topcheer.jdbc.util.PropertiesUtil;

public class ConnectionOracleManager {
	private static ConnectionOracleManager instance = new ConnectionOracleManager();

	protected static Log logger = LogFactory.getLog(ConnectionOracleManager.class);

	private String accessType = null;
	public static final String DB_ACCESS_TYPE_JNDI = "jndi";
	public static final String DB_ACCESS_TYPE_JDBC = "jdbc";
	public static final String DB_ACCESS_TYPE_DBCP = "dbcp";

	private ConnectionOracleManager() {
		this.accessType = PropertiesUtil.getInstance().getProperty(
				"db.accessType");

		this.accessType = ((StringUtils.isEmpty(this.accessType)) ? "jdbc"
				: this.accessType);
	}

	public static ConnectionOracleManager getInstance() {
		return instance;
	}

	public Connection getConnection() {
		try {
			if (this.accessType.equalsIgnoreCase("jndi"))
				return JndiConnectionManager.getInstance().getConnection();
			if (this.accessType.equalsIgnoreCase("dbcp")) {
				return DbcpConnectionManager.getInstance().getConnection();
			}
			return JdbcOracleConnectionManager.getInstance().getConnection();
		} catch (Exception ex) {
			logger.error(ex.getMessage(), ex);
		}

		return null;
	}
}
