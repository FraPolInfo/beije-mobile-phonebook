import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { Contact } from '../contact.model';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-phonelist-edit',
  templateUrl: './phonelist-edit.component.html',
  styleUrl: './phonelist-edit.component.css'
})
export class PhonelistEditComponent {
  @Input() contactToEdit?: Contact;
  @Output() closeEdit = new EventEmitter()

  newContact: Contact

  faX = faX;
  constructor() {
  }

  ngOnChanges(change: any) {
    this.newContact = change['contactToEdit'].currentValue
  }

  onClose() {
    this.closeEdit.emit()
  }
}
