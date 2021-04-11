import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { SelectedIngredient } from "@models/selected-ingredient.model";

@Component({
  selector: 'app-ingredients-quantity-list',
  templateUrl: './ingredients-quantity-list.component.html',
  styleUrls: ['./ingredients-quantity-list.component.scss'],
})
export class IngredientsQuantityListComponent implements OnInit {

  @Input()
  isReadonly: boolean;

  @Input()
  set selectedIngredients(list: SelectedIngredient[]) {
    this._selectedIngredients = list;
    this.sortList();
  }

  get selectedIngredients(): SelectedIngredient[] {
    return this._selectedIngredients;
  }

  private _selectedIngredients: SelectedIngredient[];

  @Output()
  delete = new EventEmitter<SelectedIngredient>();

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
          "excludeIds": this.selectedIngredients.map(iq => iq.ingredient.id)
        }
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();
      if (data.ingredient) {
        this.selectedIngredients[i].ingredient = data.ingredient;
      }
    }
  }

  deleteIngredient(selectedIngredient: SelectedIngredient) {
    this.delete.emit(selectedIngredient);
  }

  private sortList() {
    this._selectedIngredients = this._selectedIngredients.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));
  }

  focusQuantity(ingredient: Ingredient) {
    this.el.nativeElement.querySelector("#ingredient_" + ingredient.id).focus();
  }
}
