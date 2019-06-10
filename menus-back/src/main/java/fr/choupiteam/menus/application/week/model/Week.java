package fr.choupiteam.menus.application.week.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "week")
public class Week {

    @Id
    private String id;

    private WeekMeal mondayLunch;

    private WeekMeal mondayDinner;

    private WeekMeal tuesdayLunch;

    private WeekMeal tuesdayDinner;

    private WeekMeal wednesdayLunch;

    private WeekMeal wednesdayDinner;

    private WeekMeal thursdayLunch;

    private WeekMeal thursdayDinner;

    private WeekMeal fridayLunch;

    private WeekMeal fridayDinner;

    private WeekMeal saturdayLunch;

    private WeekMeal saturdayDinner;

    private WeekMeal sundayLunch;

    private WeekMeal sundayDinner;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public WeekMeal getMondayLunch() {
        return mondayLunch;
    }

    public void setMondayLunch(WeekMeal mondayLunch) {
        this.mondayLunch = mondayLunch;
    }

    public WeekMeal getMondayDinner() {
        return mondayDinner;
    }

    public void setMondayDinner(WeekMeal mondayDinner) {
        this.mondayDinner = mondayDinner;
    }

    public WeekMeal getTuesdayLunch() {
        return tuesdayLunch;
    }

    public void setTuesdayLunch(WeekMeal tuesdayLunch) {
        this.tuesdayLunch = tuesdayLunch;
    }

    public WeekMeal getTuesdayDinner() {
        return tuesdayDinner;
    }

    public void setTuesdayDinner(WeekMeal tuesdayDinner) {
        this.tuesdayDinner = tuesdayDinner;
    }

    public WeekMeal getWednesdayLunch() {
        return wednesdayLunch;
    }

    public void setWednesdayLunch(WeekMeal wednesdayLunch) {
        this.wednesdayLunch = wednesdayLunch;
    }

    public WeekMeal getWednesdayDinner() {
        return wednesdayDinner;
    }

    public void setWednesdayDinner(WeekMeal wednesdayDinner) {
        this.wednesdayDinner = wednesdayDinner;
    }

    public WeekMeal getThursdayLunch() {
        return thursdayLunch;
    }

    public void setThursdayLunch(WeekMeal thursdayLunch) {
        this.thursdayLunch = thursdayLunch;
    }

    public WeekMeal getThursdayDinner() {
        return thursdayDinner;
    }

    public void setThursdayDinner(WeekMeal thursdayDinner) {
        this.thursdayDinner = thursdayDinner;
    }

    public WeekMeal getFridayLunch() {
        return fridayLunch;
    }

    public void setFridayLunch(WeekMeal fridayLunch) {
        this.fridayLunch = fridayLunch;
    }

    public WeekMeal getFridayDinner() {
        return fridayDinner;
    }

    public void setFridayDinner(WeekMeal fridayDinner) {
        this.fridayDinner = fridayDinner;
    }

    public WeekMeal getSaturdayLunch() {
        return saturdayLunch;
    }

    public void setSaturdayLunch(WeekMeal saturdayLunch) {
        this.saturdayLunch = saturdayLunch;
    }

    public WeekMeal getSaturdayDinner() {
        return saturdayDinner;
    }

    public void setSaturdayDinner(WeekMeal saturdayDinner) {
        this.saturdayDinner = saturdayDinner;
    }

    public WeekMeal getSundayLunch() {
        return sundayLunch;
    }

    public void setSundayLunch(WeekMeal sundayLunch) {
        this.sundayLunch = sundayLunch;
    }

    public WeekMeal getSundayDinner() {
        return sundayDinner;
    }

    public void setSundayDinner(WeekMeal sundayDinner) {
        this.sundayDinner = sundayDinner;
    }
}
