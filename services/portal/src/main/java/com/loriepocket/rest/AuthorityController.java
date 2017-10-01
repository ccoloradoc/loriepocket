package com.loriepocket.rest;

import com.loriepocket.model.Authority;
import com.loriepocket.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by cristian.colorado on 10/1/2017.
 */
@RestController
@RequestMapping( value = "/api/role", produces = MediaType.APPLICATION_JSON_VALUE )
public class AuthorityController {
    @Autowired
    private AuthorityService authorityService;

    @RequestMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Authority> getAuthorities() {
        return authorityService.findAll();
    }

}
