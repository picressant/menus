package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findAllByNameLike(String search);
}
