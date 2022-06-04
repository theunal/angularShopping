import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from './errorService';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = []

  constructor(
    @Inject('api')
    private api: string,
    private errorService: ErrorService, private httpClient: HttpClient, private spinner: NgxSpinnerService) { }


  getProducts(): Observable<ListResponseModel<ProductModel>> {
    let url = this.api + 'products/getlist'

    this.spinner.show()
    this.httpClient.get<ListResponseModel<ProductModel>>(url).subscribe(res => {
      this.products = res.data
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
      this.errorService.errorHandler(err)
    })
    return this.httpClient.get<ListResponseModel<ProductModel>>(url)
  }



  getProductById(codeGuid: string): Observable<SingleResponseModel<ProductModel>> {
    let url = this.api + 'products/getById?guid=' + codeGuid
    return this.httpClient.get<SingleResponseModel<ProductModel>>(url)
  }

  productAdd(product: ProductModel): Observable<ResponseModel> {
    let url = this.api + 'products/add'
    return this.httpClient.post<ResponseModel>(url, product)
  }

  productUpdate(product: ProductModel): Observable<ResponseModel> {
    let url = this.api + 'products/update'
    return this.httpClient.post<ResponseModel>(url, product)
  }

  productDelete(product: ProductModel): Observable<ResponseModel> {
    let url = this.api + 'products/delete'
    return this.httpClient.post<ResponseModel>(url, product)
  }



}
