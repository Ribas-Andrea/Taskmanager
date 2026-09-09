import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  public registerForm: FormGroup;
  public error = signal('');

  constructor (private api: Api, private router: Router ) {
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
      if (this.registerForm.valid){
       this.api.register(this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log('Succès !', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.log('Erreur', error);
            this.error.set('Erreur lors de l\'inscription : ' + error);
          }
        })
        // console.log("Soumission", this.registerForm.value);

      }else {
      this.registerForm.markAllAsTouched();
      }
    } 
}
