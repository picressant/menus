package fr.choupiteam.menus.application.recipe.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapDeserializer;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "recipe")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "jacksonType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = BookRecipe.class, name = "bookRecipe"),
        @JsonSubTypes.Type(value = Recipe.class, name = "recipe")
})
public class Recipe {
    /**
     * MongoID of the recipe
     */
    @Id
    private String id;

    /**
     * Recipe name
     */
    @Searchable
    @Indexed(unique = true)
    private String name;

    /**
     * List of recipe ingredients with quantity
     */
    @JsonSerialize(using = IngredientMapSerializer.class)
    @JsonDeserialize(using = IngredientMapDeserializer.class)
    private Map<String, Integer> ingredients;

    public Recipe() {
        this.ingredients = new HashMap<>();
    }

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
