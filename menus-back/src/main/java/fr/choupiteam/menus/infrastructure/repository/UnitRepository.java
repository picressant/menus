package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.unit.model.Unit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UnitRepository extends MongoRepository<Unit, String> {
}
