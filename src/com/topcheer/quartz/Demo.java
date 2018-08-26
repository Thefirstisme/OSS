package com.topcheer.quartz;

import java.util.HashMap;
import java.util.Iterator;

public class Demo extends Task {

	public void execute(HashMap map) {

		Iterator i = map.keySet().iterator();
		while (i.hasNext()) {
			Object key = i.next();
			System.out.println("初始化参数key：" + key + " value:" + map.get(key));
		}
		System.out.println("HELLO ,THIS IS FIRST DEMO");
	}

}

