package com.food_site.Food.site.controller;

import com.food_site.Food.site.entity.supplier.FoodSupplier;
import com.food_site.Food.site.exception.SupplierNotFoundException;
import com.food_site.Food.site.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    /////////////////////////////////////////////

    @GetMapping("/supplier/getSupply")
    List<FoodSupplier> getAllFoodSupplier(){
        return supplierRepo.findAll();
    }

    /////////////////////////////////////////////////////
    @GetMapping("/supplier/getSupplyById/{id}")
    FoodSupplier getFoodById(@PathVariable Long id){
        return supplierRepo.findById(id)
                .orElseThrow(()->new SupplierNotFoundException(id));
    }

    ///////////////////////////////////////////////////////

    @PutMapping("/supplier/updateSupply/{id}")
    public FoodSupplier updateSupply(
            @PathVariable long id,
            @RequestParam("foodName") String foodName,
            @RequestParam("foodPrice") String foodPrice,
            @RequestParam("availabilityStatus") String availabilityStatus,
            @RequestParam("foodQuantity") Integer foodQuantity,
            @RequestParam(value = "image", required = false) MultipartFile file){

        try {
            return supplierRepo.findById(id).map(existingSupplier -> {
                existingSupplier.setFoodName(foodName);
                existingSupplier.setFoodPrice(foodPrice);
                existingSupplier.setAvailabilityStatus(availabilityStatus);
                existingSupplier.setFoodQuantity(foodQuantity);

                if (file != null && !file.isEmpty()) {
                    try {
                        existingSupplier.setFoodImage(file.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to upload image", e);
                    }
                }

                return supplierRepo.save(existingSupplier);
            }).orElseThrow(() -> new SupplierNotFoundException(id));
        } catch (Exception e) {
            throw new RuntimeException("Error while updating the supplier", e);
        }
    }


    //////////////////////////////////////////////////////////////

    @DeleteMapping("/supplier/deleteSupply/{id}")
    String deleteSupply(@PathVariable Long id){
        if (!supplierRepo.existsById(id)){
            throw new SupplierNotFoundException(id);
        }

        supplierRepo.deleteById(id);
        return "Supply with id "+id + "has been deleted";
    }

}

