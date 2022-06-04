import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/services/errorService';
import { OrderService } from 'src/app/services/order.service';
import { OrderResponseModel } from './../../models/orderResponseModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: OrderResponseModel[] = []



  constructor(private orderService: OrderService, private spinner : NgxSpinnerService,
    private errorService : ErrorService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.spinner.show()
    this.orderService.getOrders().subscribe(res => {
      this.spinner.hide()
      this.orders = res.data
      console.log(res)
    }, err => {
      this.spinner.hide()
      this.errorService.errorHandler(err)
    })
  }


}
