import { Component } from '@angular/core';
import { NameServiceService } from '../../services/name-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  message: string = ''

  constructor(
    private nameService : NameServiceService
  ) { }

  ngOnInit() {
    this.message = this.nameService.getMessage()
  }

  saveMessage() {
    this.nameService.setMessage(this.message)
  }
}
