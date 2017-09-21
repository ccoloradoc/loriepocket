package com.loriepocket.rest;

import com.loriepocket.exception.UserAlreadyExistsException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
@ControllerAdvice
public class ServiceExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<Object> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        Map<String, Object> model = this.getDefaultErrorAttributes(ex, HttpStatus.CONFLICT);
        return new ResponseEntity<Object>(model, HttpStatus.CONFLICT);
    }

    private Map<String, Object> getDefaultErrorAttributes(Exception ex, HttpStatus status) {
        Map<String, Object> errorAttributes = new LinkedHashMap<>();

        String path = this.getPathFromRequest();

        errorAttributes.put("timestamp", Calendar.getInstance().getTimeInMillis());
        errorAttributes.put("status", status.value());
        errorAttributes.put("error", status.getReasonPhrase());
        errorAttributes.put("message", ex.getMessage());
        errorAttributes.put("path", path);
        return errorAttributes;
    }

    private String getPathFromRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest httpServletRequest = (HttpServletRequest) requestAttributes
                    .resolveReference(RequestAttributes.REFERENCE_REQUEST);
            if (httpServletRequest != null) {
                String path = httpServletRequest.getRequestURI();
                return StringUtils.substringAfter(path, httpServletRequest.getContextPath());
            }
        }
        return StringUtils.EMPTY;
    }
}
