import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss']
})
export class PreparationComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  goToUrl(url: any): void {
    this.document.location.href = url;
  }

}
