package com.sm.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "home")
public class HomeProject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int idHome;
	
	@Column(name = "name", nullable = false)
	private String nameHome;
	
	@OneToMany(mappedBy = "home", fetch = FetchType.EAGER)
	private List<Rooms> rooms;
	
	
	public HomeProject(){}
	
	public HomeProject(int idHome, String nameHome, List<Rooms> rooms) {
		this.idHome = idHome;
		this.nameHome = nameHome;
		this.rooms = rooms;
	}

	public int getIdHome() {
		return idHome;
	}

	public void setIdHome(int idHome) {
		this.idHome = idHome;
	}

	public String getNameHome() {
		return nameHome;
	}

	public void setNameHome(String nameHome) {
		this.nameHome = nameHome;
	}

	public List<Rooms> getRooms() {
		return rooms;
	}

	public void setRooms(List<Rooms> rooms) {
		this.rooms = rooms;
	}
}
