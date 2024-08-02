import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'isEmployeeFilter',
  standalone: true
})
export class IsEmployeeFilterPipe implements PipeTransform {

  transform(Customer: Customer[], position:string): Customer[] {
    
    
    console.log(position);
    if (!position) {
      
      return Customer;
    }else if(position == 'employee'){
      return Customer.filter(customer => customer.isEmployee)
    
    }else if(position == 'customer'){
      return Customer.filter(customer => !customer.isEmployee)
    }

    
    return Customer.filter(customer => {
      if (!customer.position){
        return ''
      }
      let pos = customer.position.toLowerCase()
  
      return pos === position 
    });
  }

}
