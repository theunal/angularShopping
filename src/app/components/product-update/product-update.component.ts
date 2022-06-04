import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product';
import { ErrorService } from 'src/app/services/errorService';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  updateForm: FormGroup
  product: ProductModel = new ProductModel()
  imageUrl : string = ''

  constructor(
    @Inject('validationError') private validationError : string,
    private errorService : ErrorService,
    private activatedRoute: ActivatedRoute, private productService: ProductService,
    private toastrService: ToastrService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProductById()
    this.createUpdateForm()
  }


  createUpdateForm() {
    this.updateForm = new FormGroup({
      id: new FormControl(this.product.id),
      name: new FormControl('', [Validators.required]),
      inventoryQuantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      codeGuid: new FormControl(this.product.codeGuid)
    })
  }


  getProductById() {
    this.spinner.show()
    return this.productService.getProductById(this.activatedRoute.snapshot.params['codeGuid']).subscribe(res => {
      this.spinner.hide()
      this.product = res.data
      console.log("ürün Getirildi")
      console.log(res.data)
      this.updateForm.controls['name'].setValue(res.data.name)
      this.updateForm.controls['imageUrl'].setValue(res.data.imageUrl)
      this.updateForm.controls['inventoryQuantity'].setValue(res.data.inventoryQuantity)
      this.updateForm.controls['price'].setValue(res.data.price)
    }, err => {
      this.spinner.hide()
      this.router.navigate(["/"])
      this.errorService.errorHandler(err)
    })
  }


  productUpdate() {
    this.spinner.show()
    if (this.updateForm.valid) {
      this.spinner.hide()
      let product = this.updateForm.value
      product.id = this.product.id
      product.codeGuid = this.product.codeGuid
      this.productService.productUpdate(product).subscribe((res) => {
        this.router.navigate(["/"]);
        this.toastrService.info(res.message, product.name);
      }, err => {
        this.errorService.errorHandler(err)
      });
    } else {
      this.spinner.hide()
      this.toastrService.info(this.validationError)
    }
  }


  productDelete() {
    this.spinner.show()
    this.productService.productDelete(this.product).subscribe(res => {
      this.router.navigate(["/"])
      this.spinner.hide()
      this.toastrService.info(res.message)
      console.log(res)
    }, err => {
      this.spinner.hide()
      this.errorService.errorHandler(err)
    })
  }
}
