import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { Contact, internationalPf } from '../contact.model';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NumberService } from '../../../services/number-service.service';
import { catchError, tap } from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-phonelist-edit',
  templateUrl: './phonelist-edit.component.html',
  styleUrl: './phonelist-edit.component.scss'
})
export class PhonelistEditComponent {
  @Input() contactToEdit: Contact;
  @Input() prefixList: internationalPf[];
  @Output() closeEdit = new EventEmitter()


  faX = faX;

  newContact : Contact

  constructor(
    private numberService: NumberService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnChanges(change: any) {
    this.newContact = {...change['contactToEdit'].currentValue}
  }

  onClose() {
    this.closeEdit.emit()
  }

  submitForm(form: any): void {
    this.verifyNumber(this.newContact.internationalPf.prefix + this.newContact.phoneNumber)
  }

  verifyNumber(phoneNumber: string) {
    this.numberService.verifyNumber(phoneNumber)
      .pipe(
        tap(res => {
          var message
          if(res.valid) {
            message = "Il numero salvato è stato validato"
          }
          else {
            message = "Il numero salvato ma non risulta validato. Controllalo"
          }
          this.snackBar.open(message, '', { duration: 2000})
        }),
        catchError(error => {
          return []
        })
      )
      .subscribe()
  }
}
