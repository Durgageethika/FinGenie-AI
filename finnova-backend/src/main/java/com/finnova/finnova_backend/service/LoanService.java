package com.finnova.finnova_backend.service;

import java.util.List;
import com.finnova.finnova_backend.entity.Loan;

public interface LoanService {

    Loan saveLoan(Loan loan);

    Loan getLoanById(Long id);

    List<Loan> getAllLoans();

    Loan updateLoan(Long id, Loan loan);

    void deleteLoan(Long id);
}