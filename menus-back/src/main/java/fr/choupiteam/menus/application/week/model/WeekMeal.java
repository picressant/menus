package fr.choupiteam.menus.application.week.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.side.model.SideDish;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "weekMeal")
public class WeekMeal {
    @Id
    private String id;

    @DBRef
    private Recipe recipe;

    @DBRef
    private List<SideDish> sideDishes;

    private int persons;

    @JsonIgnore
    @DBRef
    private Group group;

    private WeekDayEnum weekDayIndex;

    public WeekMeal() {
        this.setSideDishes(new ArrayList<>());
    }

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

    public int getPersons() {
        return persons;
    }

    public void setPersons(int persons) {
        this.persons = persons;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public WeekDayEnum getWeekDayIndex() {
        return weekDayIndex;
    }

    public void setWeekDayIndex(WeekDayEnum weekDayIndex) {
        this.weekDayIndex = weekDayIndex;
    }
}
