package com.loriepocket.rest.assembler;

import com.loriepocket.model.Meal;
import com.loriepocket.rest.MealController;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by cristian.colorado on 9/26/2017.
 */
public class MealResourceAssembler  extends ResourceAssemblerSupport<Meal, MealResource> {
    private Long userId;

    public MealResourceAssembler(Long userId) {
        super(MealController.class, MealResource.class);
        this.userId = userId;
    }

    @Override
    public MealResource toResource(Meal meal) {
        Link link = linkTo(methodOn(MealController.class).getMeal(userId, meal.getId())).withSelfRel();
        return new MealResource(meal, link);
    }
}

class MealResource extends Resource<Meal> {
    public MealResource(Meal content, Link... links) {
        super(content, links);
    }
}