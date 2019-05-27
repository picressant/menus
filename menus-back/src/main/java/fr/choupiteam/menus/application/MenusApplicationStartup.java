package fr.choupiteam.menus.application;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.model.IngredientUnit;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import fr.choupiteam.menus.application.week.model.Week;
import fr.choupiteam.menus.application.week.service.WeekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class MenusApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private WeekService weekService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        if (this.weekService.getWeek() == null) {
            this.weekService.insertWeek(new Week());
        }

        Ingredient ingredient = new Ingredient();
        ingredient.setName("Pâtes");
        ingredient.setQuantity(500);
        ingredient.setUnit(IngredientUnit.GRAMME);

        this.ingredientService.saveIngredient(ingredient);

        Recipe recipe = this.recipeService.getRecipe("5ceaa291d2bd884df0770670");
        recipe.setIngredients(Collections.singletonList(ingredient));

        this.recipeService.saveRecipe(recipe);
    }
}
