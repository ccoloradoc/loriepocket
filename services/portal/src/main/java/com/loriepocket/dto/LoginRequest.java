package com.loriepocket.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public class LoginRequest {
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;

    public LoginRequest() {

    }

    @JsonCreator
    public LoginRequest(@JsonProperty("username") String username, @JsonProperty("password") String password,
                        @JsonProperty("firstname") String firstname, @JsonProperty("lastname") String lastname) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
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

}
