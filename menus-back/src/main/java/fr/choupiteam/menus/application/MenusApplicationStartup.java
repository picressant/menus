package fr.choupiteam.menus.application;

import fr.choupiteam.menus.application.week.model.Week;
import fr.choupiteam.menus.application.week.service.WeekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class MenusApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private WeekService weekService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        if (this.weekService.getWeek() == null) {
            this.weekService.insertWeek(new Week());
        }
    }
}
