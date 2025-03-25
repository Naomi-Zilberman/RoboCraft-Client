import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';
import { User } from '../classes/User';
import { Order } from '../classes/order';
import { Product } from '../classes/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public Products:Product[] = [];
  baseURL = "https://localhost:7018/api/OrDetails";

  constructor(public server: HttpClient) { }

 

  addProduct(p:Product): Observable<number> {
    return this.server.post<number>(this.baseURL, p);
  }
}
