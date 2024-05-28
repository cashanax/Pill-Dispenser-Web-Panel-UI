import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  form: any = {};
  token?: string;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.http.post('http://15.236.159.186/api/user/login', this.loginForm.value).subscribe(
        (response: any) => {
          this.authService.login(response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.isLoginFailed = true;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
