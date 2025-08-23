import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LucideAngularModule , Funnel , ShoppingCartIcon} from 'lucide-angular';
import { ProductService } from '../../../Services/Product/product.service';
import { Product } from '../../../model/Product/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/Cart/cart.service';
import { Cart } from '../../../model/Cart/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [RouterLink ,LucideAngularModule, HttpClientModule, CommonModule, ModalComponent, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ProductService, CartService]
})
export class OrdersComponent implements OnInit {
  
  constructor(
    private ProductServices: ProductService,
    private CartServices: CartService
  ) {}

  readonly Funnel = Funnel;
  readonly Cart = ShoppingCartIcon;

  ProductDisplay: Product[] = [];

  displaySelectedProduct: Product = {
    supplier_id: '',
    product_name: '',
    product_volume: '',
    product_quantity: 0,
    product_pricepc: 0,
    product_pricebulk: 0,
    product_status: ''
  };

  cartFields: Cart = {
    product_id: '',
    quantity: 0,
    product_price: 0,
    cart_status: '',
    discount: 0,
    vat: 12,
  };

  productReference: string = '';
  @Input() OpenProductModal = false;
  headerText = 'Cart Modal';
  @Output() openCartModalChange = new EventEmitter<boolean>();
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this.DisplayProduct();
  }
  

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.ProductDisplay.filter(product =>
      product.product_name!.toLowerCase().includes(term)
    );
  }
  openModal(product_id: string): void {
    if (!product_id) return;

    this.productReference = product_id;

    this.ProductServices.displaySelectedProduct(product_id).subscribe({
      next: (data) => {
        this.displaySelectedProduct = data;
        const priceWithVat = this.displaySelectedProduct.product_pricebulk! * 1.12;
        this.cartFields.product_price = Number(priceWithVat.toFixed(2));

        this.OpenProductModal = true;
      },
      error: (error) => {
        console.error('Failed to load product:', error);
      }
    });
  }

  addtoCart(): void {
    this.cartFields.product_price = Number(this.cartFields.product_price).toFixed(2) as any;

    this.cartFields.product_id = this.productReference;
      this.cartFields.cart_status = 'ACTIVE';

    this.CartServices.addtoCart(this.cartFields).subscribe({
      next: () => {
        alert('✅ Product successfully added to cart!');
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to add product to cart:', err);
        alert('❌ Failed to add product to cart. Please try again.');
      }
    });
  }


  closeModal(): void {
    this.OpenProductModal = false;
    this.openCartModalChange.emit(false);
  }

  DisplayProduct(): void {
    this.ProductServices.displayProducts().subscribe((data) => {
      this.ProductDisplay = data;
      this.filteredProducts = data;
    });
  }
}
