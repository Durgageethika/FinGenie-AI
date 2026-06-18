package com.finnova.finnova_backend.dto;

public class EmiResponse {

    private Double emi;

    public EmiResponse(Double emi) {
        this.emi = emi;
    }

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }
}