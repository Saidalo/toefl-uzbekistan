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
  isAdmin = false;
  authenticationService: AuthenticationService | undefined;
  constructor(authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isLoggedIn();
    this.isAdmin = authenticationService.isAdmin();
    this.authenticationService = authenticationService;
  }
  goToUrl(url: any): void {
    // this.document.location.href = url;
    window.open(url, "_blank");
  }

  logOut(){
    this.isLoggedIn = false;
    this.isAdmin = false;
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
