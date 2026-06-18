package com.finnova.finnova_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finnova.finnova_backend.entity.FraudAlert;

public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {

    List<FraudAlert> findByRiskLevel(String riskLevel);

}