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
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "user_name", nullable = false)
	private String userName;
	
	@Column(name = "pasword", nullable = false)
	private String password;
	
	@Column(name = "address")
	private String Address;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "account",fetch = FetchType.EAGER)
	private List<HomeProject> home;
	
	
	
}
