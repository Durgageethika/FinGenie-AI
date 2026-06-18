package com.finnova.finnova_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class LoanDTO {

    private Long id;

    @NotNull(message = "Loan amount is required")
    @Positive(message = "Amount must be greater than 0")
    private Double amount;

    @NotNull(message = "Tenure is required")
    @Positive(message = "Tenure must be greater than 0")
    private Integer tenure;

    @NotBlank(message = "Status is required")
    private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}