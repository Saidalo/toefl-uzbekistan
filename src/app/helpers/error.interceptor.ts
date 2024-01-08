import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([400, 401, 403].includes(err.status) && this.authenticationService.isLoggedIn()) {
        // auto logout if 401 or 403 response returned from api
        this.authenticationService.logout();
      }

      if([400, 401, 403].includes(err.status) && !this.authenticationService.isLoggedIn()) {
        this.router.navigate(['/404']).then(r => {
          alert('You are not authorized to access this page');
        });
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }));
  }
}
