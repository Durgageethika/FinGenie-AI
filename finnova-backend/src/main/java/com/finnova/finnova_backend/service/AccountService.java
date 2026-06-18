package com.finnova.finnova_backend.service;

import java.util.List;
import com.finnova.finnova_backend.entity.Account;

public interface AccountService {

    Account saveAccount(Account account);

    Account getAccountById(Long id);

    List<Account> getAllAccounts();

    Account updateAccount(Long id, Account account);

    void deleteAccount(Long id);
}