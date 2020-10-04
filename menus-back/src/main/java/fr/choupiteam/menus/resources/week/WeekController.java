package fr.choupiteam.menus.resources.week;

import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.week.model.WeekMeal;
import fr.choupiteam.menus.application.week.service.WeekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/week")
public class WeekController {

    @Autowired
    private WeekService weekService;

    @GetMapping
    public List<WeekMeal> getWeek(@AuthenticationPrincipal ApplicationUser user) {
        return this.weekService.getWeek(user.getGroup())
                .stream()
                .sorted(Comparator.comparingInt(o -> o.getWeekDayIndex().getValue()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public List<WeekMeal> setWeek(@RequestBody List<WeekMeal> meals, @AuthenticationPrincipal ApplicationUser user) {
        meals.forEach(meal -> meal.setGroup(user.getGroup()));
        return this.weekService.setWeek(meals, user.getGroup());
    }
}
