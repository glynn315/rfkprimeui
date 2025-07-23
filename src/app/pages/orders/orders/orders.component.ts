import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , Funnel , ShoppingCartIcon} from 'lucide-angular';
import { ProductService } from '../../../Services/Product/product.service';
import { Product } from '../../../model/Product/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [LucideAngularModule, HttpClientModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ProductService]
})
export class OrdersComponent implements OnInit {
  
  constructor(private ProductServices : ProductService){}
  readonly Funnel = Funnel;
  readonly Cart = ShoppingCartIcon;
  ProductDisplay: Product[] = [];
  ngOnInit(): void {
    this.DisplayProduct();
  }

  DisplayProduct(){
    this.ProductServices.displayProducts().subscribe((data) => {
      this.ProductDisplay = data;
    });
  }
  

}
