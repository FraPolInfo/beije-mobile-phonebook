import { Component } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  isSpinnerVisible: boolean = false

  constructor(
    private spinnerService: SpinnerService
  ) {
  }

  ngOnInit() {
     this.spinnerService.isSpinnerVisible$.pipe(
      tap( res => { 
        this.isSpinnerVisible = res
      })
     )
     .subscribe()
  }
}
