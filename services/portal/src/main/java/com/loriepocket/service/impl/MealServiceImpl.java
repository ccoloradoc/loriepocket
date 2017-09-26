package com.loriepocket.service.impl;

import com.loriepocket.model.Meal;
import com.loriepocket.repository.MealRepository;
import com.loriepocket.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    public List<Meal> findByConsumedDateBetween(Date start, Date end) {
        return mealRepository.findByConsumedDateBetween(start, end);
    }

    @Override
    public List<Meal> findAll() {
        List<Meal> mealList = new ArrayList<>();
        mealRepository.findAll().forEach(mealList::add);
        return mealList;
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
