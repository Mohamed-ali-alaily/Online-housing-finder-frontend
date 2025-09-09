import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
  if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
    this.error = "Please fill all fields";
    return;
  }

  
  if (this.password !== this.confirmPassword) {
    this.error = "Passwords do not match";
    return;
  }
  

  this.loading = true;
  this.authService.signup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword
  }).subscribe({
    next: res => {
      this.loading = false;
      this.router.navigate(['/login']);
    },
    
    error: err => {
      this.loading = false;
      this.error = err.error?.message || "Signup failed";
    }
  });
}
}