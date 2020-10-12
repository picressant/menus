import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FoodAuthService } from "../../shared/services/food-auth.service";
import { WeekService } from "../../shared/services/week.service";

@Component({
    selector: 'app-main-shell',
    templateUrl: './main-shell.component.html',
    styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Recettes',
            url: 'recipe',
            icon: 'restaurant'
        },
        {
            title: 'Planning',
            url: 'week',
            icon: 'calendar'
        },
        {
            title: 'Accompagnements',
            url: 'side',
            icon: 'leaf'
        }
    ];

    public adminPages = [
        {
            title: 'Paramètres',
            url: 'parameters',
            icon: 'settings'
        }
    ]

    constructor(
        private router: Router,
        private foodAuthService: FoodAuthService,
        private weekService: WeekService
    ) {
    }

    goTo(pageToGo: any, isAdmin = false) {
        if (isAdmin) {
            this.selectedIndex = this.adminPages.findIndex(page => page.url.toLowerCase() === pageToGo.url.toLowerCase());
            this.selectedIndex += this.appPages.length;
        }
        else {
            this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === pageToGo.url.toLowerCase());
        }
        this.router.navigate(["main/" + pageToGo.url]);
    }

    ngOnInit() {
        this.weekService.getWeekFromApi();
        const path = window.location.pathname.split('main/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
        }
    }

    get deployUrl() {
        return environment.deployUrl;
    }

    disconnect() {
        this.foodAuthService.logout();
    }
}
