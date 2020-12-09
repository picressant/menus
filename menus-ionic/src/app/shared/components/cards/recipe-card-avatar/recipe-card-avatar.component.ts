import { Component, Input, OnInit } from '@angular/core';
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";

@Component({
  selector: 'app-recipe-card-avatar',
  templateUrl: './recipe-card-avatar.component.html',
  styleUrls: ['./recipe-card-avatar.component.scss'],
})
export class RecipeCardAvatarComponent implements OnInit {

  @Input()
  set recipe(val: Recipe) {
    this.innerRecipe = val;
    this.loadedImg = false;
    this.timestamp = new Date().getTime().toString();
  }

  innerRecipe: Recipe;
  timestamp: string;

  loadedImg = false;

  constructor() { }

  ngOnInit() {}

  onImageLoad() {
    this.loadedImg = true;
  }

}
