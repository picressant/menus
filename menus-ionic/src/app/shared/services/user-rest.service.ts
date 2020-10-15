import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "@models/user.model";

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
            return this.http.post<User>("user", user);
    }

    resetPassword(id: string, value: any) {
        return this.http.put(`user/${ id }/reset-password`, value);
    }

    deleteUser(user: User) {
        return this.http.delete(`user/${ user.id }`);
    }

    storeAvatar(userId: string, data: any) {

        const formData = new FormData();
        formData.append('file', data, data.name);

        return this.http.post('user/' + userId + '/avatar', formData);
    }
}
