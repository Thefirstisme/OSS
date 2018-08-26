package com.topcheer.mq;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;

import com.ibm.mq.MQC;
import com.ibm.mq.MQGetMessageOptions;
import com.ibm.mq.MQMessage;
import com.ibm.mq.MQQueue;
import com.ibm.mq.MQQueueManager;
import com.topcheer.jdbc.util.WordStringUtil;
import com.topcheer.rpt.service.TpublishService;

public class MQReceiver {
	
	protected static Logger logger = Logger.getLogger(MQReceiver.class.getName());
	
	private static ConcurrentHashMap<String, String> recMap = new ConcurrentHashMap<String, String>();
	private static ArrayBlockingQueue<String> recQ = new ArrayBlockingQueue<String>(500);
	static Set<String> hasSentM = Collections
			.synchronizedSet(new HashSet<String>());
	static Thread t = new MQReceManager();

	public static String getMess(String rptId) {
		return recMap.remove(rptId);
	}

	static class MQReceManager extends Thread {
		MQReceManager() {
			this.setDaemon(true);
			this.start();
		}

		@Override
		public void run() {
			MQQueueManager qmgr = MQQueueManagerPool.getMQQueueManager();
			while (true) {
				if (!MQReceiver.hasSentM.isEmpty()) {
					try {
						int openOptions = MQC.MQOO_INPUT_AS_Q_DEF
								| MQC.MQOO_OUTPUT | MQC.MQOO_INQUIRE;

						MQQueue queue = qmgr
								.accessQueue(
										MQQueueManagerPool.environmentInfo.MQ_QUEUE_OUT,
										openOptions, null, null, null);
						do {
							int depth = queue.getCurrentDepth();
							while (depth-- > 0) {
								logger.debug("当前队列深度--->"+ (depth+1));
								MQMessage msg = new MQMessage();
								MQGetMessageOptions gmo = new MQGetMessageOptions();
								queue.get(msg, gmo);
								String mqMsg = msg.readStringOfByteLength(msg.getDataLength());
								//logger.debug("人行返回信息mqMsg--->"+mqMsg);
								String reXml = WordStringUtil.ISO88591toGBK(mqMsg);
								logger.debug("人行返回信息reXml(ISO88591toGBK) --->"+reXml);
								logger.debug("人行返回信息reXml.indexOf(\"<CFX>\")----->" + reXml.indexOf("<CFX>"));
								String subReXml = reXml.substring(reXml.indexOf("<CFX>"), reXml.length());
								
								recQ.add(subReXml);
							}
							// hasSentM.clear();
							setREdata();
							Thread.sleep(1000);
						} while (!MQReceiver.hasSentM.isEmpty());
						queue.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
					MQQueueManagerPool.freeMQQueueManager(qmgr);
				}
				try {
					synchronized (MQReceiver.class) {
						MQReceiver.class.wait();
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
		public synchronized static void setREdata(){
			TpublishService service = new TpublishService();
			String mess="";
			while ((mess = recQ.poll()) != null)
			{
				
				String msgID = XmlUtil.getResMsgRef(mess);
				logger.debug("人行返回信息msgID--->"+msgID);
				String msgNo = XmlUtil.getResMsgNo(mess);
				logger.debug("人行返回信息msgNo--->"+msgNo);
				XmlUtil.setpublisRpt(service, msgID,msgNo, mess);
				logger.debug("人行返回信息---保存完成---");
//				ApplicationContext ac2 = WebApplicationContextUtils
//	  					.getWebApplicationContext(ServletActionContext
//	  							.getServletContext());
//				TpublishAction tPublishAction = (TpublishAction) ac2.getBean("rptpublish");
//				tPublishAction.processCustinfo(msgID);
				
				if ("310101".equals(msgNo)) {
					MQReceiver.hasSentM.remove("310101");
				} else {
					MQReceiver.hasSentM.remove(msgID);
				}
			}
		}
				
	}

}
