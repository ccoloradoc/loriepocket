package com.loriepocket.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
public class UserRequest {
    @NotNull
    private Long id;
    @NotNull
    private String username;

    private String password;
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @NotNull
    private int calories;
    @NotNull
    private List<AuthorityRequest> authorities = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public List<AuthorityRequest> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<AuthorityRequest> authorities) {
        this.authorities = authorities;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }
}
