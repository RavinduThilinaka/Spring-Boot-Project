package com.food_site.Food.site.controller;

import com.food_site.Food.site.entity.supplier.FoodSupplier;
import com.food_site.Food.site.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class SupplierController {

    @Autowired
    private SupplierRepo supplierRepo;

    @PostMapping("/supplier/addsupplier")
    public FoodSupplier addFoodSupplier(
            @RequestParam("foodName") String foodName,
            @RequestParam("foodPrice") String foodPrice,
            @RequestParam("availabilityStatus") String availabilityStatus,
            @RequestParam("foodQuantity") Integer foodQuantity,
            @RequestParam("foodImage") MultipartFile file ){

        try{
            byte[] imageBytes = file.getBytes();
            FoodSupplier foodSupplier = new FoodSupplier();
            foodSupplier.setFoodName(foodName);
            foodSupplier.setFoodPrice(foodPrice);
            foodSupplier.setAvailabilityStatus(availabilityStatus);
            foodSupplier.setFoodQuantity(foodQuantity);
            foodSupplier.setFoodImage(imageBytes);

            return  supplierRepo.save(foodSupplier);
        }catch (IOException e){
            throw new RuntimeException("Failed upload images"+e.getMessage());
        }
    }

}
