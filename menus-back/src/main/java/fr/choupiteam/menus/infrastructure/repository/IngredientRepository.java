package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IngredientRepository extends MongoRepository<Ingredient, String> {
}
