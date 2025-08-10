import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  selectedReport: string = '';

  constructor(private http: HttpClient) {}

  generateReport() {
    if (!this.selectedReport) {
      alert('Please select a report type');
      return;
    }

    let apiUrl = '';
    let title = '';

    switch (this.selectedReport) {
      case 'products':
        apiUrl = 'http://127.0.0.1:8000/api/products';
        title = 'Product List';
        break;
      case 'customers':
        apiUrl = 'http://127.0.0.1:8000/api/customers';
        title = 'Customer List';
        break;
      case 'sold':
        apiUrl = 'http://127.0.0.1:8000/api/sold-items';
        title = 'Sold Items';
        break;
    }


    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.buildPDF(title, data);
    });
  }

  buildPDF(title: string, data: any[]) {
    const tableBody: any[] = [];

    // Add header row based on report type
    if (title === 'Product List') {
      tableBody.push([
        { text: 'Product Name', bold: true },
        { text: 'Quantity', bold: true },
        { text: 'Type', bold: true },
        { text: 'Price (PC)', bold: true }
      ]);

      data.forEach((p) => {
        tableBody.push([
          p.product_name,
          p.product_quantity,
          p.product_volume,
          `₱${p.product_pricebulk}`
        ]);
      });
    }

    if (title === 'Customer List') {
      tableBody.push([
        { text: 'ID', bold: true },
        { text: 'Full Name', bold: true },
        { text: 'Contact', bold: true },
        { text: 'City', bold: true }
      ]);

      data.forEach((c) => {
        tableBody.push([
          c.customer_id,
          `${c.customer_fname} ${c.customer_mname || ''} ${c.customer_lname}`,
          c.contact_number,
          c.customer_city
        ]);
      });
    }

    if (title === 'Sold Items') {
      tableBody.push([
        { text: 'Product', bold: true },
        { text: 'Quantity Sold', bold: true },
        { text: 'Total Amount', bold: true }
      ]);

      data.forEach((s) => {
        tableBody.push([
          s.product_name,
          s.quantity_sold,
          `₱${s.total_amount}`
        ]);
      });
    }

    const docDefinition: any = {
      content: [
        { text: 'RFK PRIME', style: 'companyName' },
        { text: title, style: 'header' },
        { text: `Generated on: ${new Date().toLocaleDateString()}`, style: 'date' },
        {
          table: {
            headerRows: 1,
            widths: Array(tableBody[0].length).fill('*'),
            body: tableBody
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        companyName: { fontSize: 16, bold: true, color: '#0d47a1' },
        header: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
        date: { fontSize: 10, color: '#555' }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
