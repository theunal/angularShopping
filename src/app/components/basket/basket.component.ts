import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ErrorService } from 'src/app/services/errorService';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, AfterContentChecked {


  basketList: BasketModel[] = []
  total: number = 0

  constructor(private basketService: BasketService, private authService: AuthService,
    private errorService : ErrorService,
    private spinner: NgxSpinnerService, private toastrService: ToastrService, private productService: ProductService) { }

  ngOnInit(): void {
    this.total = this.basketService.total
    this.getBasketList()
  }

  ngAfterContentChecked(): void {
    this.basketList = this.basketService.basketList
  }

  getBasketList() {
    this.basketService.getBasketList()
  }

  delete(basket: BasketModel) {
    this.spinner.show()
    this.basketService.deleteBasket(basket).subscribe(res => {
      this.spinner.hide()
      this.getBasketList()
      this.productService.getProducts()
    }, err => {
      this.spinner.hide()
      this.errorService.errorHandler(err)
    })
  }

  increase(basket: BasketModel) {
    this.spinner.show()
    if (basket.product.inventoryQuantity == 0) {
      this.spinner.hide()
      this.toastrService.warning('Stokta yok', basket.product.name)
    } else {
      basket.quantity++
      this.spinner.hide()
      this.basketService.update(basket).subscribe(res => {
        this.getBasketList()
        this.productService.getProducts()
      }, err => {
        this.errorService.errorHandler(err)
      })
    }
  }

  reduce(basket: BasketModel) {
    this.spinner.show()
    if (basket.quantity == 1) {
      this.spinner.hide()
      this.toastrService.warning('Sepetteki Ürünü Azaltamazsınız', basket.product.name)
    } else {
      basket.quantity--
      this.spinner.hide()
      this.basketService.update(basket).subscribe(res => {
        this.getBasketList()
        this.productService.getProducts()
      }, err => {
        this.errorService.errorHandler(err)
      })
    }
  }















  totalPrice() {
    this.total = this.basketService.totalPrice()
    return this.total
  }

  getAuth() {
    return this.authService.isAuthenticated()
  }
  
}