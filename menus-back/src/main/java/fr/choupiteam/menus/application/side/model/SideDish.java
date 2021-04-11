package fr.choupiteam.menus.application.side.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.choupiteam.menus.application.ingredient.model.SelectedIngredient;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapDeserializer;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

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
    @Searchable
    private String name;

    /**
     * List of recipe ingredients with quantity
     */
    @JsonSerialize(using = IngredientMapSerializer.class)
    @JsonDeserialize(using = IngredientMapDeserializer.class)
    private Map<String, Float> ingredients;

    private List<SelectedIngredient> selectedIngredients;

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

    public Map<String, Float> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, Float> ingredients) {
        this.ingredients = ingredients;
    }

    public List<SelectedIngredient> getSelectedIngredients() {
        return selectedIngredients;
    }

    public void setSelectedIngredients(List<SelectedIngredient> selectedIngredients) {
        this.selectedIngredients = selectedIngredients;
    }
}
