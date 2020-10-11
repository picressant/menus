package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.application.week.model.WeekMeal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeekMealRepository extends MongoRepository<WeekMeal, String> {
    List<WeekMeal> findAllByGroup(Group group);

    void deleteByGroup(Group group);

    List<WeekMeal> findAllByRecipe(Recipe recipe);

    List<WeekMeal> findAllBySideDishes(SideDish side);
}
