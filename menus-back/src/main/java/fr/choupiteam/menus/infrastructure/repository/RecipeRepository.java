package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>, PageableRepository<Recipe> {

    @Query(value="{ 'name' : ?0, '_class' : ?1 }", count = true)
    int countAllByNameAndClass(String name, String className);
}
