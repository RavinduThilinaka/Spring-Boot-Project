package com.food_site.Food.site.exception;

public class PaymentNotFoundException extends RuntimeException{
    public PaymentNotFoundException(Long id){
        super("Not found payment id:"+id);
    }
}
