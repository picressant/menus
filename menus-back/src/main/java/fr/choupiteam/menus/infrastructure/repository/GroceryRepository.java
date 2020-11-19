package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.grocery.model.GroceryItem;
import fr.choupiteam.menus.application.group.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroceryRepository extends MongoRepository<GroceryItem, String> {
    List<GroceryItem> findAllByGroup(Group group);
    void deleteAllByGroup(Group group);
}
