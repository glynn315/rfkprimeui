import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Product } from '../../model/Product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ApiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  displayProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.ApiUrl);
  }

  AddProduct(post:Product): Observable<Product>{
    return this.http.post<Product>(this.ApiUrl, post);
  }

  displaySelectedProduct(id:string): Observable<Product>{
    return this.http.get<Product>(`${this.ApiUrl}/${id}`);
  }

  updateProductQuantity(cartItems: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/deduct`, { cart_items: cartItems });
  }

  getInventorySummary(): Observable<{ total_sold: number, total_remaining: number }> {
    return this.http.get<{ total_sold: number, total_remaining: number }>(
      `${this.ApiUrl}/inventory`
    );
  }

  getInventoryList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/inventory`);
  }

  updatestocks(product_id: string, quantity: number): Observable<Product> {
    return this.http.post<Product>(`${this.ApiUrl}/add-stocks/${product_id}`, {
      quantity: quantity
    });

  }
}
