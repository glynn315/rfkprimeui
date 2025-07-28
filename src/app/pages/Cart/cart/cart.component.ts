import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../../Services/Cart/cart.service';
import { Cart } from '../../../model/Cart/cart.model';
import { PaymentService } from '../../../Services/Payment/payment.service';
import { Payment } from '../../../model/Payment/payment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [HttpClientModule, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService, PaymentService]
})
export class CartComponent implements OnInit {
  
  constructor(private CartServices : CartService , private PaymentServices: PaymentService){}
  amountVisible : boolean = false;
  cartDetails: Cart[] = [];
  paymentFields: Payment = {
    cart_id: 'CRT-20250725-1',
    payment_method: '',
    payment_amount: 0,
    payment_status: 'ACTIVE'
  }



  ngOnInit(): void {
    this.displayCart();
  }
  selectPaymentMethod(){
    if (this.paymentFields.payment_method == "Cash") {
      this.amountVisible = true;
    }
    else{
      this.amountVisible = false;
    }
  }

  displayCart(){
    this.CartServices.displayCartActive().subscribe((data) => {
      this.cartDetails = data;
    });
  }
  

  addPayment(){
    this.PaymentServices.addPayment(this.paymentFields).subscribe(() => {

    });
    this.CartServices.updateCartStatus().subscribe(() =>{

    });
  }



}
