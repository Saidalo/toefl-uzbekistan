import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ToeflTests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss']
})

export class ToeflTests implements OnInit {
    ourTest: string = ''
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.ourTest = this.route.snapshot.paramMap.get('test') ?? '';
    }

}