import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientQuantity } from '../../../shared/models/ingredient-quantity.model';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { Recipe } from '../../../shared/models/recipe.model';
import { IngredientRestService } from '../../services/ingredient-rest.service';
import { RecipeRestService } from '../../services/recipe-rest.service';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { IngredientQuantityDialog } from './add-ingredient-dialog/ingredient-quantity-dialog.model';

@Component({
  selector: 'menus-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.less']
})
export class RecipeShowComponent implements OnInit {

  @ViewChild('wrapper') container: ElementRef;

  recipeForm: FormGroup;
  _id: string;
  _isCreationMode: boolean;
  _isEditable: boolean;
  _isRecipe = true;

  ingredients: Ingredient[] = [];

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];
  dataSource = new MatTableDataSource<IngredientQuantity>();

  constructor(private formBuilder: FormBuilder,
    private recipeRest: RecipeRestService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private ingredientService: IngredientRestService) {

    this._isEditable = false;
    this._id = this.route.snapshot.paramMap.get("id");

    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      preparationTime: ['', Validators.required],
      cookingTime: [''],
      persons: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this._isCreationMode = (this._id === null);

    if (!this._isCreationMode) {
      this._loadRecipe();
    }
    else {
      this._isEditable = true;
    }

    this.ingredientService.getIngredients().subscribe(
      (ingredients) => this.ingredients = ingredients
    )
  }

  public hasError(controlName: string, errorName: string) {
    return this.recipeForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (!this._isEditable) {
      this.recipeForm.enable();
      this._isEditable = true;
    }
    else {
      if (this._isCreationMode) {
        this.recipeRest.addRecipe(this._rebuildRecipe()).subscribe(
          (recipe: Recipe) => {
            this.recipeForm.reset(recipe);
            this.recipeForm.disable();
            this._isEditable = false;

            this._id = recipe.id;
            this._isCreationMode = false;
            this.snackBar.open('Recette ajoutée', 'Ok', {
              duration: 3000
            });
          },
          (error) => alert(error.customMessage)
        );
      }
      else {
        this.recipeRest.updateRecipe(this._rebuildRecipe()).subscribe(
          (recipe: Recipe) => {
            this.recipeForm.reset(recipe);
            this.recipeForm.disable();
            this._isEditable = false;

            this.snackBar.open('Recette modifiée', 'Ok', {
              duration: 3000
            });
          },
          (error) => alert(error.customMessage)
        );
      }
    }
  }

  onDelete() {
    this.recipeRest.deleteRecipe(this._id).subscribe(
      () => {
        this.snackBar.open('Recette supprimée', 'Ok', {
          duration: 3000
        });
        this.router.navigate(['']);
      },
      (error) => {
        alert(error.customMessage);
      }
    )
  }

  private _rebuildRecipe() {
    const recipe = new Recipe();
    recipe.name = this.recipeForm.controls.name.value;
    recipe.preparationTime = this.recipeForm.controls.preparationTime.value;
    recipe.cookingTime = this.recipeForm.controls.cookingTime.value;
    recipe.persons = this.recipeForm.controls.persons.value;

    recipe.ingredients = this.dataSource.data as IngredientQuantity[];

    recipe.id = this._id;

    return recipe;
  }


  private _loadRecipe() {
    this.recipeRest.getRecipe(this._id).subscribe((recipe: Recipe) => {
      this.recipeForm.reset(recipe);
      this.recipeForm.disable();

      this.dataSource.data = recipe.ingredients;

      this._isEditable = false;
    });
  }

  addIngredient() {
    const data = new IngredientQuantityDialog();
    data.ingredients = this.ingredients;
    data.ingredientQuantity = null;
    data.index = -1;

    this._editIngredient(data);
  }

  onEditIngredient(ingredientQuantity: IngredientQuantity, index: number) {
    const data = new IngredientQuantityDialog();
    data.ingredients = this.ingredients;
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
    let temp = this.dataSource.data.filter(i => i !== ingredientQuantity);
    this.dataSource.data = temp;
  }
}
