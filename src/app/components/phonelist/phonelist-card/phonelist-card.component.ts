import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phonelist-card',
  templateUrl: './phonelist-card.component.html',
  styleUrl: './phonelist-card.component.scss'
})
export class PhonelistCardComponent {
  @Input() label?: string;
  @Input() cardClass: string = '';
  @Input() isOpen: boolean = true
}
