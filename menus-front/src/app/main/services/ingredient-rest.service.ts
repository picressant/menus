import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/shared/models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientRestService {

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('ingredient');
  }

  saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>('ingredient', ingredient);
  }

  deleteIngredient(ingredient: Ingredient): Observable<void> {
    return this.http.delete<void>('ingredient/' + ingredient.id);
  }

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>('ingredient/unit');
  }

  saveUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>('ingredient/unit', unit);
  }

  deleteUnit(unit: Unit): Observable<void> {
    return this.http.delete<void>('ingredient/unit/' + unit.id);;
  }
}
