import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/app/shared/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeRestService {

  constructor(private http: HttpClient) { }

  searchRecipe(search: Search): Observable<Recipe[]> {
    return this.http.post<Recipe[]>('recipe/search', search);
  }

  getRecipe(iID: string): Observable<Recipe> {
    return this.http.get<Recipe>('recipe/' + iID);
  }

  addRecipe(iRecipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>('recipe', iRecipe);
  }

  updateRecipe(iRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>('recipe', iRecipe);
  }

  deleteRecipe(iID: String): Observable<void> {
    return this.http.delete<void>('recipe/' + iID);
  }

  storePicture(id: string, data: any) {
    const formData = new FormData();
    formData.append('file', data, data.name);

    return this.http.post('recipe/' + id + '/picture', formData);
  }
}
