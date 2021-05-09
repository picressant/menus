import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { removeFromArray } from "@helpers/remove-array-element.function";
import { ConvertTo } from "@models/convert-to.model";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { IngredientRestService } from "@services/ingredient-rest.service";

@Component({
    selector: 'app-conversion-list',
    templateUrl: './conversion-list.component.html',
    styleUrls: ['./conversion-list.component.scss'],
})
export class ConversionListComponent implements OnInit {

    conversions: ConvertTo[] = [];

    @Output()
    private selected: EventEmitter<ConvertTo> = new EventEmitter<ConvertTo>();

    constructor(
        private confirmationService: ConfirmationAlertService,
        private unitRest: IngredientRestService
    ) {
    }

    ngOnInit() {
    }

    deleteConversion(convertTo: ConvertTo) {
        this.confirmationService.confirm("Supprimer la conversion ?", () => {
            this.unitRest.deleteConversion(convertTo).subscribe(() => {
                removeFromArray(this.conversions, convertTo)
            });
        });
    }

    select(conversion: ConvertTo) {
        this.selected.emit(conversion);
    }

    @Input()
    set loadOnInit(load: boolean) {
        if (load)
            this.refresh(null);
    }


    refresh(event: any) {
        this.unitRest.getAllConversion().subscribe(converts => {
            this.conversions = converts;
            if (event) {
                event.target.complete();
            }
        });
    }
}
