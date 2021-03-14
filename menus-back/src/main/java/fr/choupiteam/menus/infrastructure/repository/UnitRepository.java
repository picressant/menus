package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UnitRepository extends
        MongoRepository<Unit, String>,
        PageableRepository<Unit> {

    Unit findByName(String name);
}
