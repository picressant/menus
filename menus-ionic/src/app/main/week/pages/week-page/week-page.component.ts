import { Component } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { WeekService } from "../../../../shared/services/week.service";

const days = {
    mondayLunch: 0,
    mondayDinner: 1,
    tuesdayLunch: 2,
    tuesdayDinner: 3,
    wednesdayLunch: 4,
    wednesdayDinner: 5,
    thursdayLunch: 6,
    thursdayDinner: 7,
    fridayLunch: 8,
    fridayDinner: 9,
    saturdayLunch: 10,
    saturdayDinner: 11,
    sundayLunch: 12,
    sundayDinner: 13
};

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

    footerGrocery = {
        name: "Courses",
        icon: "checkbox-outline",
        selectedTab: "tab-grocery"
    }

    selectedTab: string = this.footerDay.selectedTab;

    todayLunchIndex: number;
    todayDinnerIndex: number;


    meals: WeekMeal[] = [];
    isDeleting: number = undefined;

    constructor(
        private weekService: WeekService,
        private router: Router,
        private route: ActivatedRoute,
        private alertController: AlertController
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

        this.todayLunchIndex = index * 2;
        this.todayDinnerIndex = index * 2 + 1;

    }

    getDay(index: number) {
        switch (index) {
            case 0:
                return "Lundi midi";
            case 1:
                return "Lundi soir";
            case 2:
                return "Mardi midi";
            case 3:
                return "Mardi soir";
            case 4:
                return "Mercredi midi";
            case 5:
                return "Mercredi soir";
            case 6:
                return "Jeudi midi";
            case 7:
                return "Jeudi soir";
            case 8:
                return "Vendredi midi";
            case 9:
                return "Vendredi soir";
            case 10:
                return "Samedi midi";
            case 11:
                return "Samedi soir";
            case 12:
                return "Dimanche midi";
            case 13:
                return "Dimanche soir";
        }
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
        this.weekService.saveAllMeals(this.meals);
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
        this.router.navigate(["main/week", i]);
    }

    async longpressed(i: number) {
        this.isDeleting = i;

        const alert = await this.alertController.create({
            header: 'Confirmation',
            cssClass: 'confirmation-modal',
            message: 'Supprimer le repas de ' + this.getDay(i) + ' ?',
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

        this.isDeleting = undefined;
    }
}
