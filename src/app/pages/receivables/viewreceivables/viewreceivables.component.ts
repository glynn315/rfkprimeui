import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInformation } from '../../../model/Order/order-information.model';
import { Terms } from '../../../model/Terms/terms.model';
import { OrderService } from '../../../Services/Order/order.service';
import { TermsService } from '../../../Services/Terms/terms.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LucideAngularModule ,Printer} from 'lucide-angular';
pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-viewreceivables',
  imports: [HttpClientModule, CommonModule, LucideAngularModule],
  templateUrl: './viewreceivables.component.html',
  styleUrl: './viewreceivables.component.scss',
  providers: [OrderService, TermsService]
})
export class ViewreceivablesComponent implements OnInit {
  readonly Printer = Printer;
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
    }
  }

  displayPaymentInformation() {
    this.orderID = this.route.snapshot.paramMap.get('order_id');
    if (this.orderID) {
      this.TermsServices.displayPaymentList(this.orderID).subscribe((data) => {
        this.TermsList = data;
      });
    }
  }

  viewReceivables(id?: number) {
    if (id) {
      this.routes.navigate(['/paymenttransaction', id]);
    }
  }

  generateSOA() {
    if (!this.displayInfo) return;

    const tableBody: any[] = [
      [
        { text: '#', bold: true, fillColor: '#eeeeee' },
        { text: 'Date', bold: true, fillColor: '#eeeeee' },
        { text: 'Amount', bold: true, fillColor: '#eeeeee' },
        { text: 'Payment Date', bold: true, fillColor: '#eeeeee' },
        { text: 'Status', bold: true, fillColor: '#eeeeee' }
      ]
    ];

    let totalBalance = 0;
    this.TermsList.forEach((term, index) => {
      if (term.payment_status === 'PENDING') {
        totalBalance += Number(term.amount);
      }
      tableBody.push([
        index + 1,
        term.schedule_date,
        `₱${Number(term.amount).toLocaleString()}`,
        term.payment_date || '-',
        { text: term.payment_status, color: term.payment_status === 'PAID' ? 'green' : 'red' }
      ]);
    });

    const docDefinition: any = {
      content: [
        {
          columns: [
            // { image: 'logo', width: 70 },
            [
              { text: 'RFK PRIME', style: 'companyName' },
              { text: 'Statement of Account', style: 'header' },
              { text: `Generated on: ${new Date().toLocaleDateString()}`, style: 'date' }
            ]
          ]
        },
        { text: '\nClient Information', style: 'sectionHeader' },
        {
          columns: [
            [
              { text: `Name: ${this.displayInfo.first_name} ${this.displayInfo.middle_name} ${this.displayInfo.last_name}` },
              { text: `Contact: ${this.displayInfo.contact_number}` },
              { text: `Contact Person: ${this.displayInfo.contact_person}` },
              { text: `Address: ${this.displayInfo.city}, ${this.displayInfo.province}` }
            ]
          ]
        },
        { text: '\nPayment Schedule', style: 'sectionHeader' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', '*'],
            body: tableBody
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: `\nTotal Balance Due: ₱${totalBalance.toLocaleString()}`,
          style: 'totalBox'
        },
        { text: '\nAuthorized Signature: ___________________', margin: [0, 20, 0, 0] }
      ],
      styles: {
        companyName: {
          fontSize: 16,
          bold: true,
          color: '#0d47a1'
        },
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5]
        },
        date: {
          fontSize: 10,
          color: '#555'
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
          color: '#1565c0'
        },
        totalBox: {
          fontSize: 14,
          bold: true,
          alignment: 'right',
          margin: [0, 10, 0, 0],
          color: 'red'
        }
      },
      // images: {
      //   // Replace with your logo (Base64 or data URL)
      //   logo: 'data:image/png;base64,...'
      // }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
