import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService : ToastrService) { }

  errorHandler(error : any) {
    if (error.status == '400' || error.status == '401') {
      this.toastrService.error(error.error)
    } else {
      this.toastrService.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'Hata')
    }
  }

}
