import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NumberService } from '../../services/number-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  message: string = ''

  constructor(
    private nameService : NumberService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  saveMessage() {
    this.router.navigate(['phonelist'])
  }
}
