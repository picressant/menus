package fr.choupiteam.menus.infrastructure.importer;

import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.model.ShopSection;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import fr.choupiteam.menus.application.ingredient.service.ShopSectionService;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.application.unit.service.UnitService;
import fr.choupiteam.menus.infrastructure.csv.MyCsvReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class DataImporter {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ImportConfiguration importConfiguration;

    @Autowired
    private ShopSectionService shopSectionService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private IngredientService ingredientService;

    public void run() {
        if (this.importConfiguration.isEnabled()) {
            if (this.importConfiguration.isDelete()) {
                log.info("deleting old before import");
                this.ingredientService.deleteAll();
                this.unitService.deleteAll();
                this.shopSectionService.deleteAll();
            }

            this.importSections();
            this.importUnits();
            this.importIngredients();
        }
    }

    private void importIngredients() {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("data/ingredients.csv").getFile());

        new MyCsvReader().read(file, (columns) -> {
            Ingredient ingredient = new Ingredient();
            String name = columns.get(0).trim().substring(0, 1).toUpperCase() + columns.get(0).trim().substring(1);
            ingredient.setName(name);
            ingredient.setUnit(this.unitService.findUnitByName(columns.get(1).trim()));
            ingredient.setShopSection(this.shopSectionService.findShopByName(columns.get(2).trim()));
            ingredient.setForRecipe(true);

            this.ingredientService.addIngredient(ingredient);
            log.info("Ingredient " + ingredient.getName() + " imported");

        });
    }

    private void importUnits() {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("data/units.csv").getFile());

        new MyCsvReader().read(file, (columns) -> {
            Unit unit = new Unit();
            unit.setName(columns.get(0).trim());
            unit.setSymbol(columns.get(1).trim());

            this.unitService.createUnit(unit);
            log.info("Unit " + unit.getName() + " imported");
        });
    }

    private void importSections() {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("data/sections.csv").getFile());

        new MyCsvReader().read(file, (columns) -> {
            ShopSection shopSection = new ShopSection();
            shopSection.setName(columns.get(0).trim());

            this.shopSectionService.addShopSection(shopSection);
            log.info("Section " + shopSection.getName() + " imported");
        });
    }
}
