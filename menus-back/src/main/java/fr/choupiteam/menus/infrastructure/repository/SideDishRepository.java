package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SideDishRepository extends
        MongoRepository<SideDish, String>,
        PageableRepository<SideDish> {
}
