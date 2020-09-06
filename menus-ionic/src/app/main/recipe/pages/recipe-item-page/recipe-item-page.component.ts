import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { AbstractItemPage } from "../../../../shared/pages/abstract-item-page";
import { Recipe } from "@models/recipe.model";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { RecipeRestService } from "../../service/recipe-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-recipe-item-page',
  templateUrl: './recipe-item-page.component.html',
  styleUrls: ['./recipe-item-page.component.scss'],
})
export class RecipeItemPageComponent extends AbstractItemPage<Recipe> implements OnInit {

  constructor(private fb: FormBuilder,
              private recipeRest: RecipeRestService,
              private route: ActivatedRoute,
              private toaster: ToastController,
              private router: Router) {

    super(route, toaster,"Recette modifiée avec succès", "Recette ajoutée avec succès");
    this.form = Recipe.form(this.fb);
  }


  get get$(): Observable<Recipe> {
    return this.recipeRest.getRecipe(this.id);
  }

  get create$(): Observable<Recipe> {
    return undefined;
  }

  get save$(): Observable<Recipe> {
    return undefined;
  }
  

}
