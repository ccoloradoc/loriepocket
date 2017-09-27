package com.loriepocket.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
@Entity
@Table(name="MEAL")
public class Meal {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer calories;
    private Date consumedDate;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID", nullable=false)
    @JsonIgnore
    private User user;

//    @Transient
//    @JsonIgnore
//    private Long userId;
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }

    public User getUser() { return user; }

    public void setUser(User user) {
        this.user = user;
    };

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
