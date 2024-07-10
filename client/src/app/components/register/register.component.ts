import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotifyComponent } from '../common/notify/notify.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  onFormSubmit() {
    if (this.registerForm.invalid) {
      this.error = 'Please fill this form properly';
      return;
    }
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe(
        (data) => {
          if (data.success) {
            this.router.navigate(['login']);
            this._snackBar.openFromComponent(NotifyComponent, {
              duration: 5 * 1000,
              data: 'User Registered Successfully',
            });
          }
        },
        (error) => {
          this.error = error.error.message;
        }
      );
    }
  }
}
