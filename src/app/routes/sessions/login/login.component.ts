import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, finalize } from 'rxjs/operators';
import {AuthService, LoginService} from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });


  constructor(private fb: FormBuilder, private router: Router,
              private auth: AuthService , private loginService: LoginService) {}

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
          this.router.navigateByUrl('/home');
        },
        (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              console.log("errors:", errors);
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
        }
      );
  }
}
