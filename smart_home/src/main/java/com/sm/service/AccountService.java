package com.sm.service;

import com.sm.entity.Account;
import com.sm.exception.SMException;

public interface AccountService {
	public void createAccount(Account account) throws SMException;
	public Account getAccountByName(String account);
}
