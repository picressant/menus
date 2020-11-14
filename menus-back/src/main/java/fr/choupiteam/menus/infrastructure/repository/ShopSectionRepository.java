package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.ingredient.model.ShopSection;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopSectionRepository extends MongoRepository<ShopSection, String>, PageableRepository<ShopSection> {
}
