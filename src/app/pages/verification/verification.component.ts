import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  status: string = "";
  email: string = "";
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,) {
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.email = this.router.getCurrentNavigation()?.extras?.state?.['email'];
    });
  }

  sendVerificationEmail() {
    this.http.post(environment.apiUrl + '/account/resend-verification',
{
          email: this.email
      }
    ).pipe(first()).subscribe({
      next: (response: any) => {
        this.status = "pending";
      },
      error: (error: any) => {
        alert(error.error)
      }
    });
  }

}
