import { Component } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { WeekService } from "@services/week.service";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { getMealDayStringified, MealDay } from "@models/enums/meal-day.enum";

@Component({
    selector: 'app-week-page',
    templateUrl: './week-page.component.html',
    styleUrls: ['./week-page.component.scss'],
})
export class WeekPageComponent {
    footerDay = {
        name: "Aujourd'hui",
        icon: "today-outline",
        selectedTab: "tab-day"
    }

    footerWeek = {
        name: "Semaine",
        icon: "calendar-outline",
        selectedTab: "tab-week"
    }

    selectedTab: string = this.footerDay.selectedTab;

    todayLunchIndex: number;
    todayDinnerIndex: number;
    todayBreakFastIndex: number;


    meals: WeekMeal[] = [];
    isDeleting: number = undefined;

    constructor(
        private weekService: WeekService,
        private router: Router,
        private route: ActivatedRoute,
        private alertController: AlertController,
        private confirmationService: ConfirmationAlertService
    ) {
        this.meals = this.weekService.meals$.getValue();
        this.changeTodayMeal();

        this.weekService.meals$.subscribe(m => {
            this.meals = m;
            this.changeTodayMeal();
        });
    }

    changeTodayMeal() {
        const currentDate = new Date();
        let day = currentDate.getDay();
        let index = 0;

        if (day === 0) {
            index = 6;
        }
        else {
            index = day - 1;
        }

        this.todayBreakFastIndex = index * 3;
        this.todayLunchIndex = index * 3 + 1;
        this.todayDinnerIndex = index * 3 + 2;

    }

    getDay(mealDay: MealDay) {
        return getMealDayStringified(mealDay);
    }

    clearRecette(index: number) {
        this.weekService.deleteMeal(index);
    }

    doReorder(event: any) {
        const itemToMove = this.meals.splice(event.detail.from, 1)[0];
        this.meals.splice(event.detail.to, 0, itemToMove);

        event.detail.complete();

        this.saveWeek();
    }

    goToRecipe(index: number) {
        this.router.navigate(["main/week", index]);

    }

    saveWeek() {
        this.meals.forEach((meal, index) => meal.weekDayIndex = index);
        this.weekService.saveMeals(this.meals);
    }

    async deleteWeekMeal(i: number) {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            cssClass: 'confirmation-modal',
            message: 'Supprimer ce repas de la semaine ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'cancel'
                }, {
                    cssClass: 'confirmation',
                    text: 'Okay',
                    handler: () => {
                        this.weekService.deleteMeal(i);
                    }
                }
            ]
        });

        await alert.present();
    }

    gotToMeal(i: number) {
        this.isDeleting = undefined;
        this.router.navigate(["main/week", i]);
    }

    async pressEnded(i: number) {
        if (this.isDeleting === i) {
            await this.confirmationService.confirm("Supprimer le repas de " + this.getDay(i) + " ?", () => this.weekService.deleteMeal(i));
            this.isDeleting = undefined;
        }
    }
}
