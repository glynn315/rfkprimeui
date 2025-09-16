import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , Plus } from 'lucide-angular';
import { AddSupplierComponent } from "../supplier/add-supplier/add-supplier.component";
import { AdddocumentComponent } from "./add-document/adddocument/adddocument.component";
import { DocumentsService } from '../../Services/Document/documents.service';
import { Document } from '../../model/Document/document.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-documents',
  imports: [LucideAngularModule, AdddocumentComponent,CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  providers:[DocumentsService]
})
export class DocumentsComponent implements OnInit {
  readonly Plus = Plus;
  constructor(private DocumentServices : DocumentsService){}
  openDocumentModal = false;
  documentList : Document[] = [];
  
  
  ngOnInit(): void {
    this.DocumentServices.getDocuments().subscribe((data) => {
      this.documentList = data;
    });
  }

  openModal(){
    this.openDocumentModal = true;
  }
  closeModal() {
    this.openDocumentModal = false;
  }
  downloadFile(filePath: string, fileName: string) {
    const fullUrl = `http://localhost:8000/storage/${filePath}`;

    const link = document.createElement('a');
    link.href = fullUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
}
