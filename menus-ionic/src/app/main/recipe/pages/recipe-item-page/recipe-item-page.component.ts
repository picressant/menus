import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { AbstractItemPage } from "../../../../shared/pages/abstract-item-page";
import { Recipe } from "@models/recipe.model";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { RecipeRestService } from "../../service/recipe-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "../../../../shared/services/toaster.service";

@Component({
    selector: 'app-recipe-item-page',
    templateUrl: './recipe-item-page.component.html',
    styleUrls: ['./recipe-item-page.component.scss'],
})
export class RecipeItemPageComponent extends AbstractItemPage<Recipe> implements OnInit {

    selectedTab = "tab-overview";

    fileUploadError = '';
    imgPreviewURL: any;
    storeCurrentImages: any;

    timestamp: string;

    constructor(private fb: FormBuilder,
                private recipeRest: RecipeRestService,
                private route: ActivatedRoute,
                private toaster: ToasterService,
                private router: Router) {

        super(route, toaster, "Recette modifiée avec succès", "Recette ajoutée avec succès");
        this.form = Recipe.form(this.fb);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    get title(): string {
        return this.isAddingMode ? "Ajouter une recette" : isNullOrUndefined(this.data) ? "" : this.data.name;
    }

    get get$(): Observable<Recipe> {
        return this.recipeRest.getRecipe(this.id);
    }

    get create$(): Observable<Recipe> {
        return undefined;
    }

    get save$(): Observable<Recipe> {
        return undefined;
    }


    select(tabId: string) {
        this.selectedTab = tabId;
    }


    preview(files) {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.fileUploadError = 'Le fichier doit être une image';
            this.toaster.error(this.fileUploadError);
            return;
        }

        const reader = new FileReader();
        this.storeCurrentImages = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgPreviewURL = reader.result;
        };
    }

    get imgStyles() {
        return {
            width: '200px',
            height: '200px',
            'border-radius': '10px',
            'object-fit': 'cover'
        };
    }

}
