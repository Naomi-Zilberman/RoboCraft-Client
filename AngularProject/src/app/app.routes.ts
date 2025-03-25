import { Routes } from '@angular/router'; // ייבוא רכיב Routes
import { RobotComponent } from './comps/robot-component/robot-component.component'; // ייבוא רכיב RobotComponent
import { MoreDetails } from './comps/more-details/more-details.component'; // ייבוא רכיב MoreDetails
import { ShoppingCartComponent } from './comps/shopping-cart/shopping-cart.component'; // ייבוא רכיב ShoppingCartComponent
import { RegisterComponent } from './comps/register/register.component'; // ייבוא רכיב RegisterComponent
import { LoginComponent } from './comps/login/login.component'; // ייבוא רכיב LoginComponent
import { PayComponent } from './comps/pay/pay.component'; // ייבוא רכיב PayComponent
import { ArnavComponent } from './comps/arnav/arnav.component'; // ייבוא רכיב ArnavComponent
import { WellcomeComponent } from './comps/wellcome/wellcome.component'; // ייבוא רכיב WellcomeComponent
import { ContactComponent } from './comps/contact/contact.component'; // ייבוא רכיב ContactComponent
import { OdotComponent } from './comps/odot2/odot.component'; // ייבוא רכיב OdotComponent
import { MapComponent } from './comps/map/map.component'; // ייבוא רכיב MapComponent
import { WheelChairComponent } from './comps/wheel-chair/wheel-chair.component'; // ייבוא רכיב WheelChairComponent
import { AddFComponent } from './comps/add-f/add-f.component'; // ייבוא רכיב AddFComponent

export const routes: Routes = [
    // במערך זה נגדיר מה יוצג עבור כל ניתוב
    { path: 'home page', component: RobotComponent },
    { path: 'addF', component: AddFComponent },
    { path: 'wheelChair', component: WheelChairComponent },
    { path: 'more/:id', component: MoreDetails },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'pay', component: PayComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'nav', component: ArnavComponent },
    { path: 'gallery', component: RobotComponent },
    { path: 'odot', component: OdotComponent },
    { path: 'login', component: LoginComponent, children: [
        { path: 'register', component: RegisterComponent }
    ]},
    { path: 'map', component: MapComponent, title: 'map' },
    { path: '', component: WellcomeComponent, title: 'start' },
    // { path: '**', component: ErrorComponent } // ניתוב לטיפול בשגיאות
];
