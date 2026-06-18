package com.finnova.finnova_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.finnova.finnova_backend.entity.Transaction;
import com.finnova.finnova_backend.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction saveTransaction(@Valid @RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id,
                                         @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return "Transaction Deleted Successfully";
    }

    @PostMapping("/deposit/{accountId}")
    public String deposit(@PathVariable Long accountId,
                          @RequestParam Double amount) {

        transactionService.deposit(accountId, amount);
        return "Amount Deposited Successfully";
    }

    @PostMapping("/withdraw/{accountId}")
    public String withdraw(@PathVariable Long accountId,
                           @RequestParam Double amount) {

        transactionService.withdraw(accountId, amount);
        return "Amount Withdrawn Successfully";
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam Long fromAccountId,
                           @RequestParam Long toAccountId,
                           @RequestParam Double amount) {

        transactionService.transfer(
                fromAccountId,
                toAccountId,
                amount);

        return "Transfer Successful";
    }
}