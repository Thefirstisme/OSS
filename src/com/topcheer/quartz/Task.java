package com.topcheer.quartz;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Iterator;

import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * 这个类是用来包装一下JOB接口的，用于记录日志。
 * 
 */
public abstract class Task implements ITask, Job {

	/**
	 * 这个类是用来记录日志用。 如果你嫌弃这样的实现不爽，那你可以用个监听器，很简单的。
	 * 通过实现下面的这两个方法，同样可以实现这样的效果，不过个人觉得，没我搞的这么透明，用着爽。
	 * 
	 * public void jobToBeExecuted(JobExecutionContext inContext)这个监听方法是任务执行前
	 * //只需要把任务信息放到JobDataMap里面，这里获取搞就行了 public void
	 * jobWasExecuted(JobExecutionContext inContext, JobExecutionException
	 * inException) 这个监听方法是任务执行后 唯一的缺点是异常了，貌似不好记录。
	 * 
	 * @param arg0
	 * @throws JobExecutionException
	 */
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		TaskLogBean b = null;
		try {
			HashMap map = new HashMap();
			JobDataMap qzMap = arg0.getJobDetail().getJobDataMap();
			Iterator i = qzMap.keySet().iterator();
			while (i.hasNext()) {
				Object key = i.next();
				map.put(key, qzMap.get(key));
			}
			// 任务执行前，先记录个日志噢。
			String insert = "INSERT INTO ZMQ_TASK_LOG(TASK_LOG_ID,TASK_ID,REMARKS,START_DATE,STATE) VALUES(:TASK_LOG_ID , :TASK_ID , '执行中' , sysdate , 'R' )";
			HashMap clumMap = new HashMap();
			clumMap.put("TASK_ID", map.get("TASK_ID"));
			b = JDBC.insert(insert, clumMap);
			// 任务执行
			execute(map); 
			
			Connection con = JDBC.getConnection();
			// 执行完成更新下任务日志
			String sql = "UPDATE ZMQ_TASK_LOG SET STATE='O',REMARKS='执行完成',FINISH_DATE=sysdate WHERE TASK_LOG_ID=:TASK_LOG_ID ";
			HashMap m = new HashMap();
			m.put("TASK_LOG_ID", new Long(b.getTaskLogId()));
			PreparedStatement ps = JDBC.execStatementValues(con, sql, m);
			ps.executeUpdate();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
			Connection con;
			try {
				// 异常了，更新下任务日志，说明是异常的
				con = JDBC.getConnection();
				String sql = "UPDATE ZMQ_TASK_LOG SET STATE='E',FINISH_DATE=sysdate,REMARKS=:REMARKS WHERE TASK_LOG_ID=:TASK_LOG_ID ";
				HashMap m = new HashMap();
				m.put("TASK_LOG_ID", new Long(b.getTaskLogId()));
				m.put("REMARKS", e.getMessage()); // 这里可以把堆栈放进去
				PreparedStatement ps = JDBC.execStatementValues(con, sql, m);
				ps.executeUpdate();
				con.close();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
	}
}
