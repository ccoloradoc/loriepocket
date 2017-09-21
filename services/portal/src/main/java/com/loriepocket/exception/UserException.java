package com.loriepocket.exception;

import org.springframework.validation.FieldError;

import java.util.Collection;
import java.util.LinkedHashSet;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public class UserException extends RuntimeException {

    private Collection<FieldError> errors = new LinkedHashSet<>();

    public UserException(String message) {
        super(message);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserException(Throwable cause) {
        super(cause);
    }

    public UserException withFieldError(FieldError fieldError) {
        this.errors.add(fieldError);
        return this;
    }

    public Collection<FieldError> getErrors() {
        return this.errors;
    }
}