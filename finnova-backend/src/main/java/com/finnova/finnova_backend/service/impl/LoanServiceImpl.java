package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.Loan;
import com.finnova.finnova_backend.repository.LoanRepository;
import com.finnova.finnova_backend.service.LoanService;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Override
    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    @Override
    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElse(null);
    }

    @Override
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @Override
    public Loan updateLoan(Long id, Loan loan) {
        Loan existing = loanRepository.findById(id).orElse(null);

        if (existing != null) {
            return loanRepository.save(loan);
        }

        return null;
    }

    @Override
    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
}