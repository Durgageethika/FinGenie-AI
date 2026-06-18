package com.finnova.finnova_backend.dto;

public class CreditScoreResponse {

    private Integer creditScore;

    public CreditScoreResponse(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }
}