import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../model/Cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  displayCart(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.apiUrl);
  }

  addtoCart(post: Cart): Observable<Cart>{
    return this.http.post<Cart>(this.apiUrl,post);
  }
}
