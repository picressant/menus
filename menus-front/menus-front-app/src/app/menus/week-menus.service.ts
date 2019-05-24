import { Injectable } from '@angular/core';
import { Recette } from '../recette/models/recette.model';
import { RecetteType } from '../recette/models/recette-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WeekMenusService {

    days = [];

    recettes : Recette[] = [];

    private _hashWeekValues: Map<string, number>;

    public constructor(
        private http: HttpClient
    ) {
        this._hashWeekValues = new Map<string, number>();
        this._hashWeekValues.set('Lundi soir', 0);
        this._hashWeekValues.set('Mardi soir', 1);
        this._hashWeekValues.set('Mercredi soir', 2);
        this._hashWeekValues.set('Jeudi soir', 3);
        this._hashWeekValues.set('Vendredi soir', 4);
        this._hashWeekValues.set('Samedi midi', 5);
        this._hashWeekValues.set('Samedi soir', 6);
        this._hashWeekValues.set('Dimanche midi', 7);
        this._hashWeekValues.set('Dimanche soir', 8);
    } 

    getWeek(): Observable<Map<string, Recette>> {
        return this.http.get<Map<string, Recette>>('week').pipe(
            map((data) => {                
                const that = this;                
                let strMap = new Map<string, Recette>();
                for (let k of Object.keys(data).sort(
                    function(a, b) {
                        return that._hashWeekValues.get(a) - that._hashWeekValues.get(b);
                    }
                )) {
                    strMap.set(k, data[k]);
                }
                return strMap;
            })
        );
    }

    setWeek(iWeek: Map<string, Recette>): Observable<void> {
        console.log(iWeek);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };        
        return this.http.put<void>('week',Array.from(iWeek.entries()).reduce((main, [key, value]) => ({...main, [key]: value}), {}));//, httpOptions);
    }

}