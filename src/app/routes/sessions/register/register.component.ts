import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router , formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
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
            this.router.navigate(['/home']);
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
    } else {
      // Gérer le cas où le formulaire n'est pas valide
    }
  }
}
