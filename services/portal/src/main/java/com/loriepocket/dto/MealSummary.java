package com.loriepocket.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by cristian.colorado on 10/5/2017.
 */
public class MealSummary {
    private static SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");

    private String name;
    private long calories;
    private long elements;

    public MealSummary() {

    }

    public MealSummary(Date consumedDate, long calories, long elements) {
        this.name = parser.format(consumedDate);
        this.calories = calories;
        this.elements = elements;
    }

    public MealSummary(String consumedDate, long calories, long elements) {
        this.name = consumedDate;
        this.calories = calories;
        this.elements = elements;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCalories() {
        return calories;
    }

    public void setCalories(long calories) {
        this.calories = calories;
    }

    public long getElements() {
        return elements;
    }

    public void setElements(int elements) {
        this.elements = elements;
    }
}
