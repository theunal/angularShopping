import { Component, OnInit, AfterContentChecked, Inject } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterContentChecked {


  paymentForm : FormGroup
  total: number = 0


  constructor(
    @Inject('validationError') private validationError : string,
    private basketService: BasketService, private spinner : NgxSpinnerService, 
    private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.createPaymentForm()
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total // ng on init sadece bir kez çalıştıgı için totali güncelliyemiyor
  }

  createPaymentForm() {
    this.paymentForm = new FormGroup({
      id : new FormControl(0),
      cartOwner: new FormControl(''),
      cartNumber : new FormControl(''),
      expirationDate : new FormControl(Date()),
      cvv : new FormControl('')
    })
  }

  payment() {
    console.log(this.paymentForm.value)
    this.spinner.show()
    if (this.paymentForm.valid) {
      this.spinner.hide()
      this.basketService.payment(this.paymentForm.value)
      document.getElementById("paymentCloseButton").click();
    } else {
      this.spinner.hide()
      this.toastrService.warning(this.validationError)
    }
  }




}
