import { Injectable } from '@angular/core';
import { SideDish } from '@models/sidedish.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pageable } from "@models/pager/pageable.model";
import { Pager } from "@models/pager/pager.model";

@Injectable({
    providedIn: 'root'
})
export class SideDishRestService {


    constructor(private http: HttpClient) { }

    getSideDishes(pager: Pager): Observable<Pageable<SideDish>> {
        return this.http.post<Pageable<SideDish>>('sidedish/list', pager);
    }

    getSide(id: string): Observable<SideDish> {
        return this.http.get<SideDish>('sidedish/' + id);
    }

    addSide(side: SideDish): Observable<SideDish> {
        return this.http.post<SideDish>('sidedish', side);
    }

    saveSide(side: SideDish): Observable<SideDish> {
        return this.http.put<SideDish>('sidedish', side);
    }

    deleteSide(id: string): Observable<void> {
        return this.http.delete<void>('sidedish/' + id);
    }

}
