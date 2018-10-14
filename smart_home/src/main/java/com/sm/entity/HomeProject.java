package com.sm.entity;

import java.util.List;
	
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "home")
public class HomeProject {
	
	@EmbeddedId
	private HomePrimaryKey homePrimaryKey;
	
	@OneToMany(mappedBy = "homePrimaryKey", fetch = FetchType.EAGER)
	private List<Rooms> rooms;
	
	
	public HomeProject(){}
	
	public HomeProject(HomePrimaryKey homePrimaryKey) {
		this.homePrimaryKey = homePrimaryKey;
	}

	public HomePrimaryKey getHomePrimaryKey() {
		return homePrimaryKey;
	}

	public List<Rooms> getRooms() {
		return rooms;
	}

	public void setHomePrimaryKey(HomePrimaryKey homePrimaryKey) {
		this.homePrimaryKey = homePrimaryKey;
	}

	public void setRooms(List<Rooms> rooms) {
		this.rooms = rooms;
	}

}
