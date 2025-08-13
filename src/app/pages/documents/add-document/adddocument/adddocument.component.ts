import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../../shared/modal/modal.component";
import { DocumentsService } from '../../../../Services/Document/documents.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adddocument',
  imports: [ModalComponent, HttpClientModule, FormsModule],
  templateUrl: './adddocument.component.html',
  styleUrl: './adddocument.component.scss',
  providers: [DocumentsService]
})
export class AdddocumentComponent {
  @Input() openDocumentModal = false;
  headerText = 'Upload Documents';
  @Output() openDocumentModalChange = new EventEmitter<boolean>();
  fileName: string = '';
  selectedFile!: File;
  constructor(private documentService : DocumentsService){}

  ngOnInit(): void {
    
  }

  closeModal() {
    this.openDocumentModalChange.emit(false);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadDocuments(){
    if (!this.fileName || !this.selectedFile) {
      alert('Please enter a file name and select a file.');
      return;
    }

    this.documentService.uploadDocument(this.fileName, this.selectedFile)
      .subscribe({
        next: (res) => {
          console.log('Upload success:', res);
          this.closeModal();
        },
        error: (err) => console.error('Upload failed:', err)
      });
  }
}
