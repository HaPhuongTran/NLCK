package com.sm.dao;

import java.util.List;

import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;

public interface HomeDao {
	public void addHome(HomeProject homeProject);
	public HomeProject getHome(String nameHome);
	public List<Rooms>getListRooms(HomeProject home);
}
