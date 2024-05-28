import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumberService } from './services/number-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor (
    public nameService : NumberService
  ) {
  }

  ngOnInit() {

  }
}
