package fr.choupiteam.menus.application.week.service;

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
    public Week getWeek() {
        List<Week> weeks = this.weekRepository.findAll();
        if (weeks.size() > 0)
            return weeks.get(0);
        else
            return null;
    }

    public void insertWeek(Week week) {
        this.weekRepository.insert(week);
    }
}
