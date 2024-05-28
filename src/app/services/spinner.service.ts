import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isSpinnerVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setSpinnerValue(value: boolean) {
    this.isSpinnerVisible$.next(value)
  }
}
