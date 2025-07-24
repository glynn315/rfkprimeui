import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LucideAngularModule , Funnel , ShoppingCartIcon} from 'lucide-angular';
import { ProductService } from '../../../Services/Product/product.service';
import { Product } from '../../../model/Product/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [LucideAngularModule, HttpClientModule, CommonModule, ModalComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ProductService]
})
export class OrdersComponent implements OnInit {
  
  constructor(private ProductServices : ProductService){}
  readonly Funnel = Funnel;
  readonly Cart = ShoppingCartIcon;
  ProductDisplay: Product[] = [];
  productReference:string = "";
  @Input() OpenProductModal = false;
  headerText = 'Cart Modal';
  @Output() openCartModalChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.DisplayProduct();
  }

  openModal(product_id: any){

    if (!product_id) {
      return
    }

    this.productReference = product_id;

    this.OpenProductModal = true;
  }

  closeModal(){
    this.OpenProductModal = false;
    this.openCartModalChange.emit(false);
  }

  DisplayProduct(){
    this.ProductServices.displayProducts().subscribe((data) => {
      this.ProductDisplay = data;
    });
  }
  

}
