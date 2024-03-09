import {Component, inject, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'toefl-itp',
  templateUrl: './toefl-itp.component.html',
  styleUrls: ['./toefl-itp.component.scss']
})
export class ToeflItpComponent implements OnInit{
  @ViewChild('registerModal') registerModal: any;
  private modalService = inject(NgbModal);

  firsttime: any;

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.modalService.open(this.registerModal, { centered: true });
    }, 3000);


  }

  goToUrl(url: any): void {
    // this.document.location.href = url;
    window.open(url, "_blank");
  }
  public rating = 5;
  public readonly = true
}
