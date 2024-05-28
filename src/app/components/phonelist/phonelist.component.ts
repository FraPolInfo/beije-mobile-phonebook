import { Component } from '@angular/core';
import { NumberService } from '../../services/number-service.service';
import { catchError, tap } from 'rxjs';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Contact } from './contact.model';

@Component({
  selector: 'app-phonelist',
  templateUrl: './phonelist.component.html',
  styleUrl: './phonelist.component.css',
})
export class PhonelistComponent {
  isRightOpen: boolean = false;

  searchString: string = "";

  contactList: Contact[] = []
  contactToOpen?: Contact;

  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;

  constructor(
    private numberService: NumberService
  ) { }

  verifyNumber() {
    this.numberService.verifyNumber('39091421154')
    .pipe(
      tap( res => this.contactList.push(res.location)),
      catchError( error => {
        console.log(error)
        return []
      })
    )
    .subscribe()
  }

  editContact(contactId: string) {
    const newContact: Contact = {
      id: this.contactList.length ? this.contactList[-1].id + 1 : '1',
      name: "",
      phoneNumber: "",
      internationalPf: "+39"
    }
    this.contactToOpen = this.contactList.find(c => c.id === contactId) || newContact
    this.isRightOpen = true;
  }
}
