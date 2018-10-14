package com.sm.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sm.dao.HomeDao;
import com.sm.dao.RoomDao;
import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;
import com.sm.service.RoomService;


@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RoomServiceImpl implements RoomService {
	@Autowired
    RoomDao roomDao;
	
	@Autowired
	HomeDao homeDao;
	
	@Transactional
	@Override
	public void createRoom(Rooms room) {
		roomDao.addRoom(room);
////		int exit =0;
////		List<Rooms> listRooms = homeDao.getListRooms(room.getHome());
//		if(listRooms.size() > 0) {
//			for(int i =0; i<listRooms.size(); i++) {
//				if(listRooms.get(i).getNameRoom() == room.getNameRoom()){
//					exit = 1;
//				}
//			}
//			if(exit == 0) {
//				roomDao.addRoom(room);
//			}
//		}
//		else {
				
//		}
	}
	
	@Transactional
	@Override
	public void updateRoom(Rooms room) {
		roomDao.updateRoom(room);
	}
	
	@Override
	public List<Rooms> getListRooms(HomeProject home){
		return roomDao.getListRooms(home);
	}
	
	@Override
	public Rooms getRoom(String nameRoom) {
		return roomDao.getRoom(nameRoom);
	}

	@Override
	public void saveOrUpdate(Rooms room) {
		roomDao.saveOrUpdate(room);
	}

	@Transactional
	@Override
	public void deleteRoom(Rooms room) {
		roomDao.deleteRoom(room);
		
	}
}
