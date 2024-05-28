import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APIKEY = '619e4771ab4242d2b15c7daa51a25b13'

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(private httpClient: HttpClient) { }

  verifyNumber(phoneNumber: string) : Observable<any> {
    return this.httpClient.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${APIKEY}&phone=${phoneNumber}`)
  }
}
