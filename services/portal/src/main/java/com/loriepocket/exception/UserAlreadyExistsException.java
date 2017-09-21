package com.loriepocket.exception;

import java.text.MessageFormat;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public class UserAlreadyExistsException extends UserException {
    private String username;

    public UserAlreadyExistsException(String username, String message) {
        super(message);
        this.username = username;
    }

    @Override
    public String getMessage() {
        return MessageFormat.format("Username {0} already exists.", username);
    }

    public String getUsername() { return this.username; }
}
