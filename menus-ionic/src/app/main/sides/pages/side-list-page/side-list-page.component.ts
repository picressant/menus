import { Component, OnInit, ViewChild } from '@angular/core';
import { SideListComponent } from "@components/lists/side-list/side-list.component";
import { Router } from "@angular/router";
import { SideDish } from "@models/sidedish.model";

@Component({
    selector: 'app-side-list-page',
    templateUrl: './side-list-page.component.html',
    styleUrls: ['./side-list-page.component.scss'],
})
export class SideListPageComponent implements OnInit {

    @ViewChild(SideListComponent)
    sideListComponent: SideListComponent;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.sideListComponent.refresh(null);
    }


    doRefresh(event: any) {
        this.sideListComponent.refresh(event);
    }

    onAdd() {
    }

    goToSide(sideDish: SideDish) {
        this.router.navigate(["main/side", sideDish.id]);
    }
}
