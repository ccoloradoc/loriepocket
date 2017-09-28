package com.loriepocket.converter;

import com.loriepocket.dto.LoginRequest;
import com.loriepocket.model.User;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
@Component
public class LoginRequestToUserConverter implements Converter<LoginRequest, User> {
    @Override
    public User convert(LoginRequest loginRequest) {
        User user = new User();
        user.setUsername(loginRequest.getUsername());
        user.setPassword(loginRequest.getPassword());
        user.setFirstname(loginRequest.getFirstname());
        user.setLastname(loginRequest.getLastname());
        return user;
    }
}
