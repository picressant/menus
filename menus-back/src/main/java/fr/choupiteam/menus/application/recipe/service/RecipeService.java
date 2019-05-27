package fr.choupiteam.menus.application.recipe.service;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.infrastructure.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe getRecipe(String id) {
        return this.recipeRepository.findById(id).orElse(null);
    }

    public Recipe addRecipe(Recipe recipe) {
        return this.recipeRepository.insert(recipe);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return this.recipeRepository.save(recipe);
    }

    public List<Recipe> search(String search) {
        return this.recipeRepository.findAllByNameLike(search);
    }
}
