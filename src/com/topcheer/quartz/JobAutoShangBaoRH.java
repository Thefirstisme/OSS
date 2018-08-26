package com.topcheer.quartz;

import java.util.HashMap;

import com.topcheer.rpt.service.TpublishService;

public class JobAutoShangBaoRH extends Task {
	public static void main(String args[]) throws Exception {
		Mouse.run();
	}

	@SuppressWarnings("rawtypes")
	public void execute(HashMap map) {
		try {
			System.out.println("****************************************");
			System.out.println("执行任务向人行发送报文-------开始-------------");
			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			TpublishService tpublishService=new TpublishService();
			tpublishService.autoSendXmlToMQ(null, null);
			
			System.out.println("****************************************");
			System.out.println("执行任务向人行发送报文-------结束-------------");
			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
