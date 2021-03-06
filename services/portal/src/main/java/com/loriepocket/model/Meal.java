package com.loriepocket.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
@Entity
@Table(name="MEAL")
public class Meal extends Auditable<String> {
    @NotNull
    private String name;
    @NotNull
    private Integer calories;
    @NotNull
    private Date consumedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID", nullable=false)
    @JsonIgnore
    private User user;

    public User getUser() { return user; }

    public void setUser(User user) {
        this.user = user;
    };

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
