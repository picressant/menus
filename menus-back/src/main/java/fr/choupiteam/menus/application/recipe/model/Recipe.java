package fr.choupiteam.menus.application.recipe.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipe")
public class Recipe {
    /**
     * MongoID of the recipe
     */
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
}
