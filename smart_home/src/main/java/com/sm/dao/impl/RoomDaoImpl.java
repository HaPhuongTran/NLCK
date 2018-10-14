package com.sm.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sm.dao.RoomDao;
import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;

@Repository
public class RoomDaoImpl implements RoomDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void addRoom(Rooms room) {
		 Session session = sessionFactory.getCurrentSession();
		 session.save(room);
	}
	
	@Override
	public void updateRoom(Rooms room) {
		Session session = sessionFactory.getCurrentSession();
		session.update(room);
	}
	
	@Override
	public List<Rooms> getListRooms(HomeProject home) {
//		Session session = sessionFactory.getCurrentSession();
//		Criteria crRoom = session.createCriteria(Rooms.class);
//		Criteria crHome = crRoom.createCriteria("homePrimaryKey");
//		crHome.add(Restrictions.eq("homePrimaryKey.home_id",home.getHomePrimaryKey().getIdHome()));
//		List<Rooms> listRooms = crRoom.list();
//		return listRooms;
		return null;
	}
	
	@Override
	public Rooms getRoom(String nameRoom) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("FROM Rooms WHERE nameRoom =:name");
		query.setParameter("name", nameRoom);
		Rooms room = (Rooms) query.getSingleResult();
		return room;
	}

	@Override
	public void saveOrUpdate(Rooms room) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(room);
		
	}

	@Override
	public void deleteRoom(Rooms room) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(room);
		
	}
}
