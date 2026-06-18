package com.finnova.finnova_backend.service;

import java.util.List;

import com.finnova.finnova_backend.entity.Transaction;

public interface TransactionService {

    Transaction saveTransaction(Transaction transaction);

    Transaction getTransactionById(Long id);

    List<Transaction> getAllTransactions();

    Transaction updateTransaction(Long id, Transaction transaction);

    void deleteTransaction(Long id);

    void deposit(Long accountId, Double amount);

    void withdraw(Long accountId, Double amount);

    void transfer(Long fromAccountId,
                  Long toAccountId,
                  Double amount);
}