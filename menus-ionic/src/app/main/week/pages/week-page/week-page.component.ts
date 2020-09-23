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

    todayLunch: WeekMeal;
    todayDinner: WeekMeal;

    isEditingWeek = false;

    meals: WeekMeal[] = [];

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

    ionViewWillEnter() {
        this.route.queryParams.subscribe(params => {
            if (params.isEditing) {
                this.selectedTab = this.footerWeek.selectedTab;
                this.isEditingWeek = true;
            }
        })
    }

    changeTodayMeal() {
        const currentDate = new Date();
        let day = currentDate.getDay();
        const currentWeek = this.weekService.getWeek();

        if (currentWeek) {
            if (day === 0) {
                this.todayLunch = currentWeek.sundayLunch;
                this.todayDinner = currentWeek.sundayDinner;
            }
            else if (day === 1) {
                this.todayLunch = currentWeek.mondayLunch;
                this.todayDinner = currentWeek.mondayDinner;
            }
            else if (day === 2) {
                this.todayLunch = currentWeek.tuesdayLunch;
                this.todayDinner = currentWeek.tuesdayDinner;
            }
            else if (day === 3) {
                this.todayLunch = currentWeek.wednesdayLunch;
                this.todayDinner = currentWeek.wednesdayDinner;
            }
            else if (day === 4) {
                this.todayLunch = currentWeek.thursdayLunch;
                this.todayDinner = currentWeek.thursdayDinner;
            }
            else if (day === 5) {
                this.todayLunch = currentWeek.fridayLunch;
                this.todayDinner = currentWeek.fridayDinner;
            }
            else if (day === 6) {
                this.todayLunch = currentWeek.saturdayLunch;
                this.todayDinner = currentWeek.saturdayDinner;
            }
        }
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

    goToRecipe(meal: WeekMeal) {
        if (meal && meal.recipe) {
            this.router.navigate(["main/recipe", meal.recipe.id]);
        }
    }

    editWeek() {
        this.isEditingWeek = true;
    }

    saveWeek() {
        this.weekService.saveAllMeals(this.meals);
        this.isEditingWeek = false;
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

    editMeal(i: number) {
        this.router.navigate(["main/week", i]);
    }
}
