import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, merge, Observable, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  // init() {
  //   return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  // }

  change() {
    return this.change$;
  }

  check() {
    return true;
    console.log('auth.check: ', this.tokenService.valid());
    return this.tokenService.valid();
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(<User>user)));
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    password: string
  ): Observable<any> {
    const user: User = { firstName, lastName, email, phoneNumber, password };
    return this.http.post<any>('http://localhost:8082/tunisia-camp/api/auth/register', user);
  }

  login(email: string, password: string, rememberMe = false) {
    return this.loginService.login(email, password, rememberMe).pipe(
      tap(token => {
        this.tokenService.set(token);
      }),
      map(() => this.check())
    );
  }
}
