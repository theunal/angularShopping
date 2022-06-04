import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ErrorService } from 'src/app/services/errorService';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from './../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterContentChecked {

  isAuth: boolean = false
  products: ProductModel[] = []
  filterText: string = ''

  constructor(private productService: ProductService, private basketService: BasketService,
    private errorService : ErrorService,
    private authService: AuthService, private toastrService: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts()
  }

 

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated()
    this.products = this.productService.products
  }

  addBasket(product: ProductModel) {
    this.spinner.show()
    let basket = new BasketModel()
    basket.productId = product.id
    basket.product = product
    basket.quantity = 1
    this.basketService.addBasket(basket).subscribe(res => {
      this.spinner.hide()
      this.getProducts()
      this.basketService.getBasketList()
      this.toastrService.success(res.message)
    }, err => {
      this.spinner.hide()
      this.errorService.errorHandler(err)
    })
  }
  



















  addBasketButtonClass(product: ProductModel) {
    if (product.inventoryQuantity > 0) return "btn btn-success active"
    else return "btn btn-success disabled"
  }

}
