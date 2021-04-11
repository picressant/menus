package fr.choupiteam.menus.infrastructure.migration;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.model.SelectedIngredient;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.application.side.service.SideDishService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MigrationHelper {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private SideDishService sideDishService;

    public void migrateIngredients() {
        List<Ingredient> ingredients = this.ingredientService.getIngredients();

        ingredients.forEach(ingredient -> {
            log.info("Migrating ingredient " + ingredient.getName());
            ingredient.setUnits(Arrays.asList(ingredient.getUnit()));
            this.ingredientService.saveIngredient(ingredient);
        });
    }

    public void migrateRecipe() {
        List<Recipe> recipes = this.recipeService.getRecipes();
        recipes.forEach(recipe -> {
            log.info("Migrating recipe " + recipe.getName());
            recipe.setSelectedIngredients(new ArrayList<>());
            recipe.getIngredients().forEach((ingredientId, quantity) -> {
                SelectedIngredient selectedIngredient = new SelectedIngredient();
                selectedIngredient.setIngredient(this.ingredientService.getIngredient(ingredientId));
                selectedIngredient.setUnit(selectedIngredient.getIngredient().getUnit());
                selectedIngredient.setQuantity(quantity);

                recipe.getSelectedIngredients().add(selectedIngredient);
            });
            this.recipeService.saveRecipe(recipe);
        });
    }

    public void migrateSideDishes() {
        List<SideDish> dishes = this.sideDishService.getDishes();
        dishes.forEach(dish -> {
            log.info("Migrating side dish " + dish.getName());
            dish.setSelectedIngredients(new ArrayList<>());
            dish.getIngredients().forEach((ingredientId, quantity) -> {
                SelectedIngredient selectedIngredient = new SelectedIngredient();
                selectedIngredient.setIngredient(this.ingredientService.getIngredient(ingredientId));
                selectedIngredient.setUnit(selectedIngredient.getIngredient().getUnit());
                selectedIngredient.setQuantity(quantity);

                dish.getSelectedIngredients().add(selectedIngredient);
            });
            this.sideDishService.saveDish(dish);
        });
    }
}
