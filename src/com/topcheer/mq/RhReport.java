package com.topcheer.mq;

import com.topcheer.base.velocity.bo.Head;
import com.topcheer.base.xmlToBean.bo.Capsule;

public class RhReport {
	private Head head;
	
	private Capsule capsule;

	public Capsule getCapsule() {
		return capsule;
	}

	public void setCapsule(Capsule capsule) {
		this.capsule = capsule;
	}

	public Head getHead() {
		return head;
	}

	public void setHead(Head head) {
		this.head = head;
	}

}
