import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { Contact, internationalPf } from '../contact.model';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NumberService } from '../../../services/number-service.service';
import { catchError, tap } from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phonelist-edit',
  templateUrl: './phonelist-edit.component.html',
  styleUrl: './phonelist-edit.component.scss'
})
export class PhonelistEditComponent {
  @Input() contactToEdit: Contact;
  @Input() prefixList: internationalPf[];
  @Output() closeEdit = new EventEmitter()
  @Output() updateContact = new EventEmitter<Contact>()

  faX = faX;

  newContact : Contact

  contactsForm: FormGroup

  constructor(
    private numberService: NumberService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.contactsForm = new FormGroup({
      name: new FormControl(
        this.newContact?.name, [
        Validators.required,
      ]),
      mobile: new FormControl(
        this.newContact?.phoneNumber, [
        Validators.required,
        Validators.pattern("[0-9]{10}")
      ]),
      prefix: new FormControl(
        this.newContact.internationalPf.prefix
      )
    });
  }

  ngOnChanges(change: any) {
    this.newContact = {...change['contactToEdit'].currentValue}
    this.newContact.internationalPf = {...this.newContact.internationalPf}
  }

  onClose() {
    this.closeEdit.emit()
    this.contactsForm.markAsUntouched()
  }

  submitForm(): void {
    this.verifyNumber(this.newContact.internationalPf.prefix + this.newContact.phoneNumber)
  }

  verifyNumber(phoneNumber: string) {
    this.numberService.verifyNumber(phoneNumber)
      .pipe(
        tap(res => {
          var message: string
          var validated: boolean
          if(res.valid) {
            message = "Il numero salvato è stato validato"
            validated = true
          }
          else {
            message = "Il numero salvato ma non risulta validato. Controllalo"
            validated = false
          }
          this.updateContact.emit({...this.newContact, validated})
          this.onClose()
          this.snackBar.open(message, '', { duration: 2000})
        }),
        catchError(error => {
          this.snackBar.open(error, '', { duration: 2000})
          return []
        })
      )
      .subscribe()
  }
}
