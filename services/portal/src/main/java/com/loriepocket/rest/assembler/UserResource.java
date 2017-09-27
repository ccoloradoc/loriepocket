package com.loriepocket.rest.assembler;

import com.loriepocket.model.User;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * Created by cristian.colorado on 9/26/2017.
 */
public class UserResource extends Resource<User> {
    public UserResource(User content, Link... links) {
        super(content, links);
    }
}
