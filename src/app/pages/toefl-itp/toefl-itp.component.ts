import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'toefl-itp',
  templateUrl: './toefl-itp.component.html',
  styleUrls: ['./toefl-itp.component.scss']
})
export class ToeflItpComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  goToUrl(url: any): void {
    // this.document.location.href = url;
    window.open(url, "_blank");
  }

}
