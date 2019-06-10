import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ingredient } from '../../../../shared/models/ingredient.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientQuantity } from '../../../../shared/models/ingredient-quantity.model';
import { IngredientQuantityDialog } from './ingredient-quantity-dialog.model';

@Component({
  selector: 'menus-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.less']
})
export class AddIngredientDialogComponent implements OnInit {
  
  form: FormGroup;

  ingredients: Ingredient[];
  
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IngredientQuantityDialog
) {
      this.form = this.formBuilder.group({
        ingredient: [null, Validators.required],
        quantity: ['', Validators.required],
      });

      this.ingredients = data.ingredients;
      console.log(this.data);
      if (this.data.index > -1) {
        this.form.patchValue(this.data.ingredientQuantity);
        this.form.get('ingredient').setValue(this.data.ingredients.find( i => i.id === this.data.ingredientQuantity.ingredient.id));
      }

    }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    const ingredientQuantity = new IngredientQuantity();
    ingredientQuantity.ingredient = this.form.get('ingredient').value;
    ingredientQuantity.quantity = this.form.get('quantity').value;

    this.data.ingredientQuantity = ingredientQuantity;
    
    this.dialogRef.close(this.data);
  }

  get getSymbol() {
    if (this.form.get('ingredient').value !== null)
      return this.form.get('ingredient').value.unit.symbol
    else
      return "";
    }
}
