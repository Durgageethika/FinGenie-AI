package com.finnova.finnova_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.finnova.finnova_backend.entity.Loan;
import com.finnova.finnova_backend.service.LoanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping
    public Loan saveLoan(@Valid @RequestBody Loan loan) {
        return loanService.saveLoan(loan);
    }

    @GetMapping("/{id}")
    public Loan getLoanById(@PathVariable Long id) {
        return loanService.getLoanById(id);
    }

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @PutMapping("/{id}")
    public Loan updateLoan(@PathVariable Long id,
                           @RequestBody Loan loan) {
        return loanService.updateLoan(id, loan);
    }

    @DeleteMapping("/{id}")
    public String deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return "Loan Deleted Successfully";
    }
}