import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../../Services/Cart/cart.service';
import { Cart } from '../../../model/Cart/cart.model';

@Component({
  selector: 'app-cart',
  imports: [HttpClientModule, LucideAngularModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService]
})
export class CartComponent implements OnInit {
  
  constructor(private CartServices : CartService){}
  cartDetails: Cart[] = [];
  ngOnInit(): void {
    this.displayCart();
  }

  displayCart(){
    this.CartServices.displayCart().subscribe((data) => {
      this.cartDetails = data;
    });
  }



}
