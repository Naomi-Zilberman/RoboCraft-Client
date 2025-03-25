import { Component } from '@angular/core';
import { RobotService } from '../../services/RobotService';
import { Robot } from '../../classes/Robot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  constructor(private rs: RobotService, public rr: Router) {
    this.loadCartFromLocalStorage(); // טוען את סל הקניות מה-Local Storage
  }

  get shoppingCart(): Array<Robot> {
    return this.rs.shoppingCart;
  }

  removeRobot(rId: Number) {
    let index = this.rs.shoppingCart.findIndex(x => x.id === rId);
    if (index !== -1) {
      this.rs.shoppingCart.splice(index, 1);
      this.saveCartToLocalStorage(); // עדכון ה-Local Storage לאחר ההסרה
    }
  }

  finish() {
    this.rr.navigate([`login`]);
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('shoppingCart');
    if (cart) {
      this.rs.shoppingCart = JSON.parse(cart);
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.rs.shoppingCart));
  }
}
