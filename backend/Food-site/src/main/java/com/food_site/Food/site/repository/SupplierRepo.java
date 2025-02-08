package com.food_site.Food.site.repository;

import com.food_site.Food.site.entity.supplier.FoodSupplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepo extends JpaRepository<FoodSupplier,Long> {
}
