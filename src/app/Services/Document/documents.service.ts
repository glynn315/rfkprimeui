import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) { }
  uploadDocument(fileName: string, file: File): Observable<Document> {
    const formData = new FormData();
    formData.append('file_name', fileName);
    formData.append('file', file);

    return this.http.post<Document>(this.apiUrl, formData);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }
}
