package fr.choupiteam.menus.infrastructure.patch;

import fr.choupiteam.menus.application.recipe.service.RecipeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatchRunner {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RecipeService recipeService;


    public void run() {
        this.patchMissingSelectedIngredientUnit();
    }


    private void patchMissingSelectedIngredientUnit() {
        this.log.info("start patchMissingSelectedIngredientUnit");
        this.recipeService.getRecipes().forEach(recipe -> {
            recipe.getSelectedIngredients().forEach(selectedIngredient -> {
                if (selectedIngredient.getUnit() == null) {
                    this.log.info("patching  recipe " + recipe.getName() + " for " + selectedIngredient.getIngredient().getName());
                    selectedIngredient.setUnit(selectedIngredient.getIngredient().getUnits().get(selectedIngredient.getIngredient().getStarredUnitIndex()));
                }
            });

            this.recipeService.saveRecipe(recipe);
        });

        this.log.info("end patchMissingSelectedIngredientUnit");
    }

}
