import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";

@Component({
  selector: 'app-ingredients-quantity-list',
  templateUrl: './ingredients-quantity-list.component.html',
  styleUrls: ['./ingredients-quantity-list.component.scss'],
})
export class IngredientsQuantityListComponent implements OnInit {

  @Input()
  isReadonly: boolean;

  @Input()
  set ingredientsQuantity(list: IngredientQuantity[]) {
    this._ingredientsQuantity = list;
    this.sortList();
  }

  get ingredientsQuantity(): IngredientQuantity[] {
    return this._ingredientsQuantity;
  }

  private _ingredientsQuantity: IngredientQuantity[];

  @Output()
  delete = new EventEmitter<IngredientQuantity>();

  constructor(
      private modalController: ModalController,
      private el: ElementRef
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

  private sortList() {
    this._ingredientsQuantity = this._ingredientsQuantity.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));
  }

  focusQuantity(ingredient: Ingredient) {
    this.el.nativeElement.querySelector("#ingredient_" + ingredient.id).focus();
  }
}
