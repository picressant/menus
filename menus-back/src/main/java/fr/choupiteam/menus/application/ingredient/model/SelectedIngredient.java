package fr.choupiteam.menus.application.ingredient.model;

import fr.choupiteam.menus.application.unit.model.Unit;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class SelectedIngredient {
    @DBRef
    private Ingredient ingredient;

    @DBRef
    private Unit unit;

    private float quantity;

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }
}
