package com.finnova.finnova_backend.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finnova.finnova_backend.entity.Customer;
import com.finnova.finnova_backend.exception.ResourceNotFoundException;
import com.finnova.finnova_backend.repository.CustomerRepository;
import com.finnova.finnova_backend.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    private static final Logger logger =
            LoggerFactory.getLogger(CustomerServiceImpl.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer saveCustomer(Customer customer) {

        logger.info("Saving Customer: {}",
                customer.getUsername());

        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerById(Long id) {

        logger.info("Fetching Customer ID: {}", id);

        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID " + id));
    }

    @Override
    public List<Customer> getAllCustomers() {

        logger.info("Fetching All Customers");

        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {

        Customer existing =
                customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID " + id));

        existing.setUsername(customer.getUsername());
        existing.setEmail(customer.getEmail());
        existing.setPassword(customer.getPassword());
        existing.setRole(customer.getRole());

        logger.info("Updating Customer ID: {}", id);

        return customerRepository.save(existing);
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer existing =
                customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID " + id));

        logger.info("Deleting Customer ID: {}", id);

        customerRepository.delete(existing);
    }
}