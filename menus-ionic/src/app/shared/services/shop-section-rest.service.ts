import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '@models/ingredient.model';
import { Observable } from 'rxjs';
import { Unit } from '@models/unit.model';
import { Pageable } from "@models/pager/pageable.model";
import { Pager } from "@models/pager/pager.model";
import { ShopSection } from "@models/shop-section.model";

@Injectable({
    providedIn: 'root'
})
export class ShopSectionRestService {

    constructor(private http: HttpClient) {
    }

    getShopSections(pager: Pager = null): Observable<Pageable<ShopSection>> {
        return this.http.post<Pageable<ShopSection>>('shop-section/list', pager);
    }

    getAllShopSections(): Observable<ShopSection[]> {
        return this.http.get<ShopSection[]>('shop-section/list');
    }

    saveShopSection(shopSection: ShopSection): Observable<ShopSection> {
        return this.http.put<ShopSection>('shop-section', shopSection);
    }

    addShopSection(shopSection: ShopSection): Observable<ShopSection> {
        return this.http.post<ShopSection>('shop-section', shopSection);
    }

    deleteShopSection(shopSection: ShopSection): Observable<void> {
        return this.http.delete<void>('shop-section/' + shopSection.id);
    }
}
