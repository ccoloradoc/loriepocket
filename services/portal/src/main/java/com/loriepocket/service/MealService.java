package com.loriepocket.service;

import com.loriepocket.model.Meal;

import java.util.Date;
import java.util.List;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
public interface MealService {
    public Meal findById(Long id);
    public List<Meal> findByConsumedDateBetween(Date start, Date end);
    public List<Meal> findAll();
    public Meal saveOrUpdate(Meal meal);
    public void delete(Long id);
}
