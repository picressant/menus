package fr.choupiteam.menus.application.week.service;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.week.model.WeekDayEnum;
import fr.choupiteam.menus.application.week.model.WeekMeal;
import fr.choupiteam.menus.infrastructure.repository.WeekMealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class WeekService {

    @Autowired
    private WeekMealRepository weekRepository;

    /**
     * Get week from database
     * @return The found week
     */
    public List<WeekMeal> getWeek(Group group) {
        List<WeekMeal> meals =  this.weekRepository.findAllByGroup(group);
        if (CollectionUtils.isEmpty(meals)) {
            for (WeekDayEnum weekDayEnum : WeekDayEnum.values()) {
                WeekMeal weekMeal = new WeekMeal();
                weekMeal.setGroup(group);
                weekMeal.setWeekDayIndex(weekDayEnum);
                meals.add(this.insertWeekMeal(weekMeal));
            }
        }
        return meals;
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
}
