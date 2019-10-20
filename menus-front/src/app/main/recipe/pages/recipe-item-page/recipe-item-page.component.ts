import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientQuantity } from '../../../../shared/models/ingredient-quantity.model';
import { Recipe } from '../../../../shared/models/recipe.model';
import { RecipeRestService } from '../../../services/recipe-rest.service';
import { AddIngredientDialogComponent } from '../../components/add-ingredient-dialog/add-ingredient-dialog.component';
import { IngredientQuantityDialog } from '../../components/add-ingredient-dialog/ingredient-quantity-dialog.model';
import { AbstractItemPage } from "../../../../shared/components/pages/abstract-item-page";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { forkJoin, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'menus-item-page',
  templateUrl: './recipe-item-page.component.html',
  styleUrls: ['./recipe-item-page.component.less']
})
export class RecipeItemPageComponent extends AbstractItemPage<Recipe> implements OnInit {

  @ViewChild('wrapper', { static: false }) container: ElementRef;

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];
  dataSource = new MatTableDataSource<IngredientQuantity>();

  fileUploadError = '';
  imgPreviewURL: any;
  storeCurrentImages: any;

  timestamp: string;

  constructor(private fb: FormBuilder,
              private toaster: ToasterService,
              private recipeRest: RecipeRestService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {

    super(route, toaster, "Recette modifiée avec succès", "Recette ajoutée avec succès");
    this.form = Recipe.form(this.fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addIngredient() {
    const data = new IngredientQuantityDialog();
    data.ingredientQuantity = null;
    data.index = -1;

    this._editIngredient(data);
  }

  onEditIngredient(ingredientQuantity: IngredientQuantity, index: number) {
    const data = new IngredientQuantityDialog();
    data.ingredientQuantity = ingredientQuantity;
    data.index = index;

    this._editIngredient(data);
  }

  private _editIngredient(data: IngredientQuantityDialog) {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe((data: IngredientQuantityDialog) => {
      if (data !== undefined) {
        let temp = this.dataSource.data;
        if (data.index != -1)
          temp[data.index] = data.ingredientQuantity;
        else
          temp.push(data.ingredientQuantity);

        this.dataSource.data = temp;
      }
    });
  }

  onDeleteIngredient(ingredientQuantity: IngredientQuantity) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== ingredientQuantity);
  }

  get create$(): Observable<Recipe> {
    this.form.controls.ingredients.setValue(this.dataSource.data);
    return this.recipeRest.addRecipe(this.form.value);
  }

  get get$(): Observable<Recipe> {
    return this.recipeRest.getRecipe(this.id).pipe(
      tap((val: Recipe) => this.dataSource.data = val.ingredients)
    );
  }

  onCancelAdd() {
    this.router.navigate(['/main/recipe']);
  }

  get save$(): Observable<Recipe> {
    this.form.controls.ingredients.setValue(this.dataSource.data);
    return this.recipeRest.updateRecipe(this.form.value);
  }


  postCreate() {
    if (this.imgPreviewURL != null) {
      this.recipeRest.storePicture(this.id, this.storeCurrentImages[0]).subscribe();
      this.timestamp = new Date().getTime().toString();
      this.imgPreviewURL = null;
      this.storeCurrentImages = null;
    }
  }

  _save() {
    if (this.imgPreviewURL != null) {
      forkJoin([
        this.recipeRest.storePicture(this.id, this.storeCurrentImages[0]),
        this.save$
      ]).subscribe(([res, recipe]) => {
        this.imgPreviewURL = null;
        this.storeCurrentImages = null;
        this.toaster.info(this.saveToast);
        this.resetForm(recipe);
      });
    }
    else {
      this.save$.subscribe(
        (recipe: Recipe) => {
          this.resetForm(recipe);
          this.toaster.info(this.saveToast);
        }
      );
    }
  }

  get imgStyles() {
    return {
      width: '200px',
      height: '200px',
      'border-radius': '10px',
      'object-fit': 'cover'
    };
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.fileUploadError = 'Le fichier doit être une image';
      this.toaster.error(this.fileUploadError);
      return;
    }

    const reader = new FileReader();
    this.storeCurrentImages = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgPreviewURL = reader.result;
    };
  }
}
