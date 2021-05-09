import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { Unit } from "@models/unit.model";
import { IngredientRestService } from "@services/ingredient-rest.service";
import { removeFromArray } from "@helpers/remove-array-element.function";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";

@Component({
    selector: 'app-unit-list',
    templateUrl: './unit-list.component.html',
    styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {

    units: Unit[] = [];

    private pager: Pager;
    private pageableUnits: Pageable<Unit>;

    @Output()
    selected: EventEmitter<Unit> = new EventEmitter<Unit>();

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Input()
    public excludeIds: string[];

    @Input()
    set loadOnInit(load: boolean) {
        if (load)
            this.refresh(null);
    }

    _loadOnInit: boolean = false;

    deleteIndex: number = -1;

    constructor(
        private unitRest: IngredientRestService,
        private confirmationService: ConfirmationAlertService
    ) {
        this.pager = new Pager(20);
        this.pager.orders.push(new Order("name", Direction.ASC));
    }

    ngOnInit() {
        if (this._loadOnInit)
            this.refresh(null);
    }

    refresh(event: any) {
        this.pager.page = 0;
        this.units = [];
        this.loadUnits(event);
    }

    searchUnits(text: string) {
        this.pager.page = 0;
        this.pager.search = text;
        this.units = [];
        this.loadUnits(null);
    }

    scrollUnits(event) {
        if (this.pager.page < this.pageableUnits.totalPages) {
            this.pager.page++;
            this.loadUnits(event);
        }
        else {
            event.component.disableInfiniteScroll();
        }
    }

    private loadUnits(event) {
        this.pager.excludeIds = this.excludeIds;
        this.unitRest.getUnits(this.pager).subscribe((pageableResult: Pageable<Unit>) => {
            this.units = this.units.concat(pageableResult.content);
            this.pageableUnits = pageableResult;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.pageableUnits.totalPages)
    }

    selectUnit(unit: Unit) {
        this.selected.emit(unit);
    }

    deleteUnit(unit: Unit) {
        this.confirmationService.confirm("Supprimer l'unité \"" + unit.name + "\" ?", () => {
            this.unitRest.deleteUnit(unit).subscribe(() => {
                removeFromArray(this.units, unit)
            });
        });
    }
}
