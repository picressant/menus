import { OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { isNullOrUndefined } from "util";
import { ToastController } from "@ionic/angular";
import { AbstractData } from "@models/abstract-data.model";

export abstract class AbstractItemPage<T extends AbstractData> implements OnInit {

    id: string = null;
    form: FormGroup;
    isReadonly: boolean = true;
    data: T = null;

    protected readonly createToast: string;
    protected readonly saveToast: string;

    protected constructor(
        private _route: ActivatedRoute,
        private _toaster: ToastController,
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
            else
                this.isReadonly = false;
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
      this.data = item;
        this.form.patchValue(item);
        this._disable();
    }

    cancel() {
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
                this.showToastCreation(this.createToast);
                this.postCreate();
            }
        );
    }

  async showToastCreation(text: string) {
    const toast = await this._toaster.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  protected _save() {
        this.save$.subscribe(
            (item: T) => {
                this.resetForm(item);
                this.showToastCreation(this.saveToast);
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

    postCreate() {
    }
}
