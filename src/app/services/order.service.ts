import { Inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { ListResponseModel } from "../models/listResponseModel";
import { Observable } from 'rxjs';
import { OrderResponseModel } from "../models/orderResponseModel";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        @Inject('api')
        private api: string,
        private httpClient: HttpClient) { }

    getOrders(): Observable<ListResponseModel<OrderResponseModel>> {
        let url = this.api + 'Orders/getList'
        return this.httpClient.get<ListResponseModel<OrderResponseModel>>(url)
    }

}