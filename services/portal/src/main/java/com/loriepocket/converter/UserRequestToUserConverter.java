package com.loriepocket.converter;

import com.loriepocket.dto.AuthorityRequest;
import com.loriepocket.dto.UserRequest;
import com.loriepocket.model.Authority;
import com.loriepocket.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
@Component
public class UserRequestToUserConverter implements Converter<UserRequest, User> {
    @Autowired
    AuthorityRequestToAuthority authorityRequestToAuthority;

    @Override
    public User convert(UserRequest userRequest) {
        User user = new User();
        user.setId(userRequest.getId());
        user.setUsername(userRequest.getUsername());
        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        user.setPassword(userRequest.getPassword());
        List<AuthorityRequest> authorityRequestList = userRequest.getAuthorities();
        for(AuthorityRequest authorityRequest : authorityRequestList) {
            Authority authority = authorityRequestToAuthority.convert(authorityRequest);
            user.addAuthority(authority);
        }
        return user;
    }
}
