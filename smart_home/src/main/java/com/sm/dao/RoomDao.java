package com.sm.dao;

import java.util.List;

import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;

public interface RoomDao {
	public void addRoom(Rooms room);
	
	public List<Rooms> getListRooms(HomeProject home);
	
	public void updateRoom(Rooms room);
	
	public Rooms getRoom(String nameRoom);
	
	public void saveOrUpdate(Rooms room);
	
	public void deleteRoom(Rooms room);
}
