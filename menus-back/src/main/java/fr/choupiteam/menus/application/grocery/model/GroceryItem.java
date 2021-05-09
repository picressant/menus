package fr.choupiteam.menus.application.grocery.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.unit.model.Unit;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class GroceryItem {
    @Id
    private String id;

    @DBRef
    private Ingredient ingredient;

    private float quantity;

    @JsonIgnore
    @DBRef
    private Group group;

    private boolean checked;

    @DBRef
    private Unit unit;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
}
