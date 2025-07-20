import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Supplier } from '../../model/Supplier/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private ApiUrl = `${environment.apiUrl}/supplier`;

  constructor(private http: HttpClient) { }


  displaySuppliers(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.ApiUrl);
  }

  addSupplier(post:Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.ApiUrl, post);
  }
}
