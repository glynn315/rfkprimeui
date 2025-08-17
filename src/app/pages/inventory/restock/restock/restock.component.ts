import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Services/Product/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../model/Product/product.model';

@Component({
  selector: 'app-restock',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './restock.component.html',
  styleUrl: './restock.component.scss',
  providers: [ProductService]
})
export class RestockComponent implements OnInit {

  constructor(private ProductServices : ProductService , private route: ActivatedRoute, private navigate: Router) {}

  idParam: string ='';
  Productinfo : Product | null = null;
  ProductQuantity : Product = {
    product_quantity: 0,
    product_id: '',
  }
  
  ngOnInit(): void {
    this.displayQuery();
  }

  displayQuery(){
    this.idParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.ProductServices.displaySelectedProduct(this.idParam).subscribe((data)=> {
      this.Productinfo = data;
    });
  }
  UpdateQuantity(){
    this.ProductServices.updatestocks(this.idParam, this.ProductQuantity.product_quantity!).subscribe(()=>{
      this.displayQuery();
      alert('Stocks Added');

      this.navigate.navigate(['/inventory'])
    });
  }

}
