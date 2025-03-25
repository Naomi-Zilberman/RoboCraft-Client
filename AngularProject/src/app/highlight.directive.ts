import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  standalone: true
})
export class ChangeColorDirective {
  constructor(er: ElementRef) {
    er.nativeElement.style.backgroundColor = 'ff4d4d'
    this.myElement=er
  }
myElement:ElementRef|undefined
  @HostListener('mouseover')
  color()
  {
this.myElement!.nativeElement.style.color = 'red'
  }
  mycolor:string=""
  @HostListener('mouseover')
  backcolor()
  {
this.mycolor=this.myElement!.nativeElement.style.backgroundColor
this.myElement!.nativeElement.style.backgroundColor = '#eee8ea'
this.myElement!.nativeElement.style.color = 'red'

  }
}
