package fr.choupiteam.menus.resources.week;

import fr.choupiteam.menus.application.week.model.Week;
import fr.choupiteam.menus.application.week.service.WeekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/week")
public class WeekController {

    @Autowired
    private WeekService weekService;

    @RequestMapping(method = RequestMethod.GET)
    public Week getWeek() {
        return this.weekService.getWeek();
    }
}
