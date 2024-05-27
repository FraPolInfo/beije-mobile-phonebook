import { Component } from '@angular/core';
import { NameServiceService } from '../../services/name-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  message: string = ''

  constructor(
    private nameService : NameServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.message = this.nameService.getMessage()
  }

  saveMessage() {
    this.nameService.setMessage(this.message)

    this.router.navigate(['phonelist'])
  }
}
