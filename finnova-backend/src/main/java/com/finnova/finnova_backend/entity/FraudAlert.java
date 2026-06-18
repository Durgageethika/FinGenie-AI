package com.finnova.finnova_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "fraud_alerts")
public class FraudAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Alert Message is required")
    private String alertMessage;

    @NotBlank(message = "Risk Level is required")
    private String riskLevel;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public FraudAlert() {
    }

    public FraudAlert(Long id,
                      String alertMessage,
                      String riskLevel,
                      Customer customer) {
        this.id = id;
        this.alertMessage = alertMessage;
        this.riskLevel = riskLevel;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(String alertMessage) {
        this.alertMessage = alertMessage;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}