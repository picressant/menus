package fr.choupiteam.menus.application.week.model;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "week")
public class Week {

    @Id
    private String id;

    @DBRef
    private Recipe mondayLunch;

    @DBRef
    private Recipe mondayDinner;

    @DBRef
    private Recipe tuesdayLunch;

    @DBRef
    private Recipe tuesdayDinner;

    @DBRef
    private Recipe wednesdayLunch;

    @DBRef
    private Recipe wednesdayDinner;

    @DBRef
    private Recipe thursdayLunch;

    @DBRef
    private Recipe thursdayDinner;

    @DBRef
    private Recipe fridayLunch;

    @DBRef
    private Recipe fridayDinner;

    @DBRef
    private Recipe saturdayLunch;

    @DBRef
    private Recipe saturdayDinner;

    @DBRef
    private Recipe sundayLunch;

    @DBRef
    private Recipe sundayDinner;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Recipe getMondayLunch() {
        return mondayLunch;
    }

    public void setMondayLunch(Recipe mondayLunch) {
        this.mondayLunch = mondayLunch;
    }

    public Recipe getMondayDinner() {
        return mondayDinner;
    }

    public void setMondayDinner(Recipe mondayDinner) {
        this.mondayDinner = mondayDinner;
    }

    public Recipe getTuesdayLunch() {
        return tuesdayLunch;
    }

    public void setTuesdayLunch(Recipe tuesdayLunch) {
        this.tuesdayLunch = tuesdayLunch;
    }

    public Recipe getTuesdayDinner() {
        return tuesdayDinner;
    }

    public void setTuesdayDinner(Recipe tuesdayDinner) {
        this.tuesdayDinner = tuesdayDinner;
    }

    public Recipe getWednesdayLunch() {
        return wednesdayLunch;
    }

    public void setWednesdayLunch(Recipe wednesdayLunch) {
        this.wednesdayLunch = wednesdayLunch;
    }

    public Recipe getWednesdayDinner() {
        return wednesdayDinner;
    }

    public void setWednesdayDinner(Recipe wednesdayDinner) {
        this.wednesdayDinner = wednesdayDinner;
    }

    public Recipe getThursdayLunch() {
        return thursdayLunch;
    }

    public void setThursdayLunch(Recipe thursdayLunch) {
        this.thursdayLunch = thursdayLunch;
    }

    public Recipe getThursdayDinner() {
        return thursdayDinner;
    }

    public void setThursdayDinner(Recipe thursdayDinner) {
        this.thursdayDinner = thursdayDinner;
    }

    public Recipe getFridayLunch() {
        return fridayLunch;
    }

    public void setFridayLunch(Recipe fridayLunch) {
        this.fridayLunch = fridayLunch;
    }

    public Recipe getFridayDinner() {
        return fridayDinner;
    }

    public void setFridayDinner(Recipe fridayDinner) {
        this.fridayDinner = fridayDinner;
    }

    public Recipe getSaturdayLunch() {
        return saturdayLunch;
    }

    public void setSaturdayLunch(Recipe saturdayLunch) {
        this.saturdayLunch = saturdayLunch;
    }

    public Recipe getSaturdayDinner() {
        return saturdayDinner;
    }

    public void setSaturdayDinner(Recipe saturdayDinner) {
        this.saturdayDinner = saturdayDinner;
    }

    public Recipe getSundayLunch() {
        return sundayLunch;
    }

    public void setSundayLunch(Recipe sundayLunch) {
        this.sundayLunch = sundayLunch;
    }

    public Recipe getSundayDinner() {
        return sundayDinner;
    }

    public void setSundayDinner(Recipe sundayDinner) {
        this.sundayDinner = sundayDinner;
    }
}
