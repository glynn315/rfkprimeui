import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TermsService } from '../../../Services/Terms/terms.service';
import { Terms } from '../../../model/Terms/terms.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../../../model/Payment/payment.model';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../Services/Payment/payment.service';
import { OrderService } from '../../../Services/Order/order.service';
import { OrderInformation } from '../../../model/Order/order-information.model';

// PDF library
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-paymenttransaction',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './paymenttransaction.component.html',
  styleUrl: './paymenttransaction.component.scss',
  providers: [TermsService, PaymentService, OrderService],
})
export class PaymenttransactionComponent implements OnInit {
  
  displayInfo: OrderInformation | null = null;
  orderID: string | null = null; 
  paymentInfo: Terms | null = null;

  paymentField: Payment = {
    cart_id: '',
    order_id: '',
    payment_amount: 0,
    payment_status: 'ACTIVE',
  };

  constructor(
    private TermsServices: TermsService,
    private route: ActivatedRoute,
    private paymentServices: PaymentService,
    private OrderServices: OrderService,
    private navigate: Router,
  ) {}

  ngOnInit(): void {
    this.displayUserInformation();
  }

  displayUserInformation() {
    const orderIdParam = this.route.snapshot.paramMap.get('order_id');
    const idParam = this.route.snapshot.paramMap.get('id');

    if (orderIdParam) {
      this.orderID = orderIdParam;

      this.OrderServices.displayInformation(this.orderID).subscribe((data) => {
        this.displayInfo = data;
      });

      if (idParam) {
        this.TermsServices.displayTermsInformation(idParam).subscribe((data) => {
          this.paymentInfo = data;
        });
      }
    } else {
      alert('No Order ID Available');
    }
  }

  payTerms() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const orderIdParam = this.route.snapshot.paramMap.get('order_id');

    if (idParam) {
      this.TermsServices.updatePaymentStatus(idParam, 'PAID').subscribe(() => {
        console.log('Payment status updated');
        
      });
    }

    if (orderIdParam) {
      this.paymentField.order_id = orderIdParam;
      this.paymentServices.addPayment(this.paymentField).subscribe(() => {
        console.log('Payment added');
        this.navigate.navigate(['/payments']);
        this.generateReceipt();

      });
    }
  }

  generateReceipt() {
    const docDefinition: any = {
      content: [
        {
          text: 'RFKPRIME',
          style: 'companyName'
        },
        {
          text: 'Official Payment Receipt',
          style: 'header',
          margin: [0, 0, 0, 20]
        },

        {
          columns: [
            [
              { text: `Receipt No: ${new Date().getTime()}`, style: 'subheader' },
              { text: `Date Issued: ${new Date().toLocaleString()}`, style: 'subheader' },
            ],
            [
              { text: `Order ID: ${this.orderID}`, alignment: 'right', style: 'subheader' },
              { text: `Status: PAID`, alignment: 'right', style: 'paidStatus' },
            ]
          ]
        },

        { text: '\nCustomer Information', style: 'sectionHeader' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [{ text: 'Order ID', bold: true }, `${this.orderID}`],
              [{ text: 'Full Name', bold: true }, `${this.displayInfo?.first_name} ${this.displayInfo?.last_name}`],
              
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 15]
        },

        { text: 'Payment Details', style: 'sectionHeader' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [{ text: 'Amount Paid', bold: true }, `₱${this.paymentField.payment_amount}`],
              [{ text: 'Payment Status', bold: true }, 'PAID'],
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 15]
        },

        { text: '\n\nThank you for your payment!', style: 'thankYou' },

        {
          text: 'This is a system-generated receipt. No signature required.',
          style: 'footerNote'
        }
      ],
      styles: {
        companyName: { fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        header: { fontSize: 20, bold: true, alignment: 'center' },
        subheader: { fontSize: 10, color: '#555' },
        sectionHeader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5], color: '#333' },
        paidStatus: { fontSize: 12, bold: true, color: 'green' },
        thankYou: { fontSize: 12, italics: true, alignment: 'center', margin: [0, 30, 0, 10] },
        footerNote: { fontSize: 9, color: '#888', alignment: 'center', margin: [0, 20, 0, 0] }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

}
