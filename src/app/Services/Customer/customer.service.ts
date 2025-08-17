import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private ApiUrl = `${environment.apiUrl}/customer`;

  constructor(private http: HttpClient) { }

  displayCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.ApiUrl);
  }

  addNewCustomer(post: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.ApiUrl,post);
  }

  updateCustomer(id: string, post: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.ApiUrl}/${id}`, post);
  }

  updateStatus(id: string, status: string): Observable<Customer> {
    return this.http.patch<Customer>(`${this.ApiUrl}/${id}/status`, {
      customer_status: status
    });
}
}
