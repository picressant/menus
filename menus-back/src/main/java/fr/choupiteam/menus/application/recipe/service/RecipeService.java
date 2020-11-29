package fr.choupiteam.menus.application.recipe.service;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.recipe.model.BookRecipe;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.recipe.model.RecipeListWrapper;
import fr.choupiteam.menus.application.recipe.model.RecipePageWrapper;
import fr.choupiteam.menus.application.week.service.WeekService;
import fr.choupiteam.menus.infrastructure.repository.RecipePictureRepository;
import fr.choupiteam.menus.infrastructure.repository.RecipeRepository;
import fr.choupiteam.menus.infrastructure.rest.error.ResponseError;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

@Service
public class RecipeService {

    private static final String DEFAULT_RECIPE_PATH = "defaults/default-recipe.png";
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipePictureRepository recipePictureRepository;

    @Autowired
    private WeekService weekService;

    public Optional<Recipe> getRecipe(String id) {
        return this.recipeRepository.findById(id);
    }

    public Recipe addRecipe(Recipe recipe) {
        this.checkAlreadyExistByName(recipe.getName());
        return this.recipeRepository.insert(recipe);
    }

    private void checkAlreadyExistByName(String name) {
        if (this.recipeRepository.countAllByNameAndClass(name, BookRecipe.class.getName()) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Une recette existe déjà avec le nom " + name);
        }
    }

    public Recipe saveRecipe(Recipe recipe) {
        this.checkAlreadyExistByName(recipe.getName());
        recipe = this.recipeRepository.save(recipe);
        return recipe;
    }

    public Page<Recipe> findByPager(Pager pager) {
        Page<Recipe> page = this.recipeRepository.findAllByPager(pager, Recipe.class);
        RecipeListWrapper content = new RecipeListWrapper();
        content.addAll(page.getContent());
        return new RecipePageWrapper(content, page.getPageable(), page.getTotalElements());
    }

    public void storePicture(Recipe recipe, MultipartFile file) {
        try {
            this.recipePictureRepository.removeForRecipe(recipe.getId());
            this.recipePictureRepository.store(recipe, file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        }
        catch (IOException e) {
            log.error(e.getMessage(), e.getCause());
        }
    }

    public ResponseEntity getPicture(String id) {
        return this.recipePictureRepository.findForRecipe(id).map(gridFsResource -> {
            try {
                byte[] data = IOUtils.toByteArray(gridFsResource.getInputStream());
                return ResponseEntity
                        .ok()
                        .contentType(MediaType.valueOf(gridFsResource.getContentType()))
                        .body(data);
            }
            catch (IOException e) {
                log.error(e.getMessage(), e.getCause());
                return getDefaultPicture();
            }
        }).orElse(getDefaultPicture());
    }

    private ResponseEntity getDefaultPicture() {
        try {
            byte[] data = IOUtils.toByteArray(new ClassPathResource(DEFAULT_RECIPE_PATH).getInputStream());
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(data);
        }
        catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public void deleteRecipe(String id) {
        this.getRecipe(id).ifPresent(recipe -> {
            this.weekService.clearRecipeFromWeeks(recipe);
            this.recipeRepository.delete(recipe);
        });
    }
}
