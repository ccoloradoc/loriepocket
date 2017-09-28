package com.loriepocket.rest;

import com.loriepocket.model.Meal;
import com.loriepocket.model.User;
import com.loriepocket.rest.assembler.MealResourceAssembler;
import com.loriepocket.service.MealService;
import com.loriepocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@RestController
@RequestMapping( value = "/api/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE )
public class MealController {
    @Autowired
    private MealService mealService;

    @Autowired
    private UserService userService;

    private User findAndValidateUser(Long id) {
        User user = this.userService.findById(id);
        if(user == null)
            throw new IllegalArgumentException("Could not find a user with id :" + id);
        return user;
    }

    private Meal findAndValidateMeal(Long id) {
        Meal meal = this.mealService.findById(id);
        if(meal == null)
            throw new IllegalArgumentException("Could not find a meal with id :" + id);
        return meal;
    }

    @RequestMapping( method = RequestMethod.GET, value= "/meal")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    HttpEntity<PagedResources<Meal>> loadAll(@PathVariable( name = "userId" ) Long userId,
                                             @RequestParam( name = "startDate", required = false )@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
                                             @RequestParam( name = "endDate", required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate,
                                             Pageable pageable, PagedResourcesAssembler assembler) throws Exception {


        findAndValidateUser(userId);

        Page<Meal> meals;
        if(startDate != null && endDate != null) {
            meals = this.mealService.findByUserIdAndConsumedDateBetween(userId, startDate, endDate, pageable);
        } else {
            meals = this.mealService.findAllByUserId(userId, pageable);
        }
        Link link = linkTo(methodOn(MealController.class)
                .loadAll(userId, startDate, endDate, pageable, assembler)).withRel("meals");
        return new ResponseEntity<>(assembler.toResource(meals, new MealResourceAssembler(userId), link), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal getMeal(@PathVariable Long userId, @PathVariable Long mealId) {
        findAndValidateUser(userId);
        findAndValidateMeal(mealId);
        return this.mealService.findById(mealId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/meal")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal saveUser(@PathVariable Long userId, @Valid @RequestBody Meal payload) {
        User user = findAndValidateUser(userId);
        payload.setUser(user);
        return this.mealService.saveOrUpdate(payload);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal updateUser(@PathVariable Long userId, @PathVariable Long mealId, @Valid @RequestBody Meal payload) {
        // Find user
        User user = findAndValidateUser(userId);
        // Find meal
        Meal meal = findAndValidateMeal(mealId);

        // Copy over the values to be updated
        meal.setId(mealId);
        meal.setName(payload.getName());
        meal.setCalories(payload.getCalories());
        meal.setConsumedDate(payload.getConsumedDate());
        meal.setUser(user);
        // Update user
        return this.mealService.saveOrUpdate(meal);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public void deleteUser(@PathVariable Long userId, @PathVariable Long mealId) {
        User user = findAndValidateUser(userId);
        Meal meal = mealService.findByIdAndFetchUser(mealId);
        // Meal exist and belongs to the user stated in path
        if(meal != null && meal.getUser().getId() == userId)
            this.mealService.delete(mealId);
    }
}
