package com.loriepocket.rest;

import com.loriepocket.model.Meal;
import com.loriepocket.rest.assembler.MealResourceAssembler;
import com.loriepocket.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@RestController
@RequestMapping( value = "/api/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE )
public class MealController {
    @Autowired
    public MealService mealService;

    @RequestMapping( method = RequestMethod.GET, value= "/meal")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    HttpEntity<PagedResources<Meal>> loadAll(@PathVariable Long userId, Pageable pageable, PagedResourcesAssembler assembler) throws Exception {
        Page<Meal> meals = this.mealService.findAllByUserId(userId, pageable);
        Link link = linkTo(methodOn(MealController.class).loadAll(userId, pageable, assembler)).withRel("meals");
        return new ResponseEntity<>(assembler.toResource(meals, new MealResourceAssembler(userId), link), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/meal")
    @PreAuthorize("hasRole('ADMIN')")
    public Meal saveUser(@PathVariable Long userId, @RequestBody Meal payload) {
        return this.mealService.saveOrUpdate(payload);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/meal/{mealId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Meal getMeal(@PathVariable Long userId, @PathVariable Long mealId) {
        // Find user
        return this.mealService.findById(userId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/meal/{mealId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Meal updateUser(@PathVariable Long userId, @PathVariable Long mealId, @RequestBody Meal payload) {
        // Find user
        Meal meal = this.mealService.findById(userId);
        // Copy over the values to be updated
        meal.setName(payload.getName());
        meal.setCalories(payload.getCalories());
        meal.setConsumedDate(payload.getConsumedDate());
        // Update user
        return this.mealService.saveOrUpdate(meal);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/meal/{mealId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long userId, @PathVariable Long mealId) {
        this.mealService.delete(mealId);
    }

}
