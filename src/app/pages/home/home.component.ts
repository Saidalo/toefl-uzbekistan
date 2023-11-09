import {Component, ViewChild} from '@angular/core';
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  images = [
    'https://images.prismic.io/etswebsiteprod/9953fe77-c6e9-4ae7-a21a-71b150e10db5_toeic-test-near-you.jpg?auto=compress,format&rect=1469,0,3061,4000&w=375&h=490',
    'https://images.prismic.io/etswebsiteprod/74683636-100e-479e-ad8b-ad1a04720621_TOEIC-propell-teacher-workshop.jpg?auto=compress,format&rect=1469,0,3061,4000&w=375&h=490',
    'https://images.prismic.io/etswebsiteprod/b813be14-a685-428a-86e7-1f0a39f8231d_TOEFL-iBT-improvements.jpg?auto=compress,format&rect=520,0,1082,1414&w=375&h=490'];
}
