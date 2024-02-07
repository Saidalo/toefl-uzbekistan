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
  constructor() {}
  model1: Test = new Test({
    obs1: 89573115,
    obs2: 83202,

    add1: 181703,
    add2: -189,

    duration: 500,
    interval: 5000,
  });
}


export class Test {
  constructor(data: any) {
    Object.assign(this, data);
  }

  obs1 = 86046903;
  obs2 = 200;

  add1 = 1800;
  add2 = -189;

  duration = 1000;
  interval = 1000;
}