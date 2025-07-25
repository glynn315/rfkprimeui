import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LucideAngularModule , Funnel , ShoppingCartIcon} from 'lucide-angular';
import { ProductService } from '../../../Services/Product/product.service';
import { Product } from '../../../model/Product/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { NotFoundError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/Cart/cart.service';
import { Cart } from '../../../model/Cart/cart.model';

@Component({
  selector: 'app-orders',
  imports: [LucideAngularModule, HttpClientModule, CommonModule, ModalComponent, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ProductService, CartService]
})
export class OrdersComponent implements OnInit {
  
  constructor(private ProductServices : ProductService , private CartServices : CartService){}
  readonly Funnel = Funnel;
  readonly Cart = ShoppingCartIcon;
  ProductDisplay: Product[] = [];
  displaySelectedProduct: Product ={
    supplier_id: '',
    product_name: '',
    product_volume: '',
    product_quantity: '',
    product_pricepc: 0,
    product_pricebulk: 0,
    product_status: ''
  }
  cartFields : Cart = {
    product_id: '',
    quantity: 0,
    product_price: 0,
    cart_status: ''
  }
  productReference:string = "";
  @Input() OpenProductModal = false;
  headerText = 'Cart Modal';
  @Output() openCartModalChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.DisplayProduct();
  }

  openModal(product_id: string): void {
    if (!product_id) return;

    this.productReference = product_id;
    console.log('Opening modal for ID:', product_id);

    this.ProductServices.displaySelectedProduct(product_id).subscribe((data) => {
      console.log('API Response:', data);
      this.displaySelectedProduct = data;
      this.OpenProductModal = true;
    }, (error) => {
      console.error('Failed to load product:', error);
    });
  }

  addtoCart(){
    this.cartFields.product_id = this.productReference;
    this.cartFields.cart_status = 'ACTIVE';
    this.CartServices.addtoCart(this.cartFields).subscribe(() => {
      
    });
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
