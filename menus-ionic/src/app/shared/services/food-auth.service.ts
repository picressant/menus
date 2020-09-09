import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class FoodAuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  private socialUser: SocialUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService
  ) {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      if (this.socialUser) {
        this.http.post<any>('login', { googleid: this.socialUser.idToken }).subscribe((response) => {
          this.setToken(response.token);
          this.router.navigate(['/main/recipe']);
        });
      }
    });
  }

  connectWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  connect(credentials: any) {
    this.http.post<any>('login', credentials).subscribe(
      (response) => {
        this.setToken(response.token);
        this.router.navigate(['/main/recipe']);
      }
    );
  }

  logout() {
    this.user.next(null);
    this.socialUser = null;
    this.setToken("");
    this.authService.signOut().finally(() => {
      this.router.navigate(['/auth/login'])
    });
  }

  loadCurrentUser() {
    return this.http.get<User>('user/me');
  }

  setToken(token: string) {
    localStorage.setItem('menus-ionic-token', token);
  }

  getToken() {
    return localStorage.getItem('menus-ionic-token');
  }
}