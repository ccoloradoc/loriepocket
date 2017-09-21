package com.loriepocket.repository;

import com.loriepocket.model.Meal;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface MealRepository extends CrudRepository<Meal, Long> {
    public List<Meal> findByConsumedDateBetween(Date start, Date end);
}
