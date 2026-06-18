package com.finnova.finnova_backend.service;

import java.util.List;
import com.finnova.finnova_backend.entity.Investment;

public interface InvestmentService {

    Investment saveInvestment(Investment investment);

    Investment getInvestmentById(Long id);

    List<Investment> getAllInvestments();

    Investment updateInvestment(Long id, Investment investment);

    void deleteInvestment(Long id);
}