package fr.choupiteam.menus.application.recipe.service;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.infrastructure.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe getRecipe(String id) {
        return this.recipeRepository.findById(id).orElse(null);
    }

    public boolean addRecipe(Recipe recipe) {
        recipe = this.recipeRepository.insert(recipe);
        return (recipe != null);
    }

    public void saveRecipe(Recipe recipe) {
        this.recipeRepository.save(recipe);
    }
}
