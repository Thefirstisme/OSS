package com.topcheer.errorcount.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;

public class TestTimer{
    
    public static void main(String[] args){
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
         //System.out.println("开始时间"+sdf.format(new Date()));
        MyTask myTask = new MyTask();
        
        Timer timer = new Timer();
       System.out.println("开始时间"+sdf.format(new Date()));
        timer.schedule(myTask, 5000, 2000);
        //timer.schedule(myTask, 2000);
       //System.out.println("结束时间"+sdf.format(new Date()));
        System.out.println("main end");
    }
    
}