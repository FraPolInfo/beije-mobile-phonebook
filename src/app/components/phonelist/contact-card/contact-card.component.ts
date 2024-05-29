import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input() contact: Contact;
  @Input() selected: boolean;
  @Output() selectContact = new EventEmitter<Contact>()
  @Output() deleteContact = new EventEmitter<Contact>()

  faX = faTrash;

  onSelectContact() {
    this.selectContact.emit(this.contact)
  }

  onDeleteContact() {
    this.deleteContact.emit(this.contact)
  }
}
