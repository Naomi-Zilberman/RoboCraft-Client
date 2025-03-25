import { Component, OnInit } from '@angular/core'; // ייבוא החבילות הדרושות
import { ActivatedRoute, Router } from '@angular/router'; // ייבוא רכיבי ניתוב
import { RobotService } from '../../services/RobotService'; // ייבוא שירות רובוטים
import { Robot } from '../../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { CommonModule } from '@angular/common'; // ייבוא מודול קומון

@Component({
  selector: 'app-product-details', // בחירת הסלקטור
  standalone: true, // קביעת הקומפוננטה כעצמאית
  imports: [CommonModule], // ייבוא מודול קומון
  templateUrl: './more-details.component.html', // קובץ תבנית
  styleUrls: ['./more-details.component.css'] // קובץ סגנון
})
export class MoreDetails implements OnInit {
  r?: Robot; // הגדרת המשתנה כ-undefined
  allF: Array<Feature> = new Array<Feature>(); // מערך לפיצ'רים
  allc: Array<Feature> = new Array<Feature>(); // מערך לפיצ'רים שנבחרו
  sum: number | undefined; // סכום המחיר
  selectedFeatureInfo: string = ''; // משתנה חדש לפרטי הפיצ'ר

  constructor(private route: ActivatedRoute, private rs: RobotService, public rr: Router) { }

  ngOnInit(): void {
    this.get1(); // קריאה לפונקציה לקבלת רובוט
    this.get2(); // קריאה לפונקציה לקבלת פיצ'רים
    this.sum = this.r?.price; // עדכון הסכום במחיר של הרובוט
  }

  get1() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // קבלת ה-ID מהנתיב
    this.rs.getR().subscribe(
      robots => {
        this.r = robots.find(p => p.id === id); // חיפוש הרובוט לפי ID
      },
      err => { console.log("error " + err.message) } // טיפול בשגיאות
    );
  }

  get2() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // קבלת ה-ID מהנתיב
    this.rs.getF(id).subscribe(
      d => {
        this.allF = d; // עדכון מערך הפיצ'רים
      },
      error => {
        console.error('Error:', error); // טיפול בשגיאות
      }
    );
  }

  chose(f: Feature) {
    const index = this.allc.indexOf(f); // חיפוש הפיצ'ר במערך הנבחרים
    if (index > -1) {
      this.allc.splice(index, 1); // מסיר את הפריט מהמערך
      if (this.r) {
        this.r.price = (this.r.price || 0) - (Number(f.price) || 0); // עדכון המחיר
      }
    } else {
      this.allc.push(f); // הוספת הפיצ'ר למערך הנבחרים
      if (this.r) {
        this.r.price = (this.r.price || 0) + (Number(f.price) || 0); // עדכון המחיר
      }
    }
  }
  
  updateFeatureInfo(f: Feature) {
    this.selectedFeatureInfo = f.description; // עדכון פרטי הפיצ'ר שנבחר
  }

  shoppingCart(r: Robot) {
    if (this.r) {
      this.r.connections = this.allc; // אם this.r קיים
      this.rs.shoppingCart.push(r); // הוספת הרובוט לסל הקניות
      this.saveCartToLocalStorage(); // שמירה ל-Local Storage
      this.rr.navigate([`cart`]); // ניווט לעמוד סל הקניות
    } else {
      console.error("Robot object is not defined"); // טיפול בשגיאות
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.rs.shoppingCart)); // שמירה ל-Local Storage
  }
}
