package com.food_site.Food.site.exception;

public class SupplierNotFoundException extends RuntimeException{
    public SupplierNotFoundException(Long id){
        super("Could not found the supplier id: "+id);
    }
}
