package com.topcheer.errorcount.web;

import java.util.List;

import com.topcheer.base.web.BaseAction;
import com.topcheer.errorcount.bo.ErrorCountInfo;
import com.topcheer.errorcount.bo.ErrorInfo;
import com.topcheer.errorcount.service.TErrorCountService;
import com.topcheer.rpt.bo.TBankaccepbillPay;

public class TErrorCountAction extends BaseAction{

	private TErrorCountService tErrorCountService;

	public void settErrorCountService(TErrorCountService tErrorCountService) {
		this.tErrorCountService = tErrorCountService;
	}

	/**
	 * 得到所有报表的错误数量
	 * @throws Exception
	 */
	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String declareDt = "3000-12-31";
		//if(this.getStringParameter("declareDt")!=null && this.getStringParameter("declareDt").length()>10) {
		if(this.getStringParameter("declareDt")!=null && this.getStringParameter("declareDt").length()>=10) {
			declareDt = this.getStringParameter("declareDt").substring(0, 10);
		}
		String filterString=this.getFilterString(sortString);
		List<ErrorCountInfo> entList=(List<ErrorCountInfo>)tErrorCountService.getByPage(start, endIndex,declareDt, sortString.toString());
		int total = tErrorCountService.getRowNumByProperties(declareDt);
		returnJson(true, entList, "yyyy-MM-dd", total);
	}
	
	/**
	 * 得到具体报表的错误信息和账号
	 * @throws Exception
	 */
	public void toErrInfoList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		
		String tableName = this.getStringParameter("tableName");
		String declareDt = this.getStringParameter("declareDt");
		
		List<ErrorInfo> entList=(List<ErrorInfo>)tErrorCountService.getErrInfoByPage(start, endIndex,tableName, declareDt);
		returnJson(true, entList, "yyyy-MM-dd", 4);
	}
	
	/**
	 * 得到前端页面传过来key对应的value
	 */
	protected String getStringParameter(Object key){
		String str = "";
		Object obj = this.getParameter(key);
		if(null!=obj)str=obj.toString();
		return str.trim();
	}

}
