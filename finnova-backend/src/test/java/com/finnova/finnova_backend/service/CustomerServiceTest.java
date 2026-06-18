package com.finnova.finnova_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.finnova.finnova_backend.entity.Customer;
import com.finnova.finnova_backend.entity.Role;
import com.finnova.finnova_backend.repository.CustomerRepository;
import com.finnova.finnova_backend.service.impl.CustomerServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;

    @BeforeEach
    void setup() {

        customer = new Customer();

        customer.setId(1L);
        customer.setUsername("koushik");
        customer.setEmail("koushik@gmail.com");
        customer.setPassword("123456");
        customer.setRole(Role.CUSTOMER);
    }

    @Test
    void testSaveCustomer() {

        when(customerRepository.save(customer))
                .thenReturn(customer);

        Customer savedCustomer =
                customerService.saveCustomer(customer);

        assertNotNull(savedCustomer);

        assertEquals(
                "koushik",
                savedCustomer.getUsername());
    }

    @Test
    void testGetCustomerById() {

        when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));

        Customer foundCustomer =
                customerService.getCustomerById(1L);

        assertEquals(
                1L,
                foundCustomer.getId());
    }

    @Test
    void testGetAllCustomers() {

        when(customerRepository.findAll())
                .thenReturn(Arrays.asList(customer));

        List<Customer> customers =
                customerService.getAllCustomers();

        assertEquals(1, customers.size());
    }

    @Test
    void testDeleteCustomer() {

        when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));

        customerService.deleteCustomer(1L);

        verify(customerRepository, times(1))
                .delete(customer);
    }
}