package com.loriepocket.rest;

import com.loriepocket.converter.UserRequestToUserConverter;
import com.loriepocket.dto.UserRequest;
import com.loriepocket.model.Authority;
import com.loriepocket.model.User;
import com.loriepocket.rest.assembler.UserResource;
import com.loriepocket.rest.assembler.UserResourceAssembler;
import com.loriepocket.service.AuthorityService;
import com.loriepocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

import static org.springframework.hateoas.core.DummyInvocationUtils.methodOn;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by cristian.colorado
 */

@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private UserResourceAssembler userResourceAssembler;

    @Autowired
    private UserRequestToUserConverter userRequestToUserConverter;

    @RequestMapping( method = GET, value= "/user")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    HttpEntity<PagedResources<User>> loadAllPageable(Pageable pageable, PagedResourcesAssembler assembler) throws Exception{
        Page<User> users  = this.userService.findAll(pageable);
        Link link = linkTo(methodOn(UserController.class).loadAllPageable(pageable, assembler)).withRel("user");
        return new ResponseEntity<>(assembler.toResource(users, new UserResourceAssembler(), link), HttpStatus.OK);
    }


    @RequestMapping( method = GET, value = "/user/{userId}" )
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public UserResource loadById(@PathVariable Long userId ) {
        User user = findAndValidateUser(userId);
        return userResourceAssembler.toResource(user);
    }

    @RequestMapping(method = PUT, value = "/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(@PathVariable Long userId, @Valid @RequestBody UserRequest payload) {
        // Route ID and Payload ID does not match
        if(payload.getId() != userId)
            throw new IllegalArgumentException("Payload ID does not match Route ID");
        // Validate user existence
        User existentUser = findAndValidateUser(userId);
        // Parse payload
        User user = userRequestToUserConverter.convert(payload);
        // Keep current password
        user.setPassword(existentUser.getPassword());
        // Update user
        return this.userService.saveOrUpdate(user);
    }

    @RequestMapping(method = DELETE, value = "/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long userId) {
        User user = findAndValidateUser(userId);
        this.userService.delete(user);
    }

    @RequestMapping("/role")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Authority> getAuthorities() {
        return authorityService.findAll();
    }

    /**
     * Helper method in order to find out if user exist otherwise it throws IllegalArgumentException
     * @param id
     * @return User the user requested
     * @throws IllegalArgumentException
     */
    private User findAndValidateUser(Long id) throws  IllegalArgumentException {
        User user = this.userService.findById(id);
        if(user == null)
            throw new IllegalArgumentException("Could not find a user with ID :" + id);
        return user;
    }
}
