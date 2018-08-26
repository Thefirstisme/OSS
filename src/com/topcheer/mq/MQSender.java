package com.topcheer.mq;

import java.util.concurrent.ArrayBlockingQueue;

import com.ibm.mq.MQC;
import com.ibm.mq.MQMessage;
import com.ibm.mq.MQPutMessageOptions;
import com.ibm.mq.MQQueue;
import com.ibm.mq.MQQueueManager;

public class MQSender {
	private static ArrayBlockingQueue<String> sendQ = new ArrayBlockingQueue<String>(
			500);

	public static MQSendManager mqSendM = new MQSendManager();

	public static void addMess(String xml) {
		sendQ.add(xml);
		synchronized (MQSendManager.class) {
			MQSendManager.class.notify();
		}
	}

	public static class MQSendManager {
		public final Object threadWait = new Object();

		MQSendManager() {
		}

		public void run() {
			String mess;
			if ((mess = sendQ.poll()) != null) {

				MQQueueManager qmgr = MQQueueManagerPool.getMQQueueManager();
				try {

					MQQueue queue = qmgr.accessQueue(
							MQQueueManagerPool.environmentInfo.MQ_QUEUE_IN,
							MQC.MQOO_OUTPUT,null,null,null);
					do {
						MQMessage theMessage = new MQMessage();
						MQPutMessageOptions pmo = new MQPutMessageOptions();
						theMessage.characterSet = MQQueueManagerPool.environmentInfo.MQ_characterSet;
						theMessage.writeString(mess);
						queue.put(theMessage, pmo);
						//System.out.println(mess);
						//MQReceiver.hasSentM.add(XmlUtil.getResMsgRef(mess));	
						Thread.sleep(1000);

					} while ((mess = sendQ.poll()) != null);
					queue.close();
					synchronized (MQReceiver.class) {
						MQReceiver.class.notify();
					}	
				} catch (Exception e) {
					e.printStackTrace();
				} 
				MQQueueManagerPool.freeMQQueueManager(qmgr);
			}
		}
	}
}
