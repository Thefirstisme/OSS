package com.topcheer.mq;

import java.util.List;

import com.topcheer.base.xmlToBean.bo.Rule;

public class Report {
	
	private String id;
	
	private String tablename;
	
	private List<Rule> ruleList;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public List<Rule> getRuleList() {
		return ruleList;
	}

	public void setRuleList(List<Rule> ruleList) {
		this.ruleList = ruleList;
	}
}
