import { Component, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekService } from "@services/week.service";
import { ModalController } from "@ionic/angular";
import { WeekSelectRecipeModalComponent } from "../../components/week-select-recipe-modal/week-select-recipe-modal.component";
import { SideDish } from "@models/sidedish.model";

@Component({
    selector: 'app-modify-meal-page',
    templateUrl: './modify-meal-page.component.html',
    styleUrls: ['./modify-meal-page.component.scss'],
})
export class ModifyMealPageComponent implements OnInit {

    meal: WeekMeal;

    mealIndex: number;

    constructor(
        private route: ActivatedRoute,
        private modalController: ModalController,
        private router: Router,
        private weekService: WeekService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.mealIndex = params['index'];

            this.meal = this.weekService.meals$.getValue()[this.mealIndex];
        });

        this.weekService.meals$.subscribe(meals => {
            this.meal = meals[this.mealIndex];
        });
    }

    submit() {
        this.weekService.updateMeal(this.meal, this.mealIndex);
        this.router.navigate(["main/week"], { queryParams: { isEditing: 'true' } });
    }

    async selectMeal() {
        const modal = await this.modalController.create({
            component: WeekSelectRecipeModalComponent,
            componentProps: {
                loadOnInit: true
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data.recipe) {
            if (!this.meal)
                this.meal = new WeekMeal();
            this.meal.recipe = data.recipe;
        }
    }

    addSide() {
        if (!this.meal)
            this.meal = new WeekMeal();

        this.meal.sideDishes.push(new SideDish());
    }
}
