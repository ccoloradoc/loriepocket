package com.loriepocket.repository;

import com.loriepocket.model.Meal;
import com.loriepocket.model.MealSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface MealRepository extends PagingAndSortingRepository<Meal, Long> {
    public Page<Meal> findAllByUserId(Long id, Pageable pageable);
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable);
    public Page<Meal> findByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable);

    @Query("SELECT m FROM Meal m JOIN FETCH m.user WHERE m.id = (:id)")
    public Meal findByIdAndFetchUser(@Param("id")Long id);

    @Query("SELECT m FROM Meal m JOIN m.user WHERE m.user.id = (:id) and FORMATDATETIME(m.consumedDate, 'yyyy-MM-dd', 'en', 'CST') = FORMATDATETIME((:consumedDate) ,  'yyyy-MM-dd', 'en', 'CST') order by m.consumedDate")
    public Page<Meal> findByUserIdAndConsumedDate(@Param("id")Long id, @Param("consumedDate")Date consumedDate, Pageable pageable);

    @Query(value = "SELECT ms from MealSummary ms where ms.id = (:id)")
    public Page<MealSummary> findSummaryByUserId(@Param("id")Long id, Pageable pageable);

    @Query(value = "SELECT ms from MealSummary ms WHERE ms.id = (:id) and PARSEDATETIME(ms.consumedDate, 'yyyy-MM-dd', 'en', 'GMT') >= (:start) and PARSEDATETIME(ms.consumedDate, 'yyyy-MM-dd', 'en', 'GMT') <= (:end)")
    public Page<MealSummary> findSummaryByUserIdAndConsumedDateBetween(@Param("id")Long id, @Param("start")Date start, @Param("end")Date end, Pageable pageable);
}

