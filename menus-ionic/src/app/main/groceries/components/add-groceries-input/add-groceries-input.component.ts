import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IngredientRestService } from "@services/ingredient-rest.service";
import { Pager } from "@models/pager/pager.model";
import { Ingredient } from "@models/ingredient.model";
import { GroceryItem } from "@models/grocery-item.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, IonInput, ModalController } from "@ionic/angular";
import { IngredientModalComponent } from "@components/modals/ingredient-modal/ingredient-modal.component";
import { ShopSection } from "@models/shop-section.model";
import { ShopSectionRestService } from "@services/shop-section-rest.service";

@Component({
    selector: 'app-add-groceries-input',
    templateUrl: './add-groceries-input.component.html',
    styleUrls: ['./add-groceries-input.component.scss'],
})
export class AddGroceriesInputComponent implements OnInit {
    private pager: Pager;
    searchingIngredients: Ingredient[] = [];
    shopSections: ShopSection[] = [];

    currentItem: GroceryItem;
    form: FormGroup;

    @Output()
    added = new EventEmitter<GroceryItem>();

    @ViewChild("inputQ")
    private inputQuantity: ElementRef;

    @ViewChild("inputI")
    private inputIngredient: IonInput;


    constructor(
        private ingredientRest: IngredientRestService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private alertController: AlertController,
        private modalController: ModalController,
        private shopSectionRest: ShopSectionRestService,
        private el: ElementRef
    ) {
        this.pager = new Pager(5);
        this.form = fb.group({
            name: [null, Validators.required],
            quantity: [null, Validators.required]
        });
    }

    ngOnInit() {
        this.shopSectionRest.getAllShopSections().subscribe(sections => this.shopSections = sections);
    }

    async addElement() {
        if (this.form.invalid)
            return;

        if (this.currentItem) {
            this.emitIngredient(this.currentItem.ingredient);
        }
        else {
            let inputs = [];
            let selected = true;
            this.searchingIngredients.forEach(i => {
                inputs.push({
                    name: 'ingredient',
                    type: 'radio',
                    label: i.name,
                    value: i,
                    checked: selected
                });
                selected = false;
            });
            const alert = await this.alertController.create({
                header: 'Choisir un élément',
                inputs: inputs,
                buttons: [
                    {
                        text: 'Créer',
                        cssClass: "color-dark",
                        handler: () => {
                            this.addNewIngredient();
                        }
                    }, {
                        text: 'Valider',
                        cssClass: "color-dark",
                        handler: (alertData) => {
                            this.emitIngredient(alertData);
                        }
                    }
                ]
            });

            await alert.present();
        }
    }

    private emitIngredient(ingredient: Ingredient) {
        if (ingredient) {
            this.currentItem = new GroceryItem();
            this.currentItem.ingredient = ingredient;
            this.currentItem.quantity = this.form.controls.quantity.value;

            this.added.emit(this.currentItem);

            this.currentItem = null;
            this.form.reset();
        }
    }

    async addNewIngredient() {
        const modal = await this.modalController.create({
            component: IngredientModalComponent,
            id: IngredientModalComponent.modalId,
            componentProps: {
                shopSections: this.shopSections,
                name: this.form.controls.name.value,
                fromGrocery: true
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.addIngredient(data.ingredient).subscribe((i) => {
                this.emitIngredient(i);
            });
        }
    }

    async onClickSuggestion(ingredient: Ingredient) {
        this.currentItem = new GroceryItem();
        this.currentItem.ingredient = ingredient;
        this.currentItem.quantity = 1;
        this.searchingIngredients = [];

        this.form.controls.name.setValue(ingredient.name);
        this.form.controls.quantity.setValue(1);

        this.cdr.detectChanges();

        this.inputQuantity.nativeElement.focus();
    }

    onInputChange(event: any) {
        if ((this.currentItem && this.currentItem.ingredient.name === event.detail.value) || !event.detail.value)
            return;

        this.pager.search = event.detail.value;
        this.ingredientRest.getIngredients(this.pager).subscribe(pageable => {
            this.searchingIngredients = pageable.content;
            this.cdr.detectChanges();
        });
    }

    focusIngredientInput() {
        this.inputIngredient.setFocus();
    }
}
