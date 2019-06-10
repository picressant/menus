import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { Unit } from 'src/app/shared/models/unit.model';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { SidedishDialogData } from './sidedish-dialog-data.model';
import { IngredientQuantity } from 'src/app/shared/models/ingredient-quantity.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'menus-sidedish-dialog',
  templateUrl: './sidedish-dialog.component.html',
  styleUrls: ['./sidedish-dialog.component.less']
})
export class SidedishDialogComponent implements OnInit {

  form: FormGroup;
  isModification: boolean;

  ingredientsQuantity: IngredientQuantity[] = [new IngredientQuantity()];

  constructor(
    public dialogRef: MatDialogRef<SidedishDialogComponent>,
    private build: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SidedishDialogData
  ) { 
    this.form = this.build.group({
      id: [null],
      name: ['', Validators.required]
    });

    if (data.side !== null) {
      this.form.reset(data.side);
      this.ingredientsQuantity = this.data.side.ingredients;
      console.log(this.ingredientsQuantity);
    }
      

    this.isModification = (data.side !== null);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    const side = new SideDish();
    side.id = this.form.get('id').value;
    side.name = this.form.get('name').value;
    side.ingredients = this.ingredientsQuantity;

    this.dialogRef.close(side);
  }

  addLine() {
    this.ingredientsQuantity.push(new IngredientQuantity());
  }

  onIngredientChange(changeEvent: MatSelectChange, index: number) {
    this.ingredientsQuantity[index].ingredient = changeEvent.value;
    console.log(this.ingredientsQuantity);
  }


}
