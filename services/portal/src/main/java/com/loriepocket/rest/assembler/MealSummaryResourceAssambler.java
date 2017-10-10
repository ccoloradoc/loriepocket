package com.loriepocket.rest.assembler;

import com.loriepocket.dto.MealSummary;
import com.loriepocket.model.Meal;
import com.loriepocket.rest.MealController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by cristian.colorado on 10/6/2017.
 */
public class MealSummaryResourceAssambler   extends ResourceAssemblerSupport<MealSummary, MealSummaryResource> {
    private static SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");

    private Long userId;

    public MealSummaryResourceAssambler(Long userId) {
        super(MealController.class, MealSummaryResource.class);
        this.userId = userId;
    }

    @Override
    public MealSummaryResource toResource(MealSummary meal) {
        Link link = null;
        try {
            link = linkTo(methodOn(MealController.class).loadSummaryByConsumedDate(userId, parser.parse(meal.getName()), null, null)).withRel("summary");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new MealSummaryResource(meal, link);
    }
}

class MealSummaryResource extends Resource<MealSummary> {
    public MealSummaryResource(MealSummary content, Link... links) {
        super(content, links);
    }
}