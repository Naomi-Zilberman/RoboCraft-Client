import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  navigateToStore(): void {
    // נבצע בקשה למיקום של המשתמש
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // כתובת החנות
        const storeAddress = "GG ELECTRONICS, גרנית 5, פתח תקוה";

        // קישור ל-Google Maps עם מיקום המשתמש וכתובת החנות
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${storeAddress}&travelmode=driving`;

        // פותחים את הקישור ב-tab חדש
        window.open(googleMapsUrl, '_blank');
      }, (error) => {
        alert('לא ניתן לקבל את המיקום הנוכחי שלך');
      });
    } else {
      alert('הדפדפן לא תומך במיקום גיאוגרפי');
    }
  }

}
