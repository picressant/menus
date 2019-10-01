import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from "../../../../shared/models/recipe.model";
import { Router } from "@angular/router";

@Component({
  selector: 'menus-recipe-item-card',
  templateUrl: './recipe-item-card.component.html',
  styleUrls: ['./recipe-item-card.component.less']
})
export class RecipeItemCardComponent implements OnInit {

  @Input()
  recipe: Recipe;

  @Input()
  isWeekSearch: boolean = false;

  @Output()
  choose = new EventEmitter<Recipe>();

  selectText = "Voir plus";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isWeekSearch) {
      this.selectText = "Selectionner";
    }
  }

  selectRecipe() {
    if (this.isWeekSearch)
      this.choose.emit(this.recipe);
    else {
      this.router.navigate(['main/recipe', this.recipe.id]);
    }
  }

  get imgStyles() {
    return {
      width: '75px',
      height: '75px',
      'border-radius': '10px',
      'object-fit': 'cover'
    };
  }
}
