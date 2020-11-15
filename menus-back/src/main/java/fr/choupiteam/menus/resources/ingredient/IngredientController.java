package fr.choupiteam.menus.resources.ingredient;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.application.unit.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private UnitService unitService;

    @PostMapping
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return this.ingredientService.addIngredient(ingredient);
    }

    @PutMapping
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return this.ingredientService.saveIngredient(ingredient);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public HttpStatus deleteIngredient(@PathVariable("id") String id) {
        this.ingredientService.deleteIngredient(id);
        return HttpStatus.OK;
    }

    @PostMapping(value = "/list")
    public Page<Ingredient> getIngredients(@RequestBody Pager pager) {
        return this.ingredientService.getIngredientsByPager(pager);
    }

    @PostMapping(value = "/unit/list")
    public Page<Unit> getUnits(@RequestBody Pager pager) {
        return this.unitService.getUnitsByPager(pager);
    }

    @PostMapping(value = "/unit")
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public Unit createUnit(@RequestBody Unit unit) {
        return this.unitService.createUnit(unit);
    }

    @PutMapping(value = "/unit")
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public Unit saveUnit(@RequestBody Unit unit) {
        return this.unitService.saveUnit(unit);
    }

    @DeleteMapping(value = "/unit/{id}")
    @PreAuthorize("@authorizationService.can('MANAGE_INGREDIENTS')")
    public void deleteUnit(@PathVariable("id") String id) {
        this.unitService.deleteUnit(id);
    }
}
