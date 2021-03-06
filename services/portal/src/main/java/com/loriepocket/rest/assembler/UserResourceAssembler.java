package com.loriepocket.rest.assembler;

import com.loriepocket.model.User;
import com.loriepocket.rest.UserController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by cristian.colorado on 9/26/2017.
 */
@Component
public class UserResourceAssembler   extends ResourceAssemblerSupport<User, UserResource> {

    public UserResourceAssembler() {
        super(UserController.class, UserResource.class);
    }

    @Override
    public UserResource toResource(User User) {
        Link linkMeal = linkTo(methodOn(UserController.class).loadById(User.getId())).slash("meal").withRel("meal");
        Link link = linkTo(methodOn(UserController.class).loadById(User.getId())).withSelfRel();
        return new UserResource(User, link, linkMeal);
    }
}