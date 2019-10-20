import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/shared/models/unit.model';
import { Pageable } from "../../shared/models/pager/pageable.model";
import { Pager } from "../../shared/models/pager/pager.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientRestService {

  constructor(private http: HttpClient) { }

  getIngredients(pager: Pager = null): Observable<Pageable<Ingredient>> {
    return this.http.post<Pageable<Ingredient>>('ingredient/list', pager);
  }

  saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>('ingredient', ingredient);
  }

  deleteIngredient(ingredient: Ingredient): Observable<void> {
    return this.http.delete<void>('ingredient/' + ingredient.id);
  }

  getUnits(pager: Pager): Observable<Pageable<Unit>> {
    return this.http.post<Pageable<Unit>>('ingredient/unit/list', pager);
  }

  saveUnit(unit: Unit): Observable<Unit> {
    if (unit.id)
      return this.http.put<Unit>('ingredient/unit', unit);
    else
      return this.http.post<Unit>('ingredient/unit', unit);
  }

  deleteUnit(unit: Unit): Observable<void> {
    return this.http.delete<void>('ingredient/unit/' + unit.id);
  }
}
