package fr.choupiteam.menus.resources.recipe;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import fr.choupiteam.menus.infrastructure.rest.model.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @RequestMapping(value = "/{id}", method = GET)
    public Recipe getRecipe(@PathVariable("id") String id) {
        return this.recipeService.getRecipe(id);
    }

    @RequestMapping(method = POST)
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        recipe = this.recipeService.addRecipe(recipe);

        return (recipe != null) ? this.getRecipe(recipe.getId()) : null;
    }

    @RequestMapping(method = PUT)
    public Recipe saveRecipe(@RequestBody Recipe recipe) {
        return this.recipeService.saveRecipe(recipe);
    }

    @RequestMapping(value = "/search", method = POST)
    public List<Recipe> searchRecipe(@RequestBody Search search) {
        return this.recipeService.search(search.getTerm());
    }
}
