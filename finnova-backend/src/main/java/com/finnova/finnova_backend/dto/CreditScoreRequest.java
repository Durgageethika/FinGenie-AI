package com.finnova.finnova_backend.dto;

public class CreditScoreRequest {

    private Double salary;

    private Integer existingLoans;

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Integer getExistingLoans() {
        return existingLoans;
    }

    public void setExistingLoans(Integer existingLoans) {
        this.existingLoans = existingLoans;
    }
}