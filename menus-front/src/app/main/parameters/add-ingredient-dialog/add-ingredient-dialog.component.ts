import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngredientDialogData } from './ingredient-dialog-data.model';

@Component({
  selector: 'menus-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.less']
})
export class AddIngredientDialogComponent implements OnInit {

  form: FormGroup;
  isModification: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    private build: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IngredientDialogData
  ) { 
    this.form = this.build.group({
      id: [null],
      name: ['', Validators.required],
      unit: [null, Validators.required]
    });

    if (data.ingredient !== null) {
      this.form.reset(data.ingredient);
      this.form.controls.unit.setValue(data.units.find((u) => u.id === data.ingredient.unit.id));
    }
    this.isModification = (data.ingredient !== null);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    const ingredient = new Ingredient();
    ingredient.id = this.form.get('id').value;
    ingredient.name = this.form.get('name').value;
    ingredient.unit = this.form.get('unit').value;

    this.dialogRef.close(ingredient);
  }

}
