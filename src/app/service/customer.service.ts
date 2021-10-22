import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {CustomerResponse} from "../model/customer.response";
import {CustomerRequest} from "../model/customer.request";

@Injectable({providedIn: 'root'})
export class CustomerService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<CustomerResponse[]> {
    return this.http.get<CustomerResponse[]>(`${this.host}/customers`);
  }

  public addCustomer(customerRequest: CustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.host}/customers`, customerRequest);
  }

  public addCustomersToLocalCache(customers: CustomerResponse[]): void {
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  public getCustomersFromLocalCache(): CustomerResponse[] | null {
    if (localStorage.getItem('customers')) {
        return JSON.parse(<string>localStorage.getItem('customers'));
    }
    return null;
  }

}
