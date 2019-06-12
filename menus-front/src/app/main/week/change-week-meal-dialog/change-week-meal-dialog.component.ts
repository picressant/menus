import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangeWeekMealDialogData } from './change-week-meal-dialog-data.model';
import { WeekMeal } from 'src/app/shared/models/week-meal.model';

@Component({
  selector: 'menus-change-week-meal-dialog',
  templateUrl: './change-week-meal-dialog.component.html',
  styleUrls: ['./change-week-meal-dialog.component.less']
})
export class ChangeWeekMealDialogComponent implements OnInit {

  form: FormGroup;
  isModification: boolean;

  constructor(
    public dialogRef: MatDialogRef<ChangeWeekMealDialogComponent>,
    private build: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ChangeWeekMealDialogData
  ) {
    this.form = this.build.group({
      recipe: [null, Validators.required],
      sideDishes: [[], Validators.required]
    });

    if (data.weekmeal !== null) {
      this.form.reset(data.weekmeal);
    }
    this.isModification = (data.weekmeal !== null);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    console.log(this.form.get('sideDishes').value);
    const meal = new WeekMeal();
    meal.recipe = this.form.get('recipe').value;
    meal.sideDishes= this.data.sidedishes.filter( (dish) => this.form.get('sideDishes').value.includes(dish.id));

    this.dialogRef.close(meal);
  }
}
