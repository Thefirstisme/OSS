package com.topcheer.quartz;


import java.io.ByteArrayInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;

/**
 * 这只是一个简单的JOB而已，名字貌似很NB，这个任务用于实时的检测任务列表的状态，用于更新JOB。
 * 这样你改了个配置，可以立马生效的噢。
 * 这个类用于在JOB运行期间，使得修改立马生效。
 * 
 */
public class JobEngine implements Job {

	public void execute(JobExecutionContext arg0) throws JobExecutionException {

		try {
			Scheduler inScheduler = arg0.getScheduler();
			JobDetail job = null;
			JobDataMap map = null;
			CronTrigger trigger = null;
			/**
			 * 这里根据状态U使用的，以及STATE_DATE日期大于当前日期，判断这个任务是刚更新的，如果你想使得修改的JOB立马生效。
			 * 你需要吧ZMQ_JOB_TASK的字段的值改得大于当前日期，那样这里就会更新到了噢。
			 */
			JobTaskBean[] bean = JDBC.getJobTaskBean("SELECT * FROM ZMQ_JOB_TASK WHERE STATE='U' AND STATE_DATE>sysdate",new HashMap());
			if (bean == null)
				return;
			for (int i = 0; i < bean.length; i++) {
				// 这里使得修改的job更新，为了避免重复更新，需要吧STATE_DATE日期改过来。
				String update = "UPDATE ZMQ_JOB_TASK SET STATE_DATE=sysdate WHERE TASK_ID=:TASK_ID";
				Connection con = JDBC.getConnection();
				HashMap m = new HashMap();
				m.put("TASK_ID", new Long(bean[i].getTaskId()));
				PreparedStatement ps = JDBC.execStatementValues(con, update, m);
				ps.executeUpdate();
				con.close();
				map = new JobDataMap();
				map.put("TASK_ID", new Long(bean[i].getTaskId()));// 这里把任务ID放到map里面，用于记录执行日志的时候使用。
				if (bean[i].getParms() != null
						&& !bean[i].getParms().equals("")) {

					/****************** 把业务系统配置的变量读出来,放到job的上下文里面 **/
					SAXReader saxReader = new SAXReader();
					Document document = saxReader
							.read(new ByteArrayInputStream(("<root>"
									+ bean[i].getParms() + "</root>")
									.getBytes()));
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
				/****************** 把业务系统配置的变量读出来 **/
				try {
					/****************** 把老的任务给停止，然后删除 **/
					inScheduler.unscheduleJob(bean[i].getTaskCode() + "trigger",bean[i].getTaskType() + "trigger");
					inScheduler.deleteJob(bean[i].getTaskCode(),bean[i].getTaskType());
					/****************** 把老的任务给停止，然后删除 **/
				} catch (Exception e) {
					// 这里如果是在运行过程中，添加新的任务，而不是修改任务，这里会出错的噢，你说对不对，新加的任务怎么能删除。
					e.printStackTrace();
				}
				/****************** 重新添加任务 **/
				job = new JobDetail(bean[i].getTaskCode(), bean[i].getTaskType(), Class.forName(bean[i].getTaskImplClass()));
				job.setJobDataMap(map);
				trigger = new CronTrigger(bean[i].getTaskCode() + "trigger", bean[i].getTaskType() + "trigger",
						bean[i].getTaskCode(), bean[i].getTaskType(), bean[i].getTaskExpress());
				inScheduler.addJob(job, true);
				inScheduler.scheduleJob(trigger);
				/****************** 重新添加任务 **/
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}