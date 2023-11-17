import { Injectable } from '@angular/core';
import {AuthenticationClient} from "../clients/authentication.client";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private userId = 'user_id';
  private roleKey = 'roles';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe({
      next: (response: any) => {
        if (response.status == 1) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userId, response.data.id);

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
      .subscribe({next: (response:any) => {
          if(response.status == 1) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.userId, response.data.id);

            this.router.navigate(['/verification'], {queryParams: {status: 'pending'}});
          } else{
            alert(response.error);
          }
        },
        error: (error: any) => {

        }
      });
  }

  public registerAccount(form: FormData){
    return this.authenticationClient.registerEmail(form);
  }

  public uploadImage(form: FormData){
    return this.authenticationClient.uploadImage(form);
  }

  public registerDate(form: FormData){
    return this.authenticationClient.registerDate(form);
  }

  public profile(id: number){
    return this.authenticationClient.profile(id);
  }

  public updateProfile(form: any){
    return this.authenticationClient.updateProfile(form, this.getUserId()!);
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userId);
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

  public getUserId(): number | null {
    return this.isLoggedIn() ? parseInt(localStorage.getItem(this.userId)!) : null;
  }

  public setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }
}
