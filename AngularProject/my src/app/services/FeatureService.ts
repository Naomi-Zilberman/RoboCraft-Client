import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // public allRobots: Robot[] = [];
  // public allF: Feature[] = [];
  public shoppingCart: Robot[] = [];
  public allC: Feature[] = [];

  baseURL="https://localhost:7018/api/Feature/"

  constructor(public server:HttpClient) { }

  getF():Observable<Array<Feature>>
  {
    return this.server.get<Array<Feature>>(this.baseURL)
  }
 



}


