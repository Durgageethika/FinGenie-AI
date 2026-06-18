package com.finnova.finnova_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.finnova.finnova_backend.entity.Investment;
import com.finnova.finnova_backend.service.InvestmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @PostMapping
    public Investment saveInvestment(@Valid @RequestBody Investment investment) {
        return investmentService.saveInvestment(investment);
    }

    @GetMapping("/{id}")
    public Investment getInvestmentById(@PathVariable Long id) {
        return investmentService.getInvestmentById(id);
    }

    @GetMapping
    public List<Investment> getAllInvestments() {
        return investmentService.getAllInvestments();
    }

    @PutMapping("/{id}")
    public Investment updateInvestment(@PathVariable Long id,
                                       @RequestBody Investment investment) {
        return investmentService.updateInvestment(id, investment);
    }

    @DeleteMapping("/{id}")
    public String deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
        return "Investment Deleted Successfully";
    }
}