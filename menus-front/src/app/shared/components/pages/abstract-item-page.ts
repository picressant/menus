import { OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";
import { Observable } from "rxjs";
import { AbstractData } from "../../models/abstract-data.model";
import { isNullOrUndefined } from "util";

export abstract class AbstractItemPage<T extends AbstractData> implements OnInit {

  id: string = null;
  form: FormGroup;
  isReadonly: boolean = false;

  protected readonly createToast: string;
  protected readonly saveToast: string;

  constructor(
    private _route: ActivatedRoute,
    private _toaster: ToasterService,
    saveToast: string,
    createToast: string
  ) {
    this.saveToast = saveToast;
    this.createToast = createToast;
  }

  abstract get create$(): Observable<T>;

  abstract get save$(): Observable<T>;

  abstract get get$(): Observable<T>;

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];

      if (!this.isAddingMode)
        this.load();
    });
  }

  get isAddingMode() {
    return isNullOrUndefined(this.id);
  }

  load() {
    this.get$.subscribe(
      (item: T) => this.resetForm(item)
    );
  };

  protected resetForm(item: T) {
    this.form.patchValue(item);
    this._disable();
  }

  cancel() {
    if (this.isAddingMode)
      this.onCancelAdd();
    else
      this.load();
  }

  submit() {
    if (this.isAddingMode)
      this._create();
    else
      this._save();
  }

  modify() {
    this._enable();
  }

  private _create() {
    this.create$.subscribe(
      (item: T) => {
        this.id = item.id;
        this.resetForm(item);
        this._toaster.info(this.createToast);
        this.postCreate();
      }
    );
  }

  protected _save() {
    this.save$.subscribe(
      (item: T) => {
        this.resetForm(item);
        this._toaster.info(this.saveToast);
      }
    );
  }

  private _enable() {
    this.isReadonly = false;
    this.form.enable();
  }

  private _disable() {
    this.isReadonly = true;
    this.form.disable();
  }

  abstract onCancelAdd();

  postCreate() {
  }
}
