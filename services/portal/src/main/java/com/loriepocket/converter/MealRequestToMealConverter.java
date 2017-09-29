package com.loriepocket.converter;

import com.loriepocket.dto.MealRequest;
import com.loriepocket.model.Meal;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Created by cristian.colorado on 9/29/2017.
 */
@Component
public class MealRequestToMealConverter implements Converter<MealRequest, Meal> {
    @Override
    public Meal convert(MealRequest mealRequest) {
        Meal meal = new Meal();

        meal.setId(mealRequest.getId());
        meal.setName(mealRequest.getName());
        meal.setCalories(mealRequest.getCalories());
        meal.setConsumedDate(mealRequest.getConsumedDate());

        return meal;
    }
}
