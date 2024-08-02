import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'customerSearch',
  standalone: true
})
export class CustomerSearchPipe implements PipeTransform {

  transform(Customer: Customer[], searchStr: string): Customer[] {
    return Customer.filter(el => el.userName.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()))
  }


}
