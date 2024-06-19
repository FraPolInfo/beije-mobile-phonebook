import { Component } from '@angular/core';
import { NumberService } from '../../services/number-service.service';
import { catchError, concat, forkJoin, tap } from 'rxjs';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Contact, UserContact, internationalPf } from './contact.model';
import { SpinnerService } from '../../services/spinner.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService, User } from '../../services/login-service.service';

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
  isNewContact: boolean = false;

  searchString: string = '';
  userName: string;

  userContactList: Contact[]
  contactListSearch: Contact[]
  contactToOpen: Contact;

  prefixList: internationalPf[] = []

  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;


  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.contactToOpen = {
      id: "",
      name: "",
      phoneNumber: "",
      internationalPf: EMPTYPREFIX
    }
  }

  ngOnInit() {
    this.route.data.pipe(
      tap((data) => {
        const phones = data['numberResolver'][0]
        const names = data['numberResolver'][1]
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
        this.prefixList.sort((a, b) => {
          if (a.id > b.id) return 1;
          else return -1
        })
      })
    ).subscribe()

    if(this.loginService.userLogged?.userName) this.userName = this.loginService.userLogged?.userName 

    const fullList = JSON.parse(localStorage.getItem("contactList") || '[]');
    this.userContactList = fullList.find( (uc: UserContact) => uc.userName === this.loginService.userLogged?.userName)?.contactList || []
    this.contactListSearch =this.userContactList
  }


  editContact(contact: Contact) {
    this.contactToOpen = contact
    this.isRightOpen = true;
  }

  deleteContact(contact: Contact) {
    this.userContactList = this.userContactList.filter(c => c.id !== contact.id)
    this.findContactsByName()

    const fullList = JSON.parse(localStorage.getItem("contactList") || '[]');
    const indexLogged = fullList.findIndex((c: UserContact) => c.userName === this.loginService.userLogged?.userName)
    fullList[indexLogged].contactList = this.userContactList
    window.localStorage.setItem("contactList", JSON.stringify(fullList));
  }

  newContact() {
    var prefix = this.prefixList.find(ipf => ipf.prefix === "39") || EMPTYPREFIX;
    const newContact: Contact = {
      id: this.userContactList.length ? this.userContactList[this.userContactList?.length - 1].id + 1 : '1',
      name: "",
      phoneNumber: "",
      internationalPf: { ...prefix }
    }
    this.contactToOpen = newContact
    this.isRightOpen = true;
    this.isNewContact = true
  }

  updateContact(contact: Contact) {
    if (this.isNewContact) {
      this.userContactList.push({ ...contact })
      this.isNewContact = false
    } else {
      const indexToModify = this.userContactList?.findIndex(c => c.id === contact.id)
      this.userContactList[indexToModify] = { ...contact }
    }

    this.findContactsByName()

    const fullList = JSON.parse(localStorage.getItem("contactList") || '[]');
    const indexLogged = fullList.findIndex((c: UserContact) => c.userName === this.loginService.userLogged?.userName)
    if(indexLogged > -1) fullList[indexLogged].contactList = this.userContactList
    else fullList.push({ userName: this.loginService.userLogged?.userName, contactList: this.userContactList})
    window.localStorage.setItem("contactList", JSON.stringify(fullList));
  }

  onClose() {
    this.isRightOpen = false
    this.contactToOpen = {
      id: "",
      name: "",
      phoneNumber: "",
      internationalPf: EMPTYPREFIX
    }
  }

  findContactsByName() {
    if (this.searchString === '') this.contactListSearch = this.userContactList
    else this.contactListSearch = this.userContactList.filter(c => c.name.includes(this.searchString))
  }

  logOut() {
   this.loginService.logOff()
  }

}
