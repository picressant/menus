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

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/ingredient")
@PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PostMapping(value = "/unit/list")
    public Page<Unit> getUnits(@RequestBody Pager pager) {
        return this.unitService.getUnitsByPager(pager);
    }

    @GetMapping(value = "/unit")
    public List<Unit> getUnits() {
        return this.unitService.getUnits();
    }

    @PostMapping(value = "/unit")
    public Unit createUnit(@RequestBody Unit unit) {
        return this.unitService.createUnit(unit);
    }

    @PutMapping(value = "/unit")
    public Unit saveUnit(@RequestBody Unit unit) {
        return this.unitService.saveUnit(unit);
    }

    @DeleteMapping(value = "/unit/{id}")
    public void deleteUnit(@PathVariable("id") String id) {
        this.unitService.deleteUnit(id);
    }
}
