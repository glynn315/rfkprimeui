import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , Plus } from 'lucide-angular';
import { AddSupplierComponent } from "../supplier/add-supplier/add-supplier.component";
import { AdddocumentComponent } from "./add-document/adddocument/adddocument.component";

@Component({
  selector: 'app-documents',
  imports: [LucideAngularModule, AdddocumentComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  readonly Plus = Plus;
  constructor(){}
  openDocumentModal = false;
  ngOnInit(): void {
    
  }

  openModal(){
    this.openDocumentModal = true;
  }
  closeModal() {
    this.openDocumentModal = false;
  }
  
}
