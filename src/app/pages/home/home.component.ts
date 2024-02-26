import {Component, inject, ViewChild} from '@angular/core';
import {NgbCarousel, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UrlVideoplayerComponent} from "../../widgets/url-videoplayer/url-videoplayer.component";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  private modalService = inject(NgbModal);

  // @ts-ignore
  mapOptions = {
    center: { lat: 41.273934363766266, lng: 69.24416437318845 },
    zoom : 14
  }
  marker = {
    position: { lat: 41.273934363766266, lng: 69.24416437318845 },
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

  constructor(private authenticationService: AuthenticationService,) {

  }


  submitContactForm() {
    this.authenticationService.sendContactForm(this.contactForm.value).subscribe({
      next: (response: any) => {
        alert('Message sent successfully');
        this.contactForm.reset();
      },
      error: error => {
        console.log(error);
        alert('Something went wrong!');
      }
    });
  }

  model1: Test = new Test({
    obs1: 89573115,
    obs2: 83202,

    add1: 181703,
    add2: -189,

    duration: 500,
    interval: 5000,
  });

  openUrlVideoPlayer(url: string) {
    this.modalService.open(UrlVideoplayerComponent, {size: 'lg', centered: true, windowClass: 'url-videoplayer-modal'}).componentInstance.url = url;
  }
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
