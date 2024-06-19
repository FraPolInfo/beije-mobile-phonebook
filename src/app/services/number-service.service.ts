import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, forkJoin, from, tap } from 'rxjs';
import names from '../../database/names.json';
import phones from '../../database/phones.json';
import { SpinnerService } from './spinner.service';

const APIKEY = '619e4771ab4242d2b15c7daa51a25b13'

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(
    private httpClient: HttpClient,
    private spinnerService: SpinnerService,
  ) { }

  verifyNumber(phoneNumber: string) : Observable<any> {
    return this.httpClient.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${APIKEY}&phone=${phoneNumber}`)
  }

  //Volevo fare due chiamate per ottenere questi dati e combinarli in un forkjoin, ma dato che non trovato un API adatta, l'ho simulato io 
  //Creando degli Observable dai file in JSOn che mi sono procurato, e dandogli una latenza generata casualmente da 1 a 3 secondi ognuna
  getIPList() {
    this.spinnerService.setSpinnerValue(true)
    return  forkJoin([
      this.getPrefixList(),
      this.getCountryNameList()
    ]).pipe( 
      tap( () => this.spinnerService.setSpinnerValue(false) ))
  }


  getPrefixList() {
    return from([phones as any]).pipe(
      delay(Math.floor(Math.random() * 3000)),
    )
  }

  getCountryNameList() {
    return from([names as any]).pipe(
      delay(Math.floor(Math.random() * 3000))
    )
  }
}

