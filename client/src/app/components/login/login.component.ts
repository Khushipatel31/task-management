import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {AuthGuard} from '../../guards/auth.guard'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent  {
  loginForm!: FormGroup;
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


    if(this.auth.getRole() && this.auth.getToken()){
        this.auth.verify().subscribe((isAuthenticated) => {
          console.log(isAuthenticated)
          if (isAuthenticated) {
            this.router.navigate([this.auth.getRole()])
          } else {
            this.router.navigate(['']);
          }
        });
    }
  }


  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Please fill this form properly';
    }
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (data) => {
          if (data.success) {
            this.router.navigate([this.auth.getRole()]);
          }
        },
        (error) => {
          this.error = error.error.message;
        }
      );
    }
  }
}
