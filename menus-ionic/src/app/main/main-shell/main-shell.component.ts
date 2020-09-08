import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { environment } from "../../../environments/environment";

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
            icon: 'list'
        },
    ];

    constructor(
        private router : Router,
        private menu: MenuController
    ) {
    }

    goTo(pageToGo: any) {
        this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === pageToGo.url.toLowerCase());
        this.router.navigate(["main/" + pageToGo.url]);
    }

    ngOnInit() {
        const path = window.location.pathname.split('main/')[1];
        console.log(path);
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
        }
    }

    get deployUrl() {
        return environment.deployUrl;
    }

}
