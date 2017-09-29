package com.loriepocket.converter;

import com.loriepocket.dto.AuthorityRequest;
import com.loriepocket.model.Authority;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
@Component
public class AuthorityRequestToAuthority implements Converter<AuthorityRequest, Authority> {
    @Override
    public Authority convert(AuthorityRequest authorityRequest) {
        Authority authority = new Authority();
        authority.setId(authorityRequest.getId());
        authority.setName(authorityRequest.getName());
        return authority;
    }
}
