package fr.choupiteam.menus.application.side.model;

import fr.choupiteam.menus.application.ingredient.model.SelectedIngredient;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sidedish")
public class SideDish {

    /**
     * Mongo id
     */
    @Id
    private String id;

    /**
     * Name of the side dish
     */
    @Searchable
    private String name;

    private List<SelectedIngredient> selectedIngredients;

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
