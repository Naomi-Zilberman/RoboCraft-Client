import { Component } from '@angular/core'; // ייבוא החבילות הדרושות
import { RobotService } from '../../services/RobotService'; // ייבוא שירות רובוטים
import { Robot } from '../../classes/Robot'; // ייבוא מחלקת רובוט
import { Router } from '@angular/router'; // ייבוא רכיבי ניתוב
import { CommonModule } from '@angular/common'; // ייבוא מודול קומון
import { ChangeColorDirective } from '../../highlight.directive'; // ייבוא דיירקטיבה לשינוי צבע

@Component({
  selector: 'app-shopping-cart', // בחירת הסלקטור
  standalone: true, // קביעת הקומפוננטה כעצמאית
  imports: [ CommonModule, ChangeColorDirective ], // ייבוא מודולים ודיירקטיבות
  templateUrl: './shopping-cart.component.html', // קובץ תבנית
  styleUrls: ['./shopping-cart.component.css'] // קובץ סגנון
})
export class ShoppingCartComponent {
  constructor(private rs: RobotService, public rr: Router) {
    this.loadCartFromLocalStorage(); // טוען את סל הקניות מה-Local Storage
  }

  get shoppingCart(): Array<Robot> {
    return this.rs.shoppingCart; // מחזיר את סל הקניות
  }

  removeRobot(rId: Number) {
    let index = this.rs.shoppingCart.findIndex(x => x.id === rId); // חיפוש מזהה רובוט
    if (index !== -1) {
      this.rs.shoppingCart.splice(index, 1); // הסרת רובוט מהסל
      this.saveCartToLocalStorage(); // עדכון ה-Local Storage לאחר ההסרה
    }
  }

  finish() {
    this.rr.navigate([`login`]); // ניווט לעמוד התחברות
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('shoppingCart'); // קבלת סל הקניות מה-Local Storage
    if (cart) {
      this.rs.shoppingCart = JSON.parse(cart); // המרת המידע למערך
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.rs.shoppingCart)); // שמירת סל הקניות ב-Local Storage
  }
}
