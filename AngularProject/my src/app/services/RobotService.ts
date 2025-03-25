import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  // public allRobots: Robot[] = [];
  // public allF: Feature[] = [];
  public shoppingCart: Robot[] = [];
  
  baseURL="https://localhost:7018/api/Robot/"

  constructor(public server:HttpClient) { }
  getShoppingCart(): Robot[] {
    return this.shoppingCart; // מחזיר את המערך
  }
  getR():Observable<Array<Robot>>
  {
    return this.server.get<Array<Robot>>(this.baseURL)
  }
  getF(id: number): Observable<Array<Feature>> {
    return this.server.get<Array<Feature>>(`${this.baseURL}${id}`);
}
filterRobots(material?: string, price?: number, featureIds?: number[]): Observable<Array<Robot>> {
  let params = new HttpParams();
  if (material) {
    params = params.append('Material', material);
  }
  if (price !== undefined) {
    params = params.append('Price', price.toString());
  }
  if (featureIds && featureIds.length > 0) {
    featureIds.forEach(id => {
      params = params.append('featureIds', id.toString());
    });
  }

  return this.server.get<Array<Robot>>(`${this.baseURL}filter`, { params });
}


}


