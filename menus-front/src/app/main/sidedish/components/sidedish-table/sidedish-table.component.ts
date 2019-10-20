import { Component } from '@angular/core';
import { SideDish } from "../../../../shared/models/sidedish.model";
import { SidedishDialogData } from "../sidedish-dialog/sidedish-dialog-data.model";
import { SidedishDialogComponent } from "../sidedish-dialog/sidedish-dialog.component";
import { AbstractTableComponent } from "../../../../shared/components/table/abstract-table.component";
import { MatDialog } from "@angular/material/dialog";
import { SideDishRestService } from "../../../services/sidedish-rest.service";
import { Observable } from "rxjs";
import { Pageable } from "../../../../shared/models/pager/pageable.model";

@Component({
  selector: 'menus-sidedish-table',
  templateUrl: './sidedish-table.component.html',
  styleUrls: ['./sidedish-table.component.less']
})
export class SidedishTableComponent extends AbstractTableComponent<SideDish> {

  constructor(
    private sideDishService: SideDishRestService,
    public dialog: MatDialog
  ) {
    super();
  }

  getIndredients(side: SideDish) {
    return side.ingredients.map(i => i.ingredient.name).join(", ");
  }

  onAddSidedish() {
    const data = new SidedishDialogData();
    data.side = null;

    this._editdish(data);
  }

  onEditSideDish(side: SideDish) {
    const data = new SidedishDialogData();
    data.side = side;

    this._editdish(data);
  }

  private _editdish(data: SidedishDialogData) {
    const dialogRef = this.dialog.open(SidedishDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.sideDishService.saveSide(result).subscribe(
          () => this.load()
        );
    });
  }

  onDeleteSide(side: SideDish) {
    this.sideDishService.deleteSide(side).subscribe(
      () => this.load()
    );
  }

  get displayedColumns(): string[] {
    return ['name', 'ingredients', 'actions'];
  }

  get getData$(): Observable<Pageable<SideDish>> {
    return this.sideDishService.getSideDishes(this.pager);
  }

}
