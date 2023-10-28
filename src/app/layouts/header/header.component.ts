import {Component, HostListener} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public width1200 = false;
  public size400_700 = false;
  isLoggedIn = false;
  authenticationService: AuthenticationService | undefined;
  constructor(authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isLoggedIn();
    this.authenticationService = authenticationService;
  }

  logOut(){
    this.isLoggedIn = false;
    this.authenticationService?.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width1200 = false;
    if(window.innerWidth < 1020) {
      this.width1200 = true;
    }
  }


}
