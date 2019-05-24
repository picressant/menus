package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.week.model.Week;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeekRepository extends MongoRepository<Week, String> {
}
