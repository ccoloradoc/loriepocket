package com.loriepocket.repository;

import com.loriepocket.dto.MealSummary;
import com.loriepocket.model.Meal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface MealRepository extends PagingAndSortingRepository<Meal, Long> {
    public Page<Meal> findAllByUserId(Long id, Pageable pageable);
    public Page<Meal> findByConsumedDateBetween(Date start, Date end, Pageable pageable);
    public Page<Meal> findByUserIdAndConsumedDateBetween(Long id, Date start, Date end, Pageable pageable);

    @Query("SELECT m FROM Meal m JOIN FETCH m.user WHERE m.id = (:id)")
    public Meal findByIdAndFetchUser(@Param("id")Long id);

    @Query("SELECT m FROM Meal m JOIN m.user WHERE m.user.id = (:id) and year(m.consumedDate) = year((:consumedDate)) and month(m.consumedDate) = month((:consumedDate)) and day(m.consumedDate) = day((:consumedDate))order by m.consumedDate")
    public Page<Meal> findByUserIdAndConsumedDate(@Param("id")Long id, @Param("consumedDate")Date consumedDate, Pageable pageable);

    @Query(value = "SELECT new com.loriepocket.dto.MealSummary(str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate)), sum(m.calories), count(*)) from Meal m JOIN m.user WHERE m.user.id = (:id) group by (str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate))) order by (str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate)))")
    public Page<MealSummary> findSummaryByUserId(@Param("id")Long id, Pageable pageable);

    @Query(value = "SELECT new com.loriepocket.dto.MealSummary(str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate)), sum(m.calories), count(*)) from Meal m JOIN m.user WHERE m.user.id = (:id) and m.consumedDate >= (:start) and m.consumedDate <= (:end) group by (str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate))) order by (str(day(m.consumedDate))||'-'||str(month(m.consumedDate))||'-'||str(year(m.consumedDate)))")
    public Page<MealSummary> findSummaryByUserIdAndConsumedDateBetween(@Param("id")Long id, @Param("start")Date start, @Param("end")Date end, Pageable pageable);
}

