import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ingredient } from '@models/ingredient.model';
import { Observable } from 'rxjs';
import { Unit } from '@models/unit.model';
import { Pageable } from "@models/pager/pageable.model";
import { Pager } from "@models/pager/pager.model";

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
}
