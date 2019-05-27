package fr.choupiteam.menus.application.week.model;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.side.model.SideDish;

import java.util.List;

public class WeekMeal {

    private Recipe recipe;

    private List<SideDish> sideDishes;

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public List<SideDish> getSideDishes() {
        return sideDishes;
    }

    public void setSideDishes(List<SideDish> sideDishes) {
        this.sideDishes = sideDishes;
    }
}
