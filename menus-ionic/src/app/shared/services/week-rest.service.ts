import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Week } from '@models/week.model';
import { WeekMeal } from "@models/week-meal.model";

@Injectable({
    providedIn: 'root'
})
export class WeekRestService {

    constructor(private http: HttpClient) {
    }

    getWeek(): Observable<Week> {
        return this.http.get<Week>('week');
    }

    setWeek(week: Week): Observable<Week> {
        return this.http.post<Week>('week', week);
    }

    setMeal(index: number, meal: WeekMeal): Observable<WeekMeal> {
        return this.http.post<WeekMeal>('week/meal/' + index, meal);
    }

    getMeal(index: number): Observable<WeekMeal> {
        return this.http.get<WeekMeal>('week/meal/' + index);
    }
}

