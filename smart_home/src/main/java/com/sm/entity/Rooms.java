package com.sm.entity;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rooms")
public class Rooms{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumns({
		@JoinColumn(name = "home_id", referencedColumnName = "id"),
		@JoinColumn(name = "home_name", referencedColumnName = "name")
	})
	private HomeProject homePrimaryKey;
	
	@Column(name = "name_room", nullable = false, unique = true)
	private String nameRoom;
	
	@OneToMany(mappedBy = "roomId", fetch = FetchType.EAGER)
	private List<Device> devices;
	
	public Rooms() {}
	
	public Rooms(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}
	
	@JsonIgnore
	public HomeProject getHomePrimaryKey() {
		return homePrimaryKey;
	}

	public String getNameRoom() {
		return nameRoom;
	}

	public List<Device> getDevices() {
		return devices;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setHomePrimaryKey(HomeProject homePrimaryKey) {
		this.homePrimaryKey = homePrimaryKey;
	}

	public void setNameRoom(String nameRoom) {
		this.nameRoom = nameRoom;
	}

	public void setDevices(List<Device> devices) {
		this.devices = devices;
	}

}

