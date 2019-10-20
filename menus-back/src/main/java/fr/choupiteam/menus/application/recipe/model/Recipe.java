package fr.choupiteam.menus.application.recipe.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapDeserializer;
import fr.choupiteam.menus.infrastructure.rest.jackson.IngredientMapSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    @Searchable
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
    @JsonDeserialize(using = IngredientMapDeserializer.class)
    private Map<String, Integer> ingredients;

    private String bookReference;

    private List<String> steps;

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

    public String getBookReference() {
        return bookReference;
    }

    public void setBookReference(String bookReference) {
        this.bookReference = bookReference;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }
}
