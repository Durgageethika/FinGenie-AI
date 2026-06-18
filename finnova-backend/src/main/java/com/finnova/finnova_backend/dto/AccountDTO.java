package com.finnova.finnova_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AccountDTO {

    private Long id;

    @NotBlank(message = "Account Number is required")
    private String accountNumber;

    @NotBlank(message = "Account Type is required")
    private String accountType;

    @NotNull(message = "Balance is required")
    private Double balance;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}