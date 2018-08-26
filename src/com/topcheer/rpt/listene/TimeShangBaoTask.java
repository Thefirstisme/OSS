package com.topcheer.rpt.listene;

import java.util.TimerTask;

import com.topcheer.rpt.web.TpublishAction;

public class TimeShangBaoTask  extends TimerTask{

	private TpublishAction tpublishAction = new TpublishAction();
	
	public void setTpublishAction(TpublishAction tpublishAction) {
		this.tpublishAction = tpublishAction;
	}

	@Override
	public void run() {
		//调用定时生成xml和上报的方法
		try {
			System.out.println(tpublishAction);
			//需要一件生成各个日期的xml文件，需要打开代码，修改日期为想生成的日期
			tpublishAction.toOKShangBao();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}
}
