package com.loriepocket.repository;

import com.loriepocket.model.Meal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface MealRepository extends PagingAndSortingRepository<Meal, Long> {
    public Page<Meal> findAllByUserId(Long id, Pageable pageable);
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable);
}
