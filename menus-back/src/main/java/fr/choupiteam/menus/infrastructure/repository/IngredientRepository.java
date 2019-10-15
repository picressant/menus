package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IngredientRepository extends
        MongoRepository<Ingredient, String>,
        PageableRepository<Ingredient> {
}
