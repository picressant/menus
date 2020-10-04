import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeekMeal } from "@models/week-meal.model";

@Injectable({
    providedIn: 'root'
})
export class WeekRestService {

    constructor(private http: HttpClient) {
    }

    getWeek(): Observable<WeekMeal[]> {
        return this.http.get<WeekMeal[]>('week');
    }

    setWeek(week: WeekMeal[]): Observable<WeekMeal[]> {
        return this.http.post<WeekMeal[]>('week', week);
    }
}

