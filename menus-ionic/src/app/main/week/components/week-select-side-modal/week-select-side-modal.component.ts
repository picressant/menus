import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SideDish } from "@models/sidedish.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { Ingredient } from "@models/ingredient.model";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { IngredientRestService } from "@services/ingredient-rest.service";
import { SideDishRestService } from "@services/sidedish-rest.service";

@Component({
  selector: 'app-week-select-side-modal',
  templateUrl: './week-select-side-modal.component.html',
  styleUrls: ['./week-select-side-modal.component.scss'],
})
export class WeekSelectSideModalComponent implements OnInit {
  sides: SideDish[] = [];

  private pager: Pager;
  private pageableSides: Pageable<SideDish>;

  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  @Input()
  excludeIds: string[];

  constructor(
      private modalController: ModalController,
      private sideRest: SideDishRestService
  ) {
    this.pager = new Pager(20);
  }

  ngOnInit() {
    this.loadSides(null);
  }

  closeModal(side: SideDish) {
    this.sides = [];
    this.pager = new Pager(20);
    this.toggleInfiniteScroll();
    this.modalController.dismiss({
      'side': side
    });
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
}
