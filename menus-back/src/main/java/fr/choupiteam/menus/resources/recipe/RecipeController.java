package fr.choupiteam.menus.resources.recipe;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public HttpStatus addRecipe(@RequestParam() Recipe recipe) {
        boolean isInserted = this.recipeService.addRecipe(recipe);

        return (isInserted) ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE;
    }

    @RequestMapping(method = PUT)
    public HttpStatus saveRecipe(@RequestParam() Recipe recipe) {
        this.recipeService.saveRecipe(recipe);
        return HttpStatus.OK;
    }
}
