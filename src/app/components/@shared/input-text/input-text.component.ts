import { Component, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  template: '<input [(ngModel)]="value"/>local: {{val}}',
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => InputTextComponent),
            multi: true     
    }   
]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() inputClass: string = '';

  onChange: any = () => { }
  onTouch: any = () => { }
  val = ""
  set value (val:any) {
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }
  }
  writeValue(value: any){ this.value = value}
  registerOnChange(fn: any){this.onChange = fn}
  registerOnTouched(fn: any){this.onTouch = fn}
}
