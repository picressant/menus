import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '@models/ingredient.model';
import { Observable } from 'rxjs';
import { Unit } from '@models/unit.model';
import { Pageable } from "@models/pager/pageable.model";
import { Pager } from "@models/pager/pager.model";
import { ConvertTo } from "@models/convert-to.model";

@Injectable({
    providedIn: 'root'
})
export class IngredientRestService {

    constructor(private http: HttpClient) {
    }

    getIngredients(pager: Pager = null): Observable<Pageable<Ingredient>> {
        return this.http.post<Pageable<Ingredient>>('ingredient/list', pager);
    }

    saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.put<Ingredient>('ingredient', ingredient);
    }

    addIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>('ingredient', ingredient);
    }

    deleteIngredient(ingredient: Ingredient): Observable<void> {
        return this.http.delete<void>('ingredient/' + ingredient.id);
    }

    getUnits(pager: Pager): Observable<Pageable<Unit>> {
        return this.http.post<Pageable<Unit>>('ingredient/unit/list', pager);
    }

    saveUnit(unit: Unit): Observable<Unit> {
        return this.http.put<Unit>('ingredient/unit', unit);
    }

    addUnit(unit: Unit): Observable<Unit> {
        return this.http.post<Unit>('ingredient/unit', unit);
    }

    deleteUnit(unit: Unit): Observable<void> {
        return this.http.delete<void>('ingredient/unit/' + unit.id);
    }

    deleteConversion(convertTo: ConvertTo): Observable<void> {
        return this.http.delete<void>('ingredient/unit/conversion/' + convertTo.id);
    }

    getAllConversion(): Observable<ConvertTo[]> {
        return this.http.get<ConvertTo[]>('ingredient/unit/conversion')
    }

    addConversion(convertTo: ConvertTo): Observable<ConvertTo> {
        return this.http.post<ConvertTo>('ingredient/unit/conversion', convertTo);
    }

    saveConversion(convertTo: ConvertTo): Observable<ConvertTo> {
        return this.http.put<ConvertTo>('ingredient/unit/conversion', convertTo);
    }
}
