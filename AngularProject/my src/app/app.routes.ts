import { Routes } from '@angular/router';
import { RobotComponent } from './comps/robot-component/robot-component.component';
import { MoreDetails } from './comps/more-details/more-details.component';
import { ShoppingCartComponent } from './comps/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './comps/register/register.component';
import { LoginComponent } from './comps/login/login.component';
import { PayComponent } from './comps/pay/pay.component';

export const routes: Routes = [
    // במערך זה נגדיר מה יוצג עבור כל ניתוב
    // המערך מקבל אובייקטים כאשר בכל אובייקט שני מאפיינים חשובים:
    // path - הניתוב בעצמו - מה יהיה כתוב בשורת הניתוב
    // component - מה להציג עבור הניתוב הנל

    { path: 'home page', component:RobotComponent },
    // {
    //     path: 'all', component: RobotComponent,
    //     //children ניתן להוסיף עוד מאפיין בשם 
    //     //הוא מסוג מערך אובייקטים זהה
    //     //מטרתו - הגדרת ניתובים בנים
    //     children: [
    //         //שליחת פרמטר בניתוב
    //         //יש להגדיר משתנה שיקבל את הפרמטר עי נקודתיים
    //         { path: 'more.../:id', component: MoreDetailsComponent },]
    // },
    // title - פרמטר נוסף אפשרי
    //שינוי הכותרת של הכרטיסיה
    {  path: 'more/:id', component: MoreDetails},
    {  path: 'cart', component: ShoppingCartComponent},
    {  path: 'pay', component: PayComponent},
    { path: 'login', component: LoginComponent, children: [
      { path: 'register', component: RegisterComponent }
  ]}
,


    //אפשר להגדיר ניתוב ריק - מיד בהרצה יציג רכיב זה
  { path: '', component: RobotComponent,title:'start' },

    //אפשר להגדיר ניתוב לכלכ  השגיאות
    //כלומר כאשר יהיה ניתוב לא תקין תוצג קומפוננטה זו
    //אובייקט זה לחייב להיות אחרון ברשימה
    // { path: '**', component: ErrorComponent }

];
