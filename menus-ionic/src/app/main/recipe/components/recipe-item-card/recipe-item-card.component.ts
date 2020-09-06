import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "@models/recipe.model";

@Component({
  selector: 'app-recipe-item-card',
  templateUrl: './recipe-item-card.component.html',
  styleUrls: ['./recipe-item-card.component.scss'],
})
export class RecipeItemCardComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor() { }

  ngOnInit() {}

}
