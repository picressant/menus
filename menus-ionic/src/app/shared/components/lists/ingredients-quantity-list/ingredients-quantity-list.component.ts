import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-ingredients-quantity-list',
  templateUrl: './ingredients-quantity-list.component.html',
  styleUrls: ['./ingredients-quantity-list.component.scss'],
})
export class IngredientsQuantityListComponent implements OnInit {

  @Input()
  isReadonly: boolean;

  @Input()
  ingredientsQuantity: IngredientQuantity[];

  @Output()
  delete = new EventEmitter<IngredientQuantity>();

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {}


  async changeIngredient(i: number) {
    if (!this.isReadonly) {
      const modal = await this.modalController.create({
        component: IngredientModalSelectorComponent,
        componentProps: {
          "excludeIds": this.ingredientsQuantity.map(iq => iq.ingredient.id)
        }
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();
      if (data.ingredient) {
        this.ingredientsQuantity[i].ingredient = data.ingredient;
      }
    }
  }

  deleteIngredient(ingredientQuantity: IngredientQuantity) {
    this.delete.emit(ingredientQuantity);
  }

}
