import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // יבוא CommonModule

@Component({
  selector: 'app-wellcome',
  standalone: true,  // אם משתמשים ב standalone
  imports: [CommonModule], // יבוא CommonModule אם משתמשים ב standalone
  templateUrl: './wellcome.component.html', // או template: `...` אם משתמשים בתבנית inline
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit, AfterViewInit { // הוספנו AfterViewInit
  robotImage = "welcome3.png";

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/gallery']);
    }, 5000);
  }

    ngAfterViewInit() { // הפונקציה החדשה
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            if (star instanceof HTMLElement) { // בדיקה שהאלמנט הוא HTMLElement
                star.style.setProperty('--x', Math.random().toString());
                star.style.setProperty('--y', Math.random().toString());
                star.style.setProperty('--delay', `${Math.random() * 5}s`);
                star.style.opacity = (Math.random() * 0.8 + 0.2).toString();
            }
        });
    }
}