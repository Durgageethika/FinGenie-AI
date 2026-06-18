package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.FraudAlert;
import com.finnova.finnova_backend.repository.FraudAlertRepository;
import com.finnova.finnova_backend.service.FraudAlertService;

@Service
public class FraudAlertServiceImpl implements FraudAlertService {

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    @Override
    public FraudAlert saveFraudAlert(FraudAlert fraudAlert) {
        return fraudAlertRepository.save(fraudAlert);
    }

    @Override
    public FraudAlert getFraudAlertById(Long id) {
        return fraudAlertRepository.findById(id).orElse(null);
    }

    @Override
    public List<FraudAlert> getAllFraudAlerts() {
        return fraudAlertRepository.findAll();
    }

    @Override
    public FraudAlert updateFraudAlert(Long id, FraudAlert fraudAlert) {
        FraudAlert existing = fraudAlertRepository.findById(id).orElse(null);

        if (existing != null) {
            return fraudAlertRepository.save(fraudAlert);
        }

        return null;
    }

    @Override
    public void deleteFraudAlert(Long id) {
        fraudAlertRepository.deleteById(id);
    }
}