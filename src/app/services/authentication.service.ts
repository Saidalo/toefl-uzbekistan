import { Injectable } from '@angular/core';
import {AuthenticationClient} from "../clients/authentication.client";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private roleKey = 'roles';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe({
      next: (response: any) => {
        console.log(response.status);
        if (response.status == 1) {
          localStorage.setItem(this.tokenKey, response.token);
          // localStorage.setItem(this.roleKey, response.permissions);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          alert(response.error);
        }
      },
      error: error => {
        console.log(error);
        switch (error.status) {
          case 401:
            this.router.navigate([`/verification`],
              {
                queryParams: {status: 'not_verified'},
                state: {email: email}
              });
            break;
          case 403:
            alert('You are not verified!');
            break;
          default:
            alert('Something went wrong!');
            break;
        }
      }
    });
  }

  public register(form: FormData): void {
    this.authenticationClient
      .register(form)
      .subscribe((response:any) => {
        if(response.status == 1) {
          // localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/verification?status=pending']);
        } else{
          alert(response.error);
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }
}
