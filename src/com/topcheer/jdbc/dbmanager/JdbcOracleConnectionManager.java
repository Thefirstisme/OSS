package com.topcheer.jdbc.dbmanager;

import java.sql.Connection;
import java.sql.DriverManager;

import org.apache.commons.codec.binary.Base64;

import com.topcheer.jdbc.util.PropertiesUtil;

public class JdbcOracleConnectionManager {
	private static JdbcOracleConnectionManager instance = new JdbcOracleConnectionManager();
	private String url;
	private String driverClassName;
	private String userName;
	private String password;

	private JdbcOracleConnectionManager() {
		propertyConfig();
	}

	public static JdbcOracleConnectionManager getInstance() {
		return instance;
	}

	private void propertyConfig() {
		this.url = PropertiesUtil.getInstance().getProperty("jdbc.oracle.url");
		this.driverClassName = PropertiesUtil.getInstance().getProperty(
				"jdbc.oracle.driverClassName");
		this.userName = PropertiesUtil.getInstance().getProperty(
				"jdbc.oracle.userName");
		this.password = PropertiesUtil.getInstance().getProperty(
				"jdbc.oracle.password");
//		String password = PropertiesUtil.getInstance().getProperty("jdbc.oracle.password");
//		byte[] passwordBytes = password.getBytes();
//		this.password = new String(Base64.decodeBase64(passwordBytes));
	}

	public Connection getConnection() throws Exception {
		Class.forName(this.driverClassName).newInstance();
		Connection conn = DriverManager.getConnection(this.url, this.userName,
				this.password);
		conn.setAutoCommit(false);

		return conn;
	}

	public static Connection getConnection(String _driverClassName,
			String _url, String _userName, String _password) throws Exception {
		Class.forName(_driverClassName);
		Connection conn = DriverManager.getConnection(_url, _userName,
				_password);
		conn.setAutoCommit(false);

		return conn;
	}
}
