package fr.choupiteam.menus.application.ingredient.model;

import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ingredient")
public class Ingredient {

    @Id
    private String id;

    @Searchable
    @Indexed(unique = true)
    private String name;

    @DBRef
    private Unit unit;

    private boolean forRecipe;

    @DBRef
    private ShopSection shopSection;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public boolean isForRecipe() {
        return forRecipe;
    }

    public void setForRecipe(boolean forRecipe) {
        this.forRecipe = forRecipe;
    }

    public ShopSection getShopSection() {
        return shopSection;
    }

    public void setShopSection(ShopSection shopSection) {
        this.shopSection = shopSection;
    }
}
