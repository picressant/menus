import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class FoodAuthService {

    public user: BehaviorSubject<User> = new BehaviorSubject(null);
    private socialUser: SocialUser;

    private loading: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: SocialAuthService,
        private loadingController: LoadingController
    ) {
        this.authService.authState.subscribe((user) => {
            this.socialUser = user;
            if (this.socialUser) {
                this.http.post<any>('login', { googleid: this.socialUser.idToken }).subscribe((response) => {
                    this.setToken(response.token);
                    this.dismissLoading();
                    this.router.navigate(['/main/recipe']);
                });
            }
            else {
                this.dismissLoading()
            }
        });
    }

    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = undefined;
        }
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            translucent: true,
            mode: "ios"
        });
        await this.loading.present();
    }

    connectWithGoogle() {
        this.presentLoading();
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    connect(credentials: any) {
        this.presentLoading();
        this.http.post<any>('login', credentials).subscribe(
            (response) => {
                this.setToken(response.token);
                this.dismissLoading();
                this.router.navigate(['/main/week']);
            },
            () => this.dismissLoading()
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
