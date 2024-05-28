import { Component } from '@angular/core';
import { NumberService } from '../../services/number-service.service';
import { catchError, forkJoin, tap } from 'rxjs';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Contact, internationalPf } from './contact.model';
import { SpinnerService } from '../../services/spinner.service';

const EMPTYPREFIX: internationalPf = {
  id: "",
  country: "",
  prefix: ""
}

@Component({
  selector: 'app-phonelist',
  templateUrl: './phonelist.component.html',
  styleUrl: './phonelist.component.css',
})
export class PhonelistComponent {
  isRightOpen: boolean = false;

  searchString: string = "";

  contactList: Contact[] = []
  contactToOpen: Contact;

  prefixList: internationalPf[] = []

  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;

  constructor(
    private numberService: NumberService,
    private spinnerService: SpinnerService
  ) {
    this.contactToOpen = {
      id: "",
      name: "",
      phoneNumber: "",
      internationalPf: EMPTYPREFIX
    }
  }

  ngOnInit() {
    // Volevo fare due chiamate per ottenere questi dati e combinarli in un forkjoin, ma dato che non trovato un API adatta, l'ho simulato io 
    //Creando degli Observable dai file in JSOn che mi sono procurato, e dandogli una latenza generata casualmente da 1 a 3 secondi ognuna
    this.spinnerService.setSpinnerValue(true)
    forkJoin([
      this.numberService.getPrefixList(),
      this.numberService.getCountryNameList()
    ]).pipe(
      tap(([phones, names]) => {
        const idList = Object.keys(phones)
        idList.forEach(id => {
          if (!phones[id].includes(" ") && phones[id] && !phones[id].includes("+")) {
            this.prefixList.push({
              id: id,
              country: names[id],
              prefix: phones[id]
            })
          }
        })
        this.prefixList.sort( (a, b) => {
          if(a.id > b.id) return 1;
          else return -1
        })
        this.spinnerService.setSpinnerValue(false)
      })
    ).subscribe()

  }

  verifyNumber() {
  }

  editContact(contactId: string) {
    const newContact: Contact = {
      id: this.contactList.length ? this.contactList[-1].id + 1 : '1',
      name: "",
      phoneNumber: "",
      internationalPf: this.prefixList.find(ipf => ipf.prefix === "39") || EMPTYPREFIX
    }
    this.contactToOpen = this.contactList.find(c => c.id === contactId) || newContact
    this.isRightOpen = true;
  }

  newContact() {
    if (this.isRightOpen === false) {
      var prefix = this.prefixList.find(ipf => ipf.prefix === "39") || EMPTYPREFIX;  
      const newContact: Contact = {
        id: this.contactList.length ? this.contactList[-1].id + 1 : '1',
        name: "",
        phoneNumber: "",
        internationalPf: { ...prefix }
      }
      this.contactToOpen = newContact
      this.isRightOpen = true;
    }
  }
}
