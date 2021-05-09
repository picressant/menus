package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.unit.model.ConvertTo;
import fr.choupiteam.menus.application.unit.model.Unit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConvertToRepository extends
        MongoRepository<ConvertTo, String> {

    Optional<ConvertTo> findByUnitFromAndUnitTo(Unit from, Unit to);

    Optional<ConvertTo> findByUnitFromAndUnitToAndIdNot(Unit from, Unit to, String id);
}
