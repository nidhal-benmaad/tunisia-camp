import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
//import {TokenCookiesService} from "./token-cookies.service";
import {TokenService} from "@core/authentication";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private token: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const tokenObj = this.token.getBearerToken();
console.log("token >>>" , tokenObj);
    if (tokenObj != null ) {
     // authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + tokenObj)});
      authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenObj
        }
      });

      console.log("authReq >>>" , authReq)
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
