package com.topcheer.quartz;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

/**
 * 入口类，业务系统如果需要启动的job引擎的话， 只需要调用这个类的run接口就行了。
 * 
 */
public class Mouse {

	public static void run() throws Exception {
		SchedulerFactory sf = new StdSchedulerFactory();
		Scheduler sched = sf.getScheduler();
		JobDetail job = null;
		JobDataMap map = null;
		CronTrigger trigger = null;
		/**
		 * 把所有需要处理的启动的任务读出来噢。根据状态。
		 */
		JobTaskBean[] bean = JDBC.getJobTaskBean("SELECT * FROM ZMQ_JOB_TASK WHERE STATE='U'", new HashMap());
		if (bean == null)
			return;
		for (int i = 0; i < bean.length; i++) {
			map = new JobDataMap();
			map.put("TASK_ID", new Long(bean[i].getTaskId()));// 这里把任务ID放到map里面，用于记录执行日志的时候使用。
			/**************** 把ZMQ_JOB_TASK表的配置的变量传入JOB引擎 ***********************/
			if (bean[i].getParms() != null && !bean[i].getParms().equals("")) {
				SAXReader saxReader = new SAXReader();
				Document document = saxReader
						.read(new ByteArrayInputStream(("<root>"
								+ bean[i].getParms() + "</root>").getBytes()));
				List l = document.selectNodes("/root/item");
				Iterator iter = l.iterator();
				while (iter.hasNext()) {
					Element element = (Element) iter.next();
					Iterator iterator = element.elementIterator("key");
					String key = "";
					String value = "";
					while (iterator.hasNext()) {
						key = ((Element) iterator.next()).getTextTrim();
					}
					iterator = element.elementIterator("value");
					while (iterator.hasNext()) {
						value = ((Element) iterator.next()).getTextTrim();
					}
					map.put(key, value);
				}
			}
			/**************** 把ZMQ_JOB_TASK表的配置的变量传入JOB引擎 ***********************/
			job = new JobDetail(bean[i].getTaskCode(), bean[i].getTaskType(),
					Class.forName(bean[i].getTaskImplClass()));
			job.setJobDataMap(map);
			trigger = new CronTrigger(bean[i].getTaskCode() + "trigger",
					bean[i].getTaskType() + "trigger", bean[i].getTaskCode(),
					bean[i].getTaskType(), bean[i].getTaskExpress());
			sched.addJob(job, true);
			sched.scheduleJob(trigger);
		}
		// 启动
		sched.start();
	}
}
