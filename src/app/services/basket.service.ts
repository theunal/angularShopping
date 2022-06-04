import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { CustomerModel } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { PaymentModel } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { ErrorService } from './errorService';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basketList: BasketModel[] = []
  total: number = 0


  constructor(
    @Inject('api')
    private api: string,
    private toastrService: ToastrService,
    private errorService : ErrorService,
    private httpClient: HttpClient) { }

  getBasketList() {
    let url = this.api + 'baskets/getlist'

    return this.httpClient.get<ListResponseModel<BasketModel>>(url).subscribe(res => {
      this.basketList = res.data
    }, err => {
      console.log(err)
    })
  } 

  addBasket(basket : BasketModel) : Observable<ResponseModel>{
    let url = this.api + 'baskets/add'
    return this.httpClient.post<ResponseModel>(url, basket)
  }

  deleteBasket(basket : BasketModel) : Observable<ResponseModel>{
    let url = this.api + 'baskets/delete'
    return this.httpClient.post<ResponseModel>(url, basket)
  }

  update(basket : BasketModel) : Observable<ResponseModel>{
    let url = this.api + 'baskets/update'
    return this.httpClient.post<ResponseModel>(url, basket)
  }


  payment(payment : PaymentModel) {
    let url = this.api + 'Orders/addPayment'
    let customer = new CustomerModel()
    customer.payment = payment
    customer.baskets = this.basketList
    this.httpClient.post(url, customer).subscribe(res => {
      this.toastrService.success('Ödeme Başarılı')
    }, err => {
      this.errorService.errorHandler(err)
    })
  }


  totalPrice() {
    this.total = 0
    this.basketList.forEach(element => {
      this.total += element.product.price * element.quantity
    })
    return this.total
  }

}
