package com.loriepocket.service;

import com.loriepocket.dto.MealSummary;
import com.loriepocket.model.Meal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
public interface MealService {
    public Optional<Meal> findById(Long id);
    public Optional<Meal> findByIdAndFetchUser(Long id);
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable);
    public Page<Meal> findByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable);
    public Page<Meal> findAllByUserId(Long id, Pageable pageable);
    public Page<Meal> findAll(Pageable pageable);
    public Meal saveOrUpdate(Meal meal);
    public void delete(Long id);
    public Page<Meal> findByUserIdAndConsumedDate(Long id, Date consumedDate, Pageable pageable);
    public Page<MealSummary> findSummaryByUserId(Long id, Pageable pageable);
    public Page<MealSummary> findSummaryByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable);
}
