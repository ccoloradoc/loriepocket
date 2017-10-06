package com.loriepocket.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by cristian.colorado on 10/5/2017.
 */
public class MealSummary {
    private static SimpleDateFormat parser = new SimpleDateFormat("dd-MM-yyyy");

    private String name;
    private Date consumedDate;
    private long calories;

    private long elements;

    public MealSummary() {

    }

    public MealSummary(String name, long calories, long elements) {
        this.name = name;
        this.calories = calories;
        this.elements = elements;
        this.setConsumedDate(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getConsumedDate() {
        return consumedDate;
    }

    public void setConsumedDate(Date consumedDate) {
        this.consumedDate = consumedDate;
    }

    public void setConsumedDate(String consumedDate) {
        try {
            this.consumedDate = parser.parse(name);
        } catch (ParseException e) {
            e.printStackTrace();
        }
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
