import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Terms } from '../../model/Terms/terms.model';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  private apiUrl = `${environment.apiUrl}/terms`;

  constructor(private http: HttpClient) { }

  displayTerms(): Observable<Terms[]>{
    return this.http.get<Terms[]>(this.apiUrl);
  }

  addTerms(post:Terms): Observable<Terms>{
    return this.http.post<Terms>(this.apiUrl, post);
  }
}
