package com.loriepocket.rest;

import com.loriepocket.model.Meal;
import com.loriepocket.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class MealController {
    @Autowired
    public MealService mealService;

    @RequestMapping( method = RequestMethod.GET, value= "/meal")
    @PreAuthorize("hasRole('USER')")
    public List<Meal> loadAll() {
        return this.mealService.findAll();
    }


    @RequestMapping(method = RequestMethod.POST, value = "/meal")
    @PreAuthorize("hasRole('ADMIN')")
    public Meal saveUser(@RequestBody Meal payload) {
        return this.mealService.saveOrUpdate(payload);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/meal/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Meal updateUser(@PathVariable Long userId, @RequestBody Meal payload) {
        // Find user
        Meal meal = this.mealService.findById(userId);
        // Copy over the values to be updated
        meal.setName(payload.getName());
        meal.setCalories(payload.getCalories());
        meal.setConsumedDate(payload.getConsumedDate());
        // Update user
        return this.mealService.saveOrUpdate(meal);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/meal/{inviteId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long inviteId) {
        this.mealService.delete(inviteId);
    }

}
