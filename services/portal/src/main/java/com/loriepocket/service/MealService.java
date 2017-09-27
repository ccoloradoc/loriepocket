package com.loriepocket.service;

import com.loriepocket.model.Meal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
public interface MealService {
    public Meal findById(Long id);
    public Meal findByIdAndFetchUser(Long id);
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable);
    public Page<Meal> findAllByUserId(Long id, Pageable pageable);
    public Page<Meal> findAll(Pageable pageable);
    public Meal saveOrUpdate(Meal meal);
    public void delete(Long id);
}
