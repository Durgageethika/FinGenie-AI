package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.Investment;
import com.finnova.finnova_backend.repository.InvestmentRepository;
import com.finnova.finnova_backend.service.InvestmentService;

@Service
public class InvestmentServiceImpl implements InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Override
    public Investment saveInvestment(Investment investment) {
        return investmentRepository.save(investment);
    }

    @Override
    public Investment getInvestmentById(Long id) {
        return investmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Investment> getAllInvestments() {
        return investmentRepository.findAll();
    }

    @Override
    public Investment updateInvestment(Long id, Investment investment) {
        Investment existing = investmentRepository.findById(id).orElse(null);

        if (existing != null) {
            return investmentRepository.save(investment);
        }

        return null;
    }

    @Override
    public void deleteInvestment(Long id) {
        investmentRepository.deleteById(id);
    }
}