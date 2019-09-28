import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Unit } from 'src/app/shared/models/unit.model';
import { IngredientRestService } from '../../../services/ingredient-rest.service';
import { AddUnitDialogComponent } from '../../components/add-unit-dialog/add-unit-dialog.component';
import { AddIngredientDialogComponent } from '../../components/add-ingredient-dialog/add-ingredient-dialog.component';
import { IngredientDialogData } from '../../components/add-ingredient-dialog/ingredient-dialog-data.model';

@Component({
  selector: 'menus-parameters-page-management',
  templateUrl: './parameters-management-page.component.html',
  styleUrls: ['./parameters-management-page.component.less']
})
export class ParametersManagementPageComponent implements OnInit {

  displayedColumnsIngredients: string[] = ['name', 'unit', 'actions'];
  dataSourceIngredients = new MatTableDataSource<Ingredient>()  ;

  displayedColumnsUnits: string[] = ['name', 'symbol', 'actions'];
  dataSourceUnits = new MatTableDataSource<Unit>()  ;

  constructor(
    public dialog: MatDialog,
    private ingredientService: IngredientRestService
  ) { }

  ngOnInit() {
    this._loadIngredients();
    this._loadUnits();
  }

  private _loadUnits() {
    this.ingredientService.getUnits().subscribe(
      (units: Unit[]) => this.dataSourceUnits.data = units
    );
  }

  private _loadIngredients() {
    this.ingredientService.getIngredients().subscribe(
      (ingredients: Ingredient[]) => this.dataSourceIngredients.data = ingredients
    );

  }

  onAddUnit() {
    this._editUnit(null);
  }

  onDeleteUnit(unit: Unit) {
    this.ingredientService.deleteUnit(unit).subscribe(
      () => this._loadUnits()
    );
  }

  onEditUnit(unit: Unit) {
    this._editUnit(unit);
  }

  private _editUnit(unit: Unit) {
    const dialogRef = this.dialog.open(AddUnitDialogComponent, {
      data: unit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.ingredientService.saveUnit(result).subscribe(
          () => this._loadUnits()
        );
    });
  }

  onAddIngredient() {
    const data = new IngredientDialogData();
    data.ingredient = null;
    data.units = this.dataSourceUnits.data;

    this._editIngredient(data);
  }

  onEditIngredient(ingredient: Ingredient) {
    const data = new IngredientDialogData();
    data.ingredient = ingredient;
    data.units = this.dataSourceUnits.data;

    this._editIngredient(data);
  }

  onDeleteIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(ingredient).subscribe(
      () => this._loadIngredients()
    );
  }

  private _editIngredient(data: IngredientDialogData) {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.ingredientService.saveIngredient(result).subscribe(
          () => this._loadIngredients()
        );
    });

  }

}
