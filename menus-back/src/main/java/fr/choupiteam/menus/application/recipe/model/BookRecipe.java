package fr.choupiteam.menus.application.recipe.model;

import java.util.List;


public class BookRecipe extends Recipe {
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


    private String bookReference;

    private List<String> steps;

    public BookRecipe() {
        super();
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
