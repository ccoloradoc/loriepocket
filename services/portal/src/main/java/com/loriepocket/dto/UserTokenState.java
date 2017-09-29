package com.loriepocket.dto;

import com.loriepocket.model.User;

/**
 * Created by cristian.colorado
 */
public class UserTokenState {
    private String accessToken;
    private Long expiresIn;
    private User authUser;

    public UserTokenState() {
        this.accessToken = null;
        this.expiresIn = null;
    }

    public UserTokenState(String accessToken, long expiresIn, User user) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.authUser = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public User getAuthUser() {
        return authUser;
    }

    public void setAuthUser(User authUser) {
        this.authUser = authUser;
    }
}