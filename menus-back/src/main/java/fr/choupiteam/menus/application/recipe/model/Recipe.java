package fr.choupiteam.menus.application.recipe.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "recipe")
public class Recipe {
    /**
     * MongoID of the recipe
     */
    @Id
    private String id;

    /**
     * Recipe name
     */
    private String name;

    /**
     * Preparation time
     * In minutes
     */
    private int preparationTime;

    /**
     * Cooking time
     * In minutes
     */
    private Integer cookingTime;

    /**
     * Number of persons
     */
    private int persons;

    /**
     * List of recipe ingredients with quantity
     */
    @JsonSerialize(using = IngredientMapSerializer.class)
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

    public int getPreparationTime() {
        return preparationTime;
    }

    public void setPreparationTime(int preparationTime) {
        this.preparationTime = preparationTime;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cookingTime) {
        this.cookingTime = cookingTime;
    }

    public int getPersons() {
        return persons;
    }

    public void setPersons(int persons) {
        this.persons = persons;
    }

    public Map<String, Integer> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, Integer> ingredients) {
        this.ingredients = ingredients;
    }
}
