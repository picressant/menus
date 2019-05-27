package fr.choupiteam.menus.application.ingredient.model;

public enum IngredientUnit {
    GRAMME("g"),
    KILOGRAMME("kg"),
    LITRE("l"),
    MILILITRE("ml");


    private String stringed;

    IngredientUnit(String stringed) {
        this.stringed = stringed;
    }

    @Override
    public String toString() {
        return this.stringed;
    }
}
