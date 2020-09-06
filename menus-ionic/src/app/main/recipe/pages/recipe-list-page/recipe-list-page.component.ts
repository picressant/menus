import { Component, OnInit } from '@angular/core';
import { Recipe } from "@models/recipe.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { RecipeRestService } from "../../service/recipe-rest.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.scss'],
})
export class RecipeListPageComponent implements OnInit {

  recipes: Recipe[] = [];
  private pager: Pager;
  private currentPageable: Pageable<Recipe>;

  constructor(
      private recipeRest: RecipeRestService,
      private router: Router
  ) {
    this.pager = new Pager(30);
  }

  ngOnInit() {
    this._load();
  }

  private _load() {
    this.recipeRest.getRecipes(this.pager).subscribe(recipes => {
      this.recipes = this.recipes.concat(recipes.content);
      this.currentPageable = recipes;
    });
  }

  onScrollDown() {
    if (this.pager.page < this.currentPageable.totalPages) {
      this.pager.page++;
      this._load()
    }
  }

  onSearch(search: CustomEvent) {
    this.pager.search = search.detail.value;
    this.pager.page = 0;
    this.recipes = [];
    this._load();
  }

  onAdd() {
    this.router.navigate(["main/recipe/add"]);
  }
}
