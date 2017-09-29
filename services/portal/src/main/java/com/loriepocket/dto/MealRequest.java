package com.loriepocket.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
public class MealRequest {
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Integer calories;
    @NotNull
    private Date consumedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Date getConsumedDate() {
        return consumedDate;
    }

    public void setConsumedDate(Date consumedDate) {
        this.consumedDate = consumedDate;
    }
}
