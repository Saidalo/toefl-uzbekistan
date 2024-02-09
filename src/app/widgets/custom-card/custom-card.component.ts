import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent {
  @Input() Title: string | undefined;
  @Input() Descriptions: string[] | undefined;
  @Input() Style: any;

}
