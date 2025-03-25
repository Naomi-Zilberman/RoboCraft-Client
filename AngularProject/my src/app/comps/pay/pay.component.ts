import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RobotService } from '../../services/RobotService';
import { CommonModule } from '@angular/common';
import { Order } from '../../classes/order';
import { PayService } from '../../services/PayService';
import { Product } from '../../classes/Product';
import { ProductService } from '../../services/ProductService';
import { FeatureService } from '../../services/FeatureService';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  newOrder: Order = new Order(0, 0, true,new Date().toISOString().split('T')[0]);
  newProduct: Product = new Product(0, 0);
  user: any; // או User אם אתה יודע את סוג האובייקט
  before: number = 0;
  total: number = 0; // משתנה לשמירת הסכום הכולל
  discount: number = 0; // משתנה לשמירת ההנחה
  orderId: number=0; // משתנה לשמירת ה-ID של ההזמנה
  featureCodes: string = ''; // משתנה לשמירת קודי התכונות כמחרוזת

  constructor(private route: ActivatedRoute, public rs: RobotService, public os: PayService, public ps: ProductService,public fs:FeatureService) { }

  ngOnInit(): void {
    // קבלת הפרמטרים מה-query params
    this.route.queryParams.subscribe(params => {
      this.user = {
        c: params['c'],
        name: params['name'],
        phone: params['phone'],
        email: params['email'],
        dateBirth: params['dateBirth'],
        id: params['id']
      };

      console.log(this.user); // הדפסת האובייקט שהתקבל
    });

    // חישוב הסכום הכולל
    this.sum();
    console.log(this.total);
    console.log(this.user.name);
    console.log(this.user.id);

    // קבלת התכונות מהשירות
    this.fs.getF().subscribe(features => {
      this.featureCodes = features.map(feature => feature.id).join(', '); // הנחה שהקוד של התכונה הוא feature.id
      console.log('Feature Codes:', this.featureCodes); // הדפסת קודי התכונות
    });

    this.newOrder.paid = true;
    this.newOrder.sum = this.total;
    this.newOrder.custId = this.user.id;
}


  sum() {
    const cartItems = this.rs.getShoppingCart();
    this.total = cartItems.reduce((acc, item) => acc + item.price, 0);
    console.log(cartItems[0].id);

    this.before = this.total
    console.log('Total Price before discount:', this.total);

    // חישוב הנחה אם יש צורך
    this.applyBirthdayDiscount();
  }

  applyBirthdayDiscount() {
    const birthDate = new Date(this.user.dateBirth);
    const currentDate = new Date();

    // בדוק אם החודש של תאריך הלידה תואם לחודש הנוכחי
    if (birthDate.getMonth() === currentDate.getMonth()) {
      this.discount = this.total * 0.35; // חישוב ההנחה
      this.total -= this.discount; // הפחתת ההנחה מהסכום הכולל
      console.log('Birthday discount applied:', this.discount);
    }

    console.log('Total Price after discount:', this.total);
  }
 
  ok1() {
    this.ok().then(() => {
      const cartItems = this.rs.getShoppingCart();
      cartItems.forEach(item => {
        const newProduct = new Product( this.orderId,item.id,this.featureCodes); // הנחה שהמוצר מכיל robotId
        console.log(newProduct);
        
        this.saveP(newProduct);
      });
    });
  }
  
  ok(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(this.newOrder.orderDate);
      console.log(this.newOrder);
      console.log(this.orderId);
  
      this.os.addOrder(this.newOrder).subscribe(response => {
        this.orderId = response; // שמירת ה-ID שהתקבל מהשרת
        this.newProduct.ordId = this.orderId;
        console.log('Order added with ID:', this.orderId);
        resolve(); // מסיים את ההבטחה
      }, error => {
        console.error('Error adding order:', error);
        reject(error); // מסיים את ההבטחה עם שגיאה
      });
    });
  }

saveP(product: Product) {
  this.ps.addProduct(product).subscribe(response => {
    console.log('Product added with ID:', response);
  }, error => {
    console.error('Error adding product:', error);
  });
}

}
