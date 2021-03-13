import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";
import { IngredientModalComponent } from "@components/modals/ingredient-modal/ingredient-modal.component";
import { IngredientRestService } from "@services/ingredient-rest.service";
import { ShopSectionRestService } from "@services/shop-section-rest.service";
import { ShopSection } from "@models/shop-section.model";

@Component({
    selector: 'app-ingredient-modal-selector',
    templateUrl: './ingredient-modal-selector.component.html',
    styleUrls: ['./ingredient-modal-selector.component.scss'],
})
export class IngredientModalSelectorComponent implements OnInit {

    public static modalId = "IngredientModalSelectorComponent_ID";

    @ViewChild(IngredientListComponent) private ingredientList: IngredientListComponent;

    @Input() excludeIds: string[] = [];
    @Input() focusSearchBar: boolean = false;
    @Input() canCreateIngredient: boolean = false;

    private shopSections: ShopSection[];

    constructor(
        private ingredientListModalController: ModalController,
        private innerIngredientModal: ModalController,
        private ingredientRest: IngredientRestService,
        private shopSectionRest: ShopSectionRestService
    ) {
    }

    ngOnInit() {
        this.shopSectionRest.getAllShopSections().subscribe(sections => this.shopSections = sections);
    }

    closeModal(ingredient: Ingredient) {
        this.ingredientListModalController.dismiss({
            'ingredient': ingredient
        }, null, IngredientModalSelectorComponent.modalId);
    }

    async addIngredient(name: string) {
        const modal = await this.innerIngredientModal.create({
            component: IngredientModalComponent,
            id: IngredientModalComponent.modalId,
            componentProps: {
                shopSections: this.shopSections,
                name: name,
                fromGrocery: false
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.addIngredient(data.ingredient).subscribe((i) => {
                this.closeModal(i);
            });
        }
    }
}
