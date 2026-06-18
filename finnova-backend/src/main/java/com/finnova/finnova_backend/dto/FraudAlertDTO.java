package com.finnova.finnova_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FraudAlertDTO {

    private Long id;

    @NotBlank(message = "Alert Message is required")
    private String alertMessage;

    @NotBlank(message = "Risk Level is required")
    private String riskLevel;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}