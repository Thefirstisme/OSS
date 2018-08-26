package com.topcheer.errorcount.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;

public class MyTask extends TimerTask{
    
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
//	public void run() {
//		// TODO Auto-generated method stub
//		
//	}
    
    public void run(){
        System.out.println(sdf.format(new Date()));
    }
}


