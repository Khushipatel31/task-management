import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      name:['',Validators.required]
    });
  }
  onFormSubmit() {
    if (this.registerForm.invalid) {
      this.error = 'Please fill this form properly';
      return;
    }
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe( (data) => {
          if (data.success) {
            this.router.navigate(['login']);
          }
        },
        (error) => {
          this.error = error.error.message;
        }
      );
    }
  }


}
