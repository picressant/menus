import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";
import { ShopSection } from "@models/shop-section.model";
import { IngredientRestService } from "@services/ingredient-rest.service";
import { ShopSectionRestService } from "@services/shop-section-rest.service";
import { ModalController } from "@ionic/angular";
import { IngredientModalComponent } from "@components/modals/ingredient-modal/ingredient-modal.component";
import { Ingredient } from "@models/ingredient.model";

@Component({
    selector: 'app-ingredients-page',
    templateUrl: './ingredients-page.component.html',
    styleUrls: ['./ingredients-page.component.scss'],
})
export class IngredientsPageComponent implements OnInit {

    @ViewChild("recipeIngredientList")
    private ingredientListComponent: IngredientListComponent;

    @ViewChild("noRecipeIngredientList")
    private ingredientNoRecipeListComponent: IngredientListComponent;

    footerIngredient = {
        name: "Ingrédients",
        icon: "nutrition-outline",
        selectedTab: "nutrition-ingredient"
    }

    footerIngredientNoRecipe = {
        name: "Produits",
        icon: "shirt-outline",
        selectedTab: "item-section"
    }

    selectedTab: string = this.footerIngredient.selectedTab;

    shopSections: ShopSection[] = [];

    constructor(
        private ingredientRest: IngredientRestService,
        private shopSectionRest: ShopSectionRestService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.loadShopSections();
    }

    private loadShopSections() {
        this.shopSectionRest.getAllShopSections().subscribe(sections => this.shopSections = sections);
    }

    async onAdd() {
        if (this.selectedTab === this.footerIngredient.selectedTab)
            await this.addIngredient(true);
        else
            await this.addIngredient(false);
    }

    async addIngredient(forRecipe: boolean) {
        const modal = await this.modalController.create({
            component: IngredientModalComponent,
            id: IngredientModalComponent.modalId,
            componentProps: {
                shopSections: this.shopSections,
                forRecipe: forRecipe
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.addIngredient(data.ingredient).subscribe(() => {
                if (this.footerIngredientNoRecipe.selectedTab === this.selectedTab)
                    this.ingredientNoRecipeListComponent.refresh(null)
                else
                    this.ingredientListComponent.refresh(null);
            });
        }
    }

    doRefresh(event: any) {
        if (this.selectedTab === this.footerIngredient.selectedTab)
            this.ingredientListComponent.refresh(event);
        else if (this.selectedTab === this.footerIngredientNoRecipe.selectedTab)
            this.ingredientNoRecipeListComponent.refresh(event);
    }

    async onClickIngredient(ingredient: Ingredient) {
        const modal = await this.modalController.create({
            component: IngredientModalComponent,
            id: IngredientModalComponent.modalId,
            componentProps: {
                ingredient,
                shopSections: this.shopSections
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.saveIngredient(data.ingredient).subscribe(() => {
                if (this.footerIngredientNoRecipe.selectedTab === this.selectedTab)
                    this.ingredientNoRecipeListComponent.refresh(null)
                else
                    this.ingredientListComponent.refresh(null);
            });
        }
    }
}
