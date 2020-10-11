import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SideDish } from "@models/sidedish.model";
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { SideDishRestService } from "@services/sidedish-rest.service";

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
})
export class SideListComponent implements OnInit {

  sides: SideDish[] = [];

  private pager: Pager;
  private pageableSides: Pageable<SideDish>;

  @Output()
  selected: EventEmitter<SideDish> = new EventEmitter<SideDish>();

  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  @Input()
  excludeIds: string[];

  @Input()
  showIngredients = true;

  @Input()
  set loadOnInit(load: boolean) {
    if (load)
      this.refresh(null);
  }

  _loadOnInit: boolean = false;

  constructor(
      private sideRest: SideDishRestService
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
    this.sides = [];
    this.loadSides(event);
  }

  searchSides(text: string) {
    this.pager.page = 0;
    this.pager.search = text;
    this.sides = [];
    this.loadSides(null);
  }

  scrollSides(event) {
    if (this.pager.page < this.pageableSides.totalPages) {
      this.pager.page++;
      this.loadSides(event);
    }
    else {
      event.component.disableInfiniteScroll();
    }
  }

  private loadSides(event) {
    this.pager.excludeIds = this.excludeIds;
    this.sideRest.getSideDishes(this.pager).subscribe((pageableResult: Pageable<SideDish>) => {
      this.sides = this.sides.concat(pageableResult.content);
      this.pageableSides = pageableResult;
      this.toggleInfiniteScroll();

      if (event) {
        event.target.complete();
      }
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = (this.pager.page >= this.pageableSides.totalPages)
  }

  getIngredients(side: SideDish) {
    return side.ingredients.map(value => value.ingredient.name).join(", ");
  }

  selectSide(side: SideDish) {
    this.selected.emit(side);
  }
}
