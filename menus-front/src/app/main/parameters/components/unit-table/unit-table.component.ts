import { Component } from '@angular/core';
import { AbstractTableComponent } from "../../../../shared/components/table/abstract-table.component";
import { Unit } from "../../../../shared/models/unit.model";
import { IngredientRestService } from "../../../services/ingredient-rest.service";
import { AddUnitDialogComponent } from "../add-unit-dialog/add-unit-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'menus-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.less']
})
export class UnitTableComponent extends AbstractTableComponent<Unit> {
  constructor(
    private ingredientService: IngredientRestService,
    public dialog: MatDialog
  ) {
    super();
  }

  get getData$() {
    return this.ingredientService.getUnits(this.pager);
  }

  get displayedColumns(): string[] {
    return ['name', 'symbol', 'actions'];
  }

  addUnit() {
    this._editUnit(null);
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
          () => this.load()
        );
    });
  }

  onDeleteUnit(unit: Unit) {
    this.ingredientService.deleteUnit(unit).subscribe(
      () => this.load()
    );
  }
}
