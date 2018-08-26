package com.topcheer.rpt.listene;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.topcheer.rpt.web.TpublishAction;

public class DoOKListene implements ServletContextListener {
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
						synchronized (TpublishAction.class) {
							TpublishAction.class.notify();
			}	
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			} 
			}
		}
	}
}
