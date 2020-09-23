import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Week } from '@models/week.model';

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
}

