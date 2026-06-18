package com.finnova.finnova_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finnova.finnova_backend.entity.Investment;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    List<Investment> findByCustomerId(Long customerId);

}