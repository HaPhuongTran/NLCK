package com.sm.service;

import java.util.List;

import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;

public interface RoomService {
	public void createRoom(Rooms room);
	
	public void updateRoom(Rooms room);
	
	public List<Rooms> getListRooms(HomeProject home);
	
	public Rooms getRoom(String nameRoom);
	
	public void saveOrUpdate(Rooms room);
	
	public void deleteRoom(Rooms room);
	
}
