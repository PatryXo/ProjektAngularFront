import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowingList]'
})
export class ShowingListDirective implements AfterViewInit {

  @Input() takenSeats!: string;
  @Input() roomCapacity!: string;

  private seatsLeft!: number;

  constructor(private element: ElementRef) { }


  ngAfterViewInit(): void {

    this.seatsLeft = parseInt(this.roomCapacity) - this.takenSeats.split(',').length;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeLook(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeLook(false);
  }

  changeLook(value: boolean): void {

    if (value) {
      
      if (this.seatsLeft / parseInt(this.roomCapacity) > 0.5) {
        this.element.nativeElement.style.backgroundColor = '#90EE90'; // green
      }
      else if (this.seatsLeft / parseInt(this.roomCapacity) > 0.2) {
        this.element.nativeElement.style.backgroundColor = '#FFD580'; // orange
      }
      else {
        this.element.nativeElement.style.backgroundColor = '#ff6863'; // red
      }
    }
    else {
      this.element.nativeElement.style.backgroundColor = 'white';
    }

  }
}
