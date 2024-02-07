import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() buttonClass: string = '';
  @Output() buttonClicked = new EventEmitter<any>;

  onClick() {
    this.buttonClicked.emit()
  }
}
