import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../../shared/models/recipe.model';
import { RecipeRestService } from '../../../services/recipe-rest.service';
import { Router } from '@angular/router';
import { Pager } from "../../../../shared/models/pager/pager.model";
import { Pageable } from "../../../../shared/models/pager/pageable.model";

@Component({
  selector: 'menus-recipe-search',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.less']
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

  addRecipe() {
    this.router.navigate(['main/recipe/add']);
  }

  onSearch(search: string) {
    this.pager.search = search;
    this.pager.page = 0;
    this.recipes = [];
    this._load();
  }

  onSelectRecipe(recipe: Recipe) {
    this.router.navigate(['main/recipe', recipe.id]);
  }

  onScrollDown() {
    if (this.pager.page < this.currentPageable.totalPages) {
      this.pager.page++;
      this._load()
    }
  }
}
