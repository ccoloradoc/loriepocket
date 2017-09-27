package com.loriepocket.service.impl;

import com.loriepocket.model.Meal;
import com.loriepocket.repository.MealRepository;
import com.loriepocket.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@Component
public class MealServiceImpl implements MealService {

    @Autowired
    private MealRepository mealRepository;

    @Override
    public Meal findById(Long id) {
        return mealRepository.findOne(id);
    }

    @Override
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable ) {
        return mealRepository.findByConsumedDateBetween(start, end, pageable);
    }

    @Override
    public Page<Meal> findAll(Pageable pageable) {
        return mealRepository.findAll(pageable);
    }

    @Override
    public Page<Meal> findAllByUserId(Long id, Pageable pageable) {
        return mealRepository.findAllByUserId(id, pageable);
    }

    @Override
    public Meal saveOrUpdate(Meal meal) {
        return mealRepository.save(meal);
    }

    @Override
    public void delete(Long id) {
        mealRepository.delete(id);
    }
}
