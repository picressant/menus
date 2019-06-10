import { Injectable } from '@angular/core';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SideDishRestService {


    constructor(private http: HttpClient) { }

    getSideDishes(): Observable<SideDish[]> {
        return this.http.get<SideDish[]>('sidedish');
    }

    saveSide(side: SideDish): Observable<SideDish> {
        return this.http.post<SideDish>('sidedish', side);
    }

    deleteSide(side: SideDish): Observable<void> {
        return this.http.delete<void>('sidedish/' + side.id);
    }

}