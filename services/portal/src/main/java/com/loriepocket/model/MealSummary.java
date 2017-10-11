package com.loriepocket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by cristian.colorado on 10/10/2017.
 */
@Entity
@Table(name="MEAL_SUMMARY")
public class MealSummary {
    private Long id;
    @Id
    private String consumedDate;
    private int calories;
    private int elements;

    public String getConsumedDate() {
        return consumedDate;
    }

    public void setConsumedDate(String consumedDate) {
        this.consumedDate = consumedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getElements() {
        return elements;
    }

    public void setElements(int elements) {
        this.elements = elements;
    }
}
