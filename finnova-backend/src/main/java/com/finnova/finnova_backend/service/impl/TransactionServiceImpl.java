package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.Account;
import com.finnova.finnova_backend.entity.Transaction;
import com.finnova.finnova_backend.repository.AccountRepository;
import com.finnova.finnova_backend.repository.TransactionRepository;
import com.finnova.finnova_backend.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction updateTransaction(Long id, Transaction transaction) {

        Transaction existing =
                transactionRepository.findById(id).orElse(null);

        if (existing != null) {
            return transactionRepository.save(transaction);
        }

        return null;
    }

    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public void deposit(Long accountId, Double amount) {

        Account account =
                accountRepository.findById(accountId)
                .orElseThrow(() ->
                new RuntimeException("Account Not Found"));

        account.setBalance(
                account.getBalance() + amount);

        accountRepository.save(account);
    }

    @Override
    public void withdraw(Long accountId, Double amount) {

        Account account =
                accountRepository.findById(accountId)
                .orElseThrow(() ->
                new RuntimeException("Account Not Found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(
                account.getBalance() - amount);

        accountRepository.save(account);
    }

    @Override
    public void transfer(Long fromAccountId,
                         Long toAccountId,
                         Double amount) {

        Account fromAccount =
                accountRepository.findById(fromAccountId)
                .orElseThrow(() ->
                new RuntimeException("Source Account Not Found"));

        Account toAccount =
                accountRepository.findById(toAccountId)
                .orElseThrow(() ->
                new RuntimeException("Destination Account Not Found"));

        if (fromAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        fromAccount.setBalance(
                fromAccount.getBalance() - amount);

        toAccount.setBalance(
                toAccount.getBalance() + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
    }
}