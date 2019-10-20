package fr.choupiteam.menus.application.side.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapDeserializer;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Map<String, Integer> ingredients;

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

    public Map<String, Integer> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, Integer> ingredients) {
        this.ingredients = ingredients;
    }
}
