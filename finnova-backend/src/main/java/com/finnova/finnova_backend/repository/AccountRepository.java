package com.finnova.finnova_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finnova.finnova_backend.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByCustomerId(Long customerId);

}