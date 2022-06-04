import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value : any[], filterText : string): any[] {
    return value.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
  }

}
