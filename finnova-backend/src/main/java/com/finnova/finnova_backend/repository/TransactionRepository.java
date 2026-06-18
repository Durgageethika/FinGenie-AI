package com.finnova.finnova_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finnova.finnova_backend.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}