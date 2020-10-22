package fr.choupiteam.menus.application.recipe.model;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Wrapper for PageImpl of Abstract contact. Used for polymorphic serialization
 */
public class RecipePageWrapper extends PageImpl<Recipe> {

    private RecipeListWrapper listWrapper;

    public RecipePageWrapper(RecipeListWrapper content, Pageable pageable, long total) {
        super(content, pageable, total);
        this.listWrapper = content;
    }

    public RecipePageWrapper(RecipeListWrapper content) {
        super(content);
        this.listWrapper = content;
    }

    @Override
    public List<Recipe> getContent() {
        return this.listWrapper;
    }
}
