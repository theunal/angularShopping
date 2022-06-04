import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/errorService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    @Inject('validationError') private validationError: string,
    private errorService : ErrorService,
    private authService: AuthService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }


  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
  }

  login() {
    if (this.loginForm.valid) {
      let Login = new LoginModel()
      Login.email = this.loginForm.value.email
      Login.password = this.loginForm.value.password

      this.authService.login(Login).subscribe(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        this.router.navigate(['/'])
        this.toastrService.success('Giriş Yaptınız!', 'Success')
      }, err => {
        this.errorService.errorHandler(err)
      })
    } else {
      this.toastrService.warning(this.validationError)
    }

  }



}
