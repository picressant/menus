import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;  
  currentUserChange: Subject<User> = new Subject<User>();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser = null;
    this.currentUserChange.subscribe((value) => {
      this.currentUser = value
    });
   }


  connect(credentials: any) {
    this.http.post<any>('login', credentials).subscribe(
      (response) => {
        this.setToken(response.token);
        this.router.navigate(['/main/home']);
      },
      (err) => console.error(err)
    )
  }

  loadCurrentUser() {
    if (this.currentUser === null) {
      this.http.get<User>('user/me').subscribe(
        (u) => {
          this.currentUserChange.next(u);
        }
      );
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
