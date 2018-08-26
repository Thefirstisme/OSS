package com.topcheer.jdbc.dbmanager;

import javax.sql.DataSource;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean;

public class MyLocalSessionFactoryBean extends AnnotationSessionFactoryBean {
	@Override
	public void setDataSource(DataSource dataSource) {
		BasicDataSource bds = (BasicDataSource) dataSource;
		String password = bds.getPassword();
		byte[] passwordBase64 = password.getBytes();
		String psd =  new String(Base64.decodeBase64(passwordBase64)); 
		bds.setPassword(psd);
		super.setDataSource(bds);
	}
}
