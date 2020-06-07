import { Component, OnInit } from '@angular/core';
import { IngredientDialogData } from "../add-ingredient-dialog/ingredient-dialog-data.model";
import { Ingredient } from "@models/ingredient.model";
import { AddIngredientDialogComponent } from "../add-ingredient-dialog/add-ingredient-dialog.component";
import { IngredientRestService } from "../../../services/ingredient-rest.service";
import { MatDialog } from "@angular/material/dialog";
import { AbstractTableComponent } from "../../../../shared/components/table/abstract-table.component";
import { Observable } from "rxjs";
import { Pageable } from "@models/pager/pageable.model";

@Component({
  selector: 'menus-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.less']
})
export class IngredientTableComponent extends AbstractTableComponent<Ingredient> {

  constructor(
    private ingredientService: IngredientRestService,
    public dialog: MatDialog
  ) {
    super();
  }


  onAddIngredient() {
    const data = new IngredientDialogData();
    data.ingredient = null;
    data.units = [];

    this._editIngredient(data);
  }

  onEditIngredient(ingredient: Ingredient) {
    const data = new IngredientDialogData();
    data.ingredient = ingredient;
    data.units = [];

    this._editIngredient(data);
  }

  onDeleteIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(ingredient).subscribe(
      () => this.load()
    );
  }

  private _editIngredient(data: IngredientDialogData) {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.ingredientService.saveIngredient(result).subscribe(
          () => this.load()
        );
    });

  }

  get displayedColumns(): string[] {
    return ['name', 'unit', 'actions'];
  }

  get getData$(): Observable<Pageable<Ingredient>> {
    return this.ingredientService.getIngredients(this.pager);
  }


}
