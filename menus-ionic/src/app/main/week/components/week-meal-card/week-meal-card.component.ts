import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";

@Component({
    selector: 'app-week-meal-card',
    templateUrl: './week-meal-card.component.html',
    styleUrls: ['./week-meal-card.component.scss'],
})
export class WeekMealCardComponent implements OnInit {

    @Input()
    meal: WeekMeal;
    imgStyles: any;

    @Input()
    showSides: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
