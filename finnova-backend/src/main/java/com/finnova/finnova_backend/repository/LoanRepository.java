package com.finnova.finnova_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finnova.finnova_backend.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByCustomerId(Long customerId);

}