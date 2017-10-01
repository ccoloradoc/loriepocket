package com.loriepocket.rest;

import com.loriepocket.converter.MealRequestToMealConverter;
import com.loriepocket.dto.MealRequest;
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
import java.util.Optional;

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

    @Autowired
    private MealRequestToMealConverter mealRequestToMealConverter;

    @RequestMapping( method = RequestMethod.GET, value= "/meal")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    HttpEntity<PagedResources<Meal>> loadAll(@PathVariable( name = "userId" ) Long userId,
                                             @RequestParam( name = "startDate", required = false )@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
                                             @RequestParam( name = "endDate", required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate,
                                             Pageable pageable, PagedResourcesAssembler assembler) throws Exception {

        Page<Meal> meals;
        if(startDate != null && endDate != null) {
            meals = this.mealService.findByUserIdAndConsumedDateBetween(userId, startDate, endDate, pageable);
        } else {
            meals = this.mealService.findAllByUserId(userId, pageable);
        }
        Link link = linkTo(methodOn(MealController.class)
                .loadAll(userId, startDate, endDate, pageable, assembler))
                .withRel("meals");
        return new ResponseEntity<>(assembler.toResource(meals, new MealResourceAssembler(userId), link), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal getMeal(@PathVariable Long userId, @PathVariable Long mealId) {
        Meal meal = this.findAndValidateMeal(mealId);
        // Meal does not belong to user
        if(meal.getUser().getId() != userId)
            throw new IllegalArgumentException("Wrong route composition");

        return meal;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/meal")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal saveUser(@PathVariable Long userId, @Valid @RequestBody MealRequest payload) {
        if(payload.getId() != null)
            throw new IllegalArgumentException("Meal ID is not needed to create a new entry");
        User user = this.findAndValidateUser(userId);
        Meal meal = mealRequestToMealConverter.convert(payload);
        meal.setUser(user);
        return this.mealService.saveOrUpdate(meal);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public Meal updateUser(@PathVariable Long userId, @PathVariable Long mealId, @Valid @RequestBody MealRequest payload) {
        if(payload.getId() != mealId)
            throw new IllegalArgumentException("Payload ID does not match Route ID");
        // Find meal
        Meal currentMeal = this.findAndValidateMeal(mealId);
        // Meal does not belong to user
        if(currentMeal.getUser().getId() != userId)
            throw new IllegalArgumentException("Payload ID does not match Route ID");

        Meal meal = mealRequestToMealConverter.convert(payload);
        meal.setUser(currentMeal.getUser());
        // Update user
        return this.mealService.saveOrUpdate(meal);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/meal/{mealId}")
    @PreAuthorize("#userId == principal.id or hasAnyRole('MANAGER','ADMIN')")
    public void deleteUser(@PathVariable Long userId, @PathVariable Long mealId) {
        Meal currentMeal = this.findAndValidateMeal(mealId);
        // Meal does not belong to user
        if(currentMeal.getUser().getId() != userId)
            throw new IllegalArgumentException("Wrong route composition");
        // Meal exist and belongs to the user stated in path
        this.mealService.delete(mealId);
    }

    private User findAndValidateUser(Long id) {
        Optional<User> user = this.userService.findById(id);
        if(user.isPresent())
            return user.get();
        throw new IllegalArgumentException("Could not find a user with id :" + id);
    }

    private Meal findAndValidateMeal(Long id) {
        Optional<Meal> meal = this.mealService.findByIdAndFetchUser(id);
        if(meal.isPresent())
            return meal.get();
        throw new IllegalArgumentException("Could not find a meal with id :" + id);
    }

}
