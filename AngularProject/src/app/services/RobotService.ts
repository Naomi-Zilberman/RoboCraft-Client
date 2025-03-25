import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class RobotService {
  // public allRobots: Robot[] = []; // מערך של כל הרובוטים (מושבת)
  // public allF: Feature[] = []; // מערך של כל הפיצ'רים (מושבת)
  public shoppingCart: Robot[] = []; // עגלת קניות של רובוטים
  
  baseURL = "https://localhost:7018/api/Robot/"; // כתובת בסיסית ל-API של רובוטים

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  getShoppingCart(): Robot[] {
    return this.shoppingCart; // מחזיר את המערך של עגלת הקניות
  }

  getR(): Observable<Array<Robot>> {
    return this.server.get<Array<Robot>>(this.baseURL); // קריאה ל-API לקבלת כל הרובוטים
  }

  getF(id: number): Observable<Array<Feature>> {
    return this.server.get<Array<Feature>>(`${this.baseURL}${id}`); // קריאה ל-API לקבלת פיצ'רים לפי מזהה
  }

  filterRobots(material?: string, price?: number, featureIds?: number[]): Observable<Array<Robot>> {
    let params = new HttpParams(); // יצירת פרמטרים חדשים
    if (material) {
      params = params.append('Material', material); // הוספת חומר אם קיים
    }
    if (price !== undefined) {
      params = params.append('Price ', price.toString()); // הוספת מחיר אם קיים
    }
    if (featureIds && featureIds.length > 0) {
      featureIds.forEach(id => {
        params = params.append('featureIds', id.toString()); // הוספת מזהי פיצ'רים אם קיימים
      });
    }

    return this.server.get<Array<Robot>>(`${this.baseURL}filter`, { params }); // קריאה ל-API לסינון רובוטים
  }
}
