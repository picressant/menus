import { Injectable } from '@angular/core';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pageable } from "../../shared/models/pager/pageable.model";
import { Pager } from "../../shared/models/pager/pager.model";

@Injectable({
    providedIn: 'root'
})
export class SideDishRestService {


    constructor(private http: HttpClient) { }

    getSideDishes(pager: Pager): Observable<Pageable<SideDish>> {
        return this.http.post<Pageable<SideDish>>('sidedish/list', pager);
    }

    saveSide(side: SideDish): Observable<SideDish> {
        return this.http.post<SideDish>('sidedish', side);
    }

    deleteSide(side: SideDish): Observable<void> {
        return this.http.delete<void>('sidedish/' + side.id);
    }

}
