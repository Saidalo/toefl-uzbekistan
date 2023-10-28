import { Component } from '@angular/core';
import {AuthGuard} from "./helpers/auth.guard";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  constructor(authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isLoggedIn();
  }
  title = 'toefl-uzbek-angular';
}
