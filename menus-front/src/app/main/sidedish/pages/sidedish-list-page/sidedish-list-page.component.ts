import { Component, OnInit } from '@angular/core';
import { SideDishRestService } from '../../../services/sidedish-rest.service';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SidedishDialogComponent } from '../../components/sidedish-dialog/sidedish-dialog.component';
import { SidedishDialogData } from '../../components/sidedish-dialog/sidedish-dialog-data.model';
import { IngredientRestService } from '../../../services/ingredient-rest.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'menus-sidedish-list-page',
  templateUrl: './sidedish-list-page.component.html',
  styleUrls: ['./sidedish-list-page.component.less']
})
export class SidedishListPageComponent implements OnInit {

  sideDishes: SideDish[];

  displayedColumns: string[] = ['name', 'ingredients', 'actions'];
  dataSource = new MatTableDataSource<SideDish>();

  ingredients: Ingredient[] = [];


  constructor(
    private sideDishService: SideDishRestService,
    private ingredientService: IngredientRestService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._loadDishes();
    this.ingredientService.getIngredients().subscribe(
      (ingredients) => this.ingredients = ingredients
    );
  }

  private _loadDishes() {
    this.sideDishService.getSideDishes().subscribe(
      (dishes) => this.dataSource.data = dishes
    );
  }

  getIndredients(side: SideDish) {
    return side.ingredients.map(i => i.ingredient.name).join(", ");
  }

  onAddSidedish() {
    const data = new SidedishDialogData();
    data.side = null;
    data.ingredients = this.ingredients;

    this._editdish(data);
  }

  onEditSideDish(side: SideDish) {
    const data = new SidedishDialogData();
    data.side = side;
    data.ingredients = this.ingredients;

    this._editdish(data);
  }

  private _editdish(data: SidedishDialogData) {
    const dialogRef = this.dialog.open(SidedishDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.sideDishService.saveSide(result).subscribe(
          () => this._loadDishes()
        );
    });
  }

  onDeleteSide(side: SideDish) {
    this.sideDishService.deleteSide(side).subscribe(
      () => this._loadDishes()
    );
  }

}
