import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-url-videoplayer',
  templateUrl: './url-videoplayer.component.html',
  styleUrls: ['./url-videoplayer.component.scss']
})
export class UrlVideoplayerComponent implements OnInit {
  safeURL: any;
  @Input() url: string | undefined;
  constructor(private _sanitizer: DomSanitizer){

  }


  ngOnInit(){
    if (this.url != null) {
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }
}
