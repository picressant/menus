package fr.choupiteam.menus.application.ingredient.service;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;


    public Page<Ingredient> getIngredientsByPager(Pager pager) {
        return this.ingredientRepository.findAllByPager(pager, Ingredient.class);
    }

    public Ingredient saveIngredient(Ingredient ingredient) {
        return this.ingredientRepository.save(ingredient);
    }

    public Ingredient addIngredient(Ingredient ingredient) {
        return this.ingredientRepository.insert(ingredient);
    }

    public Ingredient getIngredient(String id) {
        return this.ingredientRepository.findById(id).orElse(null);
    }

    public List<Ingredient> getIngredients() {
        return this.ingredientRepository.findAll();
    }

    public void deleteIngredient(String id) {
        this.ingredientRepository.deleteById(id);
    }
}
