import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememeber: new FormControl(false)
    });
  }

  public onSubmit() {
    this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    );
  }
}
