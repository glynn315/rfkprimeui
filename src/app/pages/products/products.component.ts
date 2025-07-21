import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , PlusCircleIcon } from "lucide-angular";
import { AddproductsComponent } from "./addproducts/addproducts.component";
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../Services/Product/product.service';
import { Product } from '../../model/Product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, AddproductsComponent, HttpClientModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers:[ProductService]
})
export class ProductsComponent implements OnInit {

  constructor(private ProductServices: ProductService){}
  readonly plus = PlusCircleIcon;
  openTaskModal = false;
  ProductList: Product[] = [];
  ngOnInit(): void {
    this.displayProduct();
  }

  displayProduct(){
    this.ProductServices.displayProducts().subscribe((data) =>{
      this.ProductList = data;
    })
  }

  
  openModal(){
    this.openTaskModal = true;
  }
  closeModal() {
    this.openTaskModal = false;
  }
}
