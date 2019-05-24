package fr.choupiteam.menus.application.recipe.model;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "recipe")
public class Recipe {
    /**
     * MongoID of the recipe
     */
    @Id
    private Integer id;

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
     * List of recipe ingredients
     */
    @DBRef
    private List<Ingredient> ingredients;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
