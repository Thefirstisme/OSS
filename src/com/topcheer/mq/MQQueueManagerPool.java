package com.topcheer.mq;

import com.ibm.mq.MQC;
import com.ibm.mq.MQEnvironment;
import com.ibm.mq.MQException;
import com.ibm.mq.MQQueueManager;

public class MQQueueManagerPool {
	private final static MQQueueManagerPool instance = new MQQueueManagerPool();
	public static EnvironmentInfo environmentInfo = new EnvironmentInfo();
	private MQQueueManager manager;
	private int roleCount = 0, usedTimes = 0;
	private Thread opConnect = new OpConnect();

	private MQQueueManagerPool() {
	}

	public static MQQueueManager getMQQueueManager() {
		while (instance.manager == null || !instance.manager.isConnected()) {
			try {
				
				if(environmentInfo == null)
					environmentInfo= new EnvironmentInfo();
				MQEnvironment.CCSID=environmentInfo.MQ_CCSID;
				MQEnvironment.hostname=environmentInfo.MQ_HOSTNAME;
				MQEnvironment.port=environmentInfo.MQ_PORT;
				MQEnvironment.channel = environmentInfo.MQ_CHANNEL;
				instance.manager = new MQQueueManager(environmentInfo.MQ_MANAGER);			
			
			} catch (MQException e) {
				System.out.println(e);
				e.printStackTrace();
			}
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		synchronized (MQQueueManagerPool.class) {
			instance.roleCount++;
			instance.usedTimes++;
		}
		return instance.manager;
	}
	
	public static MQQueueManager getMQQueueManagerLocalHost() {
		while (instance.manager == null || !instance.manager.isConnected()) {
			try {
				
				if(environmentInfo == null)
					environmentInfo= new EnvironmentInfo();
				MQEnvironment.CCSID=environmentInfo.MQ_CCSID;
				MQEnvironment.hostname=environmentInfo.MQ_HOSTNAME;
				MQEnvironment.port=environmentInfo.MQ_PORT;
				MQEnvironment.channel = environmentInfo.MQ_CHANNEL;
				
				MQEnvironment.properties.put(MQC.TRANSPORT_PROPERTY, MQC.TRANSPORT_MQSERIES_BINDINGS); 
				
				instance.manager = new MQQueueManager(environmentInfo.MQ_MANAGER);			
			
			} catch (MQException e) {
				System.out.println(e);
				e.printStackTrace();
			}
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		synchronized (MQQueueManagerPool.class) {
			instance.roleCount++;
			instance.usedTimes++;
		}
		return instance.manager;
	}
	
	public static void freeMQQueueManager(MQQueueManager manager) {
		synchronized (MQQueueManagerPool.class) {
			if (--instance.roleCount == 0 && !instance.opConnect.isAlive()) {
				instance.usedTimes = 0;
				instance.opConnect.start();
			}
		}
	}

	class OpConnect extends Thread {
		@Override
		public void run() {
			do {
				try {
					Thread.sleep(10000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			} while (usedTimes != 0);
			try {
				manager.close();
			} catch (MQException e) {
				e.printStackTrace();
			}
			opConnect = new OpConnect();
		}

	}
}
