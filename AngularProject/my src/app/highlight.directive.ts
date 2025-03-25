import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  standalone: true
})
export class ChangeColorDirective {
  //hrml דירקטיב - זו הרחבה של 
  // כרגע ניצור מאפיין דירקטיב
  //דירקטיב זה ישנה את התגית
  //ElementRef בנאי יקבל משתנה מסוג 
  constructor(er: ElementRef) {
    let r=Math.floor(Math.random()*255)
    let g=Math.floor(Math.random()*255)
    let b=Math.floor(Math.random()*255)

    // גישה לאלמנט עצמו עליו נכתב הדירקטיב עי 
    er.nativeElement.style.backgroundColor = 'rgb('+r+','+g+','+b+')'
    this.myElement=er
  }
myElement:ElementRef|undefined
  // ניתן להשפיע על התגית רק בזמן ארוע
  @HostListener('click')
  color()
  {
this.myElement!.nativeElement.style.color = 'blue'
  }
  mycolor:string=""
  @HostListener('mouseover')
  backcolor()
  {
this.mycolor=this.myElement!.nativeElement.style.backgroundColor
this.myElement!.nativeElement.style.backgroundColor = 'yellow'
  }
  @HostListener('mouseleave')
  backcolor1()
  {
this.myElement!.nativeElement.style.backgroundColor = this.mycolor
  }
}
