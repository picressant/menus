import { OnInit } from '@angular/core';
import { Order, Pager } from "../../models/pager/pager.model";
import { MatTableDataSource } from "@angular/material/table";
import { Pageable } from "../../models/pager/pageable.model";
import { Observable } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

export abstract class AbstractTableComponent<T> implements OnInit {

  pager: Pager;
  dataSource = new MatTableDataSource<T>();
  pageSizeOptions = [10, 20, 50];
  totalItems: number;

  protected constructor() {
    this.pager = new Pager(10);
  }

  ngOnInit() {
    this.load();
  }

  protected load() {
    this.getData$.subscribe(data => {
      this.dataSource.data = data.content;
      this.totalItems = data.totalElements;
    });
  }

  abstract get getData$(): Observable<Pageable<T>>;

  abstract get displayedColumns(): string[];


  onChangePager(event: PageEvent) {
    this.pager.page = event.pageIndex;
    this.pager.itemsPerPage = event.pageSize;
    this.load();
  }

  onSortChange(order: Order) {
    let existingOrder = this.pager.orders.find(o => o.property === order.property);
    if (existingOrder) {
      existingOrder.direction = order.direction;
    }
    else
      this.pager.orders.push(order);

    this.pager.page = 0;

    this.load();
  }

}
