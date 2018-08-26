package com.topcheer.errorcount.web;

public class Test implements Runnable {
	int start = 0;
	int end = 0;

	public Test(int end) {
		new Thread(this).start();
		this.end = end;
	}

	public void run() {
		while (true) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			if (start == end)
				print();
			start++;
		}
	}

	private void print() {
		System.out.println("你的任务在" + end + "秒钟后执行了");
	}

	public static void main(String[] args) {
		new Test(3);
	}
}