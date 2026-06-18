package com.finnova.finnova_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.finnova.finnova_backend.dto.LoginRequest;
import com.finnova.finnova_backend.dto.LoginResponse;
import com.finnova.finnova_backend.entity.Customer;
import com.finnova.finnova_backend.repository.CustomerRepository;
import com.finnova.finnova_backend.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Customer customer = customerRepository.findByUsername(request.getUsername());

        if (customer == null) {
            throw new RuntimeException("User does not exist");
        }

        if (!customer.getPassword().trim().equals(request.getPassword().trim())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(customer.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(token);

        return response;
    }
}