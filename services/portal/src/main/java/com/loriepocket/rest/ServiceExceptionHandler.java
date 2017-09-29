package com.loriepocket.rest;

import com.loriepocket.dto.validation.ValidationErrorDTO;
import com.loriepocket.exception.UserAlreadyExistsException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

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

    @ExceptionHandler(IllegalArgumentException.class)
    private ResponseEntity<Object> handleExpiredJwtException(IllegalArgumentException ex) {
        Map<String, Object> model = this.getDefaultErrorAttributes(ex, HttpStatus.CONFLICT);
        return new ResponseEntity<Object>(model, HttpStatus.CONFLICT);
    }

    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, Object> model = this.getDefaultErrorAttributes(ex, HttpStatus.BAD_REQUEST);
        handleBindingResults(model, ex.getBindingResult());
        return new ResponseEntity<Object>(model, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, Object> model = this.getDefaultErrorAttributes(ex, HttpStatus.BAD_REQUEST);
        handleBindingResults(model, ex.getBindingResult());
        return new ResponseEntity<Object>(model, HttpStatus.BAD_REQUEST);
    }

    private void handleBindingResults(Map<String, Object> model, BindingResult result) {
        List<FieldError> fieldErrors = result.getFieldErrors();
        ValidationErrorDTO valitationErrorDTO = processFieldErrors(fieldErrors);
        model.put("errors", valitationErrorDTO);
        model.put("message", "Validation Error");
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

    private ValidationErrorDTO processFieldErrors(List<FieldError> fieldErrors) {
        ValidationErrorDTO dto = new ValidationErrorDTO();

        for (FieldError fieldError: fieldErrors) {
            String localizedErrorMessage = resolveLocalizedErrorMessage(fieldError);
            dto.addFieldError(fieldError.getField(), localizedErrorMessage);
        }

        return dto;
    }

    private String resolveLocalizedErrorMessage(FieldError fieldError) {
        Locale currentLocale =  LocaleContextHolder.getLocale();
        String localizedErrorMessage = messageSource.getMessage(fieldError, currentLocale);

        if (localizedErrorMessage.equals(fieldError.getDefaultMessage())) {
            String[] fieldErrorCodes = fieldError.getCodes();
            localizedErrorMessage = fieldErrorCodes[0];
        }

        return localizedErrorMessage;
    }
}
