package com.food_site.Food.site.controller;

import com.food_site.Food.site.entity.contact.Contact;
import com.food_site.Food.site.exception.ContactNotFoundException;
import com.food_site.Food.site.repository.ContactRepo;
import com.food_site.Food.site.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactRepo contactRepo;

    @PostMapping("/addContact")
    Contact addContact(@RequestBody Contact addContact){
        return contactRepo.save(addContact);
    }

    @GetMapping("/allContact")
    List<Contact>getAllContact(){
        return contactRepo.findAll();
    }

    @GetMapping("/contact/{id}")
    Contact getContactById(@PathVariable Long id){
        return contactRepo.findById(id)
                .orElseThrow(()->new ContactNotFoundException(id));
    }

    @PutMapping("/updateContact/{id}")
    Contact updateContact(@RequestBody Contact updateContact,@PathVariable Long id){
        return contactRepo.findById(id)
                .map(contact -> {
                    contact.setName(updateContact.getName());
                    contact.setEmail(updateContact.getEmail());
                    contact.setMessage(updateContact.getMessage());
                    return contactRepo.save(contact);
                }).orElseThrow(()->new ContactNotFoundException(id));
    }

    @DeleteMapping("/deleteContact/{id}")
    String deleteContact(@PathVariable Long id){
        if (!contactRepo.existsById(id)){
            throw new ContactNotFoundException(id);
        }

        contactRepo.deleteById(id);
        return "Contact id:" + id + "has been deleted success";
    }
}
