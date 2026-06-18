package com.finnova.finnova_backend.service;

import java.util.List;
import com.finnova.finnova_backend.entity.FraudAlert;

public interface FraudAlertService {

    FraudAlert saveFraudAlert(FraudAlert fraudAlert);

    FraudAlert getFraudAlertById(Long id);

    List<FraudAlert> getAllFraudAlerts();

    FraudAlert updateFraudAlert(Long id, FraudAlert fraudAlert);

    void deleteFraudAlert(Long id);
}