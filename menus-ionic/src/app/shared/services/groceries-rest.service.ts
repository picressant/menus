import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeekMeal } from "@models/week-meal.model";
import { GroceryItem } from "@models/grocery-item.model";

@Injectable({
    providedIn: 'root'
})
export class GroceriesRestService {

    constructor(private http: HttpClient) {
    }

    public getGroceries(): Observable<GroceryItem[]> {
        return this.http.get<GroceryItem[]>("groceries");
    }

    public pushGroceries(items: GroceryItem[]): Observable<GroceryItem[]> {
        return this.http.post<GroceryItem[]>("groceries/all", items);
    }

    public updateGroceryItem(item: GroceryItem): Observable<GroceryItem> {
        return this.http.put<GroceryItem>("groceries/" + item.id, item);
    }

    public addItem(item: GroceryItem): Observable<GroceryItem> {
        return this.http.post<GroceryItem>("groceries", item);
    }

    public deleteItem(item: GroceryItem): Observable<void> {
        return this.http.delete<void>("groceries/" + item.id);
    }
}

