package com.topcheer.mq;

import java.util.Date;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.topcheer.quartz.Mouse;

public class MqListener  implements ServletContextListener {   
    public void contextInitialized(ServletContextEvent event) {   
        System.out.println("MQ 监听程序启动" +  new Date());   
        try {
			Mouse.run();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }   
  
    public void contextDestroyed(ServletContextEvent event) {   
    	System.out.println("MQ 监听程序关闭" +  new Date());  
    }   
}   
