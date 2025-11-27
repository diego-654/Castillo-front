import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.URL_BASE}`;

  get<T>(query: string, options?: { params?: HttpParams }) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.get<T>(url, options);
  }

  post<T>(query: string, body: any, options?: { params?: HttpParams }) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.post<T>(url, body, options);
  }

  put<T>(query: string, body?: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.put<T>(url, body);
  }
  patch<T>(query: string, body: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.patch<T>(url, body);
  }

  delete<T>(query: string, options?: { params?: HttpParams }) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.delete<T>(url, options);
  }

  postDescarga(query: string, body: any, options?: { params?: HttpParams }) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.post(url, body, {
      ...options,
      responseType: 'blob',
      observe: 'response',
    });
  }

  getDescarga(query: string, options?: { params?: HttpParams }) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.get(url, {
      ...options,
      responseType: 'blob',
      observe: 'response',
    });
  }
}
