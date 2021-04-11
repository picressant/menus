package fr.choupiteam.menus.application.recipe.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import fr.choupiteam.menus.application.ingredient.model.SelectedIngredient;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "recipe")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "jacksonType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = BookRecipe.class, name = "bookRecipe"),
        @JsonSubTypes.Type(value = Recipe.class, name = "recipe")
})
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

    private List<SelectedIngredient> selectedIngredients;

    public Recipe() {
        this.selectedIngredients = new ArrayList<>();
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

    public List<SelectedIngredient> getSelectedIngredients() {
        return selectedIngredients;
    }

    public void setSelectedIngredients(List<SelectedIngredient> selectedIngredients) {
        this.selectedIngredients = selectedIngredients;
    }
}
