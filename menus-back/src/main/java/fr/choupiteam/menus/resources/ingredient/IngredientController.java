package fr.choupiteam.menus.resources.ingredient;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.application.unit.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private UnitService unitService;

    @RequestMapping(method = POST)
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return this.ingredientService.saveIngredient(ingredient);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public HttpStatus deleteIngredient(@PathVariable("id") String id) {
        this.ingredientService.deleteIngredient(id);
        return HttpStatus.OK;
    }

    @RequestMapping(method = GET)
    public List<Ingredient> getIngredients() {
        return this.ingredientService.getIngredients();
    }

    @RequestMapping(value = "/unit", method = GET)
    public List<Unit> getUnits() {
        return this.unitService.getUnits();
    }

    @RequestMapping(value = "/unit", method = POST)
    public Unit saveUnit(@RequestBody Unit unit) {
        return this.unitService.saveUnit(unit);
    }

    @RequestMapping(value = "/unit/{id}", method = DELETE)
    public HttpStatus deleteUnit(@PathVariable("id") String id) {
        this.unitService.deleteUnit(id);
        return HttpStatus.OK;
    }
}