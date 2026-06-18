package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.Account;
import com.finnova.finnova_backend.repository.AccountRepository;
import com.finnova.finnova_backend.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {
	
	                                        

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account updateAccount(Long id, Account account) {
        Account existing = accountRepository.findById(id).orElse(null);

        if (existing != null) {
            return accountRepository.save(account);
        }

        return null;
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
}