import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product';
import { ErrorService } from 'src/app/services/errorService';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  addForm : FormGroup
  imageUrl : string = ''

  constructor(
    @Inject('validationError') private validationError : string,
    private errorService : ErrorService,
    private productService : ProductService, private toastrService : ToastrService, 
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.createAddForm()
  }

  createAddForm() {
    this.addForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      imageUrl : new FormControl('', [Validators.required]),
      inventoryQuantity : new FormControl('', [Validators.required]),
      price : new FormControl('', [Validators.required]),
    })
  }

  productAdd() {
    this.spinner.show()
    if (this.addForm.valid) {
      this.spinner.hide()
      let product = new ProductModel()
      this.productService.getProducts().subscribe(res => {
        product.id = res.data.length +1
      })
      product.name = this.addForm.value.name
      product.imageUrl = this.addForm.value.imageUrl
      product.inventoryQuantity = this.addForm.value.inventoryQuantity
      product.price = this.addForm.value.price

      this.productService.productAdd(product).subscribe(res => {
        this.toastrService.success('Product Added', 'Success')
      }, err => {
        this.errorService.errorHandler(err)
      })
    } else {
      this.spinner.hide()
      this.toastrService.error(this.validationError)
    }
  }

}
