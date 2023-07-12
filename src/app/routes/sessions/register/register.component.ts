import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '@core';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  public showSuccessMessage = false;
  private toast: any;


  constructor(private authService: AuthService,
              private router: Router ,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar)  {}

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   firstName: new FormControl('', Validators.required),
    //   lastName: new FormControl('', Validators.required),
    //   phoneNumber: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', Validators.required),
    //   confirmPassword: new FormControl('', Validators.required)
    // });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm?.valid) {
      const firstName = this.registerForm.get('firstName')?.value;
      const lastName = this.registerForm.get('lastName')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const phoneNumber = this.registerForm.get('phoneNumber')?.value;

      console.log(firstName, lastName, email, password, phoneNumber);
      if (firstName && lastName && email && password && phoneNumber) {
        this.authService.register(firstName, lastName, email, phoneNumber, password).subscribe(
          () => {
            //this.showSuccessMessage = true;
            this.snackBar.open(" Merci dattendre la validation de votre compte !", 'Fermer',
              {
                duration: 5000,
                panelClass: 'error-toast',
              })

            //this.router.navigate(['/home']);
            // Inscription réussie, effectuer les actions nécessaires (redirection, notification, etc.)
          },
          (error) => {
            //this.router.navigate(['/auth/login']);
            // Gérer les erreurs lors de l'inscription (afficher un message d'erreur, etc.)
          }
        );
      } else {
        // Gérer le cas où les champs username ou password sont vides
      }
    }
  }
}
