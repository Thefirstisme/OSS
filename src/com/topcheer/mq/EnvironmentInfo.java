package com.topcheer.mq;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class EnvironmentInfo {
	public EnvironmentInfo() {
		
		Properties props = new Properties();
		InputStream is = EnvironmentInfo.class
				.getResourceAsStream("mq.properties");
		try {
			props.load(is);
			this.MQ_HOSTNAME = props.getProperty("queue.host");
			this.MQ_PORT = Integer.valueOf(props.getProperty("queue.port"));
			this.MQ_MANAGER = props.getProperty("queue.qmname");
			this.MQ_QUEUE_IN = props.getProperty("queue.qname.in");
			this.MQ_CHANNEL = props.getProperty("queue.channel");
			this.MQ_QUEUE_OUT = props.getProperty("queue.qname.out");
			this.MQ_characterSet =Integer.valueOf( props.getProperty("queue.characterSet"));
			this.MQ_CCSID = Integer.valueOf(props.getProperty("queue.ccsid"));
			this.SLEEP_TIME = Long.parseLong(props.getProperty("queue.sleepTime"));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
		
	}

	public String MQ_HOSTNAME;
	public String MQ_MANAGER;	    
	public String MQ_QUEUE_IN;
	public String MQ_QUEUE_OUT;
	public String MQ_CHANNEL;
	public int MQ_characterSet;
	public int MQ_PORT;
    public int MQ_CCSID;
	public long SLEEP_TIME;
	
}
