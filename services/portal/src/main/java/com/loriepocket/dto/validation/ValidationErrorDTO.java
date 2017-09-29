package com.loriepocket.dto.validation;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cristian.colorado on 9/28/2017.
 */
public class ValidationErrorDTO {

    private List<FieldErrorDTO> fieldErrors = new ArrayList<>();

    public ValidationErrorDTO() {

    }

    public void addFieldError(String path, String message) {
        FieldErrorDTO error = new FieldErrorDTO(path, message);
        fieldErrors.add(error);
    }

    public List<FieldErrorDTO> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(List<FieldErrorDTO> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}
