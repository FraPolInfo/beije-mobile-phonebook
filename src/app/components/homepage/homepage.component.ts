import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService, User } from '../../services/login-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  loginForm: FormGroup
  registrationForm: FormGroup

  userName: string
  password: string

  newUserName: string
  newPassword: string
  repeatPassword: string

  isLogin: boolean = true

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setupLoginForm()
    this.setupRegistrationForm()
  }

  setupLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(
        this.userName, [
        Validators.required,
      ]),
      password: new FormControl(
        this.password, [
        Validators.required,
      ]),
    });
  }

  setupRegistrationForm() {
    this.registrationForm = this.fb.group({
      newUserName: new FormControl(
        this.newUserName, [
        Validators.required,
      ]),
      newPassword: new FormControl(
        this.newPassword, [
        Validators.required,
        Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
      ]),
      repeatPassword: new FormControl(
        this.repeatPassword, [
        Validators.required,
      ])
    },
      {
        validator: this.repeatPasswordValidator()
      });
  }

  repeatPasswordValidator() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['newPassword'];
      const matchingControl = formGroup.controls['repeatPassword'];

      if (control.value !== matchingControl.value) matchingControl.setErrors({ mustMatch: true });
      else matchingControl.setErrors(null);
    }
  }

  submitLogin() {
    const loginUser: User = {
      userName: this.userName,
      password: this.password
    }
    this.loginService.logIn(loginUser).subscribe(
      () => {
        this.router.navigate(['/phonelist'])
      },
      () => this.snackBar.open('Errore nel login. Username o password sbagliati.', '', { duration: 2000})
    )
  }

  submitRegistration() {
    const registrationUser: User = {
      userName: this.newUserName,
      password: this.newPassword
    }
    this.loginService.signIn(registrationUser).subscribe(
      () => {
        this.isLogin = true
        this.snackBar.open('User registrato con successo.', '', { duration: 2000})
      },
      () => this.snackBar.open('Username già salvato. Cambia username.', '', { duration: 2000})
    )
  }
}
