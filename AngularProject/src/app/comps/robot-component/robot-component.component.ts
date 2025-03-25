import { Component, NgModule, OnInit } from '@angular/core'; // ייבוא החבילות הדרושות
import { Router, RouterOutlet } from '@angular/router'; // ייבוא רכיבי ניתוב
import { RobotService } from '../../services/RobotService'; // ייבוא שירות רובוטים
import { Robot } from '../../classes/Robot'; // ייבוא מחלקת רובוט
import { CommonModule } from '@angular/common'; // ייבוא מודול קומון
import { Feature } from '../../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { FormsModule } from '@angular/forms'; // ייבוא מודול טפסים
import { FeatureService } from '../../services/FeatureService'; // ייבוא שירות פיצ'רים
import { ChangeColorDirective } from '../../highlight.directive'; // ייבוא דיירקטיבה לשינוי צבע

@Component({
  selector: 'app-robot-component', // בחירת הסלקטור
  standalone: true, // קביעת הקומפוננטה כעצמאית
  imports: [ CommonModule, FormsModule ], // ייבוא מודולים
  templateUrl: './robot-component.component.html', // קובץ תבנית
  styleUrls: ['./robot-component.component.css'] // קובץ סגנון
})
export class RobotComponent implements OnInit {
  allF: Array<Feature> = new Array<Feature>(); // מערך של פיצ'רים
  allR: Array<Robot> = new Array<Robot>(); // מערך של רובוטים
  allC: Array<number> = new Array<number>(); // מערך של מזהי פיצ'רים נבחרים
  material: string = ''; // משתנה לחומר
  price: number | null = null; // משתנה למחיר
  feature: number | null = null; // משתנה לפיצ'ר
  X: number = 0; // משתנה עזר
  showFeatures: boolean = false; // משתנה לבקרת תצוגת התכונות
  uniqueMaterials: Array<String> = new Array<String>(); // מערך ייחודי של חומרים

  constructor(public rs: RobotService, public fs: FeatureService, public rr: Router) { }

  ngOnInit(): void {
    this.get1(); // קריאה לפונקציה לקבלת רובוטים
    this.getf(); // קריאה לפונקציה לקבלת פיצ'רים
  }

  toggleFeatures() {
    this.showFeatures = !this.showFeatures; // הפעלת/כיבוי תצוגת התכונות
  }

  get1() {
    this.rs.getR().subscribe(
      d => {
        this.allR = d; // עדכון מערך הרובוטים
        // יצירת מערך ייחודי של חומרים לאחר שהנתונים נטענו
        this.uniqueMaterials = Array.from(new Set(this.allR.map(r => r.material)));
      },
      (error) => {
        console.error('Error fetching robots', error); // טיפול בשגיאות
      }
    );
  }

  getf() {
    this.fs.getF().subscribe(
      t => {
        this.allF = t; // עדכון מערך הפיצ'רים
      },
    );
  }

  chose(id: number) {
    const allCSet = new Set(this.allC); // המרה למערך ייחודי
    if (allCSet.has(id)) {
      allCSet.delete(id); // הסרת פיצ'ר נבחר
      this.X = 0;
    } else {
      allCSet.add(id); // הוספת פיצ'ר נבחר
      this.X = 1;
    }
    this.allC = Array.from(allCSet); // המרת ה-Set חזרה למערך
  }

  filterByMaterial(material?: string, priceInput?: string) {
    const price = priceInput ? parseFloat(priceInput) : undefined; // המרת string ל-number
    const features = this.allC.length > 0 ? this.allC : undefined; // קביעת פיצ'רים לפי בחירה

    this.rs.filterRobots(material, price, features).subscribe(
      (data: Robot[]) => {
        this.allR = data; // עדכון מערך הרובוטים המפולטרים
      },
      (error) => {
        console.error('Error fetching filtered robots', error); // טיפול בשגיאות
      }
    );
  }

  cancle() {
    this.material = ''; // אפס את חומר
    this.price = null; // אפס את המחיר
    this.feature = null; // אפס את הפיצ'ר
    this.allC.splice(0, this.allC.length); // ריקון מערך הפיצ'רים הנבחרים
    this.rs.filterRobots().subscribe(
      (data: Robot[]) => {
        this.allR = data; // עדכון מערך הרובוטים
      },
      (error) => {
        console.error('Error fetching filtered robots', error); // טיפול בשגיאות
      }
    );
  }

  sort() {
    this.allR.sort((a: Robot, b: Robot) => a.price - b.price); // מיון הרובוטים לפי מחיר
  }

  more(r: Robot) {
    this.rr.navigate([`more/${r.id}`]); // ניווט לעמוד פרטי רובוט
  }
}
