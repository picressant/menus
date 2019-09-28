import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('user/list');
  }

  getUser(id: string) {
    return this.http.get<User>(`user/${ id }`);
  }

  saveUser(user: User) {
    if (user.id)
      return this.http.put<User>("user", user);
    else
      return this.http.post<User>("contact", user);
  }
}
