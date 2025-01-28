package com.food_site.Food.site.repository;

import com.food_site.Food.site.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payment,Long> {
}
