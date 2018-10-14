package com.sm.dao.impl;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sm.dao.HomeDao;
import com.sm.entity.HomeProject;
import com.sm.entity.Rooms;

@Repository
public class HomeDaoImpl implements HomeDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	
	public void addHome(HomeProject homeProject) {
		 Session session = sessionFactory.getCurrentSession();
		 session.save(homeProject);
	}
	
	public HomeProject getHome(String nameHome) {
		Session session = sessionFactory.getCurrentSession();
		Criteria crHome = session.createCriteria(HomeProject.class);
		Criteria crHomeKey = crHome.createCriteria("homePrimaryKey");
		crHomeKey.add(Restrictions.eq("homePrimaryKey.name",nameHome));
		HomeProject home = (HomeProject) crHomeKey.uniqueResult();
		return home;
	}

	@Override
	public List<Rooms> getListRooms(HomeProject home) {
//		Session session = sessionFactory.getCurrentSession();
//		Criteria crHome = session.createCriteria(HomeProject.class);
//		Criteria crHomeKey = crHome.createCriteria("homePrimaryKey");
//		crHomeKey.add(Restrictions.eq("homePrimaryKey.home_id",home.getHomePrimaryKey().getIdHome()));
//		List<Rooms> listRooms = crHomeKey.list();
		return null;
	}
}
