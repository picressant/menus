import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { ErrorService } from "@services/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private errorService: ErrorService
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.errorService.manageError(error.error);
                throw error
            }));
    }
}
