import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameServiceService {

  message: string = 'Testo salvato';

  constructor() { }

  setMessage(str: string) {
    this.message = str;
    console.log('set message: ', this.message)
  }

  getMessage() {
    return this.message
  }
}
