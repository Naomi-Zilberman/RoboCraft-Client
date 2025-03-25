import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class FeatureService {
  public shoppingCart: Robot[] = []; // סל קניות של רובוטים
  public allC: Feature[] = []; // מערך של פיצ'רים

  baseURL = "https://localhost:7018/api/Feature/"; // כתובת בסיסית ל-API

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  getF(): Observable<Array<Feature>> {
    return this.server.get<Array<Feature>>(this.baseURL); // קריאה ל-API לקבלת פיצ'רים
  }
}
