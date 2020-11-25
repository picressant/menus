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
  recipe: Recipe;

  loadedImg = false;

  constructor() { }

  ngOnInit() {}

  onImageLoad() {
    this.loadedImg = true;
  }

}
