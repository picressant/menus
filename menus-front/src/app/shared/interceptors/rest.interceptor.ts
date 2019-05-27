import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const lURL = (environment.production) ? location.origin + req.urlWithParams : "http://localhost:8080/" + req.urlWithParams;

    console.log(lURL);

    req = req.clone({
      url: lURL
    });

    return next.handle(req);
  }
}