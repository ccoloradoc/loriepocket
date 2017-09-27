package com.loriepocket.rest;

import com.loriepocket.converter.LoginRequestToUserConverter;
import com.loriepocket.dto.LoginRequest;
import com.loriepocket.exception.UserAlreadyExistsException;
import com.loriepocket.model.Authority;
import com.loriepocket.model.User;
import com.loriepocket.dto.UserTokenState;
import com.loriepocket.rest.assembler.UserResource;
import com.loriepocket.rest.assembler.UserResourceAssembler;
import com.loriepocket.security.TokenHelper;
import com.loriepocket.service.AuthorityService;
import com.loriepocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

/**
 * Created by cristian.colorado
 */

@RestController
@RequestMapping( value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE )
public class AuthenticationController {

    @Autowired
    TokenHelper tokenHelper;

    @Autowired
    LoginRequestToUserConverter loginRequestToUserConverter;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserResourceAssembler userResourceAssembler;

    @Value("${jwt.expires_in}")
    private int EXPIRES_IN;

    @Value("${jwt.cookie}")
    private String TOKEN_COOKIE;

    @RequestMapping(value="/signup", method= RequestMethod.POST, consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces={ MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> signUp(LoginRequest loginRequest) {
        if(userService.findByUsername(loginRequest.getUsername()) == null) {
            // Convert POJO
            User user = loginRequestToUserConverter.convert(loginRequest);
            // Assign default role
            Authority authority = authorityService.findByName("ROLE_USER");
            user.addAuthority(authority);
            // Encrypt password
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            user = userService.saveOrUpdate(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            throw new UserAlreadyExistsException(loginRequest.getUsername(), "User already registered");
        }
    }

    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request, HttpServletResponse response) {

        String authToken = tokenHelper.getToken( request );
        if (authToken != null && tokenHelper.canTokenBeRefreshed(authToken)) {
            // TODO check user password last update
            String refreshedToken = tokenHelper.refreshToken(authToken);

            Cookie authCookie = new Cookie( TOKEN_COOKIE, ( refreshedToken ) );
            authCookie.setPath( "/" );
            authCookie.setHttpOnly( true );
            authCookie.setMaxAge( EXPIRES_IN );
            // Add cookie to response
            response.addCookie( authCookie );

            UserTokenState userTokenState = new UserTokenState(refreshedToken, EXPIRES_IN);
            return ResponseEntity.ok(userTokenState);
        } else {
            UserTokenState userTokenState = new UserTokenState();
            return ResponseEntity.accepted().body(userTokenState);
        }
    }

    @RequestMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public UserResource user(Principal user) {
        return userResourceAssembler.toResource(this.userService.findByUsername(user.getName()));
    }
}