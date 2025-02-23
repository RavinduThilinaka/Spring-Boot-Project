package com.food_site.Food.site.repository;

import com.food_site.Food.site.entity.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<Contact,Long> {
}
