package fr.choupiteam.menus.application;

import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.recipe.service.RecipeService;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.model.Privilege;
import fr.choupiteam.menus.application.security.model.Role;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.application.week.service.WeekService;
import fr.choupiteam.menus.infrastructure.importer.DataImporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MenusApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private WeekService weekService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private DataImporter dataImporter;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        try {
            this.userDetailsService.loadUserByUsername("pcressant");
        }
        catch (Exception e) {
            ApplicationUser pcr = new ApplicationUser();
            pcr.setFirstname("Pierre");
            pcr.setLastname("Cressant");
            pcr.setUsername("pcressant");
            pcr.setRole(Role.ROLE_ADMIN);
            pcr.setPrivileges(Arrays.asList(Privilege.DELETE_RECIPE, Privilege.DELETE_SIDE, Privilege.MANAGE_INGREDIENTS, Privilege.MANAGE_USERS));
            this.userDetailsService.generatePassword(pcr, "toto");
            this.userDetailsService.saveUser(pcr);
        }

        this.dataImporter.run();
    }
}
