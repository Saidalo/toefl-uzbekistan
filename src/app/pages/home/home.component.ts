import {Component, ViewChild} from '@angular/core';
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  // @ts-ignore
  mapOptions = {
    center: { lat: 41.28262750088908, lng: 69.24314579736573 },
    zoom : 14
  }
  marker = {
    position: { lat: 41.28262750088908, lng: 69.24314579736573 },
  }
  images = [
    'assets/img/bg/banner3.jpg',
    'assets/img/bg/banner2.jpg',
    'assets/img/bg/banner1.jpg',];
    //'assets/img/bg/american-flag-manhattan-new-york-downtown.jpg'

  contactForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  submitContactForm() {

  }

}
