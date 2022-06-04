import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterContentChecked{


  baskets : BasketModel[] = []
  loginPage : boolean = true

  constructor(private basketService : BasketService, private authService : AuthService,
     private toastrService : ToastrService, private router : Router) { }

  ngOnInit(): void {
    this.baskets = this.basketService.basketList
  }
  
  ngAfterContentChecked(): void {
    if (this.router.url == '/login') {
      this.loginPage = false
    } else {
      this.loginPage = true
    }
  }

  logout() {
    this.authService.logout()
    this.toastrService.info('Çıkış Yaptınız')
  }

  getAuth() {
    return this.authService.isAuthenticated()
  }









}
