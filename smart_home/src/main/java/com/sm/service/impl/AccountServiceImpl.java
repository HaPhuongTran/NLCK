package com.sm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sm.dao.AccountDao;
import com.sm.entity.Account;
import com.sm.exception.SMException;
import com.sm.service.AccountService;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	AccountDao accountDao;

	@Override
	@Transactional
	public void createAccount(Account account) throws SMException {
		Account checkAccount = accountDao.getAccountByName(account.getUserName());
		if(checkAccount == null)
			accountDao.createAccount(account);
		else {
			throw new SMException("The username is existed.");
		}
	}

	@Override
	public Account getAccountByName(String account) {
		return accountDao.getAccountByName(account);
	}

}
