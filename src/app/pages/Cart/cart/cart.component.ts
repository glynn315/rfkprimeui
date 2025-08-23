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
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Route, Router } from '@angular/router';
pdfMake.vfs = pdfFonts.vfs;
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
    private ProductServices: ProductService,
    private Router : Router
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

      this.totalDiscount = this.cartDetails.reduce((total, item) => {
        return total + (item.discount || 0) / 100;
      }, 0);
      this.cartTotal = this.cartDetails.reduce((sum, item) => {
        const price =  item.product_price|| 0;
        const discount = item.discount || 0;
        const discountValue = discount / 100;
        const displayPrice = price - discountValue * price;
        const quantity = item.quantity ? Number(item.quantity) : 1;
        return sum + displayPrice * quantity;
      }, 0);
    });
  }
  generateReceipt() {
    const customer = this.CustomerInformation.find(
      (c) => c.customer_id === this.OrderFields.customer_id
    );
    if (!this.OrderFields.customer_id || !this.OrderFields.payment_method) {
      alert('⚠️ Please select customer and payment method before proceeding.');
      return;
    }

    if (
      this.OrderFields.payment_method === 'Cash' &&
      (!this.paymentFields.payment_amount ||
        this.paymentFields.payment_amount < this.cartTotal)
    ) {
      alert('⚠️ Amount must be equal or greater than total.');
      return;
    }
    this.addPayment();
    const productTableBody = [
      [
        { text: '#', bold: true },
        { text: 'Product', bold: true },
        { text: 'Qty', bold: true },
        { text: 'Price w/ Tax', bold: true },
        { text: 'Discount', bold: true },
        { text: 'Total', bold: true },
      ],
      ...this.cartDetails.map((item, index) => {
        const discount = item.discount ?? 0;
        const productPrice = Number(item.product_price);
        const priceWithDiscount =
          (productPrice - (discount / 100) * productPrice) *
          item.quantity;
        
        return [
          index + 1,
          item.product_id,
          item.quantity,
          `₱${productPrice.toFixed(2)}`,
          `${discount}%`,
          `₱${priceWithDiscount.toFixed(2)}`,
        ];
      }),
      [
        { text: 'TOTAL', colSpan: 5, alignment: 'right', bold: true },
        {},
        {},
        {},
        {},
        `₱${this.cartTotal.toFixed(2)}`,
      ],
    ];
    let paymentDetailsTable: any[] = [];
    if (this.OrderFields.payment_method === 'Cash') {
      const amount = Number(this.paymentFields.payment_amount);
      paymentDetailsTable = [
        [{ text: 'Payment Method', bold: true }, 'Cash'],
        [
          { text: 'Amount Paid', bold: true },
          `₱${amount?.toFixed(2) || '0.00'}`,
        ],
        [{ text: 'Status', bold: true }, 'PAID'],
      ];
    } 
    else if (this.OrderFields.payment_method === 'Credit') {
      const terms = Number(this.OrderFields.terms) || 0;
      const monthly = terms > 0 ? this.cartTotal / terms : 0;

      paymentDetailsTable = [
        [{ text: 'Payment Method', bold: true }, 'Credit'],
        [{ text: 'Terms', bold: true }, `${terms} months`],
        [
          { text: 'Monthly Payment', bold: true },
          `₱${monthly.toFixed(2)}`,
        ],
        [
          { text: 'Total Amount', bold: true },
          `₱${this.cartTotal.toFixed(2)}`,
        ],
        [{ text: 'Status', bold: true }, 'ACTIVE'],
      ];
    }
    const docDefinition: any = {
      content: [
        { text: 'RFKPRIME', style: 'companyName' },
        {
          text: 'Official Payment Receipt',
          style: 'header',
          margin: [0, 0, 0, 20],
        },

        {
          columns: [
            [
              { text: `Receipt No: ${new Date().getTime()}`, style: 'subheader' },
              {
                text: `Date: ${new Date().toLocaleString()}`,
                style: 'subheader',
              },
            ],
            [
              {
                text: `Order ID: ${this.OrderFields.order_id || 'Pending'}`,
                alignment: 'right',
                style: 'subheader',
              },
              {
                text: `${
                  this.OrderFields.payment_method === 'Cash' ? 'PAID' : 'ONGOING'
                }`,
                alignment: 'right',
                style:
                  this.OrderFields.payment_method === 'Cash'
                    ? 'paidStatus'
                    : 'ongoingStatus',
              },
            ],
          ],
        },

        { text: '\nCustomer Information', style: 'sectionHeader' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: 'Customer ID', bold: true },
                `${customer?.customer_id || ''}`,
              ],
              [
                { text: 'Full Name', bold: true },
                `${customer?.customer_fname || ''} ${
                  customer?.customer_lname || ''
                }`,
              ],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 15],
        },

        { text: 'Purchased Items', style: 'sectionHeader' },
        {
          table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: productTableBody,
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 15],
        },

        { text: 'Payment Details', style: 'sectionHeader' },
        {
          table: {
            widths: ['*', '*'],
            body: paymentDetailsTable,
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 15],
        },

        { text: '\n\nThank you for your purchase!', style: 'thankYou' },
        { text: 'This is a system-generated receipt.', style: 'footerNote' },
      ],
      styles: {
        companyName: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        header: { fontSize: 20, bold: true, alignment: 'center' },
        subheader: { fontSize: 10, color: '#555' },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
          color: '#333',
        },
        paidStatus: { fontSize: 12, bold: true, color: 'green' },
        ongoingStatus: { fontSize: 12, bold: true, color: 'orange' },
        thankYou: {
          fontSize: 12,
          italics: true,
          alignment: 'center',
          margin: [0, 30, 0, 10],
        },
        footerNote: {
          fontSize: 9,
          color: '#888',
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
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
          alert('✅ Cash payment successfully recorded!');
        });

        this.CartServices.updateCartStatus().subscribe();
      });
    }
    if (this.OrderFields.payment_method === 'Credit') {
      this.paymentFields.payment_amount = this.cartTotal;
      this.OrderFields.cart_id = this.paymentFields.cart_id;
      this.OrderServices.addnewOrders(this.OrderFields).subscribe((orderResponse: any) => {
        const orderId = orderResponse.order_id;
        this.termsField.order_id = orderId;
        this.monthlyPayment = this.cartTotal / this.OrderFields.terms;
        this.termsField.amount = parseFloat(this.monthlyPayment.toFixed(2));
        this.termsField.terms = this.OrderFields.terms;

        this.termsServices.addTerms(this.termsField).subscribe(() => {
          alert('✅ Credit terms successfully recorded!');
        });
      });

      this.CartServices.updateCartStatus().subscribe();
    }
    this.Router.navigate(['/orders']);
  }
}
