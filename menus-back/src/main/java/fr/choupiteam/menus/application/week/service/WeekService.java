package fr.choupiteam.menus.application.week.service;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.week.model.Week;
import fr.choupiteam.menus.infrastructure.repository.WeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeekService {

    @Autowired
    private WeekRepository weekRepository;

    /**
     * Get week from database
     * @return The found week
     */
    public Week getWeek(Group group) {
        return this.weekRepository.findByGroup(group)
                .orElseGet(() -> {
                    Week week = new Week();
                    week.setGroup(group);
                    this.insertWeek(week);
                    return week;
                });
    }

    private void insertWeek(Week week) {
        this.weekRepository.insert(week);
    }

    public Week setWeek(Week week) {
        return this.weekRepository.save(week);
    }

    public void deleteWeek(Week week) {
        this.weekRepository.delete(week);
    }
}
