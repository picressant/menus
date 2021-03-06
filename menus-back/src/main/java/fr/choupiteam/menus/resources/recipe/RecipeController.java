package fr.choupiteam.menus.resources.recipe;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping(value = "/{id}")
    public Recipe getRecipe(@PathVariable("id") String id) {
        return this.recipeService.getRecipe(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recette inconnue"));
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        recipe = this.recipeService.addRecipe(recipe);

        return (recipe != null) ? this.getRecipe(recipe.getId()) : null;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authorizationService.can('DELETE_RECIPE')")
    public void deleteRecipe(@PathVariable String id) {
        this.recipeService.deleteRecipe(id);
    }

    @PutMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe) {
        return this.recipeService.saveRecipe(recipe);
    }

    @PostMapping(value = "/list")
    public Page<Recipe> getRecipes(@RequestBody Pager pager) {
        return this.recipeService.findByPager(pager);
    }

    @PostMapping(value = "/{id}/picture")
    public void storePicture(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        Recipe recipe = this.recipeService.getRecipe(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recette inconnue"));

        this.recipeService.storePicture(recipe, file);
    }

    @GetMapping(path = "/{id}/picture")
    public ResponseEntity getPicture(@PathVariable String id) {
        return this.recipeService.getPicture(id);
    }
}
