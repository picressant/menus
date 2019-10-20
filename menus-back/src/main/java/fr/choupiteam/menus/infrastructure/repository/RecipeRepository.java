package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>, PageableRepository<Recipe> {
}
