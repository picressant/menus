import { HostBinding, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { Pager } from "../../models/pager/pager.model";
import { Pageable } from "../../models/pager/pageable.model";
import { NgSelectComponent } from "@ng-select/ng-select";
import { AbstractData } from "../../models/abstract-data.model";

export abstract class AbstractPageableSelectorComponent<T extends AbstractData> implements OnInit, ControlValueAccessor {

  @Input()
  isMultiple = false;

  @Input()
  label: string;

  isLoading = false;
  currentSub: Subscription;


  @HostBinding('class.ng-selector-input')
  isSelector = true;

  @Input()
  dataError: string;

  pager: Pager;

  dataPageable: Pageable<T>;
  content: T[] = [];

  public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @ViewChild(NgSelectComponent, { static: false })
  private selectComponent: NgSelectComponent;

  private _value: T | T[];

  set value(val: T | T[]) {
    this._value = val;
    this.propagateChange(this._value);
  }

  get value() {
    return this._value;
  }

  propagateChange = (_: T | T[]) => {
  }

  propagateTouch = () => {
  }

  protected constructor() {
    this.pager = new Pager(10);
  }

  abstract load(isSetValue: boolean);

  protected setContent(data: Pageable<T>, isSetValue: boolean) {
    this.dataPageable = data;
    this.content = this.content.concat(data.content);
    this.isLoading = false;

    if (!this.ready.getValue()) {
      this.ready.next(true);
      this.ready.complete();
    }

    if (isSetValue) {
      this._setValueOrLoad();
    }
  }

  ngOnInit() {
    this.load(false);
  }

  onScrollEnd() {
    if (!this._isEndPager()) {
      this.pager.page = this.pager.page + 1;
      this.load(false);
    }
  }

  private _isEndPager() {
    return (this.dataPageable.number >= this.dataPageable.totalPages);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.selectComponent.setDisabledState(isDisabled);
  }

  private _setValueOrLoad() {
    if (!this._isEndPager() && !this.contentContain(this.value)) {
      this.pager.page = this.pager.page + 1;
      this.load(true);
    }
    else {
      this._rebuildValue();
    }
  }

  private _rebuildValue() {
    if (this.isMultiple) {
      const newArray: T[] = [];
      (this.value as T[]).forEach(item => {
        const val = this.content.find(c => c.id === item.id);
        if (val) {
          newArray.push(val);
        }
        else {
          newArray.push(item);
        }
      });
      setTimeout(() => this._value = newArray, 100);

    }
    else {
      setTimeout(() => this._value = this.content.find(item => item.id === (this.value as AbstractData).id), 100);
    }
  }

  contentContain(value: T | T[]): boolean {
    if (this.isMultiple) {
      let result = true;
      (value as T[]).forEach(u => {
        if (!this.content.find(c => c.id === u.id) !== null) {
          result = false;
        }
      });
      return result;
    }
    else {
      return (this.content.find(c => c.id === (this.value as T).id) !== null);
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
    if (this.value) {
      if (!this.ready.getValue()) {

        if (this.currentSub) {
          this.currentSub.unsubscribe();
        }

        this.currentSub = this.ready.subscribe(
          (res) => {
            if (res) {
              this._setValueOrLoad();
            }
          }
        );
      }
      else {
        this._setValueOrLoad();
      }
    }
  }

  search(search) {
    this.pager.page = 0;
    this.content = [];
    this.pager.search = search.term;
    this.load(false);
  }

  searchFn(term, item) {
    return true;
  }

  forceReload() {
    this.pager.page = 0;
    this.pager.search = '';
    this.content = [];
    this.load(this.value !== null && this.value !== undefined);
  }

  onClear() {
    this.forceReload();
  }
}
