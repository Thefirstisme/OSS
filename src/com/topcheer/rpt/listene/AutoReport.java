package com.topcheer.rpt.listene;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.rpt.web.TpublishAction;

public class AutoReport  implements Job {
	private TpublishAction tpublishAction = new TpublishAction();
	
	public void setTpublishAction(TpublishAction tpublishAction) {
		this.tpublishAction = tpublishAction;
	}
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		System.out.println("---->" + DateUtil.date2String(new Date(), DateUtil.FORMAT_DATETIME));
		try {
			//tpublishAction.toOKShangBao();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
