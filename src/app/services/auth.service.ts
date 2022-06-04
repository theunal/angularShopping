import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from '../models/login';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/token';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth : boolean = false

  constructor(
    @Inject('api')
    private api: string,
    private httpClient : HttpClient, private router : Router) { }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      this.isAuth = true
    } else {
      this.isAuth = false
    }
    return this.isAuth
  }

  login(login : LoginModel) : Observable<SingleResponseModel<TokenModel>>  {
    this.isAuth = true
    let url = this.api + 'users/login'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url,login)
  }



  logout() {
    localStorage.removeItem('token')
    this.isAuth = false
    this.router.navigate(['/'])
  }

}
