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
  images = [
    'https://www.stanford.edu/wp-content/uploads/2023/10/Hero-3-2-scaled.jpg',
    'https://www.alpha-sense.com/wp-content/uploads/2021/01/AS-Blog-Corporate-Response-Insurrection.png',
    'https://tourscanner.com/blog/wp-content/uploads/2022/01/fun-things-to-do-in-New-York-City-at-night.jpg'];

  contactForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  submitContactForm() {

  }

}
