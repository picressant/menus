import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeRestService } from '../../services/recipe-rest.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Search } from 'src/app/shared/models/search.model';

@Component({
  selector: 'menus-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.less']
})
export class RecipeSearchComponent implements OnInit {


  searchValue = '';
  _selectText = "Voir plus";
  _isLoading = false;

  _isLoadingID: any;

  recipes: Recipe[];

  @Input()
  isWeekSearch: boolean;

  @Output()
  choose: EventEmitter<Recipe>;

  constructor(
    private recipeRest: RecipeRestService,
    private router: Router
  ) {
    this.isWeekSearch = false;
    this.choose = new EventEmitter<Recipe>();
  }

  ngOnInit() {
    if (this.isWeekSearch) {
      this._selectText = "Selectionner";
    }
    this._searchRecipe();
  }

  private _setLoading() {
    this._isLoadingID = setTimeout(() => this._isLoading = true, 300);
  }

  private _clearLoading() {
    clearTimeout(this._isLoadingID);
    this._isLoading = false;
  }

  onChangeEvent() {
    this._searchRecipe();
  }

  private _searchRecipe() {
    this._setLoading();
    let search = new Search();
    search.term = this.searchValue;

    this.recipeRest.searchRecipe(search)
      .pipe(finalize(() => this._clearLoading()))
      .subscribe((recipes: Recipe[]) => this.recipes = recipes,
        (err) => alert(err));
  }

  selectRecipe(iRecette: Recipe) {
    if (this.isWeekSearch)
      this.choose.emit(iRecette);
    else {
      this.router.navigate(['recipe', iRecette.id]);
    }
  }

  addRecipe() {
    this.router.navigate(['recipe/add']);
  }

}
