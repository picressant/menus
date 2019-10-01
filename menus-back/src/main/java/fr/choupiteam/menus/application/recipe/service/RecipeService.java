package fr.choupiteam.menus.application.recipe.service;

import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.infrastructure.repository.RecipePictureRepository;
import fr.choupiteam.menus.infrastructure.repository.RecipeRepository;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private static final String DEFAULT_RECIPE_PATH = "defaults/default-recipe.png";;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipePictureRepository recipePictureRepository;

    public Optional<Recipe> getRecipe(String id) {
        return this.recipeRepository.findById(id);
    }

    public Recipe addRecipe(Recipe recipe) {
        return this.recipeRepository.insert(recipe);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return this.recipeRepository.save(recipe);
    }

    public List<Recipe> search(String search) {
        return this.recipeRepository.findAllByNameLike(search);
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
}
