package com.sm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "device")
public class Device {
	
	@Id
	@Column(name = "ip", nullable = false, unique = true)
	private String ip;
	
	@Column(name = "name", nullable = false)
	private String nameDevice;
	
	@Column(name = "state")
	private String state = "off";

	@ManyToOne
	@JoinColumn(name = "id_room", nullable = false)
	private Rooms roomId;
	
	public Device(){}
	
	public Device(String ip) {
		this.ip = ip;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getNameDevice() {
		return nameDevice;
	}

	public void setNameDevice(String nameDevice) {
		this.nameDevice = nameDevice;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Rooms getRoomId() {
		return roomId;
	}

	public void setRoomId(Rooms roomId) {
		this.roomId = roomId;
	}

	
}
