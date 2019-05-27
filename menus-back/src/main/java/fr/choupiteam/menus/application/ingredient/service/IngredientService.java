package fr.choupiteam.menus.application.ingredient.service;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.infrastructure.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient saveIngredient(Ingredient ingredient) {
        return this.ingredientRepository.save(ingredient);
    }
}
