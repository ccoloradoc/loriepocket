package com.loriepocket.rest;

import com.loriepocket.model.Authority;
import com.loriepocket.model.User;
import com.loriepocket.service.AuthorityService;
import com.loriepocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

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

    @RequestMapping( method = GET, value = "/user/{userId}" )
    @PreAuthorize("hasRole('ADMIN')")
    public User loadById( @PathVariable Long userId ) {
        return this.userService.findById( userId );
    }

    @RequestMapping(method = PUT, value = "/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(@PathVariable Long userId, @RequestBody User payload) {
        // Find user
        User user = this.userService.findById(userId);
        // Copy over the values to be updated
        user.setUsername(payload.getUsername());
        user.setFirstname(payload.getFirstname());
        user.setLastname(payload.getLastname());
        user.setAuthorities((List<Authority>) payload.getAuthorities());
        // Update user
        return this.userService.saveOrUpdate(user);
    }

    @RequestMapping(method = DELETE, value = "/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long userId) {
        User user = this.userService.findById(userId);
        if(user != null)
            this.userService.delete(user);
    }

    @RequestMapping( method = GET, value= "/user/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> loadAll() {
        return this.userService.findAll();
    }


    /*
     *  We are not using userService.findByUsername here(we could),
     *  so it is good that we are making sure that the user has role "ROLE_USER"
     *  to access this endpoint.
     */
    @RequestMapping("/whoami")
    @PreAuthorize("hasRole('USER')")
    public User user(Principal user) {
        return this.userService.findByUsername(user.getName());
    }

    @RequestMapping("/role")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Authority> getAutorities() {
        return authorityService.findAll();
    }
}
