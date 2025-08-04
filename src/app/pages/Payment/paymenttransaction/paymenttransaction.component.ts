import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TermsService } from '../../../Services/Terms/terms.service';
import { Terms } from '../../../model/Terms/terms.model';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../model/Payment/payment.model';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../Services/Payment/payment.service';

@Component({
  selector: 'app-paymenttransaction',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './paymenttransaction.component.html',
  styleUrl: './paymenttransaction.component.scss',
  providers: [TermsService,PaymentService],
})
export class PaymenttransactionComponent implements OnInit {
  constructor(
    private TermsServices: TermsService,
    private route: ActivatedRoute,
    private paymentServices : PaymentService
  ) {}
  orderID: number | null = null;
  displayInfo: Terms | null = null;
  paymentField: Payment = {
    cart_id: '',
    order_id: '',
    payment_amount: 0,
    payment_status: 'ACTIVE',
  };
  ngOnInit(): void {
    this.displayTermsInformation();
  }

  displayTermsInformation() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.orderID = idParam !== null ? Number(idParam) : null;
    if (this.orderID) {
      this.TermsServices.displayTermsInformation(this.orderID).subscribe(
        (data) => {
          this.displayInfo = data;
        }
      );
    }
  }

  payTerms() {
    if (this.displayInfo?.order_id) {
      this.paymentField.order_id = this.displayInfo?.order_id;
      this.paymentServices.addPayment(this.paymentField).subscribe(()=>{});
    }
  }
}
