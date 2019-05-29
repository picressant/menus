import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Ingredient } from '../../models/ingredient.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientQuantity } from '../../models/ingredient-quantity.model';

@Component({
  selector: 'menus-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.less']
})
export class AddIngredientDialogComponent implements OnInit {
  
  form: FormGroup;
  
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
        unit: ['', Validators.required]
      });
    }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onChooseEvent() {
    const ingredient = new IngredientQuantity();
    ingredient.name = this.form.get('name').value;
    ingredient.quantity = this.form.get('quantity').value;
    ingredient.unit = this.form.get('unit').value;

    this.dialogRef.close(ingredient);
  }

}
