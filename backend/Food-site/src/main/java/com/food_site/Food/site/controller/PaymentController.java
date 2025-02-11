package com.food_site.Food.site.controller;

import com.food_site.Food.site.entity.payment.Payment;
import com.food_site.Food.site.exception.PaymentNotFoundException;
import com.food_site.Food.site.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepo paymentRepo;

    @PostMapping("/addPayment")
    Payment addPayment(@RequestBody Payment addPayment){
        return paymentRepo.save(addPayment);
    }

    @GetMapping("/allPayment")
    List<Payment>getAllPayment(){
        return paymentRepo.findAll();
    }

    @GetMapping("/payment/{id}")
    Payment getPaymentById(@PathVariable Long id){
        return  paymentRepo.findById(id)
                .orElseThrow(()->new PaymentNotFoundException(id));
    }

    @PutMapping("/updatePayment/{id}")
    Payment updatePayment(@RequestBody Payment updatePayment,@PathVariable Long id){
        return paymentRepo.findById(id)
                .map(payment -> {
                    payment.setMethod(updatePayment.getMethod());
                    payment.setCvv(updatePayment.getCvv());
                    payment.setEmail(updatePayment.getEmail());
                    payment.setCardNumber(updatePayment.getCardNumber());
                    payment.setExpDate(updatePayment.getExpDate());
                    return paymentRepo.save(payment);
                }).orElseThrow(()->new PaymentNotFoundException(id));
    }

    @DeleteMapping("/deletePayment/{id}")
    String deletePayment(@PathVariable Long id){
        if (!paymentRepo.existsById(id)){
            throw new PaymentNotFoundException(id);
        }

        paymentRepo.deleteById(id);
        return "Payment id:"+id+"has been deleted succes";
    }
}
