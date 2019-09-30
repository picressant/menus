import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  connect(credentials: any) {
    this.http.post<any>('login', credentials).subscribe(
      (response) => {
        this.setToken(response.token);
        this.router.navigate(['/main/home']);
      }
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login'])
  }

  loadCurrentUser() {
    return this.http.get<User>('user/me');
  }


  setToken(token: string) {
    localStorage.setItem('menus-token', token);
  }

  getToken() {
    return localStorage.getItem('menus-token');
  }
}
