import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public width1200 = false;
  public size400_700 = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width1200 = false;
    if(window.innerWidth < 1020) {
      this.width1200 = true;
    }
  }


}
