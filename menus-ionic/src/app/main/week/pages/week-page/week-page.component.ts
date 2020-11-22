import { Component } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, PopoverController } from "@ionic/angular";
import { WeekService } from "@services/week.service";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { getMealDayStringified, MealDay } from "@models/enums/meal-day.enum";
import { OptionPopoverComponent } from "@components/popover/option-popover/option-popover.component";
import { FoodAuthService } from "@services/food-auth.service";
import { UserRestService } from "@services/user-rest.service";
import { User } from "@models/user.model";

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

    private currentUser: User;

    constructor(
        private weekService: WeekService,
        private router: Router,
        private route: ActivatedRoute,
        private alertController: AlertController,
        private confirmationService: ConfirmationAlertService,
        private popoverController: PopoverController,
        private authService: FoodAuthService,
        private userService: UserRestService
    ) {
        this.meals = this.weekService.meals$.getValue();
        this.changeTodayMeal();

        this.weekService.meals$.subscribe(m => {
            this.meals = m;
            this.changeTodayMeal();
        });

        this.currentUser = this.authService.user.getValue();
        this.authService.user.subscribe(u => this.currentUser = u);
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
        return getMealDayStringified(mealDay.valueOf());
    }

    isHidden(mealDay: MealDay) {
        return this.authService.user.getValue().daysToShow.findIndex(m => m.valueOf() === mealDay.valueOf()) === -1;
    }

    clearRecipe(index: number) {
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
        await this.confirmationService.confirm("Supprimer le repas de " + this.getDay(i) + " ?", () => this.weekService.deleteMeal(i));
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

    async showOptions(event: any) {
        const options = [
            { clickedResult: "DAYS", text: "Choisir les jours à afficher" }
        ];

        const popover = await this.popoverController.create({
            component: OptionPopoverComponent,
            event: event,
            translucent: true,
            componentProps: {
                options
            }
        });
        popover.present();

        const { data } = await popover.onWillDismiss();
        if (data && data.option) {
            if (data.option === "DAYS") {
                this.showDaysOptions();
            }
        }
    }

    async showDaysOptions() {
        const user = this.authService.user.getValue();
        if (!user.daysToShow)
            user.daysToShow = [];
        const allDays = Object.keys(MealDay).filter(k => typeof MealDay[k as any] === "number").map(k => MealDay[k as any]);
        const inputs = [];

        allDays.forEach(val => {
            const intValue = parseInt(val);
            inputs.push({
                name: 'day',
                type: 'checkbox',
                label: getMealDayStringified(intValue),
                value: val,
                checked: user.daysToShow.findIndex(meal => meal.valueOf() === intValue) > -1
            });
        });

        const alert = await this.alertController.create({
            header: 'Choisir les jours à afficher',
            inputs: inputs,
            buttons: [
                {
                    text: 'Annuler',
                    role: "cancel"
                }, {
                    text: 'Valider',
                    handler: (alertData) => {
                        user.daysToShow = alertData;
                        this.userService.saveUser(user).subscribe(user => {
                           if (this.authService.user.getValue().id === user.id)
                               this.authService.user.next(user);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

}
