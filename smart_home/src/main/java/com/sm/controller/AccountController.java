package com.sm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sm.entity.Account;
import com.sm.exception.SMException;
import com.sm.service.AccountService;

@RestController
@CrossOrigin
public class AccountController {

	@Autowired
	AccountService accountService;
	
	@RequestMapping(value = "/createaccount", method = RequestMethod.POST, headers="Accept=application/json")
	public ResponseEntity<HttpStatus> createAccount(@RequestBody Account account) throws SMException{
		try {
			accountService.createAccount(account);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (SMException e) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
	}
	
	@RequestMapping(value = "/getaccount/{account_name}", method = RequestMethod.GET, headers="Accept=application/json")
	public Account getAccountByName(@PathVariable("account_name") String accountName){
		return accountService.getAccountByName(accountName);
	}
}
