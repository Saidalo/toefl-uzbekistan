import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-toeic',
  templateUrl: './toeic.component.html',
  styleUrls: ['./toeic.component.scss']
})
export class ToeicComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  goToUrl(url: any): void {
    // this.document.location.href = url;
    window.open(url, "_blank");
  }

}