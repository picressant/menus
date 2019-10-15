import { filter } from 'rxjs/operators';

export enum Direction {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC'
}

export class Order {
  direction: Direction;
  property: string;

  constructor(property: string, direction: Direction) {
    this.property = property;
    this.direction = direction;
  }
}

export class Filter {
  property: string;
  value: any;

  constructor(property: string, value: any) {
    this.property = property;
    this.value = value;
  }

  static addFilter(property: string, value: any, filters: Filter[]) {
    Filter.removeFilter(property, filters);
    filters.push(new Filter(property, value));
  }

  static removeFilter(property: string, filters: Filter[]) {
    const index = filters.findIndex(filter => filter.property === property);
    if (index > -1) {
      filters.splice(index, 1);
    }
  }

}

export class Pager {
  page: number;
  orders: Order[];
  filters: Filter[];
  itemsPerPage: number;
  excludeIds: string[];
  search: string;

  constructor(itemsPerPage: number) {
    this.page = 0;
    this.orders = [];
    this.filters = [];
    this.excludeIds = [];
    this.itemsPerPage = itemsPerPage;
  }

  pushFilter(property: string, value: any) {
    this.removeFilter(property);
    this.filters.push(new Filter(property, value));
  }

  removeFilter(property: string) {
    const index = this.filters.findIndex(filter => filter.property === property);
    if (index > -1) {
      this.filters.splice(index, 1);
    }
  }
}
