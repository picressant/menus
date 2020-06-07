package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.week.model.Week;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeekRepository extends MongoRepository<Week, String> {
    Optional<Week> findByGroup(Group group);
}
