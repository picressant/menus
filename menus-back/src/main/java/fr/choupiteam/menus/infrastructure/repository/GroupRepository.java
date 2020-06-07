package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GroupRepository extends
        MongoRepository<Group, String>,
        PageableRepository<Group> {
}
