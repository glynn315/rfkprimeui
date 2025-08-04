import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/Order/order.service';
import { OrderInformation } from '../../../model/Order/order-information.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TermsService } from '../../../Services/Terms/terms.service';
import { Terms } from '../../../model/Terms/terms.model';

@Component({
  selector: 'app-paymentview',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './paymentview.component.html',
  styleUrl: './paymentview.component.scss',
  providers: [OrderService, TermsService],
})
export class PaymentviewComponent implements OnInit {
  constructor(
    private OrderServices: OrderService,
    private route: ActivatedRoute,
    private TermsServices: TermsService,
    private routes: Router
  ) {}
  displayInfo: OrderInformation | null = null;
  orderID: string | null = '';
  TermsList : Terms[] = [];

  ngOnInit(): void {
    this.displayUserInformation();
    this.displayPaymentInformation();
  }

  displayUserInformation() {
    this.orderID = this.route.snapshot.paramMap.get('order_id');
    if (this.orderID) {
      this.OrderServices.displayInformation(this.orderID).subscribe((data) => {
        this.displayInfo = data;
      });
    } else {
      alert('No ID Available');
    }
  }

  displayPaymentInformation() {
    this.orderID = this.route.snapshot.paramMap.get('order_id');
    if (this.orderID) {
      this.TermsServices.displayPaymentList(this.orderID).subscribe((data) => {
        this.TermsList = data;
      });
    } else {
      alert('No ID Available');
    }
  }

  payment(id?:number){
    if (id) {
      this.routes.navigate(['/paymenttransaction', id]);
    }
  }
}
