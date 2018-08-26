package com.topcheer.rpt.web;

import java.util.Date;
import java.util.List;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.rpt.bo.Tpublish;
import com.topcheer.rpt.service.TpublishHISService;

@SuppressWarnings("serial")
public class TpublishHISAction extends BaseAction{

	private TpublishHISService tpublishHISService;

	public void setTpublishHISService(TpublishHISService tpublishHISService) {
		this.tpublishHISService = tpublishHISService;
	}

	@SuppressWarnings("unchecked")
	public void toList() throws Exception{
		String msgids=this.getStringParameter("msgids");
		String mode=this.getStringParameter("mode");
		String datatime=this.getStringParameter("datatime");
		if(datatime.isEmpty()){
			datatime = DateUtil.date2String(new Date(System.currentTimeMillis()), DateUtil.FORMAT_DATE);
		}else{
			datatime =datatime.substring(0,10);
		} 
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString="data_dt='"+datatime+"' ";
		
		if(mode.isEmpty()){
			mode="1";
		}
		if(!msgids.isEmpty()){
			filterString += " and  msgid in (" + msgids +")"
						 + " and ispublish = '" +mode+"'"; 			
		}else{
			filterString += " and ispublish = '" +mode+"'";			

		}
		
		List<Tpublish> entList=(List<Tpublish>)tpublishHISService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tpublishHISService.getPageRowCount(filterString.toString());
		returnJson(true, entList, "yyyy-MM-dd", total);
	}

}
