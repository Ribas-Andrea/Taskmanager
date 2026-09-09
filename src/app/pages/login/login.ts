import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  
  public loginForm: FormGroup;
  public error = signal('');

  constructor (private api: Api, private router: Router ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  onSubmit() {
      if (this.loginForm.valid){
        this.api.login(this.loginForm.value)
        .subscribe({
          next: (response : any) => {
            localStorage.setItem('token', response.accessToken);
            console.log('Succès !', response);
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.log('Erreur', error);
            this.error.set('Email ou mot de passe invalide ');
          }
        })
        // console.log("Soumission", this.loginForm.value);

      }else {
      this.loginForm.markAllAsTouched();
      }
    } 
}
