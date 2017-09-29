package com.loriepocket.dto;

import javax.validation.constraints.NotNull;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
public class AuthorityRequest {
    @NotNull
    Long id;
    @NotNull
    String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
