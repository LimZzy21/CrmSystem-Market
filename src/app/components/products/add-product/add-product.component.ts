import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [ProductService,ReactiveFormsModule ]
})
export class AddProductComponent  {
constructor(private ProductService:ProductService){}

onHandleAddItem(){
  if(this.addProduct.valid){
    const product = this.addProduct.value
    this.ProductService.addItem(product, this.addProduct.value.category).subscribe()

    this.addProduct.reset()
  }
  
}

  addProduct: FormGroup = new FormGroup({

    "title": new FormControl('', [Validators.required, Validators.minLength(8)]),
    "price": new FormControl(0, [Validators.required, Validators.minLength(8)]),
    "category": new FormControl('', [Validators.required]),
    'details':new FormControl('',[]),
    'img':new FormControl('', [Validators.required])
  });


}
