package com.finnova.finnova_backend.service;

import java.util.List;
import com.finnova.finnova_backend.entity.Customer;

public interface CustomerService {

    Customer saveCustomer(Customer customer);

    Customer getCustomerById(Long id);

    List<Customer> getAllCustomers();

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}