import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

export interface User {
    userName: string,
    password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: User[]

  userLogged: User | null

constructor(
  private router: Router,
  private spinnerService: SpinnerService) {

  if(localStorage.getItem("userLogged")) {
    this.userLogged = JSON.parse(localStorage.getItem("userLogged") || '');
  } else this.userLogged = null
  this.userList = JSON.parse(localStorage.getItem("userList")|| '[]');
 }


 logIn(user: User) {
  return new Observable((subscriber) => {
    setTimeout( () => {
      if(this.userList.find(u => u.userName === user.userName && u.password === user.password)) {
        this.userLogged = user
        window.localStorage.setItem("userLogged", JSON.stringify(this.userLogged));
        subscriber.next()
      }
      else subscriber.error()
    }, 20)
  })
 }

 logOff() {
  this.userLogged = null
  window.localStorage.setItem("userLogged", JSON.stringify(null));
  this.router.navigate([''])
 }

 signIn(user: User) {
  return new Observable((subscriber) => {
    setTimeout( () => {
      if(this.userList.find(u => u.userName === user.userName)) {
        subscriber.error()
      }
      else {
        this.userList.push(user)
        window.localStorage.setItem("userList", JSON.stringify(this.userList));
        subscriber.next()
      }
    }, 20)
  })
 }

}
