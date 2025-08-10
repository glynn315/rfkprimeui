import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../../Services/Cart/cart.service';
import { Cart } from '../../../model/Cart/cart.model';
import { PaymentService } from '../../../Services/Payment/payment.service';
import { Payment } from '../../../model/Payment/payment.model';
import { FormsModule } from '@angular/forms';
import { TermsService } from '../../../Services/Terms/terms.service';
import { Terms } from '../../../model/Terms/terms.model';
import { Order } from '../../../model/Order/order.model';
import { OrderService } from '../../../Services/Order/order.service';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { Customer } from '../../../model/Customer/customer.model';
import { ProductService } from '../../../Services/Product/product.service';

@Component({
  selector: 'app-cart',
  imports: [HttpClientModule, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService, PaymentService, TermsService, OrderService, CustomerService, ProductService],
})
export class CartComponent implements OnInit {
  constructor(
    private CartServices: CartService,
    private PaymentServices: PaymentService,
    private termsServices: TermsService,
    private OrderServices: OrderService,
    private CustomerServices: CustomerService,
    private ProductServices: ProductService
  ) {}
  amountVisible: boolean = false;
  paymentTerms: number= 0;
  monthlyPayment: number= 0;
  termsField : Terms ={
    amount: 0,
    schedule_date: new Date(),
    payment_date: new Date(),
    payment_status: 'ACTIVE',
    order_id: '',
    terms: 0,
    initial_date: new Date(),
  }
  termsVisible: boolean = false;
  cartDetails: Cart[] = [];
  cartTotal: number = 0;
  totalDiscount: number = 0;
  OrderFields: Order = {
    order_id: '',
    customer_id: '',
    payment_method: '',
    terms: 0,
    percentage: 0,
    cart_id: ''
  }
  paymentFields: Payment = {
    cart_id: 'CRT-20250725-1',
    payment_amount: 0,
    payment_status: 'ACTIVE',
    order_id: ''
  };
  CustomerInformation : Customer[] = [];
  ngOnInit(): void {
    this.displayCart();
    this.displayCustomer();
  }
  selectPaymentMethod() {
    if (this.OrderFields.payment_method == 'Cash') {
      this.amountVisible = true;
      this.termsVisible = false;
    } else {
      this.amountVisible = false;
      this.termsVisible = true;
    }
  }

  displayCart() {
    this.CartServices.displayCartActive().subscribe((data: any[]) => {
      this.cartDetails = data;

      this.totalDiscount = this.cartDetails.reduce((total, discount) => {
        const discountConvertion = discount.discount || 0;
        return (total = discountConvertion / 100 || 0);
      }, 0);

      this.cartTotal = this.cartDetails.reduce((sum, item) => {
        const price = item.product_price || 0;
        const discount = item.discount || 0;
        const discountValue = discount / 100;
        const displayPrice = price - discountValue * price;
        const quantity = item.quantity ? Number(item.quantity) : 1;
        return sum + displayPrice * quantity;
      }, 0);
    });
  }

  displayCustomer(){
    this.CustomerServices.displayCustomer().subscribe((data) =>{
      this.CustomerInformation = data;
    });
  }
  addPayment() {
    if (this.OrderFields.payment_method === 'Cash') {
      this.OrderFields.cart_id = this.paymentFields.cart_id;
      this.OrderServices.addnewOrders(this.OrderFields).subscribe((orderResponse: any) => {
        const orderId = orderResponse.order_id;
        this.paymentFields.order_id = orderId;

        this.PaymentServices.addPayment(this.paymentFields).subscribe(() => {

        });
        this.CartServices.updateCartStatus().subscribe(() => {

        });
      });
      this.ProductServices.updateProductQuantity(
        this.cartDetails.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      ).subscribe(() => {
        console.log('Product quantities updated');
      });
    }
    

    if (this.OrderFields.payment_method === 'Credit') {
      this.paymentFields.payment_amount = this.cartTotal;
      this.OrderFields.cart_id = this.paymentFields.cart_id;
      this.OrderServices.addnewOrders(this.OrderFields).subscribe((orderResponse: any) => {
        const orderId = orderResponse.order_id;
        this.termsField.order_id = orderId;
        this.monthlyPayment = (this.cartTotal && this.cartTotal)
        ? this.cartTotal / this.OrderFields.terms
        : 0;

        this.termsField.amount = parseFloat(this.monthlyPayment.toFixed(2));
        this.termsField.terms = this.OrderFields.terms;
        this.termsServices.addTerms(this.termsField).subscribe(() => {
        });
      });
      this.ProductServices.updateProductQuantity(
        this.cartDetails.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      ).subscribe(() => {
        console.log('Product quantities updated');
      });
      

      this.CartServices.updateCartStatus().subscribe(() => {

      });
    }
  }
}
