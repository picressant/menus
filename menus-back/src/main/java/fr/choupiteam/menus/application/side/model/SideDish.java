package fr.choupiteam.menus.application.side.model;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sidedish")
public class SideDish {

    /**
     * Mongo id
     */
    @Id
    private String id;

    /**
     * Name of the side dish
     */
    private String name;

    /**
     * List of ingredient for the side dish
     */
    private List<Ingredient> ingredients;

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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
