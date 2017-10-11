package com.loriepocket.service.impl;

import com.loriepocket.model.Meal;
import com.loriepocket.model.MealSummary;
import com.loriepocket.repository.MealRepository;
import com.loriepocket.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@Component
public class MealServiceImpl implements MealService {

    @Autowired
    private MealRepository mealRepository;

    @Override
    public Optional<Meal> findById(Long id) {
        Meal meal = mealRepository.findOne(id);
        return Optional.ofNullable(meal);
    }

    @Override
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable ) {
        return mealRepository.findByConsumedDateBetween(start, end, pageable);
    }

    @Override
    public Page<Meal> findByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable) {
        return mealRepository.findByUserIdAndConsumedDateBetween(id, start, end, pageable);
    }

    @Override
    public Page<Meal> findAll(Pageable pageable) {
        return mealRepository.findAll(pageable);
    }

    @Override
    public Page<MealSummary> findSummaryByUserId(Long id, Pageable pageable) {
        return mealRepository.findSummaryByUserId(id, pageable);
    }

    @Override
    public Page<MealSummary> findSummaryByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable) {
        return mealRepository.findSummaryByUserIdAndConsumedDateBetween(id, start, end, pageable);
    }

    @Override
    public Page<Meal> findByUserIdAndConsumedDate(Long id, Date consumedDate, Pageable pageable) {
        return mealRepository.findByUserIdAndConsumedDate(id, consumedDate, pageable);
    }

    @Override
    public Optional<Meal> findByIdAndFetchUser(Long id) {
        Meal meal = mealRepository.findByIdAndFetchUser(id);
        return Optional.ofNullable(meal);
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
