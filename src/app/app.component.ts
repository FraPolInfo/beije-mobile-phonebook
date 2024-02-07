import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameServiceService } from './services/name-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  message = '';
  title = 'beije-mobile-phonebook';

  constructor (
    public nameService : NameServiceService
  ) {
  }

  ngOnInit() {
    this.message = this.nameService.getMessage()
  }
}
