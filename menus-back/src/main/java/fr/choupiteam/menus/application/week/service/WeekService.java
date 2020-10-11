package fr.choupiteam.menus.application.week.service;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.application.week.model.WeekDayEnum;
import fr.choupiteam.menus.application.week.model.WeekMeal;
import fr.choupiteam.menus.infrastructure.repository.WeekMealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeekService {

    @Autowired
    private WeekMealRepository weekRepository;

    /**
     * Get week from database
     *
     * @return The found week
     */
    public List<WeekMeal> getWeek(Group group) {
        List<WeekMeal> meals = this.weekRepository.findAllByGroup(group);
        if (meals.size() < WeekDayEnum.values().length) {
            for (WeekDayEnum weekDayEnum : WeekDayEnum.values()) {
                if (meals.stream().noneMatch(meal -> meal.getWeekDayIndex().equals(weekDayEnum))) {
                    WeekMeal weekMeal = new WeekMeal();
                    weekMeal.setGroup(group);
                    weekMeal.setWeekDayIndex(weekDayEnum);
                    meals.add(this.insertWeekMeal(weekMeal));
                }
            }
        }
        return meals.stream()
                .sorted(Comparator.comparingInt(o -> o.getWeekDayIndex().getValue()))
                .collect(Collectors.toList());
    }

    private WeekMeal insertWeekMeal(WeekMeal weekMeal) {
        return this.weekRepository.insert(weekMeal);
    }

    public WeekMeal setWeekMeal(WeekMeal weekMeal) {
        return this.weekRepository.save(weekMeal);
    }

    public void deleteWeek(Group group) {
        this.weekRepository.deleteByGroup(group);
    }

    public List<WeekMeal> setWeek(List<WeekMeal> meals, Group group) {
        meals.forEach(this::setWeekMeal);
        return this.getWeek(group);
    }

    public void clearRecipeFromWeeks(Recipe recipe) {
        this.weekRepository.findAllByRecipe(recipe).forEach(meal -> {
            WeekDayEnum index = meal.getWeekDayIndex();
            this.weekRepository.delete(meal);
            meal = new WeekMeal();
            meal.setWeekDayIndex(index);
            this.insertWeekMeal(meal);
        });
    }

    public void clearSideFromWeeks(SideDish side) {
        this.weekRepository.findAllBySideDishes(side).forEach(meal -> {
            meal.getSideDishes().remove(side);
            this.setWeekMeal(meal);
        });
    }
}
