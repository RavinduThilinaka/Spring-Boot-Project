package com.food_site.Food.site.repository;


import com.food_site.Food.site.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers,Integer> {
    Optional<OurUsers> findByEmail(String email);
}
