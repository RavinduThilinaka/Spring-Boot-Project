package com.food_site.Food.site.exception;

public class ContactNotFoundException extends RuntimeException{
    public ContactNotFoundException(Long id){
        super("Not found exception id:" + id);
    }
}
