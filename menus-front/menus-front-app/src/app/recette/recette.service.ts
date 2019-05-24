import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recette } from './models/recette.model';
import { Observable } from 'rxjs';
import { IngredientAvecQuantite } from './models/ingredient-quantite.model';

@Injectable({
  providedIn: 'root',
})
export class RecetteService {

    public constructor(
        private http: HttpClient
    ) {

    }

    searchRecette(iSearchValue: string): Observable<Recette[]> {
        return this.http.post<Recette[]>('recette/search', iSearchValue);
    }

    getRecette(iID: number): Observable<Recette> {
        return this.http.get<Recette>('recette/' + iID);
    }

    getListeIngredient(iID: number): Observable<IngredientAvecQuantite[]> {
        return this.http.get<IngredientAvecQuantite[]>('recette/' + iID + '/ingredients');
    }

    addRecette(iRecette: Recette): Observable<Recette> {
        return this.http.post<Recette>('recette', iRecette);
    }

    updateRecette(iRecette: Recette): Observable<Recette> {
        return this.http.put<Recette>('recette/' + iRecette.id, iRecette);
    }

    deleteRecette(iID: number): Observable<void> {
        return this.http.delete<void>('recette/' + iID);
    }
}
