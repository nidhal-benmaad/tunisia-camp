import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, finalize } from 'rxjs/operators';
import {AuthService, LoginService, TokenService} from '@core/authentication';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  user: SocialUser;
  loggedIn: boolean | undefined;
  constructor(
              private fb: FormBuilder, private router: Router,
              private auth: AuthService ,
              private  userService: UserService,
              private loginService: LoginService,
              private snackBar: MatSnackBar ,
              private SocialAuthService: SocialAuthService,
              private authService: AuthService,
              private tokenService: TokenService,
  ) {
    this.user = new SocialUser();
  }

  // get username() {
  //   return this.loginForm.get('username')!;
  // }
  get email() {
      return this.loginForm.get('email')!;
     }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }
  ngOnInit() {
    this.SocialAuthService.authState.subscribe((socialUser: SocialUser) => {
      this.user = socialUser;
      localStorage.setItem('photoUrl', socialUser.photoUrl);
      console.log('**************************** USER:', socialUser);
      this.loggedIn = true;
      this.userService.getUserByEmail(this.user.email).subscribe(
        (user) => {
          console.log('********************************', user);
          if (!user) {
            this.authService.register(this.user.firstName, this.user.lastName, this.user.email, "", "123").subscribe(
              () => {
              },
              (error) => {
                console.error('Error during registration:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error retrieving user information:', error);
        }
      );
      setTimeout(() => {
        this.auth.login(this.user.email, "123", true).pipe(
          filter(authenticated => authenticated)
        ).subscribe(
          () => {
            console.log('Redirecting to /home');
            this.router.navigateByUrl('/home');
          },
          (error) => {
            console.error('Error during login:', error);
          }
        );
      }, 500);
    });

  }

  // login() {
  //   this.isSubmitting = true;
  //
  //   this.auth
  //     .login(this.email.value, this.password.value, this.rememberMe.value)
  //     .pipe(
  //       filter(authenticated => authenticated),
  //       finalize(() => {
  //         this.isSubmitting = false;
  //       })
  //     )
  //     .subscribe(
  //       () => {
  //         this.router.navigateByUrl('/home');
  //       },
  //       (errorRes: HttpErrorResponse) => {
  //         if (errorRes.status === 422) {
  //           const form = this.loginForm;
  //           const errors = errorRes.error.errors;
  //           Object.keys(errors).forEach(key => {
  //             console.log("errors:", errors);
  //             form.get(key === 'email' ? 'username' : key)?.setErrors({
  //               remote: errors[key][0],
  //             });
  //           });
  //         }
  //       }
  //     );
  // }

  login() {
    this.isSubmitting = true;

    this.auth
      .login(this.email.value, this.password.value, this.rememberMe.value)
      .pipe(
        filter(authenticated => authenticated),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        () => {
          const userEmail = this.email.value;

          this.userService.getUserByEmail(userEmail).subscribe(
            (user) => {
              console.log('********************************' , user);
              if (user && user.validated) {
                console.log('*******************************', user.validated);
                // L'utilisateur est validé, on peut accéder à '/home'
                const roles =localStorage.getItem('roles');
                console.log('ROLES----------------------------------', roles);
                if (roles == 'ADMIN'){
                  this.router.navigateByUrl('/admin');
                }else{
                  this.router.navigateByUrl('/home');
                }

              } else {
                // L'utilisateur n'est pas encore validé, afficher un message d'erreur
                this.snackBar.open('Accès refusé. Votre compte n\'est pas encore validé par l\'admin.', 'Fermer', {
                  duration: 5000,
                  panelClass: 'error-toast',
                });
                console.log('Accès refusé. Votre compte n\'est pas encore validé par l\'admin.');
              }
            },
            (error) => {
              console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }
          );
        },
        (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
        }
      );
  }
}
