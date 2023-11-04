import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string){
    return this.http.post(
      environment.apiUrl + '/account/login',
      {
        email: email,
        password: password,
      }
    ).pipe(map(res => {return res;}));
  }

  public register(
    form: FormData
  ){
    return this.http.post(
      environment.apiUrl + '/account/register',
      form
    ).pipe(map(res => {return res;}));
  }
}
