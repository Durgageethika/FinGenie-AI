package com.finnova.finnova_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.finnova.finnova_backend.entity.FraudAlert;
import com.finnova.finnova_backend.service.FraudAlertService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fraudalerts")
public class FraudAlertController {

    @Autowired
    private FraudAlertService fraudAlertService;

    @PostMapping
    public FraudAlert saveFraudAlert(@Valid @RequestBody FraudAlert fraudAlert) {
        return fraudAlertService.saveFraudAlert(fraudAlert);
    }

    @GetMapping("/{id}")
    public FraudAlert getFraudAlertById(@PathVariable Long id) {
        return fraudAlertService.getFraudAlertById(id);
    }

    @GetMapping
    public List<FraudAlert> getAllFraudAlerts() {
        return fraudAlertService.getAllFraudAlerts();
    }

    @PutMapping("/{id}")
    public FraudAlert updateFraudAlert(@PathVariable Long id,
                                       @RequestBody FraudAlert fraudAlert) {
        return fraudAlertService.updateFraudAlert(id, fraudAlert);
    }

    @DeleteMapping("/{id}")
    public String deleteFraudAlert(@PathVariable Long id) {
        fraudAlertService.deleteFraudAlert(id);
        return "Fraud Alert Deleted Successfully";
    }
}