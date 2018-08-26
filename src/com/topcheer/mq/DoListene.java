package com.topcheer.mq;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class DoListene implements ServletContextListener {
	private MyThread myThread;

	public void contextDestroyed(ServletContextEvent e) {
		if (myThread != null && myThread.isInterrupted()) {
			myThread.interrupt();
		}
	}

	public void contextInitialized(ServletContextEvent e) {
		String str = null;
		if (str == null && myThread == null) {
			myThread = new MyThread();
			myThread.start(); // servlet 上下文初始化时启动 socket
		}
	}

	class MyThread extends Thread {
		public void run() {
			while (!this.isInterrupted()) {// 线程未中断执行循环
				try {
					if(MQReceiver.hasSentM.isEmpty()){
						MQReceiver.hasSentM.add("310101");
					}
					Thread.sleep(10000); 
					synchronized (MQReceiver.class) {
						MQReceiver.class.notify();
					}	
				} catch (InterruptedException e) {
					e.printStackTrace();
				}

			}
		}
	}
}
