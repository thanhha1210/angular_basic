import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appColors]'
})
export class ColorsDirective {

  colors =['AliceBlue', 'LightGreen', 'Aqua', 'LightBlue', 'LightGrey', 'White']
  i = 0
  constructor() { }

  // whatever this directive is applied to, it going to bind the host property backgroundColor with the var name bgColor 
  // bgColor -> background color of the host
  @HostBinding('style.background-color') bgColor:string='white'

  // Whenever click on the host -> apply change color function
  @HostListener('click') changeColor() {
    this.bgColor = this.colors[this.i]
    this.i = (this.i + 1) % this.colors.length
  }
}
