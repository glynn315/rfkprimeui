import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, BoxIcon , Printer} from 'lucide-angular';
import { ProductService } from '../../Services/Product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router, RouterLink, Routes } from '@angular/router';
pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-inventory',
  imports: [LucideAngularModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
  providers: [ProductService]
})
export class InventoryComponent implements OnInit {
  constructor(private ProductServices: ProductService, private route: Router) {}
  readonly box = BoxIcon;
  readonly Printer = Printer;

  inventorySummary = { total_sold: 0, total_remaining: 0 };
  inventoryList: any[] = [];

  ngOnInit(): void {
    this.loadInventoryList();
  }

  loadInventoryList() {
    this.ProductServices.getInventoryList().subscribe((data: any[]) => {
      this.inventoryList = data;
      this.inventorySummary.total_sold = data.reduce((sum, i) => sum + Number(i.total_sold), 0);
      this.inventorySummary.total_remaining = data.reduce((sum, i) => sum + Number(i.remaining_quantity), 0);
    });
  }

  restock(product_id?: number){
    if (product_id) {
      this.route.navigate(['/restock', product_id]);
    }
  }

  generateInventoryReport() {
    if (!this.inventoryList.length) return;

    const tableBody: any[] = [
      [
        { text: '#', bold: true, fillColor: '#eeeeee' },
        { text: 'Product Name', bold: true, fillColor: '#eeeeee' },
        { text: 'Remaining Quantity', bold: true, fillColor: '#eeeeee' },
        { text: 'Total Sold', bold: true, fillColor: '#eeeeee' }
      ]
    ];

    this.inventoryList.forEach((item, index) => {
      tableBody.push([
        index + 1,
        item.product_name,
        item.remaining_quantity,
        item.total_sold
      ]);
    });

    const docDefinition: any = {
      content: [
        { text: 'RFK PRIME', style: 'companyName' },
        { text: 'Inventory Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleDateString()}`, style: 'date' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*'],
            body: tableBody
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: `\nTotal Sold: ${this.inventorySummary.total_sold}\nTotal Remaining: ${this.inventorySummary.total_remaining}`,
          style: 'totalBox'
        }
      ],
      styles: {
        companyName: { fontSize: 16, bold: true, color: '#0d47a1' },
        header: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
        date: { fontSize: 10, color: '#555' },
        totalBox: { fontSize: 12, bold: true, alignment: 'right', margin: [0, 10, 0, 0] }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
